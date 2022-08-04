import { toast } from "react-toastify";
import * as UserApi from "../Api/UserApi";
export const updateUser=(id, formData)=> async(dispatch)=> {
    dispatch({type: "UPDATING_START"})
    try{
        const {data} = await UserApi.updateUser(id, formData);
        dispatch({type: "UPDATING_SUCCESS", data: data})
        toast.success('Profile updated succesfully ', {
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
        var errMsg
        if (error.response.data.message) 
            errMsg=error.response.data.message
        else
            errMsg=error.response.data
        toast.error(errMsg, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        dispatch({type: "UPDATING_FAIL"})
        
    }
}
export const getFollowers=(id)=>async(dispatch)=>{
    dispatch({type:'FETCH_FOLLOWERS_START'})
    try {
        const{data}=await UserApi.getFollowers(id)
        dispatch({type:'FETCH_FOLLOWERS_SUCCESS',data:data})
    } catch (error) {
        var errMsg
        if (error.response.data.message) 
            errMsg=error.response.data?.message
        else
            errMsg=error.response.data
        toast.error(errMsg, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        dispatch({type: "FETCH_FOLLOWERS_FAIL"})
        
    }
}
export const followUser=(id,authUserId)=>async(dispatch)=>{
    try {
        await UserApi.followUser(id,authUserId)
        dispatch({type:'FOLLOW_SUCCESS',data:{authUserId,id}})
    } catch (error) {
        var errMsg
        if (error.response.data.message) 
            errMsg=error.response.data.message
        else
            errMsg=error.response.data
        toast.error(errMsg, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        dispatch({type: "FOLLOW_FAIL"})
    }
}