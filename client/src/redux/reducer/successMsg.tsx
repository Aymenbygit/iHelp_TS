import { ADD_COM_SUCCESS, ADD_FAV_SUCCESS, ADD_MSG_SUCCESS, ADD_POST_SUCCESS, ADD_REPORT_SUCCESS, CANCEL, DELETE_POST_SUCCESS, EDIT_SUCCESS, REMOVE_FAV_SUCCESS, SAVED_OP } from "../action/type";

const successMsg = (state = null , action:any) => {
    switch (action.type) {
      case REMOVE_FAV_SUCCESS: 
      case ADD_FAV_SUCCESS: 
      case ADD_MSG_SUCCESS: 
      case ADD_POST_SUCCESS: 
      case ADD_COM_SUCCESS: 
      case SAVED_OP: 
      case DELETE_POST_SUCCESS: 
      case ADD_REPORT_SUCCESS: 
      case EDIT_SUCCESS: 
         return action.payload
      case CANCEL: 
         return null
      default:
        return state;
    }
  };
  
  export default successMsg;