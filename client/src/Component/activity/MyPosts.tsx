import React, { useEffect, useState } from "react";
import AcitivityLayout from "./AcitivityLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  addFav,
  allUsers,
  loadUser,
  removeFav,
} from "../../redux/action/authAction";
import { deleteOps, getOps, getOpsbyId } from "../../redux/action/postAction";
import {
  Card,
  Container,
  Row,
  Col,
  DropdownButton,
  Dropdown,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import NewPost from "../post/NewPost";

const MyPosts = () => {
  const PostList = useSelector((state: any) => state.PostReducer);
  const AuthReducer = useSelector((state: any) => state.AuthReducer);
  const UserReducer = useSelector((state: any) => state.UserReducer);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  useEffect(() => {
    if (AuthReducer.isAuth) {
      dispatch(loadUser());
      dispatch(allUsers());
      dispatch(getOps());
    }
  }, [AuthReducer.isAuth, dispatch]);

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
      <AcitivityLayout>
        {showMsg && (
          <div className="success-msg">
            <i className="fa fa-check"></i>&nbsp;
            {message}.
          </div>
        )}
        <NewPost />
        {AuthReducer.user &&
          PostList &&
          PostList.filter((ell: any) => ell.owner === AuthReducer.user._id)
            .length === 0 && (
            <Container>
              <h4 style={{ paddingTop: "20px" }}>No Posts Yet</h4>
            </Container>
          )}
        {AuthReducer.user &&
          PostList &&
          PostList.filter((ell: any) => ell.owner === AuthReducer.user._id).map(
            (el: any, i: any) => (
              <Container key={i}>
                <div className="Rcard">
                  <div className="left-container">
                    <div style={{margin:'10px 0px'}} >
                        {
                          <DropdownButton
                            id="dropdown-button-drop-left"
                            key="left"
                            variant="secondary"
                            title=""
                          >
                            <Dropdown.Item
                              onClick={() => {
                                dispatch(deleteOps(el._id));
                              }}
                            >
                              Delete
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <Link
                                onClick={() => {
                                  dispatch(getOpsbyId(el._id));
                                }}
                                to={`/edit_post/${el._id}`}
                                style={{ color: "black" }}
                              >
                                Edit
                              </Link>
                            </Dropdown.Item>
                          </DropdownButton>
                        }
                    </div>
                    <hr/>
                    <div>
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
                    <p className="excerpt">
                      {el.description.length > 150
                        ? el.description.slice(0, 150) + "... "
                        : el.description}
                      {el.description.length > 150 && (
                        <a href={`/posts/${el._id}`}>read more</a>
                      )}
                    </p>
                    <p className="excerpt">
                      <a href={`/posts/${el._id}`}>
                        <Button
                          variant="primary"
                          onClick={() => {
                            dispatch(getOpsbyId(el._id));
                          }}
                        >
                          <i className="far fa-comment-alt"></i> Comment
                        </Button>
                      </a>
                    </p>
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
                <hr />
              </Container>
            )
          )}
      </AcitivityLayout>
    </div>
  );
};

export default MyPosts;
