import * as AuthApi from '../Api/AuthApi'
import {toast } from 'react-toastify';

export const login = (formData)=>async (dispatch)=>{
    dispatch({type:"AUTH_START"})
    try {
        const {data}=await AuthApi.login(formData)
        dispatch({type:"AUTH_COMPLETE",data:data})
    } catch (error) {
        toast.error('Something Wentwrong', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        dispatch({type:"AUTH_FAILED"})
    }
    
}
export const signup = (formData)=>async (dispatch)=>{
    dispatch({type:"AUTH_START"})
    try {
        const {data}=await AuthApi.signup(formData)
        dispatch({type:"AUTH_COMPLETE",data:data})
    } catch (error) {
        toast.error('Please choose another username', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        dispatch({type:"AUTH_FAILED"})
    }
}
export const logout = ()=>async (dispatch)=>{
   
    try {
            dispatch({type:"LOGOUT"})
            
    } catch (error) {
        console.log(error)
    }
  
}