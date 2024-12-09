import axios from "axios";

//all blogs
const getBlogs = async () => {
    const res = await axios.get('/blogs');
    return res.data;
}

export { getBlogs };