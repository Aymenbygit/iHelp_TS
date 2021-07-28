import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser, loadUser } from "../../redux/action/authAction";
import ProfileLayout from "./ProfileLayout";

// interface Contact {
//     email: "",
//     Phone: "",
//     Address: "",
//     fb: "",
//     linkedin: "",
//     git: "",
//   }

const EditContact = () => {
  const dispatch = useDispatch();
  const AuthReducer = useSelector((state:any) => state.AuthReducer);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [errors, setErrors] = useState<any>(null);
  const [info, setInfo] = useState({
    email: "",
    Phone: "",
    Address: "",
    fb: "",
    linkedin: "",
    git: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const update = () => {
    setToggleEdit(!toggleEdit);
  };
  const CancelEdit = () => {
    update();
    if (!AuthReducer.user)
      setInfo({
        email: "",
        Phone: "",
        Address: "",
        fb: "",
        linkedin: "",
        git: "",
      });
    else setInfo(AuthReducer.user);
  };
  const updateNow = (e:any) => {
    e.preventDefault();
    dispatch(editUser(AuthReducer.user._id, info));
    update();
  };

  useEffect(() => {
    if (AuthReducer.isAuth) {
      dispatch(loadUser());
    }
    if (AuthReducer.error) {
      setErrors(AuthReducer.error);
      setTimeout(() => {
        setErrors(null);
      }, 5000);
    }
  }, [AuthReducer.isAuth, dispatch, AuthReducer.error]);

  useEffect(() => {
    if (!AuthReducer.user)
      setInfo({
        email: "",
        Phone: "",
        Address: "",
        fb: "",
        linkedin: "",
        git: "",
      });
    else setInfo(AuthReducer.user);
  }, [AuthReducer.user]);

  const SuccessMsg = useSelector((state:any) => state.SuccessMsg);
  const [showMsg, setShowMsg] = useState(false);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    if (SuccessMsg) {
      setMessage(SuccessMsg.msg);
      setShowMsg(true)
      setTimeout(() => {
        setMessage(null);
        setShowMsg(false)
      }, 3000);
    }
  }, [SuccessMsg]);
  return (
    <ProfileLayout>
      <div className="container">
      {showMsg && (
        <div className="success-msg">
          <i className="fa fa-check"></i>&nbsp;
          {message}.
        </div>
      )}
        <h1 style={{ color: "grey" }}>Contact and Basic Info</h1>
        {!toggleEdit ? (
          AuthReducer.user && (
            <div className="row">
              <div className="col-lg-7">
                <table className="table">
                  <tbody>
                    <tr>
                      <td style={{ textAlign: "left" }}>Email :</td>
                      <td style={{ textAlign: "left", fontWeight: "bold" }}>
                        {AuthReducer.user.email}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left" }}>Phone :</td>
                      <td style={{ textAlign: "left", fontWeight: "bold" }}>
                        {AuthReducer.user.Phone}
                        <h6>
                          {errors &&
                            errors
                              .filter((em:any) => em.param === "Phone")
                              .map((el:any, i:any) => (
                                <span className="badge badge-secondary" key={i}>
                                  {el.msg}
                                </span>
                              ))}
                        </h6>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left" }}>LinkedIn :</td>
                      <td style={{ textAlign: "left", fontWeight: "bold" }}>
                        <a
                          href={AuthReducer.user.linkedin}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {AuthReducer.user.linkedin}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left" }}>Facebook :</td>
                      <td style={{ textAlign: "left", fontWeight: "bold" }}>
                        <a
                          href={AuthReducer.user.fb}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {AuthReducer.user.fb}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left" }}>github :</td>
                      <td style={{ textAlign: "left", fontWeight: "bold" }}>
                        <a
                          href={AuthReducer.user.git}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {AuthReducer.user.git}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left" }}>Address :</td>
                      <td style={{ textAlign: "left", fontWeight: "bold" }}>
                        {AuthReducer.user.Address}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div style={{ textAlign: "center" }}>
                  <button
                    className="col-sm-10 btn btn-secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      update();
                    }}
                  >
                    <i className="fas fa-user-edit"></i>&nbsp;&nbsp; Edit
                  </button>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="row">
            <div className="col-lg-6">
              <table className="table">
                <tbody>
                  <tr>
                    <td style={{ textAlign: "left" }}>Email :</td>
                    <td style={{ textAlign: "left", fontWeight: "bold" }}>
                      <input
                        className="form-control"
                        type="text"
                        name="email"
                        value={info.email}
                        onChange={handleChange}
                        disabled
                      />{" "}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left" }}>Phone :</td>
                    <td style={{ textAlign: "left", fontWeight: "bold" }}>
                      <input
                        className="form-control"
                        type="text"
                        name="Phone"
                        value={info.Phone}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left" }}>LinkedIn :</td>
                    <td style={{ textAlign: "left", fontWeight: "bold" }}>
                      <input
                        className="form-control"
                        type="text"
                        name="linkedin"
                        value={info.linkedin}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left" }}>Facebook :</td>
                    <td style={{ textAlign: "left", fontWeight: "bold" }}>
                      <input
                        className="form-control"
                        type="text"
                        name="fb"
                        value={info.fb}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left" }}>Git :</td>
                    <td style={{ textAlign: "left", fontWeight: "bold" }}>
                      <input
                        className="form-control"
                        type="text"
                        name="git"
                        value={info.git}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left" }}>Address :</td>
                    <td style={{ textAlign: "left", fontWeight: "bold" }}>
                      <input
                        className="form-control"
                        type="text"
                        name="Address"
                        value={info.Address}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style={{ textAlign: "center" }}>
                <button
                  className="col-sm-5 btn btn-primary"
                  onClick={CancelEdit}
                >
                  CANCEL{" "}
                </button>{" "}
                &nbsp;
                <button
                  className="col-sm-5 btn btn-success"
                  onClick={updateNow}
                >
                  <i className="fas fa-user-edit"></i>&nbsp;&nbsp; Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProfileLayout>
  );
};

export default EditContact;
