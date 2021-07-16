import { GET_ONE_OP_SUCCESS } from "../action/type";

const SavedPost = (state = null, action:any) => {
    switch (action.type) {
        case GET_ONE_OP_SUCCESS:
            return action.payload
        default:
          return state;
      }
};

export default SavedPost;
