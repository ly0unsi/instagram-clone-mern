import { combineReducers } from "redux";
import { authReducer } from "./AuthReducer";
import postReducer from "./PostReducer";
import { userReducer } from "./UserReducer";
import { CommentReducer } from "./CommentReducer";
export const reducers =combineReducers({authReducer,postReducer,userReducer,CommentReducer})