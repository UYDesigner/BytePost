import { Link } from "react-router-dom"
import bucketServices from "../../appwrite/bucketServices"
import { useEffect, useState } from "react";
import databaseService from "../../appwrite/databaseServices";




type PostCardProps = {
    $id: string;
    title: string;
    featureImage: string;
    userId: string
    createdAt: any
};

type User = {
    userId: string,
    name: string,
    email: string

}



const PostCard = ({ $id, title, featureImage, createdAt, userId }: PostCardProps) => {
    // console.log({ $id, title, featureImage, userId })
    const [user, setUser] = useState<User | null>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        databaseService.getUserById(userId)
            .then((res) => {
                // console.log(res)
                if (res) {
                    const userData: User = {
                        userId: res.userId,
                        name: res.name,
                        email: res.email
                    };
                    setUser(userData);
                }
            })
            .catch((err) => console.log(err))
            .finally(
                () =>
                    setLoading(false)
            )

    }, [userId])

    return (
        <Link to={`/post/${$id}`}>
            <div className="bg-white text-black rounded-md shadow-lg overflow-hidden transition hover:scale-[1.02] hover:shadow-xl flex items-center p-4">
                <div className="left w-2/3 pr-4">
                    <h4 className="text-sm font-semibold text-gray-600">{loading ? "Loading user..." : user?.name}</h4>
                    <h5 className="text-xs text-gray-400">
                        {new Date(createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </h5>

                    <h1 className="text-xl font-bold mt-2">{title}</h1>

                </div>
                <div className="right w-1/3">
                    <img
                        src={bucketServices.getFilePreView(featureImage).toString()}
                        alt={title}
                        className="w-full h-35 sm:h-48 object-cover rounded-md"
                    />
                </div>
            </div>
        </Link>
    );
};

export default PostCard;
