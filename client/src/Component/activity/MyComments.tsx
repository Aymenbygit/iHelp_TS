import React, { useEffect } from "react";
import AcitivityLayout from "./AcitivityLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  addFav,
  allUsers,
  loadUser,
  removeFav,
} from "../../redux/action/authAction";
import { getMyCom, getOps } from "../../redux/action/postAction";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Mycomments = () => {
  const AuthReducer = useSelector((state:any) => state.AuthReducer);
  const UserReducer = useSelector((state:any) => state.UserReducer);
  const MyComments = useSelector((state:any) => state.MyComm);
  const dispatch = useDispatch();
  useEffect(() => {
    if (AuthReducer.isAuth) {
      dispatch(loadUser());
      dispatch(getOps());
      dispatch(getMyCom());
      dispatch(allUsers());
    }
  }, [AuthReducer.isAuth,dispatch]);
  return (
    <div>
      <div>
        <AcitivityLayout>
          {MyComments && MyComments.length=== 0 &&
      <Container>
        <h4 style={{paddingTop:'20px'}}>You Did Not Comment Any Post Yet</h4>
      </Container>
      }
          {MyComments &&
            MyComments.map((post:any, i:any) => (
              <Container key={i}>
                <Card>
                  <Card.Header as="h5">{post.title} comments</Card.Header>
                  <Row>
                    <Col className="col-sm-2" style={{ textAlign: "center" }}>
                      <Card.Body>
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
                          {/* {errors && errors.map((el) => <h1>{el.msg}</h1>)} */}
                        </Card.Text>
                      </Card.Body>
                    </Col>
                    <Col className="col-sm-10">
                      <Card.Body>
                        <Card.Title>Special title treatment</Card.Title>
                        <Card.Text>
                          {" "}
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
                      UserReducer.filter((user:any) => user._id === post.owner).map(
                        (xx:any, i:any) => (
                          <Link to={`/user/${xx._id}`} key={i}>
                            {xx.username}
                          </Link>
                        )
                      )}{" "}
                    ||
                    <Link to={`/posts/${post._id}`}>
                      {" "}
                      {post.comments.length} comments
                    </Link>
                  </Card.Footer>
                  {post.comments
                    .filter((ell:any) => ell.owner === AuthReducer.user._id)
                    .map((ele:any, i:any) => (
                      <Card style={{ margin: 20 }} key={i}>
                        <Card.Header as="h6">
                          <i className="text-muted">
                            {" "}
                            commented {new Date(ele.updatedAt).toLocaleString()}
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
                </Card>
                <hr />
              </Container>
            ))}
        </AcitivityLayout>
      </div>
    </div>
  );
};

export default Mycomments;
