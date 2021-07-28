import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import PostReducer from "./postReducer";
import UserReducer from "./userReducer";
import ReportReducer from "./reportReducer";
import OnePost from "./onePost";
import MsgReducer from "./msgReducer";
import MyComm from "./myCom";
import SavedPost from "./savedPost";
import SuccessMsg from "./successMsg";
import OneUser from "./oneUser";

const reducers = combineReducers({  AuthReducer,PostReducer,UserReducer,ReportReducer,OnePost,MsgReducer,MyComm,SavedPost,SuccessMsg,OneUser });

export default reducers;

export type State = ReturnType<typeof reducers>;
