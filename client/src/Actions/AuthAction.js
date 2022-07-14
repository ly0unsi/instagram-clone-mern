import * as AuthApi from '../Api/AuthApi'
export const login = (formData)=>async (dispatch)=>{
    dispatch({type:"AUTH_START"})
    try {
        const {data}=await AuthApi.login(formData)
        dispatch({type:"AUTH_COMPLETE",data:data})
    } catch (error) {
        console.log(error.message)
        dispatch({type:"AUTH_FAILED"})
    }
    
}
export const signup = (formData)=>async (dispatch)=>{
    dispatch({type:"AUTH_START"})
    try {
        const {data}=await AuthApi.signup(formData)
        dispatch({type:"AUTH_COMPLETE",data:data})
    } catch (error) {
        console.log(error.message)
        dispatch({type:"AUTH_FAILED"})
    }
    
}