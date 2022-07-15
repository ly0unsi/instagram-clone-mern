import * as PostsApi from "../Api/PostApi";
export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostsApi.getTimelinePosts(id);
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};
export const likePost=(id,userId)=>async (dispatch)=>{
  try {
    await PostsApi.likePost(id,userId)
  } catch (error) {
    console.log(error)
  }
}