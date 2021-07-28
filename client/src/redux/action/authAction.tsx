import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT,
  EDIT_SUCCESS,
  EDIT_FAIL,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  ALL_USERS_SUCCESS,
  ADD_FAV_FAIL,
  ADD_FAV_SUCCESS,
  REMOVE_FAV_SUCCESS,
  GET_USER_SUCCESS,
  CANCEL,
} from "./type";
import axios from "axios";
import { Dispatch } from "redux";

import { IState as IProps } from "../../Component/signUp/SignUp";
import setToken from "../../setToken";

export const registerUser = (infos: IProps['person']) => (dispatch: Dispatch) => {
  axios
    .post("/register", infos)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.errors,
      })
    );
};
export const allUsers = () => (dispatch: Dispatch) => {
  axios.get("/login/allusers").then((res) =>
    dispatch({
      type: ALL_USERS_SUCCESS,
      payload: res.data,
    })
  );
};

export const getUser = (_id:string) => (dispatch: Dispatch) => {
  axios.get(`/login/user/${_id}`).then((res) =>
    dispatch({
      type: GET_USER_SUCCESS,
      payload: res.data,
    })
  );
};

export const loadUser = () => (dispatch: Dispatch) => {
  setToken()
  axios
    .get("/login")
    .then((res) =>
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: LOAD_USER_FAIL,
        payload: err.response.data.errors,
      })
    );
};

export const loginUser = (data:any) => (dispatch: Dispatch) => {
  axios
    .post("/login", data)
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.errors,
      })
    );
};

export const editUser = (_id:string,info:any,file?:any) => async (dispatch: any) => {
  let formData = new FormData()
  formData.append("info", JSON.stringify(info))
  formData.append("avatar", file)
  axios
    .put(`/profile/${_id}`, formData)
    .then((res) => {
      dispatch({
        type: EDIT_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
      dispatch(allUsers());
      dispatch({
        type: CANCEL,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: EDIT_FAIL,
        payload: err.response.data.errors,
      });
    });
};

export const logoutUser = () => (dispatch: Dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
export const deleteUser = (_id:string) => async (dispatch: Dispatch) => {
  axios
    .delete(`/profile/${_id}`)
    .then((res) => {
      dispatch({
        type: DELETE_USER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: DELETE_USER_FAIL,
        payload: err.response.data.errors,
      });
    });
};

export const addFav = (user_id:any, _id:any) => async (dispatch:any) => {
  axios
    .put(`/profile/addfavorites/${user_id}`, _id)
    .then((res) => {
      dispatch({
        type: ADD_FAV_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
      dispatch({
        type: CANCEL,
        payload: res.data,
      });
    })
    .catch((res) => {
      dispatch({
        type: ADD_FAV_FAIL,
      });
    });
};

export const removeFav = (user_id:any, _id:any) => async (dispatch:any) => {
  axios
    .put(`/profile/removefavorites/${user_id}`, _id)
    .then((res) => {
      dispatch({
        type: REMOVE_FAV_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
      dispatch({
        type: CANCEL,
        payload: res.data,
      });
    })
    .catch((res) => {
      dispatch({
        type: ADD_FAV_FAIL,
      });
    });
};

