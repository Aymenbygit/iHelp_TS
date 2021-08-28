import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { allUsers } from "../../../../redux/action/authAction";

export default function WidgetSm() {
  const UserReducer = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allUsers());
  }, []);
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {UserReducer &&
          UserReducer.map((el) => (
            <>
              <li className="widgetSmListItem">
                <img src={el.avatar} alt="" className="widgetSmImg" />
                <div className="widgetSmUser">
                  <span className="widgetSmUsername">
                    {el.last_name} {el.first_name}
                  </span>
                  <span className="widgetSmUserTitle">{el.email}</span>
                </div>
                <Link to={`/admin/user/${el._id}`}>
                  <button className="widgetSmButton">
                    <Visibility className="widgetSmIcon" />
                    Display
                  </button>
                </Link>
              </li>
            </>
          ))
            .reverse()
            .slice(0, 5)}
      </ul>
    </div>
  );
}
