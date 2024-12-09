import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { BsCalendar2DateFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Skeleton from "react-loading-skeleton";
import { Helmet } from "react-helmet-async";

const BlogDetails = () => {
    const { user, MySwal } = useAuth();
    const { id } = useParams();
    const [loadedComments, setLoadedComments] = useState([]);


    const { isPending, error, data } = useQuery({
        queryKey: ['blog'],
        queryFn: async () => {
            const res = await axios.get(`/blogs/${id}`);
            return res.data;
        }
    });

    const { isPending: commentsIsPending, error: commentsError, data: commentsData } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            const res = await axios.get(`/comments/${id}`);
            return res.data;
        }
    });

    useEffect(() => {
        if(commentsData){
            setLoadedComments(commentsData);
        }
    }, [commentsData])

    const form = useForm({
        defaultValues: {
            comment: ""
        }
    })

    const { register, handleSubmit, formState, reset } = form;
    const { errors, isSubmitSuccessful } = formState;

    const onSubmitComment = SubmitData => {
        const { comment } = SubmitData;
        const commentInfo = { blog_id: id, userName: user?.displayName, profilePhoto: user?.photoURL, comment };

        const copyComments = [...loadedComments];
        const newComments = [...copyComments, commentInfo]
        setLoadedComments(newComments);

        axios.post('/comments', commentInfo)
            .then(res => {
                if (res.data.insertedId) {
                    MySwal.fire({
                        icon: 'success',
                        title: "Success",
                        text: 'Comment added successfully',
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

    if (isPending) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div role="status">
                    <svg aria-hidden="true" className="inline w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }

    if (error || commentsError) {
        return <h1 className="text-3xl text-center mt-28 font-bold text-red-500">Error: {error.message}</h1>
    }

    return (
        <div className="mt-28 px-5 md:px-10 lg:px-20">
            <Helmet>
                <title>Bloggy | Blog Details</title>
            </Helmet>
            <p className="text-indigo-600 bg-violet-50 px-5 py-1 rounded-xl w-fit mx-auto">{data?.category}</p>
            <h2 className="text-center text-4xl font-bold mt-5 max-w-lg mx-auto">{data?.title}</h2>
            <p className="text-center max-w-xl mx-auto mt-5 text-gray-600">{data?.short_description}</p>
            <div className="flex justify-center mt-5">
                <div className="flex gap-4 text-gray-700">
                    <div className="flex items-center gap-2">
                        <FaUserAlt className="fill-blue-600" />
                        <p>{data?.blogger_name}</p>
                    </div>
                    <p>|</p>
                    <div className="flex items-center gap-2">
                        <BsCalendar2DateFill className="fill-blue-600" />
                        <p>{moment(data?.date).format('MMM D, YYYY')}</p>
                    </div>
                </div>
            </div>
            <div className="my-10">
                <img src={data?.image} alt="" className="rounded-lg max-h-[450px] w-full object-cover" />
            </div>
            <p className="px-5 md:px-10 lg:px-20 mb-20 text-gray-700">{data?.long_description}</p>
            <div className="text-center">
                {
                   data?.blogger_email === user?.email && <Link to={`/updateBlog/${id}`}><button className="mb-10 px-10 py-2 rounded-lg font-bold border-2 text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">Update</button></Link>
                }
            </div>
            {
                (data?.blogger_email === user?.email) ? <p className="text-lg text-orange-400 px-5 md:px-10 lg:px-20 mb-10 font-medium">Can not comment on own blog</p> :
                    <form className="px-5 md:px-10 lg:px-20 mb-10" onSubmit={handleSubmit(onSubmitComment)} noValidate>
                        <textarea placeholder="Please comment here" className="w-full h-[200px] rounded-lg text-gray-700 border-2 bg-gray-50" {...register('comment', {
                            required: {
                                value: true,
                                message: "Comment is required"
                            }
                        })}></textarea>
                        <p className="mt-1 text-sm text-red-600">{errors?.comment?.message}</p>
                        <div className="mt-2 text-center">
                            <button type="submit" className="border-2 border-blue-600 px-8 py-2 rounded-lg text-blue-700 font-bold hover:bg-blue-600 hover:text-white">Send</button>
                        </div>
                    </form>
            }
            <div className="px-5 md:px-10 lg:px-20">
                <h1 className="text-lg font-medium underline underline-offset-4 mb-5">Comments</h1>
                {
                    commentsIsPending ?
                        Array(3).fill(0).map((_, idx) => (
                            <div key={idx} className="flex items-center gap-2 mb-3">
                                <Skeleton circle width={50} height={50}></Skeleton>
                                <Skeleton width={500} height={40}></Skeleton>
                            </div>
                        ))
                        :
                        <div className="space-y-4">
                            {
                                loadedComments.map(comment => (
                                    <div key={comment._id} className="flex items-center gap-4">
                                       <img src={comment.profilePhoto} alt="" className="w-14 h-14 object-cover rounded-full"/>
                                       <div>
                                            <h4 className="font-bold">{comment.userName}</h4>
                                            <p>{comment.comment}</p>
                                        </div> 
                                    </div>
                                ))
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default BlogDetails;