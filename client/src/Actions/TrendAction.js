import { toast } from "react-toastify";
import * as PostsApi from "../Api/TrendApi";

export const getTrendPosts = (id) => async (dispatch) => {
    dispatch({ type: "RETREIVING_START" });
    try {
        const { data } = await PostsApi.getTrendPosts(id);
        dispatch({ type: "RETREIVING_SUCCESS", data: { posts: data, isTrend: true } });
    } catch (error) {
        toast.error(error.response.data, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        dispatch({ type: "RETREIVING_FAIL" });
    }
}