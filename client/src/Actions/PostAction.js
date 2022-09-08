import { toast } from "react-toastify";
import * as PostsApi from "../Api/PostApi";
import * as sharedPostsApi from "../Api/SharedPostApi";
export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostsApi.getTimelinePosts(id);

    dispatch({ type: "RETREIVING_SUCCESS", data: { posts: data, isTrend: false } });
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
};
export const likePost = (id, userId) => async (dispatch) => {
  try {
    await PostsApi.likePost(id, userId)
  } catch (error) {
    var errMsg
    if (error.response.data.message)
      errMsg = error.response.data.message
    else
      errMsg = error.response.data
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
export const deletePost = (postId, userId) => async (dispatch) => {
  try {
    await PostsApi.deletePost(postId, userId)
    dispatch({ type: "DELETE_SUCCESS", postId: postId })
  } catch (error) {
    var errMsg
    if (error.response.data.message)
      errMsg = error.response.data.message
    else
      errMsg = error.response.data
    toast.error(error.response.data, {
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
export const updatePost = (postId, updatedPost) => async (dispatch) => {
  dispatch({ type: "UPDATE_POST_START" })
  try {
    const { data } = await PostsApi.updatePost(postId, updatedPost)
    dispatch({ type: "UPDATE_POST_SUCCESS", data: { updatedPost: data, updatePostId: postId } })
  } catch (error) {
    var errMsg
    if (error.response.data.message)
      errMsg = error.response.data.message
    else
      errMsg = error.response.data
    toast.error(errMsg, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    dispatch({ type: "UPDATE_POST_FAIL" })
  }
}

export const getPost = (postId) => async (dispatch) => {
  dispatch({ type: "GET_POST_START" })
  try {
    const { data } = await PostsApi.getPost(postId)
    dispatch({ type: "GET_POST_SUCCESS", data: data })
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

    dispatch({ type: "UPDATE_POST_FAIL" })
  }

}

export const sharePost = (formdata) => async (dispatch) => {
  dispatch({ type: "UPLAOD_START" })
  try {
    const { data } = await sharedPostsApi.sharePost(formdata)
    dispatch({ type: "UPLAOD_SUCCESS", data: data })
    toast.success('Post shared succesfully ', {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

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
    dispatch({ type: "UPLAOD_ERROR" })
  }
}

