import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./report.css";
import { allUsers, loadUser } from "../../../../redux/action/authAction";
import {
  deleteRaport,
  getReports,
} from "../../../../redux/action/reportAction";
import { getOps } from "../../../../redux/action/postAction";
import AdminLayout from "../../AdminLayout";

const ReportModel = (props) => {
  const AuthReducer = useSelector((state) => state.AuthReducer);
  const ReportReducer = useSelector((state) => state.ReportReducer);
  const PostList = useSelector((state) => state.PostReducer);
  const UserReducer = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (AuthReducer.isAuth) {
      dispatch(loadUser());
      dispatch(getReports());
      dispatch(getOps());
      dispatch(allUsers());
    }
  }, [AuthReducer.isAuth, dispatch]);
  return (
    <AdminLayout>
      <div className="product ">
        <div className="productTitleContainer">
          <h1 className="productTitle">Reports</h1>
        </div>
        {ReportReducer &&
          ReportReducer.filter((el) => el._id === props.match.params.id).map(
            (el, i) => (
              <div className="productBottom">
                <form className="productForm">
                  <div className="productFormLeft">
                    <label>
                      owner :{" "}
                      {UserReducer &&
                        UserReducer.filter((user) => user._id === el.owner).map(
                          (el, i) => (
                            <Link to={`/admin/user/${el._id}`} key={i}>
                              <b key={i}>{el.username}</b>
                            </Link>
                          )
                        )}
                    </label>
                    <label>
                      Target :{" "}
                      {PostList.map((el) => el._id).includes(el.target) ? (
                        <Link to={`/admin/product/${el.target}`}>
                          Check Post
                        </Link>
                      ) : (
                        <s style={{ color: "red" }}>Post Deleted</s>
                      )}
                    </label>
                    <label>Subject : {el.checkbox}</label>
                    <label>Body : {el.body}</label>
                  </div>
                  <div className="productFormRight">
                    <Link to="/admin/ReportList">
                      <button
                        className="deleteButton"
                        onClick={() => {
                          dispatch(deleteRaport(el._id));
                        }}
                      >
                        Delete report
                      </button>
                    </Link>
                  </div>
                </form>
              </div>
            )
          )}
      </div>
    </AdminLayout>
  );
};

export default ReportModel;
