import { useDispatch } from "react-redux";
import { Btn } from "../buttons/Btn"
import authService from "../../appwrite/auth";
import { logOut } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
// import { logout } from "../redux/actions"; // if you have a logout action

const Logout = () => {
  const dispatch = useDispatch();
 const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
     authService.logOut()
     .then(()=>{
      dispatch(logOut())
      navigate('/')

     })
    console.log("Logged out...");
    
  };

  return (
    <Btn btnName="Logout" onClick={handleLogout} textCol="white" classname={"py-2 px-3"} />
  );
};

export default Logout;
