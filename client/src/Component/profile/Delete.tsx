import React from "react";
import { Button, Col, Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../redux/action/authAction";

const Delete = () => {
    const AuthReducer = useSelector((state:any) => state.AuthReducer);
    const dispatch = useDispatch();
  return (
    <Container>
      <Row className="justify-content-md-center" style={{ marginTop: 120,marginBottom: 120 }}>
        <Col className="log_card col-md-8">
          <div style={{ marginTop: 20 }}>
            <div>
                <h2>Deleting Your Account</h2>
              
              <span>
                If you want to permanently delete your Account, let us know.
              </span>
            </div>
          </div>
          <br />
          <div className="gr27e container col-sm-11 ">
            <div className=" col-12">
              <div>
                  <h6>Delete Account This is permanent.</h6>
                 When you delete your Facebook
                account, you won't be able to retrieve the content or
                information you've shared on Facebook. Your Messenger and all of
                your messages will also be deleted.
              </div>
            </div>
            <Button variant="dark" onClick={()=>{window.history.back();}}>CANCEL </Button> &nbsp;
            <Button variant="danger" onClick={()=>{dispatch(deleteUser(AuthReducer.user._id))}}>DELETE </Button>
          </div>
          
        </Col>
      </Row>
    </Container>
  );
};

export default Delete;
