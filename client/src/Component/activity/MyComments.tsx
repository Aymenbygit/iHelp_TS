import React, { useEffect } from "react";
import AcitivityLayout from "./AcitivityLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  addFav,
  allUsers,
  loadUser,
  removeFav,
} from "../../redux/action/authAction";
import { getMyCom, getOps, getOpsbyId } from "../../redux/action/postAction";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Mycomments = () => {
  const AuthReducer = useSelector((state: any) => state.AuthReducer);
  const UserReducer = useSelector((state: any) => state.UserReducer);
  const MyComments = useSelector((state: any) => state.MyComm);
  const dispatch = useDispatch();
  useEffect(() => {
    if (AuthReducer.isAuth) {
      dispatch(loadUser());
      dispatch(getOps());
      dispatch(getMyCom());
      dispatch(allUsers());
    }
  }, [AuthReducer.isAuth, dispatch]);
  return (
    <div>
      <div>
        <AcitivityLayout>
          {MyComments && MyComments.length === 0 && (
            <Container>
              <h4 style={{ paddingTop: "20px" }}>
                You Did Not Comment Any Post Yet
              </h4>
            </Container>
          )}
          {MyComments &&
            MyComments.map((el: any, i: any) => (
              <Container key={i} style={{marginTop:'10px'}}>
                <div className="Rcard">
                  <div className="left-container">
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
                <hr />
                  <h5></h5>
                  <div>{el.comments.map((ell: any, i: any) => (
                    <div className="mb-4 " style={{backgroundColor:'#D6ECFF',borderRadius:'5px'}}>
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
                  ))}</div>
                  
                </div>
                <hr />
              </Container>
            ))}
        </AcitivityLayout>
      </div>
    </div>
  );
};

export default Mycomments;
