import  * as CommentApi from '../Api/CommentApi'
export const  addComment=(formdata)=>async (dispatch)=>{
    dispatch({type:"ADD_COMMENT_START"})
    try {
        const {data}=await CommentApi.addComment(formdata)
        dispatch({type:"ADD_COMMENT_SUCCESS",data:data})
    } catch (error) {
        dispatch({type:"ADD_COMMENT_FAIL"})
    }
}