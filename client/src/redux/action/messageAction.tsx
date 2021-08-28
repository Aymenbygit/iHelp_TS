import { GET_MSG_SUCCESS, ADD_MSG_SUCCESS, CANCEL } from "./type";
import axios from "axios";

export const getMessages = () => (dispatch: any) => {
  axios.get("/message/all_message").then((res) =>
    dispatch({
      type: GET_MSG_SUCCESS,
      payload: res.data,
    })
  );
};

export const addMessage = (infos: any) => (dispatch: any) => {
  axios.post("/message/new_message", infos).then((res) => {
    dispatch({
      type: ADD_MSG_SUCCESS,
      payload: res.data,
    });
    dispatch({
      type: CANCEL,
      payload: res.data,
    });
  });
};

export const deleteMsg = (id: string) => (dispatch: any) => {
  axios.delete(`/message/${id}`).then((res) => {
    dispatch({
      type: "DELETE_MSG_SUCCESS",
      payload: res.data,
    });
    dispatch(getMessages());
    dispatch({
      type: CANCEL,
      payload: res.data,
    });
  });
};

//mark as read msg by id
export const readMsg = (id: string) => (dispatch: any) => {
  axios.put(`/message/${id}`).then((res) => {
    dispatch({
      type: "READ_MSG_SUCCESS",
      payload: res.data,
    });
    dispatch(getMessages());
  });
};
