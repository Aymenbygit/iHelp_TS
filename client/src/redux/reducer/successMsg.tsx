import { ADD_COM_SUCCESS, ADD_FAV_SUCCESS, ADD_MSG_SUCCESS, CANCEL, REMOVE_FAV_SUCCESS } from "../action/type";

const successMsg = (state = null , action:any) => {
    switch (action.type) {
      case REMOVE_FAV_SUCCESS: 
      case ADD_FAV_SUCCESS: 
      case ADD_MSG_SUCCESS: 
      case ADD_COM_SUCCESS: 
         return action.payload
      case CANCEL: 
         return null
      default:
        return state;
    }
  };
  
  export default successMsg;