import {GET_MSG_SUCCESS} from "../action/type";
  
  
  
  const MsgReducer = (state = [] , action:any) => {
    switch (action.type) {
      case GET_MSG_SUCCESS:
        return action.payload;
      default:
        return state;
    }
  };
  
  export default MsgReducer;
  