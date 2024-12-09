import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import moment from 'moment';
import axios from 'axios';
import { Helmet } from "react-helmet-async";

const AddBlog = () => {
    const { user, MySwal } = useAuth();

    const form = useForm({
        defaultValues: {
            title: "",
            image: "",
            short_description: "",
            long_description: "",
            category: "",
        }
    });

    const { register, handleSubmit, formState, reset } = form;
    const { errors, isSubmitSuccessful } = formState;

    const onSubmitForm = data => {
        const {title, image, short_description, long_description, category} = data;

        const newBlog = {title, image, short_description, long_description, category, blogger_name: user?.displayName, blogger_email: user?.email, date: moment(new Date()).format(`YYYY-M-D`), blogger_img: user?.photoURL};

        axios.post('/blogs', newBlog)
        .then(res => {
            if(res.data.insertedId){
                MySwal.fire({
                    icon: 'success',
                    title: "Success",
                    text: 'Blog added successfully',
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok"
                })
            }
            else {
                MySwal.fire({
                    icon: 'error',
                    title: "Error",
                    text: "Blog is not added",
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

    return (
        <div className="mt-28 bg-stone-100 max-w-4xl mx-auto rounded-lg shadow-lg px-10 py-20">
            <Helmet>
                <title>Bloggy | Add Blog</title>
            </Helmet>
            <h1 className="text-center text-3xl font-bold mb-10">Add New Blog</h1>
            <form onSubmit={handleSubmit(onSubmitForm)} noValidate className="max-w-2xl mx-auto">
                <div>
                    <label htmlFor="title" className="text-lg font-medium text-gray-600">Title<sup>*</sup></label>
                    <input type="text" id="title" className="border border-gray-300 outline-none block w-full rounded-md mt-1 text-gray-600" {...register('title', {
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
                    <input type="text" id="image" className="border border-gray-300 outline-none block w-full rounded-md mt-1 text-gray-600" {...register('image', {
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
                    <textarea id="shortDes" className="border border-gray-300 outline-none block w-full rounded-md mt-1 text-gray-600 h-20" {...register('short_description', {
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
                    <textarea id="longDes" className="border border-gray-300 outline-none block w-full rounded-md mt-1 text-gray-600 h-52" {...register('long_description', {
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
                    <select id="category" defaultValue={'Education'} className="text-gray-600 ml-4 border-2 border-gray-300 rounded-md" {...register('category', {
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
                <button type="submit" className="mt-10 bg-blue-600 text-white w-full py-3 font-bold rounded-xl text-center hover:bg-white hover:text-blue-600 hover:border-2 hover:border-blue-600">Submit</button>
            </form>
        </div>
    );
};

export default AddBlog;