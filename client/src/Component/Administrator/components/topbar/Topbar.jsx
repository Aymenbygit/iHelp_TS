import React, { useEffect, useState } from "react";
import "./topbar.css";
import { Settings } from "@material-ui/icons";
import { loadUser, logoutUser } from "../../../../redux/action/authAction";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Topbar() {
  const AuthReducer = useSelector((state) => state.AuthReducer);
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (AuthReducer.isAuth) {
      dispatch(loadUser());
    }
  }, [AuthReducer.isAuth, dispatch]);

  const [toggleSetting, setToggleSetting] = useState(false);
  const handleToggleSetting = () => {
    setToggleSetting(!toggleSetting);
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">ADMIN INTERFACE</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <Settings onClick={handleToggle} />
            {/* onMouseOver */}
            {toggle && (
              <div className="contaiiner">
                <div className="settings">
                  <div class="head">
                    <div class="user_info">
                      <h2>
                        {AuthReducer.user.first_name}
                        {AuthReducer.user.last_name}
                      </h2>
                      <small>{AuthReducer.user.email}</small>
                    </div>
                  </div>
                  <div className="body">
                    <dl className="setting">
                      <dd>
                        <li
                          className="setting_item"
                          onClick={handleToggleSetting}
                        >
                          <i className="fas fa-user"></i>
                          <span className="item_options">
                            Account preferences
                          </span>
                          <span className="alink">
                            <i className="fas fa-angle-right"></i>
                          </span>
                        </li>
                        {toggleSetting && (
                          <ul>
                            <li className="setting_item">
                              <Link
                                style={{
                                  textDecoration: "none",
                                  color: "white",
                                }}
                                to={`/admin/user/${AuthReducer.user._id}`}
                              >
                                <i class="fas fa-user-circle"></i>
                                <span className="item_options">My Account</span>
                              </Link>
                            </li>
                          </ul>
                        )}
                        <li className="setting_item">
                          <i className="fas fa-sign-out-alt"></i>
                          <span
                            className="item_options"
                            onClick={() => {
                              dispatch(logoutUser());
                            }}
                          >
                            Sign out
                          </span>
                          <span className="alink">
                            <i className="fas fa-angle-right"></i>
                          </span>
                        </li>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            )}
          </div>
          <img
            src={
              AuthReducer.isAuth && AuthReducer.user && AuthReducer.user.avatar
            }
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}
