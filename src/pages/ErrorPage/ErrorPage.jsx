import Lottie from "lottie-react";
import errorAnimation from './errorAnimation.json'
import { Helmet } from "react-helmet-async";

const ErrorPage = () => {
    return (
        <div>
            <Helmet>
                <title>Bloggy | Error</title>
            </Helmet>
           <Lottie animationData={errorAnimation} style={{height: '100vh'}}></Lottie> 
        </div>
    );
};

export default ErrorPage;