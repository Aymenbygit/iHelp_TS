import React, { useEffect, useState } from "react";
import { Button, Form, Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/action/authAction";

export interface LState {
  email: string;
  password: string;
}

const Login: React.FC<any> = ({ history }) => {
  const dispatch = useDispatch();
  const [infos, setinfos] = useState<LState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<any>(null);
  const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
    setinfos({ ...infos, [e.target.name]: e.target.value });
  };
  const login = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>| React.FormEvent
      ) => {
    e.preventDefault();
    dispatch(loginUser(infos));
  };
  const AuthReducer = useSelector((state:any) => state.AuthReducer);
  useEffect(() => {
    if (AuthReducer.isAuth && AuthReducer.user) {
      if( AuthReducer.user.type===true){
        history.push("/admin");
      } else {
        history.push("/posts");
      }
    }
    if (AuthReducer.error) {
      setErrors(AuthReducer.error);
      setTimeout(() => {
        setErrors(null);
      }, 3000);
    }
  }, [AuthReducer.isAuth, AuthReducer.error,history,AuthReducer.user]);
  return (
    <div className="container">
      <br/>
      <Container>
        <Row className="justify-content-md-center" style={{ marginBottom: "100px",marginTop: "40px" }} >
          <Col md="auto" className="log_card">
            {" "}
            <Form onSubmit={login} >
              <Form.Group style={{textAlign:"center"}}>
                <h6><i className="fas fa-lock"  style={{backgroundColor:"#6AA4B0",borderRadius:50,padding:20}}></i></h6>
                <Form.Label ><h3 >Sign In</h3></Form.Label>
              </Form.Group>
              <Form.Group >
                <Form.Label>Email address</Form.Label>
                <Form.Control className="label_card"
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleChange}
                />
                {errors &&
                    errors
                      .filter((em:any) => em.msg === "Please regiter before")
                      .map((el:any, i:string) => <span className='badge badge-secondary' key={i}>{el.msg}</span>)}
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control className="label_card"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                />
                {errors &&
                    errors
                      .filter((em:any) => em.msg === "Wrong password!")
                      .map((el:any, i:string) => <span className='badge badge-secondary' key={i}>{el.msg}</span>)}
              </Form.Group>
              
              <Form.Group>
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit"
                className="btn col-12"
                style={{ backgroundColor: "#4ABDF3" }}>
                Log in
              </Button>
              <hr />
              <Link to="/register">
                <div style={{ textAlign: "center" }}>
                  <Button variant="info" type="submit" 
                  className="btn col-8" 
                  >
                    Create New Account
                  </Button>
                </div>
              </Link>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
