import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { editPost, getOps, getOpsbyId } from "../../redux/action/postAction";

interface IEditPost {
    _id?:any,
    title: string,
    description: string,
    gallery?: string|[],
  }
  
const EditPost = (props:any) => {
  const AuthReducer = useSelector((state:any) => state.AuthReducer);
  const SavedPost = useSelector((state:any) => state.SavedPost);
  const dispatch = useDispatch();
  const [files, setFile] = useState([]);
  const [post, setPost] = useState<IEditPost>({
    title: "",
    description: "",
  });
  const handleEditPost = () => {
    if (AuthReducer.isAuth) {
      if (post.description !== "") {
        dispatch(editPost(post._id, post,files));
      }
    }
  };
  const handleChange = (e:any) => {
    if(e.target.name === "gallery"){
      setFile(e.target.files)
    } else {
      setPost({ ...post, [e.target.name]: e.target.value });
    }
  };
  useEffect(() => {
    if (AuthReducer.isAuth) {
      dispatch(getOpsbyId(props.match.params.id));
      dispatch(getOps());
    }
    dispatch(getOps());
  }, [AuthReducer.isAuth, dispatch, props.match.params.id]);
  useEffect(() => {
    if (!SavedPost)
      setPost({
        title: "",
        description: "",
        gallery: "",
      });
    else setPost(SavedPost);
  }, [SavedPost]);
  return (
    <div>
      <Container>
        <Card
          style={{
            marginTop: "3%",
          }}
        >
          <Form
            style={{
              marginLeft: "5%",
              marginRight: "5%",
              marginBottom: "1%",
              marginTop: "1%",
            }}
          >
            <Form.Group>
              <Form.Label as="h5">Title</Form.Label>
              <Form.Control
                placeholder="any question..."
                type="text"
                name="title"
                onChange={handleChange}
                value={post.title}
              />
            </Form.Group>
            <Form.Group>
                  <Form.Label as="h5">Upload Images :</Form.Label>
                  <Form.Control
                    type="file"
                    name="gallery"
                    onChange={handleChange}
                    multiple
                  />
                </Form.Group>
            <Form.Group>
              <Form.Label as="h5">Body</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                type="text"
                placeholder="description"
                name="description"
                onChange={handleChange}
                value={post.description}
              />
            </Form.Group>
            {post.description === "" ? (
              <Button
                style={{ cursor: "not-allowed" }}
                variant="primary"
                disabled
              >
                Save
              </Button>
            ) : (
                <Button
                  style={{ cursor: "pointer" }}
                  variant="success"
                  onClick={() =>{
                    handleEditPost()
                    window.history.back()
                    }}
                >
                  Save
                </Button>
            )}
            &nbsp;
            <Button
              variant="primary"
              onClick={() => setPost(SavedPost && SavedPost)}
            >
              Reset
            </Button>&nbsp;
            <Button
              variant="info"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default EditPost;
