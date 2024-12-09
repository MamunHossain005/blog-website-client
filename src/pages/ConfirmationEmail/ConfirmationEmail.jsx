import Lottie from "lottie-react";
import emailAnimation from "./email.json"
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { sendEmailVerification } from "firebase/auth";
import { Helmet } from "react-helmet-async";

const ConfirmationEmail = () => {
    const { user, MySwal } = useContext(AuthContext);

    const handleConfirmEmail = () => {
        sendEmailVerification(user)
            .then(() => {
                MySwal.fire({
                    icon: 'success',
                    title: "Success",
                    text: 'Confirmation email was sent.',
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok"
                })
            })
    }
    return (
        <div className="max-w-xl mx-auto shadow-xl mt-10 mb-20 px-2 pb-2 rounded-lg">
            <Helmet>
                <title>Bloggy | Confirmation Email</title>
            </Helmet>
            <Lottie animationData={emailAnimation} style={{ height: '100vh' }}></Lottie>
            <p className="mb-5 text-center max-w-lg text-xl mx-auto">We have sent email to <span className="text-blue-700">{user?.email}</span> to confirm the validity of your email address.</p>
            <hr />
            <p className="text-center mt-3 mb-20 max-w-lg text-lg mx-auto">If you not got any email <span className="text-blue-700 cursor-pointer" onClick={handleConfirmEmail}>Resend confirmation mail</span>.</p>
        </div>
    );
};

export default ConfirmationEmail;