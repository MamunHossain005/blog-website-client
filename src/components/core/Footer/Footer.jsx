import moment from "moment";
import { motion } from "motion/react";
import { useState } from "react";
import { FaFacebookF } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";

const Footer = () => {
    const [isPrivacy, setIsPrivacy] = useState(false);
    const [isTerms, setIsTerms] = useState(false);
    const [isContact, setIsContact] = useState(false);
    const [isContribute, setIsContribute] = useState(false);

    return (
        <footer className="p-10 mt-20 bg-sky-50 flex items-center justify-between">
            <div>
                <p className="text-gray-600">&copy;{moment(new Date()).format('YYYY')} Bloggy. All rights reserved</p>
            </div>
            <div>
                <ul className="flex items-center gap-3 text-gray-600">
                    <li>
                        <div>
                            <p onMouseEnter={() => setIsPrivacy(true)}
                                onMouseLeave={() => setIsPrivacy(false)} className="cursor-pointer">Privacy</p>
                            <motion.div
                                initial={{ x: -10, opacity: 0 }}
                                animate={isPrivacy ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
                                transition={{ duration: 0.4, delay: 0.2, ease: 'easeInOut' }}
                                className="w-full h-[2px] bg-black"></motion.div>
                        </div>
                    </li>
                    <li className="pb-1 font-bold text-lg">.</li>
                    <li>
                        <div>
                            <p onMouseEnter={() => setIsTerms(true)}
                                onMouseLeave={() => setIsTerms(false)} className="cursor-pointer">Terms</p>
                            <motion.div
                                initial={{ x: -10, opacity: 0 }}
                                animate={isTerms ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
                                transition={{ duration: 0.4, delay: 0.2, ease: 'easeInOut' }}
                                className="w-full h-[2px] bg-black"></motion.div>
                        </div>
                    </li>
                    <li className="pb-1 font-bold text-lg">.</li>
                    <li>
                    <div>
                            <p onMouseEnter={() => setIsContact(true)}
                                onMouseLeave={() => setIsContact(false)}
                                className="cursor-pointer">Contact</p>
                            <motion.div
                                initial={{ x: -10, opacity: 0 }}
                                animate={isContact ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
                                transition={{ duration: 0.4, delay: 0.2, ease: 'easeInOut' }}
                                className="w-full h-[2px] bg-black"></motion.div>
                        </div>
                    </li>
                    <li className="pb-1 font-bold text-lg">.</li>
                    <li>
                    <div>
                            <p onMouseEnter={() => setIsContribute(true)}
                                onMouseLeave={() => setIsContribute(false)}
                                className="cursor-pointer">Contribute</p>
                            <motion.div
                                initial={{ x: -10, opacity: 0 }}
                                animate={isContribute ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
                                transition={{ duration: 0.4, delay: 0.2, ease: 'easeInOut' }}
                                className="w-full h-[2px] bg-black"></motion.div>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="flex items-center gap-4">
                <p>Follow Us:</p>
                <FaFacebookF className="text-gray-600"/>
                <FaXTwitter className="text-gray-600"/>
                <FaLinkedinIn className="text-gray-600"/>
            </div>
        </footer>
    );
};

export default Footer;