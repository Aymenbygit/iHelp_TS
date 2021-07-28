import {GET_USER_SUCCESS} from "../action/type";
  
  const OneUser = (state = [], action:any) => {
    switch (action.type) {
      case GET_USER_SUCCESS:
        return action.payload;
      default:
        return state;
    }
  };
  
  export default OneUser;
  