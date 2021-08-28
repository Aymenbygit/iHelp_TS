import { Link } from "react-router-dom";
import "./product.css";
import AdminLayout from "../../AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOps,
  getOps,
  getOpsbyId,
} from "../../../../redux/action/postAction";
import { allUsers, loadUser } from "../../../../redux/action/authAction";
import { useEffect } from "react";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";

export default function Product(props) {
  const AuthReducer = useSelector((state) => state.AuthReducer);
  const UserReducer = useSelector((state) => state.UserReducer);
  const OnePost = useSelector((state) => state.OnePost);
  const PostList = useSelector((state) => state.PostReducer);
  const dispatch = useDispatch();
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
  return (
    <AdminLayout>
      <div className="product">
        <div className="productTitleContainer">
          <h1 className="productTitle">Posts</h1>
          <Link to="/admin/newproduct">
            <button className="productAddButton">Create</button>
          </Link>
        </div>
        <div className="productBottom">
          <form className="productForm">
            {PostList &&
              PostList.filter((el) => el._id === props.match.params.id).map(
                (el) => (
                  <div className="productFormLeft">
                    <div className="productFormRight">
                      <Link to="/admin/products">
                        {" "}
                        <button
                          className="productButton"
                          onClick={() => {
                            dispatch(deleteOps(el._id));
                          }}
                        >
                          Delete
                        </button>
                      </Link>
                    </div>
                    <label>Id : {el._id}</label>
                    <label>
                      Date : {new Date(el.created_at).toLocaleString()}
                    </label>
                    <label>Owner : {el.owner}</label>
                    <label>Answers : {el.comments.length}</label>
                    <label>Attachment : {el.gallery.length}</label>
                    <label>
                      Title :<h5>{el.title}</h5>{" "}
                    </label>
                    <label>Body</label>
                    <p>{el.description}</p>
                    {OnePost && OnePost.gallery && OnePost.gallery.length > 0 && (
                      <>
                        <LightGallery plugins={[lgZoom]} mode="lg-fade">
                          {OnePost.gallery.map((el, i) => (
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
                      </>
                    )}
                    <label>Comments </label>
                    <div style={{ backgroundColor: "#F8F9FA" }}>
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-8">
                            <h5>
                              {el.comments.length > 0 ? (
                                <>{el.comments.length} Comments</>
                              ) : (
                                "No comments yet"
                              )}
                            </h5>
                          </div>
                        </div>
                        {el.comments.map((ell, i) => (
                          <div className="row  mb-4">
                            <div className="col-lg-12">
                              <div className="comments">
                                <div className="comment d-flex mb-4">
                                  <div className="flex-shrink-0">
                                    <div className="avatar avatar-sm rounded-circle">
                                      {UserReducer &&
                                        UserReducer.filter(
                                          (user) => user._id === ell.owner
                                        ).map((xx, i) => (
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
                                          (user) => user._id === ell.owner
                                        ).map((xx, i) => (
                                          <h6 key={i} className="me-2">
                                            &nbsp;{xx.username}&nbsp;
                                          </h6>
                                        ))}
                                      <span className="text-muted">
                                        {new Date(
                                          ell.updatedAt
                                        ).toLocaleString()}
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
                )
              )}
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
