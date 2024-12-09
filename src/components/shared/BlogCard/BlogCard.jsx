import moment from 'moment';
import { FaUser } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { motion } from 'motion/react';
import { PhotoView } from 'react-photo-view';
import { useContext } from 'react';
import AuthContext from '../../../contexts/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';


const fadeUp = delay => {
    const variants = {
        hidden: {
            y: 100,
            opacity: 0
        },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.4,
                delay: delay,
                ease: "easeOut"
            }
        }
    }

    return variants;
}

const BlogCard = ({ blog, idx, component, setLoadedData, loadedData }) => {
    const { user, MySwal } = useContext(AuthContext);

    const { _id, title, image, short_description, category, date, blogger_name } = blog;

    let id = null;
    if(component === 'home'){
        id = _id;
    }
    else {
        id = blog?.blogId;
    }

    const handleWishlist = () => {
        const dateObj = new Date();
        const wishlistDate = moment(dateObj).format('YYYY-M-D');
        const email = user.email;

        const wishlistInfo = { title, image, short_description, category, date, blogger_name, email, wishlistDate, blogId: _id };

        axios.post('/wishlistBlogs', wishlistInfo)
            .then(res => {
                if (res.data.message) {
                    MySwal.fire({
                        icon: 'error',
                        title: "Error",
                        text: res.data.message,
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "Ok"
                    })
                }
                else {
                    if (res.data.insertedId) {
                        MySwal.fire({
                            icon: 'success',
                            title: "Success",
                            text: 'Blog is added in wishlist successfully',
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "Ok"
                        })
                    }
                    else {
                        MySwal.fire({
                            icon: 'error',
                            title: "Error",
                            text: 'Blog is not added in wishlist',
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "Ok"
                        })
                    }
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

    const handleDelete = id => {
        MySwal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/wishlistBlogs/${id}`)
                    .then(res => {
                        const copyData = [...loadedData];
                        const newData = copyData.filter(blog => blog._id !== id);
                        setLoadedData(newData);
                        
                        if (res.data.deletedCount > 0) {
                            MySwal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <motion.div
            variants={fadeUp(parseFloat('0.' + (idx + 1)))}
            initial="hidden"
            whileInView="show"
            whileHover={{
                scale: 1.1,
                transition: {
                    duration: 0.3,
                    delay: 0.1,
                    ease: "easeOut",
                }
            }}
            className="px-5 pt-10 pb-36 shadow-lg rounded-lg space-y-5 relative bg-gray-100 hover:z-40">
            <p className='px-5 py-2 bg-orange-50 text-violet-600 w-fit rounded-2xl'>{category}</p>
            <div className='overflow-hidden rounded-lg'>
                <PhotoView src={image}>
                    <img src={image} alt="" className="rounded-lg h-[250px] w-full object-cover hover:scale-125 transition-all duration-200" />
                </PhotoView>
            </div>
            <h2 className='text-xl font-bold text-gray-800'>{title}</h2>
            <p className='text-gray-600'>{short_description}</p>
            <div className="absolute bottom-8">
                <div className='flex gap-10'>
                    <div className='flex items-center gap-1'>
                        <FaUser className='fill-blue-500' />
                        <p className='text-gray-600 text-sm'>{blogger_name}</p>
                    </div>
                    <div className='flex items-center gap-1'>
                        <MdDateRange className='text-lg fill-blue-600' />
                        <p className='text-gray-600 text-sm'>{moment(date).format('MMM D, YYYY')}</p>
                    </div>
                </div>
                <div className='flex gap-2 mt-8'>
                    <Link to={`/blogs/${id}`}><button className='bg-sky-800 px-5 py-2 text-white rounded-lg hover:bg-white hover:text-sky-800 hover:outline hover:outline-sky-800 hover:font-bold'>Details</button></Link>
                    {component === "home" ? <button className='bg-sky-800 px-5 py-2 text-white rounded-lg hover:bg-white hover:text-sky-800 hover:outline hover:outline-sky-800 hover:font-bold' onClick={handleWishlist}>Wishlist</button> : <button className='bg-red-800 px-5 py-2 text-white rounded-lg hover:bg-white hover:text-red-800 hover:outline hover:outline-red-800 hover:font-bold' onClick={() => handleDelete(_id)}>Remove</button>}
                </div>
            </div>
        </motion.div>
    );
};

export default BlogCard;