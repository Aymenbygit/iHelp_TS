
import { Link } from "react-router-dom";
import AdminLayout from "../../AdminLayout";
import { useEffect, useRef, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  allUsers,
  loadUser,
} from "../../../../redux/action/authAction";
import { getOps } from "../../../../redux/action/postAction";
import "./staff.css";
const Staff = () => {
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


  return (
    <AdminLayout>
      <div className="product ">
        <div className="productTitleContainer">
          <h1 className="productTitle">Staff</h1>
        </div>
        <div>
          <div class="row">
            {collection
              .filter((el) => el.type === true)
              .map((user, i) => (
                <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                  <div class="our-team">
                    <div class="picture">
                      <img class="img-fluid" src={user.avatar} alt='' />
                    </div>
                    <div class="team-content">
                      <h3 class="name">
                        {user.first_name} {user.last_name}{" "}
                      </h3>
                      <h4 class="title">{user.email}</h4>
                    </div>
                    <div class="team-content">
                      <Link to={`/admin/user/${user._id}`}>
                        <button class="btn btn_profile"> Display profile </button>
                      </Link>
                    </div>
                    <ul class="social">
                      <li>
                        <a
                          href={user.fb}
                          class="fa fa-facebook"
                          aria-hidden="true"
                        ></a>
                      </li>
                      <li>
                        <a
                          href={user.git}
                          class="fa fa-github"
                          aria-hidden="true"
                        ></a>
                      </li>
                      <li>
                        <a
                          href={`mailto:${user.email}`}
                          class="fa fa-google-plus"
                          aria-hidden="true"
                        ></a>
                      </li>
                      <li>
                        <a
                          href={user.linkedin}
                          class="fa fa-linkedin"
                          aria-hidden="true"
                        ></a>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <Pagination
          pageSize={countPerPage}
          onChange={updatePage}
          current={currentPage}
          total={UserReducer && UserReducer.length}
        />
      </div>
    </AdminLayout>
  );
};

export default Staff;
