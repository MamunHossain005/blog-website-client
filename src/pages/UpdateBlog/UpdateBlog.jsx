import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import moment from 'moment';
import axios from 'axios';
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const UpdateBlog = () => {
    const { user, MySwal } = useAuth();
    const { id } = useParams();

    const {isPending, error, data:blogData } = useQuery({
        queryKey: ['blog', 'update'],
        queryFn: async() => {
            const res = await axios.get(`/blogs/${id}`);
            return res.data;
        }
    });

    const form = useForm({
        // defaultValues: {
        //     title: blogData?.title,
        //     image: blogData?.image,
        //     short_description: blogData?.short_description,
        //     long_description: blogData?.long_description,
        //     category: blogData?.category,
        // }
    });

    const { register, handleSubmit, formState, reset } = form;
    const { errors, isSubmitSuccessful } = formState;

    const onSubmitForm = data => {
        const {title, image, short_description, long_description, category} = data;

        const newBlog = {title, image, short_description, long_description, category, blogger_name: user?.displayName, blogger_email: user?.email, date: moment(new Date()).format(`YYYY-M-D`)};

        axios.put(`/blogs/${id}`, newBlog)
        .then(res => {
            if(res.data.modifiedCount > 0){
                MySwal.fire({
                    icon: 'success',
                    title: "Success",
                    text: 'Blog updated successfully',
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok"
                })
            }
            else {
                MySwal.fire({
                    icon: 'error',
                    title: "Error",
                    text: "Blog is not updated",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok"
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
        })
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);


    if(isPending){
        return (
            <div className="flex items-center justify-center h-screen">
                <div role="status">
                    <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <h1 className="text-3xl text-center mt-28 font-bold text-red-500">Error: {error.message}</h1>
    }

    if(blogData){
        return (
            <div className="mt-28 bg-stone-100 max-w-4xl mx-auto rounded-lg shadow-lg px-10 py-20">
                <Helmet>
                    <title>Bloggy | Update</title>
                </Helmet>
                <h1 className="text-center text-3xl font-bold mb-10">Update Blog</h1>
                <form onSubmit={handleSubmit(onSubmitForm)} noValidate className="max-w-2xl mx-auto">
                    <div>
                        <label htmlFor="title" className="text-lg font-medium text-gray-600">Title<sup>*</sup></label>
                        <input type="text" id="title" className="border border-gray-300 outline-none block w-full rounded-md mt-1 text-gray-600" defaultValue={blogData?.title}  {...register('title', {
                            required: {
                                value: true,
                                message: "Title is required"
                            },
                            minLength: {
                                value: 3,
                                message: "Title should be at least of 3 characters"
                            }
                        })} />
                        <p className="text-sm text-red-600 mt-1">{errors?.title?.message}</p>
                    </div>
                    <div className="mt-5">
                        <label htmlFor="image" className="text-lg font-medium text-gray-600">PhotoURL<sup>*</sup></label>
                        <input type="text" id="image" className="border border-gray-300 outline-none block w-full rounded-md mt-1 text-gray-600" defaultValue={blogData?.image} {...register('image', {
                            required: {
                                value: true,
                                message: "PhotoURl is required"
                            },
                            pattern: {
                                value: /^https?:\/\/.*\.(jpeg|jpg|gif|png|webp|bmp|svg)(\?.*)?$/i,
                                message: "Invalid photo url"
                            }
                        })} />
                        <p className="text-sm text-red-600 mt-1">{errors?.image?.message}</p>
                    </div>
                    <div className="mt-5">
                        <label htmlFor="shortDes" className="text-lg font-medium text-gray-600">Short Description<sup>*</sup></label>
                        <textarea id="shortDes" className="border border-gray-300 outline-none block w-full rounded-md mt-1 text-gray-600 h-20" defaultValue={blogData?.short_description} {...register('short_description', {
                            required: {
                                value: true,
                                message: "Short description is required"
                            },
                            minLength: {
                                value: 10,
                                message: "Short description should be at least of 10 characters"
                            }
                        })} />
                        <p className="text-sm text-red-600 mt-1">{errors?.short_description?.message}</p>
                    </div>
                    <div className="mt-5">
                        <label htmlFor="longDes" className="text-lg font-medium text-gray-600">Long Description<sup>*</sup></label>
                        <textarea id="longDes" className="border border-gray-300 outline-none block w-full rounded-md mt-1 text-gray-600 h-52" defaultValue={blogData?.long_description} {...register('long_description', {
                            required: {
                                value: true,
                                message: "Long description is required"
                            },
                            minLength: {
                                value: 100,
                                message: "Long description should be at least of 100 characters"
                            }
                        })} />
                        <p className="text-sm text-red-600 mt-1">{errors?.long_description?.message}</p>
                    </div>
                    <div className="mt-10">
                        <label htmlFor="category" className="text-lg font-medium text-gray-600">Category<sup>*</sup></label>
                        <select id="category" defaultValue={blogData?.category} className="text-gray-600 ml-4 border-2 border-gray-300 rounded-md" {...register('category', {
                            required: {
                                value: true,
                                message: 'Category is required'
                            }
                        })}>
                            <option value="Technology">Technology</option>
                            <option value="Health">Health</option>
                            <option value="Food">Food</option>
                            <option value="Travel">Travel</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Finance">Finance</option>
                            <option value="Crafts">Crafts</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Reviews">Reviews</option>
                            <option value="News">News</option>
                            <option value="Education">Education</option>
                            <option value="Photography">Photography</option>
                            <option value="Art">Art</option>
                            <option value="Science">Science</option>
                            <option value="History">History</option>
                            <option value="Pets">Pets</option>
                            <option value="Others">Others</option>
                        </select>
                        <p className="text-sm text-red-600 mt-1">{errors?.category?.message}</p>
                    </div>
                    <button type="submit" className="mt-10 bg-blue-600 text-white w-full py-3 font-bold rounded-xl text-center hover:bg-white hover:text-blue-600 hover:border-2 hover:border-blue-600">Update</button>
                </form>
            </div>
        );
    }
};

export default UpdateBlog;