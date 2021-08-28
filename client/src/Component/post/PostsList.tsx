import React, { useEffect, useState } from "react";
import { Container, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, allUsers } from "../../redux/action/authAction";
import { getOps } from "../../redux/action/postAction";
import PostPagination from "./PostPagination";
import NewPost from "./NewPost";
import "./style.css";

const PostsList = ({ search, postss }:any) => {
  // const [show, setShow] = useState<boolean>(false);
  // const handleClose = () => setShow(false);
  const dispatch = useDispatch();
  const SuccessMsg = useSelector((state:any) => state.SuccessMsg);
  const AuthReducer = useSelector((state:any) => state.AuthReducer);

  useEffect(() => {
    if (AuthReducer.isAuth) {
      dispatch(loadUser());
      dispatch(getOps());
    }
    dispatch(getOps());
    dispatch(allUsers());
  }, [AuthReducer.isAuth, dispatch]);
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
  console.log(message)
  return (
    <div>
      {showMsg && (
        <div className="success-msg">
          <i className="fa fa-check"></i>&nbsp;
          {message}.
        </div>
      )}
      <NewPost  />
      <Container>
        <Form className="search-title-form">
          <Form.Row>
            <Col xs={7}>
              <Form.Control
                type="text"
                name="title"
                onChange={(e) => search(e.target.value)}
                className="search-title-input"
                placeholder="Search by title..."
              />
            </Col>
          </Form.Row>
        </Form>
        <h2 style={{ fontSize: 20, padding: "15px 0px 15px 0px" }}>
          {postss && postss.length} posts
        </h2>{" "}
      </Container>
      <PostPagination search={search} postss={postss.reverse()} />
    </div>
  );
};

export default PostsList;
