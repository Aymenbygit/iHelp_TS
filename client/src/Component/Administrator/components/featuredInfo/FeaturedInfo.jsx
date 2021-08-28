import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMessages } from "../../../../redux/action/messageAction";
import { Link } from "react-router-dom";

export default function FeaturedInfo() {
  const PostReducer = useSelector((state) => state.PostReducer);
  const UserReducer = useSelector((state) => state.UserReducer);
  const MsgReducer = useSelector((state) => state.MsgReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMessages());
  },[]);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Posts</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{PostReducer.length}</span>
        </div>
        <Link to="/admin/products" style={{ textDecoration: "none" }}>
          <span className="featuredSub">
            Display <i class="fas fa-arrow-alt-circle-right"></i>
          </span>
        </Link>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Users</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{UserReducer.length}</span>
        </div>
        <Link to="/admin/userslist" style={{ textDecoration: "none" }}>
          {" "}
          <span className="featuredSub">
            Display <i class="fas fa-arrow-alt-circle-right"></i>
          </span>
        </Link>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Messages</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{MsgReducer.length}</span>
        </div>
        <Link to="/admin/adminmessages" style={{ textDecoration: "none" }}>
          <span className="featuredSub">
            Display <i class="fas fa-arrow-alt-circle-right"></i>
          </span>
        </Link>
      </div>
    </div>
  );
}
