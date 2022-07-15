export const authReducer=(state={authData:null,loading:false,error:false},action)=>{
    switch (action.type) {
        case "AUTH_START":
                return {...state,loading:true,error:false}
            break;
        case "AUTH_COMPLETE":
                localStorage.setItem("profile",JSON.stringify({...action?.data}))
                return {...state,authData:action.data,loading:false,error:false}
            break;
        case "AUTH_ERROR":
                return {...state,loading:false,error:true}
            break;
        default:
            return {...state,error:false}
            break;
    }
}