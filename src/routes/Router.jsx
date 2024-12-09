import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root/Root";
import Home from "../pages/Home/Home";
import AddBlog from "../pages/AddBlog/AddBlog";
import AllBlogs from "../pages/AllBlogs/AllBlogs";
import FeaturedBlogs from "../pages/FeaturedBlogs/FeaturedBlogs";
import Wishlist from "../pages/Wishlist/Wishlist";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Register from "../pages/Register/Register";
import ConfirmationEmail from "../pages/ConfirmationEmail/ConfirmationEmail";
import Login from "../pages/Login/Login";
import ForgetPassword from "../pages/ForgerPassword/ForgetPassword";
import PrivateRoute from "./PrivateRoute";
import BlogDetails from "../pages/BlogDetails/BlogDetails";
import UpdateBlog from "../pages/UpdateBlog/UpdateBlog";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/addBlog',
                element: <PrivateRoute><AddBlog></AddBlog></PrivateRoute>
            },
            {
                path: '/allBlogs',
                element: <AllBlogs></AllBlogs>
            },
            {
                path: '/featuredBlogs',
                element: <FeaturedBlogs></FeaturedBlogs>
            },
            {
                path: '/wishlist',
                element: <PrivateRoute><Wishlist></Wishlist></PrivateRoute>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/confirmEmail',
                element: <ConfirmationEmail></ConfirmationEmail>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/forgetPassword',
                element: <ForgetPassword></ForgetPassword>
            },
            {
                path: '/blogs/:id',
                element: <PrivateRoute><BlogDetails></BlogDetails></PrivateRoute>
            },
            {
                path: '/updateBlog/:id',
                element: <PrivateRoute><UpdateBlog></UpdateBlog></PrivateRoute>,
            }
        ]
    }
]);

export default router;