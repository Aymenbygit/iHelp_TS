import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../AdminLayout";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getMessages, readMsg } from "../../../../redux/action/messageAction";
import "./message.css";


const AdminMessages = () => {
  const dispatch = useDispatch();
  const MsgReducer = useSelector((state) => state.MsgReducer);
  const [msgData, setMsgData] = useState(MsgReducer);
  const filter = (button) => {
    if (button === "All") {
      return setMsgData(MsgReducer);
    }
    const filteredData = MsgReducer.filter((item) => item.read === button);
    setMsgData(filteredData);
  };
  useEffect(() => {
    dispatch(getMessages());
  }, [dispatch]);
  useEffect(() => {
    setMsgData(MsgReducer);
  }, [MsgReducer]);
  const SuccessMsg = useSelector((state) => state.SuccessMsg);
  const [showMsg, setShowMsg] = useState(false);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    if (SuccessMsg) {
      setMessage(SuccessMsg);
      setShowMsg(true);
      setTimeout(() => {
        setMessage(null);
        setShowMsg(false);
      }, 3000);
    }
  }, [SuccessMsg]);
  return (
    <AdminLayout>
      <div className="product ">
      {showMsg && (
          <div className="success-msg">
            <i className="fa fa-check"></i>&nbsp;
            {message}.
          </div>
        )}
        <div className="productTitleContainer">
          <h1 className="productTitle">Messages</h1>
          <div className="btn-group">
            <button
              type="button"
              className="filterButton"
              onClick={() => filter("All")}
            >
              All
            </button>
            <button
              type="button"
              className="filterButton"
              onClick={() => filter(true)}
            >
              Read
            </button>
            <button
              type="button"
              className="filterButton"
              onClick={() => filter(false)}
            >
              Unread <span className="topIconBadge"> {MsgReducer.filter(el=>el.read===false).length}</span>
            </button>
          </div>
        </div>
        {msgData.map((msg, i) => (
          <div className={msg.read===true  ?"productBottom" : "productBottom_unread"} >
            <form className="productForm">
              <div className="productFormLeft">
                <label>Name : {msg.name}</label>
                <label>Email : {msg.email}</label>
                <label>Subject : {msg.subject}</label>
                <label>Body : {msg.body}</label>
              </div>
              <div className="productFormRight">
                <Link to={`/admin/adminmessages/${msg._id}`}>
                  <button
                    className="displaymsgButton"
                    onClick={() => {
                      dispatch(readMsg(msg._id));
                    }}
                  >
                    Display
                  </button>
                </Link>
              </div>
            </form>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminMessages;
