import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import AdminLayout from "../../../Admin/AdminLayout";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import { useDispatch, useSelector } from "react-redux";
import { allUsers, loadUser } from "../../../../redux/action/authAction";
import { getOps } from "../../../../redux/action/postAction";

export default function ProductList() {
  const dispatch = useDispatch();
  const AuthReducer = useSelector((state) => state.AuthReducer);
  const PostReducer = useSelector((state) => state.PostReducer);
  const UserReducer = useSelector((state) => state.UserReducer);
  const countPerPage = 10;
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [collection, setCollection] = useState(
    cloneDeep(PostReducer && PostReducer.reverse().slice(0, countPerPage))
  );
  const searchData = useRef(
    throttle((val) => {
      const query = val.toLowerCase();
      setCurrentPage(1);
      const data = cloneDeep(
        PostReducer &&
          PostReducer.filter(
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
  }, [value, dispatch, PostReducer && PostReducer]);

  const updatePage = (p) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(PostReducer && PostReducer.slice(from, to)));
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
              <th scope="col">Date</th>
              <th scope="col">Title</th>
              <th scope="col">Owner</th>
              <th scope="col">Display</th>
            </tr>
          </thead>
          <tbody>
            {collection.map((el) => (
              <tr>
                <td>{new Date(el.created_at).toLocaleString()}</td>
                <td>{el.title}</td>
                <td>
                  {UserReducer &&
                    UserReducer.filter((user) => user._id === el.owner).map(
                      (el, i) => (
                        <Link to={`/admin/user/${el._id}`} key={i}>
                          <i key={i}>{el.username}</i>
                        </Link>
                      )
                    )}
                </td>
                <td>
                  <Link to={`/admin/product/${el._id}`} >
                    <button className="widgetSmButton">Display</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };

  return (
    <AdminLayout>
      <div className="productList">
        {collection && tableData()}
        <nav>
          <ul className="pagination justify-content-center">
            <Pagination
              className="page-link"
              pageSize={countPerPage}
              onChange={updatePage}
              current={currentPage}
              total={PostReducer && PostReducer.length}
              // onClick={scrollToTop()}
            />
          </ul>
        </nav>
      </div>
    </AdminLayout>
  );
}
