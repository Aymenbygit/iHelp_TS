import "./userList.css";
import { Visibility } from "@material-ui/icons";
import { Link } from "react-router-dom";
import AdminLayout from "../../AdminLayout";
import React, { useEffect, useRef, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  allUsers,
  getUser,
  loadUser,
} from "../../../../redux/action/authAction";
import { getOps } from "../../../../redux/action/postAction";

const UsersList = () => {
  const dispatch = useDispatch();
  const AuthReducer = useSelector((state) => state.AuthReducer);
  const UserReducer = useSelector((state) => state.UserReducer);
  const countPerPage = 7;
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [collection, setCollection] = useState(
    cloneDeep(UserReducer && UserReducer.slice(0, countPerPage))
  );
  const searchData = useRef(
    throttle((val) => {
      const query = val.toLowerCase();
      setCurrentPage(1);
      const data = cloneDeep(
        UserReducer.filter(
          (item) => item.description.toLowerCase().indexOf(query) > -1
        ).slice(0, countPerPage)
      );
      setCollection(data);
    }, 400)
  );
  useEffect(() => {
    if (AuthReducer.isAuth) {
      dispatch(loadUser());
      dispatch(getOps());
    }
    dispatch(getOps());
    dispatch(allUsers());
  }, [AuthReducer.isAuth, dispatch]);

  useEffect(() => {
    if (!value) {
      updatePage(1);
    } else {
      searchData.current(value);
    }
  }, [value, dispatch, UserReducer]);

  const updatePage = (p) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(UserReducer && UserReducer.slice(from, to)));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const tableData = () => {
    return (
      <>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Name and Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Display</th>
            </tr>
          </thead>
          <tbody>
            {collection
              .map((el) => (
                <tr>
                  <th scope="row">
                    <img
                      src={el.avatar}
                      alt="avatar"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                  </th>
                  <td>
                    {el.first_name} {el.last_name}
                  </td>
                  <td>{el.email}</td>
                  <td>
                    <Link to={`/admin/user/${el._id}`}>
                      <button
                        className="widgetSmButton"
                        onClick={() => dispatch(getUser(el._id))}
                      >
                        <Visibility className="widgetSmIcon" />
                        Display
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
              .reverse()}
          </tbody>
        </table>
      </>
    );
  };
  return (
    <AdminLayout>
      <div className="userList">
        <div>{collection && tableData()}</div>
        <Pagination
          pageSize={countPerPage}
          onChange={updatePage}
          current={currentPage}
          total={UserReducer && UserReducer.length}
          // onClick={scrollToTop()}
        />
      </div>
    </AdminLayout>
  );
};
export default UsersList;
