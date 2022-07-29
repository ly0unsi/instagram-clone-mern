const CommentReducer=(state={comments:[],loading,error},action)=>{
    switch(action.type){
        case "GET_COMMENTS_SUCCESS":
             return {...state,comments:[...state.comments,action.data]}
             break
            case "ADD_COMMENT_SUCCESS":
                return {...state,comments:[...state.comments,action.data]}
                break;
            default:
                return {...state,error:false};
                break;

    }
   
       
}
export  default CommentReducer