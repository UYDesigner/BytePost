import { useForm } from "react-hook-form";
import databaseService from "../../appwrite/databaseServices";
import bucketServices from "../../appwrite/bucketServices";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useCallback, useEffect, useState } from "react";
import Input from "../input/Input";
import RTE from "../RTE";
import Select from "../Select";
import { Btn } from "../buttons/Btn";
import Loader from "../loader/Loader";

interface PostFormProps {
    post?: {
        $id: string;
        title: string;
        slug: string;
        content: string;
        status: string;
        featuredImage: string;
    };
}

interface FormData {
    title: string;
    slug: string;
    content: string;
    status: string;
    image: FileList;

}

const PostForm = ({ post }: PostFormProps) => {

    const {
        register, handleSubmit, reset, watch,
        setValue, control, getValues, setError, formState: { errors }
    } = useForm<FormData>({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || '',
        }
    });

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();
    const userData = useSelector((state: RootState) => {
        // console.log(state.auths)
        return state.auths.userData
    });
    if (!userData) {

        console.error("User not logged in");
        return null;
    }

    const onSubmit = async (data: FormData) => {

        let hasError = false;
        setLoading(true)

        if (data.content.length === 0) {
            setError("content", {
                type: "manual",
                message: "Content cannot be empty",
            });
            hasError = true;
        }

        if (data.title.length > 36) {
            setError("title", {
                type: "manual",
                message: "Title should be short",
            });
            hasError = true;
        }

        if (hasError) {
            setLoading(false)
            return;
        }



        try {
            // console.log(data);

            const file = data.image?.[0]
                ? await bucketServices.uploadFile(data.image[0])
                : null;

            const { image, ...rest } = data; // 🛠️ Remove `image` field before passing to DB

            if (post) {
                if (file) {
                    await bucketServices.deleteFile(post.featuredImage);
                }

                const dbPost = await databaseService.updatePost(post.$id, {
                    ...rest,
                    userId: userData.$id,
                    featuredImage: file ? file.$id : post.featuredImage,
                    image: undefined
                });

                if (dbPost) {
                    // console.log(dbPost);
                    reset();
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                if (file) {
                    const dbPost = await databaseService.createPost({
                        ...rest,
                        userId: userData.$id,
                        featuredImage: file.$id,
                        image: undefined
                    });

                    if (dbPost && typeof dbPost !== "string") {
                        reset();
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        }
        catch (error: any) {
            console.error("Post submission error:", error);

            // if (error?.message?.includes("Permission denied")) {
            //     setError("You don't have permission to perform this action.");
            // } else if (error?.message?.includes("Invalid")) {
            //     setError("Something you entered is invalid.");
            // } else {
            //     setError("An unexpected error occurred. Please try again later.");
            // }
        }
        finally {
            setLoading(false)
        }

    };



    const slugTransform = useCallback((value: string) => {
        return value
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title' && typeof value.title === "string") {
                const slug = slugTransform(value.title);
                setValue('slug', slug, {
                    shouldValidate: true,
                });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <div className="max-w-[1400px] mx-auto z-10">
            <div className="w-full  p-4 ">
                <h2 className="text-3xl font-bold text-gray-800">
                    {post ? "Edit Post" : "Create New Post"}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                    {post
                        ? "Update the content and details of your blog post."
                        : "Fill in the information to publish your new blog post."}
                </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col lg:flex-row gap-6 p-4">
                {/* Left Section (Title, Slug, Content) */}
                <div className="w-full lg:w-2/3 flex flex-col gap-4">
                    <Input

                        placeholder="Post Title"
                        className="w-full"
                        {...register("title", { required: true })}
                    />
                    {errors.title && <p className="text-red-500 text-sm text-center">{errors?.title.message}</p>}

                    <Input
                        placeholder="Slug (auto-generated)"
                        className="w-full"
                        {...register("slug", { required: true })}
                        onInput={(e) =>
                            setValue("slug", slugTransform(e.currentTarget.value), {
                                shouldValidate: true,
                            })
                        }
                    />

                    <RTE
                        label="Content"
                        name="content"
                        control={control}
                        defaultValue={getValues("content")}
                    />
                    {errors.content && <p className="text-red-500 text-sm text-center">{errors?.content.message}</p>}
                </div>

                {/* Right Section (Image, Status, Submit) */}
                <div className="w-full lg:w-1/3 flex flex-col gap-4">
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Featured Image:</label>
                        <Input
                            type="file"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("image", { required: !post })}
                        />
                    </div>

                    {post && (
                        <div className="w-full">
                            <img
                                src={bucketServices.getFilePreView(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg w-full h-auto object-cover"
                            />
                        </div>
                    )}

                    <Select
                        options={["active", "inactive"]}
                        label="Post Status"
                        {...register("status", { required: true })}
                    />

                    <Btn
                        type="submit"
                        bgCol={post ? "green-500" : "black"}
                        classname={"w-full py-3 px-2 bg-black  font-semibold"}
                        btnName={post ? "Update Post" : "Publish Post"}
                    />
                </div>
                {(errors.title || errors.content) && (
                    <p className="text-red-500 text-sm text-center">
                        Something you entered is invalid.
                    </p>
                )}

            </form>
            {
                loading && <Loader />
            }
        </div>

    );
};

export default PostForm;
