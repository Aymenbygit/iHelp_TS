import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../../redux/action/authAction";

const UserDetail = (props: any) => {
  const UserReducer = useSelector((state: any) => state.UserReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allUsers());
  }, [dispatch]);

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
        <p
          className="nav-link link_tag"
          style={{ textAlign: "center", margin: 70, color: "grey" }}
        >
          User account
        </p>
        <hr />
      </div>
      <div className="admin_right">
        <div className="container">
          {UserReducer &&
            UserReducer.filter(
              (el: any) => el._id === props.match.params.id
            ).map((user: any, i: any) => (
              <div key={i}>
                <h1 style={{ color: "grey" }}>Personal Information</h1>
                <div className="row">
                  <div className="col-lg-6">
                    <img
                      src={user.avatar}
                      style={{ width: "150px", borderRadius: "50%" }}
                      alt=""
                    />
                    <table className="table">
                      <tbody>
                        <tr>
                          <td style={{ textAlign: "left" }}>Name :</td>
                          <td style={{ textAlign: "left", fontWeight: "bold" }}>
                            {user.first_name}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "left" }}>Last name :</td>
                          <td style={{ textAlign: "left", fontWeight: "bold" }}>
                            {user.last_name}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "left" }}>Birth Day :</td>
                          <td style={{ textAlign: "left", fontWeight: "bold" }}>
                            {user.Birth_day}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "left" }}>Gender :</td>
                          <td style={{ textAlign: "left", fontWeight: "bold" }}>
                            {user.gender}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "left" }}>About You :</td>
                          <td style={{ textAlign: "left", fontWeight: "bold" }}>
                            {user.bio}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "left" }}>Username :</td>
                          <td style={{ textAlign: "left", fontWeight: "bold" }}>
                            {user.username}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <h1 style={{ color: "grey" }}>Work and Education</h1>

                    <table className="table ">
                      <tbody>
                        <tr>
                          <td style={{ textAlign: "left" }}>School :</td>
                          <td style={{ textAlign: "left", fontWeight: "bold" }}>
                            {user.school}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "left" }}>High School :</td>
                          <td style={{ textAlign: "left", fontWeight: "bold" }}>
                            {user.highSchool}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "left" }}>Work :</td>
                          <td style={{ textAlign: "left", fontWeight: "bold" }}>
                            {user.work}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <h1 style={{ color: "grey" }}>Contact and Basic Info</h1>

                    <table className="table ">
                      <tbody>
                        <tr>
                          <td style={{ textAlign: "left" }}>
                            <i className="fas fa-envelope"></i>
                          </td>
                          <td style={{ textAlign: "left", fontWeight: "bold" }}>
                            {user.email}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "left" }}>
                            <i className="fas fa-phone"></i>
                          </td>
                          <td style={{ textAlign: "left", fontWeight: "bold" }}>
                            {user.Phone}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "left" }}>
                            <i className="fab fa-linkedin-in"></i>
                          </td>
                          <td style={{ textAlign: "left", fontWeight: "bold" }}>
                            <a
                              href={user.linkedin}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {user.linkedin}
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "left" }}>
                            <i className="fab fa-facebook-f"></i>
                          </td>
                          <td style={{ textAlign: "left", fontWeight: "bold" }}>
                            <a href={user.fb} target="_blank" rel="noreferrer">
                              {user.fb}
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "left" }}>
                            <i className="fab fa-github"></i>
                          </td>
                          <td style={{ textAlign: "left", fontWeight: "bold" }}>
                            <a href={user.git} target="_blank" rel="noreferrer">
                              {user.git}
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "left" }}>
                            <i className="fas fa-map-marker-alt"></i>
                          </td>
                          <td style={{ textAlign: "left", fontWeight: "bold" }}>
                            {user.Address}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
