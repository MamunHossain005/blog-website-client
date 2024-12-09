import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

const Newsletter = () => {
    const { MySwal } = useAuth();

    const form = useForm({
        defaultValues: {
            email: "",
        }
    });

    const { register, handleSubmit, formState, reset } = form;
    const { errors, isSubmitSuccessful } = formState;

    const onSubmitNewsletter = data => {
        if(data.email){
            MySwal.fire({
                icon: 'success',
                title: "Success",
                text: 'Thank you for subscribing to our newsletter',
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok"
            })
        }
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <div className="bg-gray-100 my-20 p-10">
            <div className="grid grid-cols-2 gap-10 p-10 bg-white rounded-lg">
                <div>
                    <h2 className="text-3xl font-medium">Subscribe to Newsletter</h2>
                    <p className="text-gray-600 mt-3">Provide your email to get email notification when we launch new products or publish new articles</p>
                </div>
                <div className="flex items-center">
                    <div className="w-full">
                        <form onSubmit={handleSubmit(onSubmitNewsletter)} noValidate className="flex">
                            <input type="email" id="email" placeholder="Enter your Email" className="flex-grow border-r-0 rounded-s-lg py-3" {...register('email', {
                                required: {
                                    value: true,
                                    message: "Email address is required"
                                },
                                pattern: {
                                    value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                                    message: "Invalid email address"
                                }
                            })}/>
                            <button type="submit" className="px-5 bg-sky-600  text-white font-medium rounded-e-lg hover:text-sky-600 hover:border-2 hover:border-sky-600 hover:bg-white">Subscribe</button>
                        </form>
                        <p className="text-sm text-red-600 mt-1">{errors?.email?.message}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;