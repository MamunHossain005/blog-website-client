import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import AuthContext from "../contexts/AuthContext";
import axios from 'axios';


const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dark, setDark] = useState(false);

    const MySwal = withReactContent(Swal);


    //register user
    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //login user
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    //logout user
    const logoutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    //password reset
    const passwordReset = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    }

    //google login
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    //github login
    const githubLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider);
    }

    //auth state
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = { userEmail };

            setUser(currentUser);
            setLoading(false);

            if(currentUser) {
                axios.post('/jwt', loggedUser, {withCredentials: true})
                .then(res => {
                    // console.log(res.data);
                })
            }
            else {
                axios.post('/logout', loggedUser, {withCredentials: true})
                .then(res => {
                    // console.log(res.data);
                })
            }
        });

        return () => unSubscribe();
    }, []);

    const authInfo = { user, loading, dark, setDark, MySwal, registerUser, loginUser, logoutUser, passwordReset, googleLogin, githubLogin };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
}

export default AuthProvider;