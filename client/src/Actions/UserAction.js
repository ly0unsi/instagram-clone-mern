import { toast } from "react-toastify";
import * as UserApi from "../Api/UserApi";
export const updateUser=(id, formData)=> async(dispatch)=> {
    dispatch({type: "UPDATING_START"})
    try{
        const {data} = await UserApi.updateUser(id, formData);
        dispatch({type: "UPDATING_SUCCESS", data: data})
        toast.success('Post updated succesfully ', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }   
    catch(error){
        dispatch({type: "UPDATING_FAIL"})
        toast.error('Something went wrong', {
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
export const getFollowers=(id)=>async(dispatch)=>{
    dispatch({type:'FETCH_FOLLOWERS_START'})
    try {
        const{data}=await UserApi.getFollowers(id)
        dispatch({type:'FETCH_FOLLOWERS_SUCCESS',data:data})
    } catch (error) {
        dispatch({type: "FETCH_FOLLOWERS_FAIL"})
        toast.error('Fetching followers failed', {
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
export const followUser=(id,authUserId)=>async(dispatch)=>{
    try {
        await UserApi.followUser(id,authUserId)
        dispatch({type:'FOLLOW_SUCCESS',data:{authUserId,id}})
    } catch (error) {
        dispatch({type: "FOLLOW_FAIL"})
        toast.error('Follow Failed', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
       
            console.log(error)
    }
}