import {
  GET_REPORT_SUCCESS,
  ADD_REPORT_SUCCESS,
  DEL_REPORT_SUCCESS,
  CANCEL,
} from "./type";
import axios from "axios";
import setToken from "../../setToken";

export const getReports = () => (dispatch: any) => {
  axios.get("/post/report/all_reports").then((res) =>
    dispatch({
      type: GET_REPORT_SUCCESS,
      payload: res.data,
    })
  );
};

export const addReport = (_id: string, infos: any) => (dispatch: any) => {
  setToken();
  axios.post(`/post/report/new_report/${_id}`, infos).then((res) =>{
    dispatch({
      type: ADD_REPORT_SUCCESS,
      payload: res.data,
    })
    dispatch({
      type: CANCEL,
      payload: res.data,
    });}
  );
};

export const deleteRaport = (_id: string) => (dispatch: any) => {
  setToken();
  axios.delete(`/post/report/delete/${_id}`).then((res) => {
    dispatch({
      type: DEL_REPORT_SUCCESS,
      payload: res.data
    });
    dispatch(getReports());
    dispatch({
      type: CANCEL,
      payload: res.data,
    });
  });
};
