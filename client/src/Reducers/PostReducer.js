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
         // belongs to Posts.jsx
            case "RETREIVING_START":
                return { ...state, loading: true, error: false };
            case "RETREIVING_SUCCESS":
                return { ...state, posts: action.data, loading: false, error: false };
            case "RETREIVING_FAIL":
                return { ...state, loading: false, error: true };
        default:
            return {...state,error:false};
            break;
    }
}
export default postReducer