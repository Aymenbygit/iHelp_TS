import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addFav,
  allUsers,
  loadUser,
  removeFav,
} from "../../redux/action/authAction";
import { deleteOps, getOps, getOpsbyId } from "../../redux/action/postAction";
import Comment from "../comment/Comment";
import { Link } from "react-router-dom";
import Report from "./Report";
import "./style.css";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";

const Posts = (props: any) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const PostList = useSelector((state: any) => state.PostReducer);
  const AuthReducer = useSelector((state: any) => state.AuthReducer);
  const UserReducer = useSelector((state: any) => state.UserReducer);
  const OnePost = useSelector((state: any) => state.OnePost);

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

  const SuccessMsg = useSelector((state: any) => state.SuccessMsg);
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
          post={PostList.filter(
            (la: any) => la._id === props.match.params.id
          ).map((eleee: any, i: any) => eleee._id)}
        />

        {PostList &&
          PostList.filter((ell: any) => ell._id === props.match.params.id).map(
            (el: any, i: any) => (
              <Container key={i}>
                <div className="Rcard">
                  <div className="left-container">
                    <div>
                      <p
                        onClick={handleShow}
                        style={{
                          cursor: "pointer",
                          color: "blue",
                          marginTop: "15px",
                        }}
                      >
                        <i className="fas fa-exclamation-triangle"></i> Report
                        this post
                      </p>
                      <p>
                        {el.comments.length}&nbsp;<span>comments</span>
                      </p>{" "}
                    </div>
                    {AuthReducer.user ? (
                      AuthReducer.user.favorites && (
                        <i
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            if (
                              AuthReducer.user.favorites
                                .map((el: any) => el._id)
                                .includes(el._id) === false
                            ) {
                              dispatch(
                                addFav(AuthReducer.user._id, { _id: el._id })
                              );
                            } else {
                              dispatch(
                                removeFav(AuthReducer.user._id, {
                                  _id: el._id,
                                })
                              );
                            }
                          }}
                        >
                          {AuthReducer.user.favorites
                            .map((el: any) => el._id)
                            .includes(el._id) === false ? (
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
                      )
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
                  </div>
                  <div className="Rcard-content">
                    <h5>{el.title}</h5>
                    <h6>
                      {el.gallery.length > 0 && (
                        <div>
                          {" "}
                          {el.gallery.length}{" "}
                          <i className="fas fa-paperclip"></i> attachment
                        </div>
                      )}
                    </h6>
                    <p className="excerpt">{el.description}</p>
                    <p className="author text-muted">
                      {new Date(el.created_at).toLocaleString()} || asked by{" "}
                      {UserReducer &&
                        UserReducer.filter(
                          (user: any) => user._id === el.owner
                        ).map((el: any, i: any) => (
                          <Link to={`/user/${el._id}`} key={i}>
                            <i key={i}>{el.username}</i>
                          </Link>
                        ))}
                    </p>
                  </div>
                </div>
                <br />
                {OnePost && OnePost.gallery && OnePost.gallery.length > 0 && (
                  <Container>
                    <LightGallery plugins={[lgZoom]} mode="lg-fade">
                      {OnePost.gallery.map((el: any, i: any) => (
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

                {/* Comments */}
                <div>
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-8 ">
                        <h5>
                          {el.comments.length > 0 ? (
                            <>{el.comments.length} Comments</>
                          ) : (
                            <p style={{ marginBottom: "30px" }}>
                              No comments yet
                            </p>
                          )}
                        </h5>
                      </div>
                    </div>
                    <div>
                      {el.comments.map((ell: any, i: any) => (
                        <div
                          className="mb-4"
                          style={{
                            backgroundColor: "#D6ECFF",
                            borderRadius: "5px",
                            padding:'10px 0px 10px 5px'
                          }}
                        >
                          <div className="">
                            <div className="comments">
                              <div className="comment d-flex mb-4">
                                <div className="flex-shrink-0">
                                  <div className="avatar avatar-sm rounded-circle">
                                    {UserReducer &&
                                      UserReducer.filter(
                                        (user: any) => user._id === ell.owner
                                      ).map((xx: any, i: any) => (
                                        <img
                                          className="avatar-img"
                                          src={xx.avatar}
                                          alt=""
                                        />
                                      ))}
                                  </div>
                                </div>
                                <div className="flex-grow-1 ms-2 ms-sm-3">
                                  <div className="comment-meta d-flex align-items-baseline">
                                    {UserReducer &&
                                      UserReducer.filter(
                                        (user: any) => user._id === ell.owner
                                      ).map((xx: any, i: any) => (
                                        <h6 key={i} className="me-2">
                                          &nbsp;{xx.username}&nbsp;
                                        </h6>
                                      ))}
                                    <span className="text-muted">
                                      {new Date(ell.updatedAt).toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="">{ell.body}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Container>
            )
          )}

        <Comment
          postli={PostList.filter(
            (la: any) => la._id === props.match.params.id
          ).map((eleee: any, i: any) => eleee._id)}
        />
      </div>
    </div>
  );
};

export default Posts;
