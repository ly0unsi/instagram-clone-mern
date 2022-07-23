export const userReducer=(state={followers:[],updatedPost:null,uplaoding:false,error:false},action)=>{
    switch (action.type) {
        case "UPDATING_START":
            return {...state,uplaoding:true}
            break;
        case "UPDATING_SUCCESS":
            return {...state,uplaoding:false,updatedPost:action.data}
            break;
        case "UPDATING_FAIL":
            return {...state,uplaoding:false,error:true}
            break;
        case 'FETCH_FOLLOWERS_SUCCESS':
            return {...state,followers:action.data}
        case  "FETCH_FOLLOWERS_FAIL":
            return {...state,error:true}
        case 'FOLLOW_SUCCESS':
            const {id,authUserId}=action.data
            let followers=state.followers.map((follower)=>{
                if (follower._id===id){
                    if(follower.followers.includes(authUserId)){
                        follower.followers.splice(follower.followers.indexOf(authUserId),1)
                    }else{
                        follower.followers.push(authUserId)
                    }
                }
                return follower
            })
            return {...state,followers:followers}
        default:
            return {...state,error:false}
            break;
    }
}