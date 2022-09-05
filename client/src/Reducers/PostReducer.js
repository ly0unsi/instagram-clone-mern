const postReducer = (state = { posts: [], post: null, isTrend: false, loading: false, loadingPost: false, error: null, uploading: false }, action) => {
    switch (action.type) {
        case "UPLAOD_START":
            return { ...state, uploading: true, error: null }
            break;
        case "UPLAOD_SUCCESS":
            state.posts.unshift(action.data)
            return { ...state, uploading: false, error: null }
            break;
        case "UPLAOD_ERROR":
            return { ...state, uploading: false, error: true }
            break;
        // belongs to Posts.jsx
        case "RETREIVING_START":
            return { ...state, loading: true, error: false };
            break
        case "RETREIVING_SUCCESS":

            if (action.data.isTrend)
                return { ...state, posts: action.data.posts, loading: false, error: false, isTrend: true };
            else {

                return { ...state, posts: action.data.posts, loading: false, error: false, isTrend: false };
            }

            break
            break
        case "RETREIVING_FAIL":
            return { ...state, loading: false, error: true };
            break
        case 'DELETE_SUCCESS':
            const { postId } = action

            for (const post of state.posts) {
                if (post._id === postId) {

                    state.posts.splice(state.posts.indexOf(post), 1)
                }
            }

            return { ...state, posts: state.posts }
            break
        case "UPDATE_POST_START":
            return { ...state, uploading: true, error: null }
            break
        case "UPDATE_POST_SUCCESS":
            const { updatePostId } = action.data
            const { updatedPost } = action.data
            console.log(updatedPost);
            const updatedPosts = state.posts.map((post) => {
                if (post._id === updatePostId) {
                    const { user, ...others } = post
                    post = { ...updatedPost, user: user }
                }
                return post
            })
            return { ...state, posts: updatedPosts, uploading: false }
            break
        case "UPDATE_POST_FAIL":
            return { ...state, uploading: false, error: true }
            break
        case "GET_POST_START":
            return { ...state, uploading: false, error: true, loadingPost: true }
            break
        case "GET_POST_SUCCESS":
            return { ...state, post: action.data, loadingPost: false }
            break
        default:
            return { ...state, error: false, loading: false, uploading: false, isTrend: false };
            break;
    }
}
export default postReducer