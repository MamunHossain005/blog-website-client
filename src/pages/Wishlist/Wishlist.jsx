import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import CardSkeleton from '../../components/shared/CardSkeleton/CardSkeleton';
import BlogCard from '../../components/shared/BlogCard/BlogCard';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const Wishlist = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();


    const { isPending, error, data } = useQuery({
        queryKey: ['wishlist'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/wishlistBlogs?user=${user?.email}`);
            return res.data;
        }
    });

    const [loadedData, setLoadedData] = useState([]);

    useEffect(() => {
        if (data) {
            setLoadedData(data);
        }
    }, [data]);

    if (error) {
        return <h1 className="text-3xl text-center mt-28 font-bold text-red-500">Error: {error.message}</h1>
    }

    if (isPending) {
        return (
            <div className='mt-36'>
                <h1 className='text-3xl font-bold text-center'><span className='text-blue-600'>{user?.displayName}</span>&apos;s Wishlist Blogs</h1>
                <div className='mt-8'>
                    <CardSkeleton cards={6}></CardSkeleton>
                </div>
            </div>
        );
    }

    return (
        <div className='mt-36'>
            <Helmet>
                <title>Bloggy | Wishlist</title>
            </Helmet>
            <h1 className='text-3xl font-bold text-center'><span className='text-blue-600'>{user?.displayName}</span>&apos;s Wishlist Blogs</h1>
            <div className='mt-8'>
                <div className='grid grid-cols-3 gap-5'>
                    {loadedData.map((blog, idx) => <BlogCard blog={blog} key={blog._id} idx={idx} setLoadedData={setLoadedData} loadedData={loadedData}></BlogCard>)}
                </div>
            </div>
        </div>
    );


};

export default Wishlist;