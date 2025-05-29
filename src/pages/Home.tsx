
import { Container } from "../components/container/Container"

import { Header } from "../components/header/Header"
import Footer from "../components/footer/Footer"
import { Btn } from "../components/buttons/Btn"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "../store/store"

const Home = () => {

  const navigate = useNavigate()
  const userStatus = useSelector((state: RootState) => (state.auths.status))




  return (
    <div className="w-full">
      <div className="flex flex-col min-h-screen  ">
        <Header />

        <main className="flex-1 grid place-items-center   ">
          <Container>
            <div className=" flex flex-col items-center justify-center  ">
              <div className="max-w-[700px] flex flex-col items-center justify-center  px-2 my-20 sm:my-10">
                <h1 className="font-semibold font-fire text-[2.5rem] sm:text-[3.5rem] text-center leading-tight">
                  Create, collaborate, and scale your blogs and docs.
                </h1>
                <h5 className="text-center text-gray-500 font-semibold mt-8">
                  Effortlessly build blogs, API docs, and product guides with BytePost, with the flexibility of a headless CMS and more.
                </h5>
                {
                  !userStatus ?
                    <Btn
                      btnName="Sign up for free"
                      classname="w-50 py-4 mt-8 mb-4 text-xl shadow-md border-0"
                      onClick={() => navigate('/signup')}
                    />
                    :
                    <Btn
                      btnName="Enjoy the services for free"
                      classname="w-80 py-4 mt-8 mb-4  text-xl shadow-md border-0 bg-blue-700"
                    />
                }
                <p className="text-gray-400">No credit card required.</p>
              </div>
              <div className="w-full" >
                <img src="../hero2.png" className="mix-blend-multiply " />
              </div>


            </div>

          </Container>
        </main>
        <div className=" w-full border-t-1 border-gray-300 flex flex-col items-center justify-center h-[60vh] bg-gradient-to-t from-blue-700 px-7 gap-4 sm:gap-7">
          <img src="../logo2.png" className=" w-[150px] sm:w-[220px]"/>
          <div>
            <h1 className="text-center font-fire font-bold text-xl sm:text-3xl">Welcome to BytePost</h1>
            <h2 className="font-fire text-center font-bold text-xl sm:text-3xl">One byte at a time, Post thoughts that spark minds..</h2>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );

}

export default Home