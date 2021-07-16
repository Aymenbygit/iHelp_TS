import {
    GET_REPORT_SUCCESS,
    ADD_REPORT_FAIL
  } from "../action/type";
  
  
  
  const ReportReducer = (state = [] , action:any) => {
    switch (action.type) {
      case ADD_REPORT_FAIL:
        return action.payload;
      case GET_REPORT_SUCCESS:
        return action.payload;
      default:
        return state;
    }
  };
  
  export default ReportReducer;
  