import { Btn } from "../buttons/Btn"
import { Link, useNavigate } from 'react-router-dom'
import { CgMenu } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import { Container } from "../container/Container";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import Logout from "./Logout";
import { useState } from "react";
// import { Link } from "react-router-dom";
export const Header = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false)
  const authStatus = useSelector((state: RootState) => state.auths.status);
  const navlinks = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: 'Log In',
      slug: '/login',
      active: !authStatus
    },
    {
      name: 'Sign Up',
      slug: '/signup',
      active: !authStatus
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus
    }
  ]


  return (
    <div className="">
      <header className="font-roboto py-3 sm:py-4 px-[0.8rem] ">
        <Container>
          <nav className="py-1 px-3 bg-white border  max-w-[950px] mx-auto rounded-4xl border-gray-300  font-stretch-100% flex items-center  transition-all duration-300 ease-in-out
        shadow-md
 ">
            <div className="right  flex-[40%] flex items-center ">
              <div className="menu">
                <CgMenu
                  onClick={() => setToggle(!toggle)}
                  className={` bg-white rounded-4xl p-1 transition-all duration-300 ease-in-out text-3xl text-gray-600 font-bold  cursor-pointer hover:bg-gray-200 ${!toggle ? "flex" : "hidden"
                    } flex sm:hidden `}
                />

                <RxCross2
                  onClick={() => setToggle(!toggle)}
                  className={` bg-white rounded-4xl p-1 transition-all duration-300 ease-in-out text-3xl text-gray-600 font-bold  cursor-pointer  hover:bg-gray-200 ${toggle ? "flex" : "hidden"
                    } flex sm:hidden `}
                />
              </div>
              <div className="logo font-fire pl-2 sm:pl-5 text-[23px] sm:text-[30px] font-bold text-blue-600 ">
                <Link to="/" >
                  
                  <p>BytePost</p>

                </Link>
              </div>
            </div>
            <div className="left ml-auto flex items-center   flex-[60%]">
              <ul className="links hidden sm:flex flex-2/3  justify-around  gap-4  ">
                {
                  navlinks.map((link) =>
                    link.active ? (
                      <li key={link.name}>
                        <button
                          className="cursor-pointer text-gray-600 font-[500] hover:text-gray-900 transition-colors duration-200
"
                          onClick={() => navigate(link.slug)}
                        >{link.name}</button>
                      </li>
                    ) : null)
                }
              </ul>
              <div className="ml-auto ">
                {
                  authStatus ?
                    <Logout />
                    // <Btn />
                    :
                    <div className="btn  ml-auto">
                      <Btn btnName="Get Started" w="25" bgCol="white" textCol="gray-600" classname={'border-gray-400  font-light py-2 px-3 text-[14px] shadow-md '}
                        onClick={() => navigate('/signup')}
                      />
                    </div>
                }
              </div>


            </div>
          </nav>


        </Container>


      </header>
      {
        !toggle ?
          <>
          </>
          :
          <div className="bg-[#19191fa9]  fixed top-0 w-full h-screen grid place-items-center z-30 ">
            <RxCross2
              onClick={() => setToggle(!toggle)}
              className={` bg-white rounded-4xl p-1 transition-all duration-300 ease-in-out text-3xl text-gray-600 font-bold  cursor-pointer  hover:bg-gray-200 ${toggle ? "flex" : "hidden"
                } flex sm:hidden fixed top-5 left-9`}
            />
            <ul className="flex items-center justify-center flex-col bg-[#000000] py-4 px-8 text-white">
              {
                navlinks.map((link) =>
                  link.active ? (
                    <li key={link.name} className="">
                      <Link
                        to={link.slug}
                        className="cursor-pointer text-white font-[500] my-3 text-[18px] underline px-4 underline-offset-10 decoration-0 font-sans  hover:text-gray-300 transition-colors duration-200"
                        onClick={() => setToggle(false)}
                      >
                        {link.name}
                      </Link>

                    </li>
                  ) : null)
              }
            </ul>
          </div>
      }

    </div>

  )
}




