import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { IoMenu } from "react-icons/io5";
import { useContext, useState } from "react";
import { motion } from "motion/react";
import AuthContext from "../../../contexts/AuthContext";

const fadeLeft = {
    hidden: {
        x: -100,
        opacity: 0,
    },
    show: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.4,
            delay: 0.3
        }
    }
}

const Navbar = () => {
    const [showNav, setShowNav] = useState(false);
    const { user, logoutUser, MySwal } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser()
        .then(() => {
            MySwal.fire({
                icon: 'success',
                title: "Success",
                text: 'You are logged out successfully',
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok"
            })
                .then(() => {
                    navigate('/login');
                })
        })
    }

    const links = <>
        <NavLink to={'/'} className="text-gray-500 dark:text-gray-800"><li>Home</li></NavLink>
        <NavLink to={'/allBlogs'} className="text-gray-500 dark:text-gray-800"><li>All Blogs</li></NavLink>
        <NavLink to={'/featuredBlogs'} className="text-gray-500 dark:text-gray-800"><li>Featured Blogs</li></NavLink>
        { (user?.emailVerified || user?.providerData[0]?.providerId == "github.com") && <>
            <NavLink to={'/addBlog'} className="text-gray-500 dark:text-gray-800">Add Blog</NavLink>
            <NavLink to={'/wishlist'} className="text-gray-500 dark:text-gray-800">Wishlist</NavLink>
        </>}
    </>
    return (
        <nav className="flex p-5 items-center justify-between bg-sky-100 fixed top-0 max-w-7xl w-full z-50">
            <NavLink to={'/'}>
                <div className="flex items-center gap-2">
                    <button className="text-3xl p-1 hover:border-2 rounded-lg border-[#6A1E55] transition-all duration-75 lg:hidden" onClick={() => setShowNav(!showNav)}><IoMenu /></button>
                    <img src={'./Bloggy.png'} alt="" className="w-10" />
                    <h1 className="text-3xl font-bold font-logo">Bloggy</h1>
                </div>
            </NavLink>
            <div className="hidden lg:block">
                <ul className="flex gap-6 text-lg links">
                    {links}
                </ul>
            </div>
            <div className="md:text-lg">
                {(user?.emailVerified || user?.providerData[0]?.providerId === 'github.com') ? 
                <div className="flex gap-2 items-center">
                    <div className="p-[2px] rounded-full outline-violet-800 outline">
                        <img src={user?.photoURL || '/user.png'} alt="" className="w-10 rounded-full"/>
                    </div>
                    <button className="btn-primary-blog" onClick={handleLogout}>Logout</button>
                </div> : 
                <div className="space-x-2">
                    <Link to={'/login'}><button className="btn-primary-blog">Login</button></Link>
                    <Link to={'/register'}><button className="btn-secondary-blog">Register</button></Link>
                </div>}
            </div>
            <motion.div
                variants={fadeLeft}
                initial={'hidden'}
                animate={showNav ? 'show' : 'hidden'}
                className="absolute bg-sky-100 top-[100%] left-0 ps-5 pe-10 py-4 rounded-br-lg lg:hidden">
                <ul className="flex flex-col gap-6 text-lg links">
                    {links}
                </ul>
            </motion.div>
        </nav>
    );
};

export default Navbar;