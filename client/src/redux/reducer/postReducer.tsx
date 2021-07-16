import { ADD_OP_SUCCESS ,GET_OP_FAIL,GET_OP_SUCCESS, DELETE_SUCCESS, ADD_COM_FAIL, SEARCH_BY_TITLE_SUCCESS} from "../action/type";


const PostReducer = (state = [], action:any) => {
  switch (action.type) {
    case SEARCH_BY_TITLE_SUCCESS :
    case GET_OP_SUCCESS:
      return action.payload;
    case GET_OP_FAIL:
      return action.payload;
    case ADD_OP_SUCCESS:
      return state.concat(action.payload);
      case DELETE_SUCCESS:
        return state;
      case ADD_COM_FAIL:
        return action.payload;  
    default:
      return state;
  }
};

export default PostReducer;
