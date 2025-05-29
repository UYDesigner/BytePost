import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import type { User } from "../types/user";
import { useState } from "react";
import { logIn } from "../features/authSlice";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Input from "./input/Input";
import { Btn } from "./buttons/Btn";
import Loader from "./loader/Loader";

const SignUp = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState<string>();
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm<User>();
    const [loader, setLoader] = useState(false)

    const onSubmit = async (data: User) => {
        setLoader(true)
        setError("");

        try {
            const session = await authService.createAccount(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    // console.log("sign in userdat", userData)
                    dispatch(logIn(userData));
                    reset();
                    navigate("/");

                }
            }
        } catch (error: any) {
            console.error("Signup error:", error);
            
            const message = error?.message || "";
            if (message.includes("Rate limit")) {
                setError("Too many requests. Please wait a moment and try again.");
            } else if (message.includes("Invalid `password` param")) {
                setError("Password must be at least 8 characters long and include a special character.");
            } else if (message.includes("already exists")) {
                setError("Email already in use. Please log in instead.");
            }
            else {
                setError("Something went wrong during signup. Please try again.");
            }
        }
        finally {
            setLoader(false)
        }
    };

    return (
        <div >
            <h2 className="text-[20px] font-bold sm:text-2xl sm:font-semibold text-center mb-10 text-gray-700">
                Sign up with Email
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    type="text"
                    placeholder="Name"
                    {...register("name", { required: true })}
                    className="w-full p-2 border rounded"
                />
                <Input
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: true })}
                    className="w-full p-2 border rounded"
                />
                <Input
                    type="password"
                    placeholder="Password"
                    {...register("password", { required: true })}
                    className="w-full p-2 border rounded"
                />
                <Btn
                    type="submit"
                    btnName="Create Account"
                    w="w-full"
                    textCol="text-white"
                    hovBgCol="hover:bg-blue-700"
                    classname="bg-black text-2xl py-2 px-2 text-white w-full"
                />
            </form>
            {
                loader && <Loader />
            }

            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

            <p className="mt-8 text-center text-sm text-gray-600">
                Already have an account?, {"   "}
                <Link to="/login" className="text-blue-600 hover:underline">


                    Log In

                </Link>
            </p>
        </div>
    );
};

export default SignUp;
