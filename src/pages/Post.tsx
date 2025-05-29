import { useEffect, useState } from "react"
import type { AppwritePost } from "../types/post"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "../store/store"
import databaseService from "../appwrite/databaseServices"
import bucketServices from "../appwrite/bucketServices"
import { Container } from "../components/container/Container"
import { Btn } from "../components/buttons/Btn"
import parse from "html-react-parser"
import { Header } from "../components/header/Header"
import Footer from "../components/footer/Footer"

const Post = () => {
    const [post, setPost] = useState<AppwritePost>()
    const { slug } = useParams()
    const navigator = useNavigate()
    const userData = useSelector((store: RootState) => store.auths.userData)
    const isAuthor = post && userData ? post.userId === userData.$id : false;


    useEffect(() => {
        if (slug) {
            databaseService.getPostById(slug)
                .then((post) => {

                    if (post)
                        setPost(post as AppwritePost)
                    else
                        navigator('/')
                }
                )

        }
        else {
            navigator('/')
        }
    }, [slug, navigator])

    const deletePost = () => {
        if (post) {

            databaseService.deletePostById(post.$id)
                .then((response) => {
                    if (response) {
                        bucketServices.deleteFile(post.featuredImage)
                        navigator("/")
                    }
                }
                )
        }
    }
    return post ? (
        <div className="w-full">
            <Header />
            <main className="py-5 ">
                <Container>
                    <div className="bg-white p-6 md:p-10 rounded-2xl shadow-lg transition-all">
                        <div className="mb-6">
                            <img
                                src={bucketServices.getFilePreView(post.featuredImage)}
                                alt={post.title}
                                className="w-full max-h-[450px] object-cover rounded-xl shadow"
                            />
                            {isAuthor && (
                                <div className="flex gap-4 mt-4">
                                    <Link to={`/edit-post/${post.$id}`}>
                                        <Btn btnName="Edit" bgCol="blue-600" classname={'py-2 ' } />
                                    </Link>
                                    <Btn
                                        onClick={deletePost}
                                        btnName="Delete"
                                        bgCol="black" classname={'py-2 ' }
                                    />
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2">
                                {post.title}
                            </h1>
                            <p className="text-sm text-gray-500">Post ID: {post.$id}</p>
                        </div>

                        <div className="prose prose-base md:prose-lg max-w-full text-gray-800">
                            {parse(post.content)}
                        </div>
                    </div>
                </Container>
            </main>
            <Footer />
        </div>
    ) : null;

}

export default Post