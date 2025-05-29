import { useEffect, useState } from 'react'
import databaseService from '../appwrite/databaseServices'
import type { AppwritePost } from '../types/post';
import { Container } from '../components/container/Container';
import PostCard from '../components/card/PostCard';
import { Header } from '../components/header/Header';
import Footer from '../components/footer/Footer';

const AllPost = () => {
    const [posts, setPosts] = useState<AppwritePost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        databaseService.getAllPosts()
            .then((posts) => setPosts(posts))
            .catch((err) => {
                console.error("Error fetching posts:", err);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="w-full flex flex-col min-h-screen bg-gray-100">
            <Header />

            <main className="flex-1 py-10">
                <Container>
                    

                    {loading ? (
                        <div className="text-center text-lg text-gray-500 py-20">Loading posts...</div>
                    ) : posts.length === 0 ? (
                        <div className="text-center text-gray-500 py-20">No posts found.</div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                            {posts.map((post: AppwritePost) => (
                                <PostCard
                                    key={post.$id}
                                    $id={post.$id}
                                    title={post.title}
                                    featureImage={post.featuredImage}
                                    createdAt ={post.$createdAt}
                                    userId ={post.userId}
                                />
                            ))}
                        </div>
                    )}
                </Container>
            </main>

            <Footer />
        </div>
    );
};

export default AllPost;
