import { useQuery } from "@tanstack/react-query";
import { Carousel } from "flowbite-react";
import { getBlogs } from "../../../utilities/queryFunc";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import { motion } from "motion/react";

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
                ease: "easeInOut",
                delay: delay
            }
        }
    }

    return variants;
}

const Banner = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['blogs'],
        queryFn: getBlogs,
    })

    if (isPending) {
        return (
            <Skeleton className="h-56 sm:h-[300px] md:h-[350px] xl:h-[500px] 2xl:h-[600px]"></Skeleton>
        )
    }

    if (error) {
        return <h1 className="text-3xl text-center my-8 font-bold text-red-500">Error: {error.message}</h1>
    }

    return (
        <div className="h-56 sm:h-[300px] md:h-[350px] xl:h-[500px] 2xl:h-[600px]">
            <div className="h-56 sm:h-[300px] md:h-[350px] xl:h-[500px] 2xl:h-[600px]">
                <Carousel>
                    {data.slice(0, 5).map(blog => (
                        <div key={blog._id} className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white relative">
                            <img src={blog.image} alt="" className="w-full h-full object-cover brightness-[.6]" />
                            <div className="absolute text-white text-center">
                                <motion.p
                                variants={fadeUp(0.2)}
                                initial="hidden"
                                whileInView="show" 
                                className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold">{blog.title}</motion.p>
                                <motion.p
                                 variants={fadeUp(0.3)}
                                 initial="hidden"
                                 whileInView="show"
                                className="text-sm sm:text-base max-w-xs sm:max-w-sm md:max-w-lg lg:text-lg mt-3 lg:mt-5 text-gray-100 mx-auto">{blog.short_description}</motion.p>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default Banner;