import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Helmet } from "react-helmet-async";


const Login = () => {
    const { loginUser, MySwal, googleLogin, githubLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const location = useLocation();

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
            terms: false,
        },
    });

    const { register, handleSubmit, formState, reset } = form;
    const { errors, isSubmitSuccessful } = formState;

    const onSubmitForm = data => {
        const { email, password } = data;

        loginUser(email, password)
            .then(userCredential => {
                const user = userCredential.user;
                if (user?.emailVerified) {
                    MySwal.fire({
                        icon: 'success',
                        title: "Success",
                        text: 'You are logged in successfully',
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "Ok"
                    })
                        .then(() => {
                            navigate(location?.state ? location.state : '/');
                        })
                }
                else {
                    MySwal.fire({
                        icon: 'error',
                        title: "Error",
                        text: "Please verify your email address",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "Ok"
                    })
                        .then(() => {
                            navigate('/confirmEmail');
                        })
                }
            })
            .catch(error => {
                MySwal.fire({
                    icon: 'error',
                    title: "Error",
                    text: error.message,
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok"
                })
                    .then(() => {
                        navigate('/register');
                    })
            })
    }

    const handleGoogle = () => {
        googleLogin()
            .then(() => {
                MySwal.fire({
                    icon: 'success',
                    title: "Success",
                    text: 'You are logged in successfully',
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok"
                })
                    .then(() => {
                        navigate(location?.state ? location.state : '/');
                    })
            })
            .catch(error => {
                MySwal.fire({
                    icon: 'error',
                    title: "Error",
                    text: error.message,
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok"
                })
            })
    }

    const handleGithubLogin = () => {
        githubLogin()
            .then(() => {
                MySwal.fire({
                    icon: 'success',
                    title: "Success",
                    text: 'You are logged in successfully',
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok"
                })
                    .then(() => {
                        navigate(location?.state ? location.state : '/');
                    })
            })
            .catch(error => {
                MySwal.fire({
                    icon: 'error',
                    title: "Error",
                    text: error.message,
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok"
                })
            })
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset])

    return (
        <div className="my-20 max-w-xl mx-auto p-8 shadow-lg rounded-lg">
            <Helmet>
                <title>Bloggy | Login</title>
            </Helmet>
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-blue-700 text-sm">
                    Don&apos;t have an account?  Please{" "}
                    <Link to={"/register"}>
                        <span className="text font-medium hover:text-purple-600 hover:font-bold hover:underline">
                            Register
                        </span>
                    </Link>
                </p>
            </div>
            <form className="mt-10" onSubmit={handleSubmit(onSubmitForm)} noValidate>
                <div className="mt-6">
                    <label htmlFor="email">
                        Email Address<sup>*</sup>
                    </label>
                    <input
                        type="email"
                        id="email"
                        className={`border-2 rounded-md p-2 block mt-2 w-full outline-none hover:border-blue-300 focus:border-blue-500 ${errors.email && "border-red-500"
                            }`}
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Email address is required",
                            },
                            pattern: {
                                value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                                message: "Invalid email address"
                            }
                        })}
                    />
                    <p className="text-red-500 text-sm">
                        {errors.email && errors.email?.message}
                    </p>
                </div>
                <div className="mt-6">
                    <label htmlFor="password">
                        Password<sup>*</sup>
                    </label>
                    <div className="relative">
                        <input
                            type={show ? 'text' : 'password'}
                            id="password"
                            className={`border-2 rounded-md p-2 block mt-2 w-full outline-none hover:border-blue-300 focus:border-blue-500 ${errors.password && "border-red-500"
                                }`}
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "Password is required",
                                },
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least of 6 characters"
                                },
                                pattern: {
                                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$-_!%*?&]+$/g,
                                    message: "Invalid password"
                                }
                            })}
                        />
                        <button className="text-xl absolute top-[25%] right-[3%]" onClick={() => setShow(!show)} title={show ? 'hide' : 'show'}>{show ? <IoEyeOff /> : <IoEye />}</button>
                    </div>
                    <p className="text-red-500 text-sm">
                        {errors.password && errors.password?.message}
                    </p>
                </div>
                <div className="mt-6">
                    <div className="flex items-center justify-between">
                        <div className="space-x-2">
                            <input type="checkbox" id="terms" className="cursor-pointer" {...register("terms", {
                                required: {
                                    value: true,
                                    message: "You need to accept terms and policies"
                                }
                            })} />
                            <label htmlFor="terms" className="text-sm">Keep me sign in </label>
                        </div>
                        <div className="mt-1">
                            <Link to={'/forgetPassword'}><button className="text-sm hover:underline">Forget Password?</button></Link>
                        </div>
                    </div>
                    <p className="text-red-500 text-sm">{errors.terms && errors.terms?.message}</p>
                </div>
                <button type="submit" className="py-2 text-center w-full outline outline-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white mt-8 rounded-md font-medium">Login</button>
            </form>
            <div className="mt-10">
                <div className="flex items-center gap-2">
                    <div className="h-[1px] flex-grow bg-gray-500"></div>
                    <p className="text-sm">or use one of these options</p>
                    <div className="h-[1px] flex-grow bg-gray-500"></div>
                </div>
                <div className="flex items-center justify-center mt-5">
                    <div className="flex gap-5">
                        <button className="text-3xl p-3 border rounded-xl hover:border-2 hover:border-blue-500 shadow-lg" onClick={handleGoogle}><FcGoogle /></button>
                        <button className="text-3xl p-3 border rounded-xl hover:border-2 hover:border-blue-500 shadow-lg" onClick={handleGithubLogin}><FaGithub /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;