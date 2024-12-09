import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BlogCard from "../../components/shared/BlogCard/BlogCard";
import CardSkeleton from "../../components/shared/CardSkeleton/CardSkeleton";
import { useState } from "react";
import './AllBlogs.css'
import { Helmet } from "react-helmet-async";

const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [category, setCategory] = useState('All');
    const [title, setTitle] = useState("");

    const { isPending, error, data } = useQuery({
        queryKey: ['blogs', currentPage, itemsPerPage, category, title],
        queryFn: async () => {
            const res = await axios.get('/paginationBlogs', {
                params: { page: currentPage, limit: itemsPerPage, category,  title }
            });
            setBlogs(res?.data?.blogs);
            setTotalPages(res?.data?.totalPages);
            return res.data;
        }
    });

    if (isPending) {
        return (
            <div className="mt-36">
                <CardSkeleton cards={6}></CardSkeleton>
            </div>
        );
    }

    if (error) {
        return <h1 className="text-3xl text-center mt-28 font-bold text-red-500">Error: {error.message}</h1>
    }


    const pages = [...Array(totalPages).keys()];

    const handleItemsPerPage = e => {
        const val = parseInt(e.target.value)
        setItemsPerPage(val);
        setCurrentPage(1);
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <div className="mt-28">
            <Helmet>
                <title>Bloggy | All Blogs</title>
            </Helmet>
            <h1 className="text-center text-3xl font-bold mb-10">All Blogs</h1>
            <div className="mb-10 grid grid-cols-2 px-10">
                <div>
                    <label htmlFor="category" className="text-lg font-bold">Browse By Category</label>
                    <select name="category" id="category" className="ms-3 rounded-lg text-gray-700 border-gray-500 border-2" defaultValue={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="All">All</option>
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
                        <option value="Environment">Environment</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div className="flex items-center ">
                    <input type="text" name="title" id="title" className="flex-grow rounded-lg border-2 border-gray-500 focus:border-0" defaultValue={title}  onChange={(e) => setTitle(e.target.value)} placeholder="Search by Title"/>
                </div>
            </div>
            <div className={`grid ${blogs.length > 0 && 'grid-cols-3'} gap-8`}>
                {
                    blogs.length === 0 ? 
                    <p className="text-center text-xl font-medium text-red-600">Blogs of that search type are not available</p>:
                    blogs.map((blog, idx) => (
                        <BlogCard key={idx} blog={blog} idx={idx} component={'home'}></BlogCard>
                    )) 
                }
            </div>
            <div className='pagination'>
                <button onClick={handlePrevPage} className="text-xl bg-blue-600 hover:bg-blue-800 text-white">Prev</button>
                {pages.map((page) => <button className={currentPage === (page + 1) ? 'selected' : undefined} onClick={() => setCurrentPage(page + 1)} key={page}>{page + 1}</button>)}
                <button onClick={handleNextPage} className="text-xl bg-blue-600 hover:bg-blue-800 text-white">Next</button>
                <select value={itemsPerPage} onChange={handleItemsPerPage} name="" id="" className="rounded-lg">
                    <option value="6">6</option>
                    <option value="12">12</option>
                    <option value="24">24</option>
                    <option value="50">50</option>
                </select>
            </div>
        </div>
    );
};

export default AllBlogs;