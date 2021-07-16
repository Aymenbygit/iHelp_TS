import { ALL_USERS_SUCCESS, GET_USER_SUCCESS } from "../action/type";

const UserReducer = (state = null, action:any) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
    case ALL_USERS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default UserReducer;
