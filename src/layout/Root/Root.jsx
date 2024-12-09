import { Outlet } from "react-router-dom";
import Navbar from "../../components/core/Navbar/Navbar";
import { FaMoon } from "react-icons/fa";
import { FaRegMoon } from "react-icons/fa";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Tooltip } from 'react-tooltip';
import Footer from "../../components/core/Footer/Footer";

const Root = () => {
    const { dark, setDark } = useContext(AuthContext);

    return (
        <div className={`max-w-7xl mx-auto font-primary ${dark && 'dark'} `}>
            <div className="dark:bg-[#0b1121]">
                <Navbar></Navbar>
                <Outlet></Outlet>
                <button onClick={() => setDark(!dark)} className=" bg-emerald-100 p-4 text-xl rounded-full fixed bottom-10 right-10 border-2 border-dotted border-indigo-500 hover:border-4 transition-all duration-100" id="anchor-element">{dark ? <FaRegMoon /> : <FaMoon />}</button>
                <Tooltip anchorSelect="#anchor-element" content={`${dark ? 'Light' : 'Dark'}`} style={{ backgroundColor: "#6A1E55", color: "white" }}></Tooltip>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Root;