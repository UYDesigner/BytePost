
import { RiHomeLine } from 'react-icons/ri'
import Login from './Login'
import SignUp from './SignUp'
import { Link } from 'react-router-dom'

interface log {
    page: string
}

const CommonLog = ({ page = "" }: log) => {

    return (

        <div>
            <div className="min-h-screen flex  bg-[url(../bg2.png)] sm:bg-none font-roboto">
                {/* Common Form Section */}
                <div className="flex flex-1 items-center justify-center px-4">
                    <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">


                        <div className=" flex justify-between items-center py-3 pb-15">
                            <div

                                className="text-blue-600 font-fire text-2xl sm:text-3xl font-bold"
                            >BytePost
                            </div>


                            <div className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition cursor-pointer" >
                                <RiHomeLine className="text-2xl" />
                                <Link to={'/'} className=" font-bold sm:font-medium ">

                                    Home
                                </Link >
                            </div>
                            {/* </Link> */}
                        </div>
                        {
                            page == "signup" ?
                                <SignUp />
                                :
                                <Login />
                        }

                    </div>

                </div>
            </div>

        </div>
    )
}

export default CommonLog