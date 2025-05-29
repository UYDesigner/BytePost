import { FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa6";
const Footer = () => {
  const links =['Privacy Policy' , 'Terms', 'Code of Contact']
  return (
    <div className="font-roboto w-full bg-black ">
      <div className="bg-black flex flex-col max-w-[1400px] mx-auto">
        <div className="top-box px-2 py-5  flex flex-col sm:flex-row gap-4 sm:items-center">
          <div className="head sm:px-3 flex-[60%] flex flex-col gap-4 ">
            <h1 className="text-2xl px-2 sm:px-0 font-bold font-fire text-white">BytePost</h1>
            <p className="text-[13px] px-2 sm:p-0 sm:w-[50%] font-[400] text-gray-400 ">Hassle-free blogging platform that developers and teams love.</p>

          </div>
          <div className="px-2 links flex flex-[40%] gap-4 sm:gap-8 items-center">
            <BsTwitterX   className="text-xl text-gray-400 cursor-pointer  hover:text-gray-600"  />
            <FaFacebook  className="text-2xl text-gray-400 cursor-pointer  hover:text-gray-600"  />
            <FaLinkedin   className="text-xl text-gray-400 cursor-pointer hover:text-gray-600 " />
            <RiInstagramFill  className="text-2xl text-gray-400 cursor-pointer  hover:text-gray-600"  />
            <FaYoutube   className="text-2xl text-gray-400  hover:text-gray-600" />
          </div>
        </div>
        <div className="bottom px-3 pt-5 pb-7   text-gray-400 flex flex-col sm:flex-row gap-2    ">
          
          <div className="flex flex-row sm:px-3  items-center gap-1.5 flex-[60]">
            <FaRegCopyright className="text-[15px] font-[500]" />
            <p className="text-[15px] font-[500]">BytePost 2025 </p>
            <p> -Urvashi Yadav</p>
          </div>
          <div className="bg-gray-300 w-full h-[1px] my-2 block sm:hidden">

          </div>
          <div className="flex flex-[40] gap-2 items-start sm:items-center text-[15px] font-[500] flex-col sm:flex-row">
            {
              links.map((link, idx)=>(
                  <a href="/"   className="flex-1 hover:text-gray-600" key={idx} >{link}</a>
              )

              )
            }
           
          </div>
        </div>

      </div>

    </div>
  )
}

export default Footer