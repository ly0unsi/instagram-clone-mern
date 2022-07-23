export const authReducer=(state={authData:null,loading:false,error:false},action)=>{
    switch (action.type) {
        case "AUTH_START":
                return {...state,loading:true,error:false}
            break;
        case "AUTH_COMPLETE":
                localStorage.setItem("profile",JSON.stringify({...action?.data}))
                return {...state,authData:action.data,loading:false,error:false}
            break;
        case "AUTH_FAILED":
                return {...state,loading:false,error:true}
            break;
        case "UPDATING_START":
            return {...state,loading:true}
            break;

        case "UPDATING_SUCCESS":
            return {...state,loading:false,authData:{...state.authData,user:action.data}}
            break;
        case "UPDATING_FAIL":
            return {...state,loading:false,error:true}
            break;
        case "LOGOUT":
            return {...state,authData:null}
            break;
        default:
            return {...state,error:false}
            break;
    }
}