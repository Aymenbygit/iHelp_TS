import {GET_ONE_OP_SUCCESS} from "../action/type";
  
  const onePost = (state = [], action:any) => {
    switch (action.type) {
      case GET_ONE_OP_SUCCESS:
        return action.payload;
      default:
        return state;
    }
  };
  
  export default onePost;
  