import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addFav,
  allUsers,
  loadUser,
  removeFav,
} from "../../redux/action/authAction";
import { deleteOps, getOps, getOpsbyId } from "../../redux/action/postAction";
import Comment from '../comment/Comment'
import { Link } from "react-router-dom";
import Report from "./Report";
import "./style.css";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";

const Posts = (props:any) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const PostList = useSelector((state:any) => state.PostReducer);
  const AuthReducer = useSelector((state:any) => state.AuthReducer);
  const UserReducer = useSelector((state:any) => state.UserReducer);
  const OnePost = useSelector((state:any) => state.OnePost);

  // const [index, setIndex] = useState(0);
  // const handleSelect = (selectedIndex, e) => {
  //   setIndex(selectedIndex);
  // };

  useEffect(() => {
    if (AuthReducer.isAuth) {
      dispatch(getOps());
      dispatch(getOpsbyId(props.match.params.id));
      dispatch(loadUser());
    }
    dispatch(getOps());
    dispatch(allUsers());
    dispatch(getOpsbyId(props.match.params.id));
  }, [AuthReducer.isAuth, dispatch, props.match.params.id]);

  const SuccessMsg = useSelector((state:any) => state.SuccessMsg);
  const [showMsg, setShowMsg] = useState(false);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    if (SuccessMsg) {
      setMessage(SuccessMsg.msg);
      setShowMsg(true);
      setTimeout(() => {
        setMessage(null);
        setShowMsg(false);
      }, 3000);
    }
  }, [SuccessMsg]);
  return (
    <div>
      {showMsg && (
        <div className="success-msg">
          <i className="fa fa-check"></i>&nbsp;
          {message}.
        </div>
      )}
      <div style={{ marginTop: 30 }}>
        <Report
          handleClose={handleClose}
          show={show}
          post={PostList.filter((la:any) => la._id === props.match.params.id).map(
            (eleee:any, i:any) => eleee._id
          )}
        />

        {PostList &&
          PostList.filter((ell:any) => ell._id === props.match.params.id).map(
            (post:any, i:any) => (
              <Container key={i}>
                <Card>
                  <Card.Header as="h5">
                    <Row>
                      <Col sm={11}>{post.title}</Col>
                      {AuthReducer.user &&
                      AuthReducer.user.type &&
                      AuthReducer.user.type === true ? (
                        <Col sm={1}>
                          {
                            <i
                              style={{ cursor: "pointer" }}
                              className="fas fa-trash-alt"
                              onClick={() => {
                                dispatch(deleteOps(post._id));
                                window.history.back();
                              }}
                            ></i>
                          }
                        </Col>
                      ) : (
                        ""
                      )}
                    </Row>
                  </Card.Header>
                  <Row>
                    <Col className="col-lg-2" style={{ textAlign: "center" }}>
                      <Card.Body>
                        <Card.Text
                          onClick={handleShow}
                          style={{ cursor: "pointer", color: "blue" }}
                        >
                          <i className="fas fa-exclamation-triangle"></i> Report
                          this post
                        </Card.Text>
                        <Card.Text>{post.comments.length}</Card.Text>
                        <Card.Text>answers</Card.Text>
                        <Card.Text>
                          {AuthReducer.isAuth ? (
                            <i
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                if (AuthReducer.user) {
                                  if (
                                    AuthReducer.user && AuthReducer.user.favorites
                                      .map((ela:any) => ela._id)
                                      .includes(post._id) === false
                                  ) {
                                    dispatch(
                                      addFav(AuthReducer.user._id, {
                                        _id: post._id,
                                      })
                                    );
                                  } else {
                                    dispatch(
                                      removeFav(AuthReducer.user._id, {
                                        _id: post._id,
                                      })
                                    );
                                  }
                                }
                              }}
                            >
                              {AuthReducer.user && AuthReducer.user.favorites
                                .map((ela:any) => ela._id)
                                .includes(post._id) === false ? (
                                <i
                                  style={{ cursor: "pointer" }}
                                  className="far fa-bookmark fa-2x"
                                ></i>
                              ) : (
                                <i
                                  style={{ cursor: "pointer", color: "red" }}
                                  className="fas fa-bookmark fa-2x"
                                ></i>
                              )}{" "}
                            </i>
                          ) : (
                            <Link to="/login" style={{ color: "black" }}>
                              {" "}
                              <i
                                style={{ cursor: "pointer" }}
                                className="far fa-bookmark fa-2x"
                              >
                                {" "}
                              </i>
                            </Link>
                          )}
                        </Card.Text>
                      </Card.Body>
                    </Col>
                    <Col className="col-lg-10">
                      <Card.Body>
                        <Card.Text>{post.description}</Card.Text>
                      </Card.Body>
                    </Col>
                  </Row>
                  <Card.Footer className="text-muted">
                    {new Date(post.created_at).toLocaleString()} || asked by{" "}
                    {UserReducer &&
                      UserReducer.filter((user:any) => user._id === post.owner).map(
                        (xx:any, i:any) => (
                          <Link to={`/user/${xx._id}`} key={i}>
                            <i key={i}>{xx.username}</i>
                          </Link>
                        )
                      )}{" "}
                  </Card.Footer>
                </Card>
                <br />
                {OnePost && OnePost.gallery && OnePost.gallery.length > 0 && (
                  <Container>
                    <LightGallery plugins={[lgZoom]} mode="lg-fade">
                      {OnePost.gallery.map((el:any, i:any) => (
                        <a
                          key={i}
                          data-lg-size="1406-1390"
                          className="gallery-item"
                          data-src={el}
                        >
                          <img
                            src={el}
                            alt="gallery"
                            className="img-responsive"
                            width="250px"
                          />
                        </a>
                      ))}
                    </LightGallery>
                  </Container>
                )}
                <hr />
                {post.comments.map((ele:any, i:any) => (
                  <Card style={{ margin: 20,backgroundColor:'#D6ECFF' }} key={i}>
                    <Card.Header as="h6">
                      {UserReducer &&
                        UserReducer.filter(
                          (user:any) => user._id === ele.owner
                        ).map((xx:any, i:any) => <i key={i}>{xx.username}</i>)}
                      <i className="text-muted">
                        {" "}
                        commented on {new Date(ele.updatedAt).toLocaleString()}
                      </i>
                    </Card.Header>
                    <Row>
                      <Col className="col-sm-10">
                        <Card.Body>
                          <Card.Text>{ele.body}</Card.Text>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </Container>
            )
          )}

        <Comment
          postli={PostList.filter((la:any) => la._id === props.match.params.id).map(
            (eleee:any, i:any) => eleee._id
          )}
        />
      </div>
    </div>
  );
};

export default Posts;
