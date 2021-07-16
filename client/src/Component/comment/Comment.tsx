import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form } from "react-bootstrap";
import { addCom } from "../../redux/action/postAction";
import { getOps } from "../../redux/action/postAction";
import { Link } from "react-router-dom";

const Comment = ({ postli }:any) => {
  const AuthReducer = useSelector((state:any) => state.AuthReducer);
  const dispatch = useDispatch();
  const [post, setPost] = useState({
    body: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.FormEvent
  ):void => {
    if (post.body !== "") {
      e.preventDefault();
      dispatch(addCom(postli, post));
      setPost({
        body: "",
      });
      dispatch(getOps());
    } else {
      alert("your comments is empty!");
    }
  };
  return (
    <div>
      
      <Container>
        <Form.Group>
          <Form.Control
            as="textarea"
            cols={92}
            rows={10}
            type="text"
            placeholder="write a  comment..."
            name="body"
            onChange={handleChange}
            value={post.body}
          />{" "}
        </Form.Group>{" "}
        {AuthReducer.isAuth ? (
          <button className="buton-gradyan btn btn-hover" onClick={handleAdd}>
            Add a comment
          </button>
        ) : (
          <Link to="/login">
            <button className="buton-gradyan btn btn-hover">Add a comment</button>
          </Link>
        )}
      </Container>{" "}
    </div>
  );
};

export default Comment;
