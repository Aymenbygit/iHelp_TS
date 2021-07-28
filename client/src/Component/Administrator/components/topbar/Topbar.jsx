import React, { useState } from "react";
import "./topbar.css";
import { Settings } from "@material-ui/icons";
import { logoutUser } from "../../../../redux/action/authAction";
import { useDispatch, useSelector } from "react-redux";

export default function Topbar() {
  const AuthReducer = useSelector(state => state.AuthReducer)
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };
  const dispatch = useDispatch();

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">ADMIN INTERFACE</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <Settings onClick={handleToggle} />
          
            {toggle && (
              <div className="contaiiner">
                <div className="settings">
                <div class="head">
                  <div class="user_info">
                    <h2>Aymen ben youssef</h2>
                    <small>abc123@mail.com</small>
                  </div>
                </div>
                  <div className="body">
                    <dl className="setting">
                      <dd>
                        <li className="setting_item">
                          <i className="fas fa-user"></i>
                          <span className="item_options">
                            Account perferences
                          </span>
                          <span className="alink">
                            <i className="fas fa-angle-right"></i>
                          </span>
                        </li>
                        <li className="setting_item">
                          <i className="fas fa-shield-alt"></i>
                          <span className="item_options">Security</span>
                          <span className="alink">
                            <i className="fas fa-angle-right"></i>
                          </span>
                        </li>
                        <li className="setting_item">
                          <i className="fas fa-user-friends"></i>
                          <span className="item_options">Contact us</span>
                          <span className="alink">
                            <i className="fas fa-angle-right"></i>
                          </span>
                        </li>
                        <li className="setting_item">
                          <i className="fas fa-sign-out-alt"></i>
                          <span className="item_options" onClick={() => {
                  dispatch(logoutUser());
                }} >Sign out</span>
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
            src={AuthReducer.isAuth &&  AuthReducer.user && AuthReducer.user.avatar}
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}
