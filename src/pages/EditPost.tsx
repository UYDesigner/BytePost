import { useEffect, useState } from "react"
import type { AppwritePost } from "../types/post"
import { useNavigate, useParams } from "react-router-dom"
import databaseService from "../appwrite/databaseServices"

import { Container } from "../components/container/Container"
import PostForm from "../components/post-form/PostForm"
import { Header } from "../components/header/Header"
import Footer from "../components/footer/Footer"


const EditPost = () => {

    const [post, setPost] = useState<AppwritePost | null>(null);

    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            databaseService.getPostById(slug)
                .then((post) => {
                    setPost(post as AppwritePost)
                })
                .catch((err) => console.log("failed to fetch post at edit time  :", err))
        }
        else {
            navigate('/')
        }

    }, [])





    return post ? (
        <div className="w-full">
            <Header/>
            <main>
                <Container>
                    <PostForm post={post} />
                </Container>
            </main>
            <Footer/>
        </div>
    ) : null
}

export default EditPost