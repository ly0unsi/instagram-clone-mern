export const userReducer=(state={followers:[],updatedPost:null,uplaoding:false,fetching:false,error:false},action)=>{
    switch (action.type) {
        case 'FETCH_FOLLOWERS_START':
            return {...state,fetching:true}
        case 'FETCH_FOLLOWERS_SUCCESS':
            return {...state,followers:action.data,fetching:false}
            break
        case  "FETCH_FOLLOWERS_FAIL":
            return {...state,error:true,fetching:false}
            break;
        default:
            return {...state,error:false}
            break;
    }
}