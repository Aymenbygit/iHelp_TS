import { Visibility } from "@material-ui/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { allUsers, loadUser } from "../../../../redux/action/authAction";
import { getOps } from "../../../../redux/action/postAction";
import "./widgetLg.css";

export default function WidgetLg() {
  const AuthReducer = useSelector((state) => state.AuthReducer);
  const PostReducer = useSelector((state) => state.PostReducer);
  const UserReducer = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  var options = { year: "numeric", month: "long", day: "numeric" };
  useEffect(() => {
    if (AuthReducer.isAuth) {
      dispatch(loadUser());
      dispatch(getOps());
    }
    dispatch(getOps());
    dispatch(allUsers());
  }, [AuthReducer.isAuth, dispatch]);
  const tableData = () => {
    return (
      <>
        {PostReducer.reverse()
          .map((el) => (
            <tr>
              <td >{new Date(el.created_at).toLocaleString()}</td>
              <td>{el.title}</td>
              <td>
                {UserReducer &&
                  UserReducer.filter((user) => user._id === el.owner).map(
                    (el, i) => (
                      <Link to={`/admin/user/${el._id}`} key={i}>
                        <h6 key={i}>{el.username}</h6>
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
          ))
          .slice(0, 6)}
      </>
    );
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest Posts</h3>
      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Title</th>
            <th className="widgetLgTh">Owner</th>
            <th className="widgetLgTh">Display</th>
          </tr>
        </thead>
        <tbody>{tableData()}</tbody>
      </table>
    </div>
  );
}
