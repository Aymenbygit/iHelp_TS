import { ALL_USERS_SUCCESS } from "../action/type";

const UserReducer = (state = [], action:any) => {
  switch (action.type) {
    case ALL_USERS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default UserReducer;
