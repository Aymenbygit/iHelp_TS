import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT,
  EDIT_SUCCESS,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  ADD_FAV_SUCCESS,
  REMOVE_FAV_SUCCESS,
  EDIT_FAIL,
} from "../action/type";

//  interface aInitialState {
//     token: string | null,
//     user: string | null,
//     isAuth: boolean | null,
//     error: string | null,
//     isEdited: boolean,
//   }

let initialState = {
  token: localStorage.getItem("token"),
  user: null,
  // isAuth: false,
  isAuth: localStorage.getItem("isAuth"),
  error: null,
  isEdited: false,
};



const AuthReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case EDIT_SUCCESS:
      return {
        ...state,
        error : null, 
      };
    case EDIT_FAIL:
      return {
        ...state,
        error : action.payload, 
      };

    case ADD_FAV_SUCCESS: 
    case REMOVE_FAV_SUCCESS: 
     return state
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuth:true,
        error: null,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("isAuth", 'true');
      return {
        ...state,
        token: action.payload.token,
        isAuth: true,
        error: null,
      };
      case LOAD_USER_FAIL:
        localStorage.removeItem("token");
      localStorage.removeItem("isAuth");
      return {
        isAuth: null,
        error: null,
        user: null,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      localStorage.removeItem("isAuth");
      return {
        ...state,
        isAuth: null,
        error: action.payload,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("isAuth");
      return {
        isAuth: null,
        error: null,
        user: null,
      };
      case DELETE_USER_SUCCESS: return action.payload
      case DELETE_USER_FAIL : return action.payload
    default:
      return state;
  }
};

export default AuthReducer;
