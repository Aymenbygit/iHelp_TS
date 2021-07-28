import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
  LinkedIn,
  School,
  Work,
  GitHub,
  Facebook,
  SupervisorAccount
} from "@material-ui/icons";
import InfoIcon from "@material-ui/icons/Info";
import { Link } from "react-router-dom";
import AdminLayout from "../../../Admin/AdminLayout";
import "./user.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers, editUser, getUser } from "../../../../redux/action/authAction";

export default function User(props) {
  const AuthReducer = useSelector((state) => state.AuthReducer);
  const UserReducer = useSelector((state) => state.UserReducer);
  const OneUser = useSelector((state) => state.OneUser);
  const dispatch = useDispatch();
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({
    type: "",
    username: "",
    first_name: "",
    last_name: "",
    Birth_day: "",
    gender: "",
    email: "",
    avatar: "",
    phone: "",
  });
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const selectImageToUpload = (e) => {
    setFile(e.target.files[0]);
  };
  useEffect(() => {
    dispatch(allUsers());
    dispatch(getUser(props.match.params.id));
  }, [dispatch]);
  useEffect(() => {
    if (!AuthReducer.user)
      setInfo({
        type: "",
        username: "",
        first_name: "",
        last_name: "",
        Birth_day: "",
        gender: "",
        email: "",
        avatar: "",
        phone: "",
      });
    else {
      setInfo(OneUser);
    }
  }, [AuthReducer.user,UserReducer,OneUser]);
  console.log(info)
  const updateNow = (e) => {
    e.preventDefault();
    dispatch(editUser(OneUser._id, info, file));
  };
  return (
    <AdminLayout>
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Edit User</h1>
          <Link to="/admin/newUser">
            <button className="userAddButton">Create</button>
          </Link>
        </div>
        {UserReducer &&
          UserReducer.filter((el) => el._id === props.match.params.id).map(
            (user, i) => (
              <div className="userContainer">
                <div className="userShow">
                  <div className="userShowTop">
                    <img src={user.avatar} alt="" className="userShowImg" />
                    <div className="userShowTopTitle">
                      <span className="userShowUsername">
                        {user.last_name} {user.first_name}
                      </span>
                      <span className="userShowUserTitle">{user.work}</span>
                    </div>
                  </div>
                  <div className="userShowBottom">
                    <span className="userShowTitle">Account Details</span>
                    <div className="userShowInfo">
                      <SupervisorAccount className="userShowIcon" />
                      <span className="userShowInfoTitle">{user.type ? 'Admin' : 'Simple user' }</span>
                    </div>
                    <div className="userShowInfo">
                      <PermIdentity className="userShowIcon" />
                      <span className="userShowInfoTitle">{user.username}</span>
                    </div>
                    <div className="userShowInfo">
                      <CalendarToday className="userShowIcon" />
                      <span className="userShowInfoTitle">
                        {user.Birth_day}
                      </span>
                    </div>
                    <div className="userShowInfo">
                      <i class="fas fa-venus-mars"></i>
                      <span className="userShowInfoTitle">{user.gender}</span>
                    </div>
                    <span className="userShowTitle">Work and Education</span>
                    <div className="userShowInfo">
                      <School className="userShowIcon" />
                      <span className="userShowInfoTitle">{user.school}</span>
                    </div>
                    <div className="userShowInfo">
                      <School className="userShowIcon" />
                      <span className="userShowInfoTitle">
                        {user.highSchool}
                      </span>
                    </div>
                    <div className="userShowInfo">
                      <Work className="userShowIcon" />
                      <span className="userShowInfoTitle">{user.work}</span>
                    </div>
                    <span className="userShowTitle">Contact Details</span>
                    <div className="userShowInfo">
                      <PhoneAndroid className="userShowIcon" />
                      <span className="userShowInfoTitle">
                        +216 {user.Phone}
                      </span>
                    </div>
                    <div className="userShowInfo">
                      <MailOutline className="userShowIcon" />
                      <span className="userShowInfoTitle"><a href={`mailto:${user.email}`} >{user.email}</a></span>
                    </div>
                    <div className="userShowInfo">
                      <Facebook className="userShowIcon" />
                      <span className="userShowInfoTitle"><Link to={user.fb} >{user.fb}</Link></span>
                    </div>
                    <div className="userShowInfo">
                      <GitHub className="userShowIcon" />
                      <span className="userShowInfoTitle"><Link to={user.git} >{user.git}</Link></span>
                    </div>
                    <div className="userShowInfo">
                      <LinkedIn className="userShowIcon" />
                      <span className="userShowInfoTitle"><Link to={user.linkedin} >{user.linkedin}</Link></span>
                    </div>
                    <div className="userShowInfo">
                      <LocationSearching className="userShowIcon" />
                      <span className="userShowInfoTitle">{user.Address}</span>
                    </div>
                    <span className="userShowTitle">About</span>
                    <div className="userShowInfo">
                      <InfoIcon className="userShowIcon" />
                      <span className="userShowInfoTitle">{user.bio}</span>
                    </div>
                  </div>
                </div>
                {/* --------------- Account update --------------- */}
                <div className="userUpdate">
                  <span className="userUpdateTitle">Edit</span>
                  <form className="userUpdateForm">
                    <div className="userUpdateLeft">
                      <div className="userUpdateItem">
                        <label>Role</label>
                        <select
                          className="userUpdateInput"
                          type="text"
                          name="type"
                          value={info.type}
                          onChange={handleChange}
                        >
                        <option value={true}>Admin</option>
                        <option value={false}>Simple User</option>
                        </select>
                      </div>
                      <div className="userUpdateItem">
                        <label>Username</label>
                        <input
                          className="userUpdateInput"
                          type="text"
                          name="username"
                          value={info.username}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="userUpdateItem">
                        <label>Full Name</label>
                        <input
                          className="userUpdateInput"
                          type="text"
                          name="first_name"
                          value={info.first_name}
                          onChange={handleChange}
                        />
                        <input
                          type="text"
                          name="last_name"
                          value={info.last_name}
                          onChange={handleChange}
                          className="userUpdateInput"
                        />
                      </div>
                      <div className="userUpdateItem">
                        <label>Gender :</label>
                        <select
                          className="userUpdateInput"
                          type="text"
                          name="gender"
                          value={info.gender}
                          onChange={handleChange}
                        >
                        <option value="">--</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        </select>
                      </div>
                      <div className="userUpdateItem">
                        <label>Birth Day :</label>
                        <input
                          className="userUpdateInput"
                          type="date"
                          name="Birth_day"
                          value={info.Birth_day}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="userUpdateItem">
                        <label>Email</label>
                        <input
                          type="text"
                          placeholder="annabeck99@gmail.com"
                          className="userUpdateInput"
                          value={info.email}
                          name="email"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="userUpdateItem">
                        <label>Phone</label>
                        <input
                          type="text"
                          placeholder={user.Phone}
                          className="userUpdateInput"
                          value={info.Phone}
                          name="Phone"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="userUpdateRight">
                      <div className="userUpdateUpload">
                        <img
                          className="userUpdateImg"
                          src={info.avatar}
                          alt="avatar"
                        />
                        <label htmlFor="file">
                          <Publish className="userUpdateIcon" />
                        </label>
                        <input style={{ display: "none" }} id="file" type="file" name="avatar" onChange={selectImageToUpload} />
                      </div>
                      <button className="userUpdateButton" onClick={updateNow} >Update</button>
                    </div>
                  </form>
                </div>
              </div>
            )
          )}
      </div>
    </AdminLayout>
  );
}
