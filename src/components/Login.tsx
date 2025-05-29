import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import authService from "../appwrite/auth";
import { logIn as authLogin } from "../features/authSlice";
import type { LoginData } from "../types/user";

import Input from "./input/Input";
import { Btn } from "./buttons/Btn";
import Loader from "./loader/Loader";

// import Footer from "./footer/Footer";


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm<LoginData>();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: LoginData) => {
        // console.log("logindata", data)
        setLoading(true)
        setError("");
        try {
            const session = await authService.logIn(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData));
                    reset()
                    navigate("/");
                }
            }
        } catch (error: any) {
            
            if (error?.message?.includes("Rate limit")) {
                setError("Too many requests. Please wait a moment and try again.");
            } else if (error?.message?.includes("Invalid `password` param")) {
                setError("Wrong Email or Password.");
            } else {
                setError(error.message || "Something went wrong during login.");
            }
        }
        finally {
            setLoading(false);  
        }


    };

    return (
        <div >


            <h2 className="text-2xl font-semibold text-center mb-10 text-gray-700">Login to your account</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 ">
                <Input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Email"
                    className="rounded-md"
                />
                <Input
                    type="password"
                    {...register("password", { required: true })}
                    placeholder="Password"
                    className="rounded-md"
                />



                <Btn
                    type="submit"
                    btnName="Log In"
                    w="w-full"

                    textCol="text-white"
                    hovBgCol="hover:bg-blue-700"
                    classname={"mx-auto bg-black text-2xl py-2 px-2 text-white w-full"}
                />
            </form>
            {loading && <Loader />}

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}


            <p className="mt-8 text-center text-sm text-gray-600">
                Don't have an account?{" "}

                <Link to={'/signup'} className="text-blue-600 hover:underline cursor-pointer">
                    Sign Up
                </Link>
            </p>

        </div>

    );
};

export default Login;
