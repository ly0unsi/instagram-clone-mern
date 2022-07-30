export const CommentReducer=(state={comments:[],loading:false,error:false},action)=>{
    switch(action.type){
        case "GET_COMMENTS_SUCCESS":
            return {state,comments:action.data}
            break
        case "ADD_COMMENT_SUCCESS":
            return {...state,comments:[...state.comments,action.data]}
            break;
            default:
                return {...state,error:false};
                break;
            case "DELETE_COMMENT_SUCCESS":
                for(const comment of state.comments){
                    if (comment._id===action.commentId){
                        state.comments.splice(state.comments.indexOf(comment),1)
                    }
                }
    }
   
       
}
    