const postReducer=(state={posts:[],loading:false,error:null,uploading:false},action)=>{
    switch (action.type) {
        case "UPLAOD_START":
                return {...state,uploading:true,error:null}
            break;
        case "UPLAOD_SUCCESS":
             return {...state,posts:[action.data,...state.posts],uploading:false,error:null}
             break;
            case "UPLAOD_ERROR":
                return {...state,uploading:false,error:true}
            break;
        default:
            return {...state,error:false};
            break;
    }
}
export default postReducer