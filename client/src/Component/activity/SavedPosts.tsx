import React, { useEffect, useState } from "react";
import AcitivityLayout from "./AcitivityLayout";
import { useDispatch, useSelector } from "react-redux";
import { getOps } from "../../redux/action/postAction";
import { Card, Container, Row, Col } from "react-bootstrap";
import {
  addFav,
  allUsers,
  loadUser,
  removeFav,
} from "../../redux/action/authAction";
import { Link } from "react-router-dom";

const SavedPosts = () => {
  const PostList = useSelector((state:any) => state.PostReducer);
  const AuthReducer = useSelector((state:any) => state.AuthReducer);
  const UserReducer = useSelector((state:any) => state.UserReducer);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  useEffect(() => {
    if (AuthReducer.isAuth) {
      dispatch(loadUser());
      dispatch(allUsers());
      dispatch(getOps());
    }
  }, [AuthReducer.isAuth,dispatch]);
  return (
    <div>
      <AcitivityLayout>
        {AuthReducer.user && 
          AuthReducer.user.favorites.map((ela:any,i:any) => (
            <h6 key={i}>
              {" "}
              {PostList &&
                PostList.filter((ell:any) => ell._id === ela._id).map((post:any, i:any) => (
                  <Container key={i}>
                    <Card>
                      <Card.Header as="h5">{post.title}</Card.Header>
                      <Row>
                        <Col
                          className="col-sm-2"
                          style={{ textAlign: "center" }}
                        >
                          <Card.Body>
                            <Card.Text
                              onClick={handleShow}
                              style={{ cursor: "pointer", color: "blue" }}
                            >
                              <i className="fas fa-exclamation-triangle"></i>{" "}
                              Report this post
                            </Card.Text>

                            <Card.Text>
                              {AuthReducer.isAuth ? (
                                <i
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    if (
                                      AuthReducer.user.favorites
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
                                  }}
                                >
                                  {AuthReducer.user.favorites
                                    .map((ela:any) => ela._id)
                                    .includes(post._id) === false ? (
                                    <i
                                      style={{ cursor: "pointer" }}
                                      className="far fa-bookmark fa-2x"
                                    ></i>
                                  ) : (
                                    <i
                                      style={{
                                        cursor: "pointer",
                                        color: "red",
                                      }}
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
                              {/* {errors && errors.map((el) => <h1>{el.msg}</h1>)} */}
                            </Card.Text>
                          </Card.Body>
                        </Col>
                        <Col className="col-sm-10">
                          <Card.Body>
                            <Card.Text>
                              {post.description.length > 150
                                ? post.description.slice(0, 150) + "... "
                                : post.description}
                              {post.description.length > 150 && (
                                <Link to={`/posts/${post._id}`}>read more</Link>
                              )}
                            </Card.Text>
                          </Card.Body>
                        </Col>
                      </Row>
                      <Card.Footer className="text-muted">
                        {new Date(post.created_at).toLocaleString()} || asked by{" "}
                        {UserReducer &&
                          UserReducer.filter(
                            (user:any) => user._id === post.owner
                          ).map((xx:any, i:any) => (
                            <Link to={`/user/${xx._id}`} key={i}>
                              {xx.username}
                            </Link>
                          ))}{" "}
                        ||
                        <Link to={`/posts/${post._id}`}>
                          {" "}
                          {post.comments.length} comments
                        </Link>
                      </Card.Footer>
                    </Card>
                    <hr />
                  </Container>
                ))}
            </h6>
          ))}
      </AcitivityLayout>
    </div>
  );
};

export default SavedPosts;
