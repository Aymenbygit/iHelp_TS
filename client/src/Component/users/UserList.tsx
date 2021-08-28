import React, { useEffect, useRef, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import { useDispatch, useSelector } from "react-redux";
import { getOps } from "../../redux/action/postAction";
import {
  allUsers,
  loadUser,
} from "../../redux/action/authAction";
import { Link } from "react-router-dom";
import { Col, Container, Form } from "react-bootstrap";
import "./user.css";

const UserList = ({ search, users }:any) => {
  const dispatch = useDispatch();
  const AuthReducer = useSelector((state:any) => state.AuthReducer);
  const countPerPage = 8;
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [collection, setCollection] = useState(
    cloneDeep(users && users.slice(0, countPerPage))
  );
  const searchData = useRef(
    throttle((val) => {
      const query = val.toLowerCase();
      setCurrentPage(1);
      const data = cloneDeep(
        users
          .filter((item:any) => item.description.toLowerCase().indexOf(query) > -1)
          .slice(0, countPerPage)
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
  }, [value, dispatch, users]);

  const updatePage = (p:any) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(users && users.slice(from, to)));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const tableData = () => {
    return collection.map((el:any, i:any) => (
      <div style={{ paddingTop: "30px" }} className="col-lg-3 " key={i}>
        <div className="user__card">
          <img src={el.avatar} alt="avatar" style={{ width: "100%",height:'180px' }} />
          <h5>
            {el.first_name} {el.last_name}
          </h5>
          <p className="user_title">{el.username ? el.username : "--"}</p>
          <a
            href={`mailto:${el.email}`}
            target="_blank"
            rel="noreferrer"
            className="user_a"
          >
            <i className="fas fa-envelope" style={{ paddingRight: "10px" }}></i>
          </a>
          <a href={el.git} target="_blank" rel="noreferrer" className="user_a">
            <i className="fab fa-github" style={{ paddingRight: "10px" }}></i>
          </a>
          <a
            href={el.linkedin}
            target="_blank"
            rel="noreferrer"
            className="user_a"
          >
            <i className="fab fa-linkedin" style={{ paddingRight: "10px" }}></i>
          </a>
          <a href={el.fb} target="_blank" rel="noreferrer" className="user_a">
            <i className="fab fa-facebook"></i>
          </a>
          <p>
            <Link to={`/user/${el._id}`}>
              <button className="user_button">See full profile</button>
            </Link>{" "}
          </p>
        </div>
      </div>
    ));
  };
  return (
    <div className="msg_container user__list">
      <div
        className="msg_left_nav"
        style={{
          backgroundColor: "black",
          fontWeight: 300,
          borderBottom: "1px solid #353535",
        }}
      ></div>
      <div className="msg_right">
        <Container>
          <Form
            className="search-title-form"
            style={{ paddingTop: 30, paddingLeft: 30 }}
          >
            <Form.Row>
              <Col xs={7}>
                <Form.Control
                  type="text"
                  name="title"
                  onChange={(e) => search(e.target.value)}
                  className="search-title-input"
                  placeholder="Search user..."
                />
              </Col>
            </Form.Row>
          </Form>
          <div className="row">{collection && tableData()}</div>
              <Pagination
                pageSize={countPerPage}
                onChange={updatePage}
                current={currentPage}
                total={users && users.length}
                // onClick={scrollToTop()}
              />
        </Container>
      </div>
    </div>
  );
};

export default UserList;
