import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser, loadUser } from "../../redux/action/authAction";
import ProfileLayout from "./ProfileLayout";

const EditEducation = () => {
  const dispatch = useDispatch();
  const AuthReducer = useSelector((state: any) => state.AuthReducer);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [info, setInfo] = useState({
    school: "",
    highSchool: "",
    work: "",
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
        school: "",
        highSchool: "",
        work: "",
      });
    else setInfo(AuthReducer.user);
  };

  const updateNow = (e: any) => {
    e.preventDefault();
    dispatch(editUser(AuthReducer.user._id, info));
    update();
  };

  useEffect(() => {
    if (AuthReducer.isAuth) {
      dispatch(loadUser());
    }
  }, [AuthReducer.isAuth, dispatch]);

  useEffect(() => {
    if (!AuthReducer.user)
      setInfo({
        school: "",
        highSchool: "",
        work: "",
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
        <h1 style={{ color: "grey" }}>Work and Education</h1>
        {!toggleEdit ? (
          AuthReducer.user && (
            <div className="row">
              <div className="col-lg-6">
                <table className="table ">
                  <tbody>
                    <tr>
                      <td style={{ textAlign: "left" }}>School :</td>
                      <td style={{ textAlign: "left", fontWeight: "bold" }}>
                        {AuthReducer.user.school}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left" }}>High School :</td>
                      <td style={{ textAlign: "left", fontWeight: "bold" }}>
                        {AuthReducer.user.highSchool}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left" }}>Work :</td>
                      <td style={{ textAlign: "left", fontWeight: "bold" }}>
                        {AuthReducer.user.work}
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
                    <td>School:</td>
                    <td>
                      <input
                        className="form-control"
                        type="text"
                        name="school"
                        value={info.school}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left" }}>High School :</td>
                    <td style={{ textAlign: "left", fontWeight: "bold" }}>
                      <input
                        className="form-control"
                        type="text"
                        name="highSchool"
                        value={info.highSchool}
                        onChange={handleChange}
                      />{" "}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left" }}>Work :</td>
                    <td style={{ textAlign: "left", fontWeight: "bold" }}>
                      <input
                        className="form-control"
                        type="text"
                        name="work"
                        value={info.work}
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

export default EditEducation;
