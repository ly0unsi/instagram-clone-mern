import { toast } from 'react-toastify'
import  * as CommentApi from '../Api/CommentApi'
export const getPostComments=()=>async(dispatch)=>{
    dispatch({type:"GET_COMMENTS_START"})
    try {
      const {data}= await CommentApi.getPostComments()
      dispatch({type:"GET_COMMENTS_SUCCESS",data:data})
    } catch (error) {
      toast.error(error.response?.data, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        dispatch({type:"GET_COMMENTS_FAIL"})
    }
  }
export const  addComment=(formdata)=>async (dispatch)=>{
    dispatch({type:"ADD_COMMENT_START"})
    try {
        const {data}=await CommentApi.addComment(formdata)
        dispatch({type:"ADD_COMMENT_SUCCESS",data:data})
    } catch (error) {
        dispatch({type:"ADD_COMMENT_FAIL"})
    }
}

export const  deleteComment=(userId,commentId)=>async (dispatch)=>{
  try {
    await CommentApi.deleteComment(userId,commentId)
    dispatch ({type:"DELETE_COMMENT_SUCCESS",commentId:commentId})
  } catch (error) {
    toast.error(error.response?.data, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
      dispatch({type:"DELETE_COMMENTS_FAIL"})
  }

}

export const  editComment=(formdata,commentId)=>async (dispatch)=>{
  try {
    
        const {data}=  await CommentApi.editComment(formdata,commentId)
        dispatch({type:"EDIT_COMMENT_SUCCESS",data:{body:formdata.body,commentId:commentId}})
        
  } catch (error) {
    toast.error(error.response?.data, {
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