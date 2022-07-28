import { toast } from "react-toastify";
import * as PostsApi from "../Api/PostApi";
export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostsApi.getTimelinePosts(id);
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    var errMsg
    if (error.response.data.message) 
        errMsg=error.response.data.message
    else
        errMsg=error.response.data
    toast.error(errMsg, {
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
};
export const likePost=(id,userId)=>async (dispatch)=>{
  try {
    await PostsApi.likePost(id,userId)
  } catch (error) {
    var errMsg
        if (error.response.data.message) 
            errMsg=error.response.data.message
        else
            errMsg=error.response.data
        toast.error(errMsg, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
  }
}
export const deletePost=(postId,userId)=>async (dispatch)=>{
  try {
    await PostsApi.deletePost(postId,userId)
    dispatch({type:"DELETE_SUCCESS",postId:postId})
  } catch (error) {
    var errMsg
    if (error.response.data.message) 
        errMsg=error.response.data.message
    else
        errMsg=error.response.data
    toast.error(errMsg, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
  }
}
export const updatePost=(postId,updatedPost)=>async (dispatch)=>{
  try {
    await PostsApi.updatePost(postId,updatedPost)
    dispatch({type:"UPDATE_POST_SUCCESS",data:{updatedPost:updatedPost,updatePostId:postId}})
  } catch (error) {
    var errMsg
        if (error.response.data.message) 
            errMsg=error.response.data.message
        else
            errMsg=error.response.data
        toast.error(errMsg, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
  }
}