
import { Container } from '../components/container/Container'
import Footer from '../components/footer/Footer'
import { Header } from '../components/header/Header'
import PostForm from '../components/post-form/PostForm'

const AddPost = () => {
    return (
         <div className="min-h-screen  flex flex-col ">
            <Header />
            <main className='flex-1'>
                <Container>
                    <PostForm />
                </Container>
            </main>
            <Footer />
        </div>
    )
}

export default AddPost