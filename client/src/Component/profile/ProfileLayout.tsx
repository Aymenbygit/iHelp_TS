import React from "react";
import { Link } from "react-router-dom";

const ProfileLayout = (props:any) => {
  return (
    <div className="admin_container">
      <div
        className="admin_left_nav"
        style={{
          color: "white",
          fontWeight: 300,
          borderBottom: "1px solid #353535",
        }}
      >
        <p className="nav-link link_tag" style={{textAlign:'center',margin:10,color:'grey'}} >Your account</p><hr/>
        <Link to="/profile/user/personal_information" className="nav-link link_tag">
        Personal Information 
        </Link>
        <Link to="/profile/user/work_education" className="nav-link link_tag">
          Work and Education
        </Link>
        <Link to="/profile/user/contact" className="nav-link link_tag">
          Contact and Basic Info
        </Link>
        <hr color="white" style={{height:10}} />
        <Link to="/profile/user/delete" className="nav-link link_tag">
          <span style={{color:'red'}}> <i className="fas fa-user-times"></i> Delete account!</span> 
        </Link>
      </div>
      <div className="admin_right">{props.children}</div>
    </div>
  );
};

export default ProfileLayout;
