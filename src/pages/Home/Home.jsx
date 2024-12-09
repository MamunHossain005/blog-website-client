import { Helmet } from "react-helmet-async";
import Banner from "../../components/shared/Carousel/Banner";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "../../utilities/queryFunc";
import CardSkeleton from "../../components/shared/CardSkeleton/CardSkeleton";
import BlogCard from "../../components/shared/BlogCard/BlogCard";
import Newsletter from "../../components/shared/Newsletter/Newsletter";


const Home = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['blogs'],
        queryFn: getBlogs
    })

    if (error) {
        return <h1 className="text-3xl text-center mt-28 font-bold text-red-500">Error: {error.message}</h1>
    }

    return (
        <div>
            <Helmet>
                <title>Bloggy | Home</title>
            </Helmet>
            <div className="mt-28 px-2 sm:px-5 lg:px-0">
                <Banner></Banner>
            </div>
            {/* recent blogs */}
            <section className="px-2 sm:px-5 lg:px-10 mt-10 md:mt-20">
                <h1 className="mb-8 text-center text-4xl font-bold">Recent Blogs</h1>
                <div>
                    {isPending ?
                        <CardSkeleton cards={6}></CardSkeleton>
                        : <div className="grid grid-cols-3 gap-5">
                            {data.map((blog, idx) => (
                                <BlogCard blog={blog} key={blog._id} idx={idx}component={'home'}></BlogCard>
                            ))}
                        </div>}
                </div>
            </section>
            {/* newsletter */}
            <section>
                <Newsletter></Newsletter>
            </section>
        </div>
    );
};

export default Home;