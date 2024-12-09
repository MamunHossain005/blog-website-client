import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL: 'https://blog-website-server-chi.vercel.app',
    withCredentials: true
})

const useAxiosSecure = () => {
    const { logoutUser, MySwal } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, error => {
            if(error.response.status === 401 || error.response.status === 403){
                logoutUser()
                .then(() => {
                    navigate('/login');
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
        })
    }, [logoutUser, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;