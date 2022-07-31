const postReducer=(state={posts:[],loading:false,error:null,uploading:false},action)=>{
    switch (action.type) {
        case "UPLAOD_START":
                return {...state,uploading:true,error:null}
            break;
        case "UPLAOD_SUCCESS":
             state.posts.unshift(action.data)
             return {...state,uploading:false,error:null}
             break;
        case "UPLAOD_ERROR":
            return {...state,uploading:false,error:true}
        break;
        // belongs to Posts.jsx
        case "RETREIVING_START":
            return { ...state, loading: true, error: false };
        break
        case "RETREIVING_SUCCESS":
            return { ...state, posts:action.data,loading:false,error:false};
            break
        break
        case "RETREIVING_FAIL":
            return { ...state, loading: false, error: true };
        break
        case 'DELETE_SUCCESS':
            const {postId}=action
            
            for (const post of state.posts) {
                if (post._id===postId) {
                    
                    state.posts.splice(state.posts.indexOf(post),1)
                }
            }
            
            return {...state,posts:state.posts}
        break
        case "UPDATE_POST_SUCCESS":
            const {updatePostId}=action.data
            const {updatedPost}=action.data
            const updatedPosts=state.posts.map((post)=>{
                if (post._id===updatePostId) {
                    post=updatedPost
                }
                return post
            })
            return {...state,posts:updatedPosts}
        break
        
        default:
            return {...state,error:false};
        break;
    }
}
export default postReducer