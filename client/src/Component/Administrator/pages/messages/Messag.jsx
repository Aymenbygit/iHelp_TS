import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteMsg, getMessages } from "../../../../redux/action/messageAction";
import AdminLayout from "../../AdminLayout";

const Message = (props) => {
    const dispatch = useDispatch();
    const MsgReducer = useSelector((state) => state.MsgReducer);
    useEffect(() => {
      dispatch(getMessages());
    }, [dispatch]);
    return (
        <AdminLayout>
      <div className="product ">
        <div className="productTitleContainer">
          <h1 className="productTitle">Messages</h1>
          {/* <div className="btn-group">
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
              Unread ({msgData.filter(el=>el.read===false).length})
            </button>
          </div> */}
        </div>
        {MsgReducer &&
        MsgReducer.filter((el) => el._id === props.match.params.id).map((msg, i) => (
          <div className={msg.read===true  ?"productBottom" : "productBottom_unread"} >
            <form className="productForm">
              <div className="productFormLeft">
                <label>Name : {msg.name}</label>
                <label>Email : {msg.email}</label>
                <label>Subject : {msg.subject}</label>
                <label>Body : {msg.body}</label>
              </div>
              <div className="productFormRight">
                <Link to='/admin/adminmessages'>
                  <button
                    className="deleteButton"
                    onClick={()=>dispatch(deleteMsg(msg._id))}
                  >
                    Delete message
                  </button>
                </Link>
              </div>
            </form>
          </div>
        ))}
      </div>
    </AdminLayout>
    )
}

export default Message
