import "./sidebar.css";
import {
  LineStyle,
  PermIdentity,
  Storefront,
  BarChart,
  ChatBubbleOutline,
  WorkOutline,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {

  // const [active, setActive] = useState(false)
  // const handleActive=()=>{
  //   setActive(!active)
  // }

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/admin" className="liink">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/admin/userslist" className="link">
              <li className="sidebarListItem"  >
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/admin/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Posts
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <Link to="/admin/ReportList" className="link">
              <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                Reports
              </li>
            </Link>

            {/* <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li> */}
            <Link to="/admin/adminmessages" className="link">
              <li className="sidebarListItem">
                <ChatBubbleOutline className="sidebarIcon" />
                Messages
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <Link to="/admin/staff" className="link">
              <li className="sidebarListItem">
                <WorkOutline className="sidebarIcon" />
                Manage
              </li>
            </Link>

            {/* <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
