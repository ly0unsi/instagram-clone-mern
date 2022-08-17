export const CommentReducer=(state={comments:[],cloading:false,error:false},action)=>{
    switch(action.type){
        case "GET_COMMENTS_START":
            return {...state,cloading:true}
            break
        case "GET_COMMENTS_SUCCESS":
            return {state,comments:action.data,cloading:false}
            break
        case "ADD_COMMENT_SUCCESS":
            return {...state,comments:[...state.comments,action.data]}
            break;
        case "DELETE_COMMENT_SUCCESS":
            for(const comment of state.comments){
                if (comment._id===action.commentId){
                    state.comments.splice(state.comments.indexOf(comment),1)
                }
            }
            break
        case "EDIT_COMMENT_SUCCESS":
            const {commentId,body}=action.data
            for(const comment of state.comments){
                if (comment._id === commentId) {
                    comment.body=body
                }
            }
            return state
            break
        default:
            return {...state,error:false,cloading:false}
    }
   
       
}
    