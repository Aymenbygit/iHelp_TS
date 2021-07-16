import React, { useEffect, useRef, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteOps, getOps, getOpsbyId } from "../../redux/action/postAction";
import {
  addFav,
  allUsers,
  loadUser,
  removeFav,
} from "../../redux/action/authAction";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Admin/user.css";

const Table = ({postss}:any) => {

  const dispatch = useDispatch();
  const AuthReducer = useSelector((state:any) => state.AuthReducer);
  const UserReducer = useSelector((state:any) => state.UserReducer);
  const countPerPage = 5;
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [collection, setCollection] = useState(
    cloneDeep(postss && postss.slice(0, countPerPage))
  );
  const searchData = useRef(
    throttle((val:any) => {
      const query = val.toLowerCase();
      setCurrentPage(1);
      const data = cloneDeep(
        postss && postss.filter(
          (item:any) => item.description.toLowerCase().indexOf(query) > -1
        ).slice(0, countPerPage)
      );
      setCollection(data);
    }, 400)
  );
  useEffect(() => {
    if (AuthReducer.isAuth) {
      dispatch(loadUser());
      dispatch(getOps());
    }
    dispatch(getOps());
    dispatch(allUsers());
  }, [AuthReducer.isAuth, dispatch]);

  useEffect(() => {
    if (!value) {
      updatePage(1);
    } else {
      searchData.current(value);
    }
  }, [value, dispatch, postss && postss]);

  const updatePage = (p:any) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(postss && postss.slice(from, to)));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const tableData = () => {
    return collection.map((el:any, i:any) => (
      <Container key={i}>
        <Card>
          <Card.Header as="h5">
            <Row>
              <Col sm={11}>{el.title}</Col>
              {AuthReducer.user &&
              AuthReducer.user.type &&
              AuthReducer.user.type === true ? (
                <Col sm={1}>
                  {
                    <i
                      style={{ cursor: "pointer" }}
                      className="fas fa-trash-alt"
                      onClick={() => {
                        dispatch(deleteOps(el._id));
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
                <Card.Text>
                  {el.comments.length} <span>comments</span>{" "}
                </Card.Text>
                <Card.Text>
                  {AuthReducer.user ? (
                    AuthReducer.user.favorites && (
                      <i
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          if (
                            AuthReducer.user.favorites
                              .map((el:any) => el._id)
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
                          .map((el:any) => el._id)
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
                </Card.Text>
              </Card.Body>
            </Col>
            <Col className="col-sm-10">
              <Card.Body>
                {el.gallery.length>0 && <Card.Title> {el.gallery.length} <i className="fas fa-paperclip"></i> attachment</Card.Title>}
                <Card.Text>
                  {el.description.length > 150
                    ? el.description.slice(0, 150) + "... "
                    : el.description}
                  {el.description.length > 150 && (
                    <a href={`/posts/${el._id}`}>read more</a>
                  )}
                </Card.Text>
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
              </Card.Body>
            </Col>
          </Row>
          <Card.Footer className="text-muted">
            {new Date(el.created_at).toLocaleString()} || asked by{" "}
            {UserReducer &&
              UserReducer.filter((user:any) => user._id === el.owner).map(
                (el:any, i:any) => (
                  <Link to={`/user/${el._id}`} key={i}>
                    <i key={i}>{el.username}</i>
                  </Link>
                )
              )}{" "}
          </Card.Footer>
        </Card>
        <hr />
      </Container>
    ));
  };

  return (
    <>
      {collection && tableData()}
      <nav>
        <ul className="pagination justify-content-center">
          <Pagination
            className="page-link"
            pageSize={countPerPage}
            onChange={updatePage}
            current={currentPage}
            total={postss && postss.length}
            // onClick={scrollToTop()}
          />
        </ul>
      </nav>
    </>
  );
};
export default Table;
