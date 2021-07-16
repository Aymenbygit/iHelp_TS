import {
    ADD_OP_SUCCESS,
    ADD_OP_FAIL,
    GET_OP_SUCCESS,
    DELETE_SUCCESS,
    EDIT_OP_SUCCESS,
    SAVED_OP,
    EDIT_OP_FAIL,
    GET_ONE_OP_SUCCESS,
    ADD_COM_SUCCESS,
    ADD_COM_FAIL,
    ADD_POST_SUCCESS,
    ADD_POST_FAIL,
    CANCEL,
  } from "./type";
  import axios from "axios";
  import setToken from "../../setToken";
  import { Dispatch } from "redux";
  
  export const getOps = () => (dispatch: Dispatch) => {
    axios.get("/post/allposts").then((res) =>
      dispatch({
        type: GET_OP_SUCCESS,
        payload: res.data,
      })
    );
  };
  export const getOpsbyId = (_id:string) => (dispatch: Dispatch) => {
    axios.get(`/post/${_id}`).then((res) =>
      dispatch({
        type: GET_ONE_OP_SUCCESS,
        payload: res.data,
      })
    );
  };
  
  //get ops that I comment
  export const getMyCom = () => (dispatch: Dispatch) => {
    axios.get("/post/mine").then((res) =>
      dispatch({
        type: "GET_MY_COM",
        payload: res.data,
      })
    );
  };
  
  export const addPost = (info:any, files:any) => (dispatch: any) => {
    let filesArray:any = Object.values(files);
    let formData = new FormData();
    filesArray.map((file:any) => formData.append("gallery", file));
    formData.append("info", JSON.stringify(info));
    formData.append("gallery", filesArray);
    axios
      .post("/post/newPosts", formData)
      .then((res) => {
        dispatch({
          type: ADD_POST_SUCCESS,
          payload: res.data,
        });
        dispatch(getOps());
      })
      .catch((err) =>
        dispatch({
          type: ADD_POST_FAIL,
          payload: err.response.data,
        })
      );
  };
  export const editPost = (_id:string, info:any, files:any) => async (dispatch: any) => {
    let filesArray:any = Object.values(files);
    let formData = new FormData();
    filesArray.map((file:any) => formData.append("gallery", file));
    formData.append("info", JSON.stringify(info));
    formData.append("gallery", filesArray);
  
    axios.put(`/post/update/${_id}`, formData).then((res) => {
      dispatch({
        type: SAVED_OP,
        payload: res.data,
      });
      dispatch(getOps());
    });
  };
  
  export const addOps = (infos:any) => (dispatch: Dispatch) => {
    axios
      .post("/post/new_post", infos)
      .then((res) =>
        dispatch({
          type: ADD_OP_SUCCESS,
          payload: res.data,
        })
      )
      .catch((err) =>
        dispatch({
          type: ADD_OP_FAIL,
          payload: err.response.data,
        })
      );
  };
  
  export const deleteOps = (id:string) => (dispatch: any) => {
    axios.delete(`/post/${id}`).then((res) => {
      dispatch({
        type: DELETE_SUCCESS,
        payload: res.data,
      });
  
      dispatch(getOps());
    });
  };
  
  export const savePost = (infos:any) => (dispatch: any) => {
    axios
      .get("/post", infos)
      .then((res) => {
        dispatch({
          type: EDIT_OP_SUCCESS,
          payload: res.data,
        });
        dispatch(getOps());
      })
      .catch((err) =>
        dispatch({
          type: EDIT_OP_FAIL,
          // payload: err.response.data,
        })
      );
  };
  export const addCom = (_id:string, info:any) => (dispatch: any) => {
    setToken();
    axios
      .put(`/comment/add/${_id}`, info)
      .then((res) => {
        dispatch({
          type: ADD_COM_SUCCESS,
          payload: res.data,
        });
        dispatch(getOps());
        dispatch({
          type: CANCEL,
          payload: res.data,
        });
      })
      .catch((err) =>
        dispatch({
          type: ADD_COM_FAIL,
          payload: err.response.data,
        })
      );
  };
  
  //To Search post by title
//   export const searchByTitle = (search:string) => (dispatch: Dispatch) => {
//     axios
//       .get("post/search", { params: search })
//       .then((res) =>
//         dispatch({
//           type: SEARCH_BY_TITLE_SUCCESS,
//           payload: res.data,
//         })
//       )
//       .catch((err) => {
//         dispatch({
//           type: SEARCH_BY_TITLE_FAIL,
//           payload: err.response.data.msg,
//         });
//       });
//   };
  
  export const getAllPosts = (pageNumber:number) => (dispatch: Dispatch) => {
    axios.get(`/post/allpost/${pageNumber}`).then((res) =>
      dispatch({
        type: GET_OP_SUCCESS,
        payload: res.data,
      })
    );
  };
  