import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { Helmet } from "react-helmet-async";

const ForgetPassword = () => {
    const { passwordReset, MySwal } = useContext(AuthContext);
    const navigate = useNavigate();

    const form = useForm({
        defaultValues: {
            email: "",
        },
    });

    const { register, handleSubmit, formState, reset } = form;
    const { errors, isSubmitSuccessful } = formState;

    const onSubmitForm = data => {
        const { email } = data;

        passwordReset(email)
        .then(() => {
            MySwal.fire({
                icon: 'success',
                title: "Success",
                text: 'Password reset email was sent successfully',
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok"
            })
                .then(() => {
                    navigate('/login');
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
        <div className="my-32 max-w-xl mx-auto p-8 shadow-lg rounded-lg">
            <Helmet>
                <title>Bloggy | Forget</title>
            </Helmet>
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Forget Password</h1>
                <p className="text-blue-700 text-sm">
                    <Link to={"/login"}>
                        <span className="text font-medium hover:text-purple-600 hover:font-bold hover:underline">
                            Back to Login
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
                <p className="text-sm mt-6">Do not forget to check SPAM box</p>
                <button type="submit" className="py-2 text-center w-full outline outline-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white mt-3 rounded-md font-medium">Send Password Reset Email</button>
            </form>
        </div>
    );
};

export default ForgetPassword;