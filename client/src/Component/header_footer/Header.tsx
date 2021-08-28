import React, { useEffect, useState } from "react";
import { Navbar, Button, Form, NavDropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logoutUser } from "../../redux/action/authAction";
import Logo from "../../Resource/imgs/it-i-help.png";
import { ArrowDropDownRounded } from "@material-ui/icons";

const Header = (): any => {
  const AuthReducer = useSelector((state: any) => state.AuthReducer);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    if (AuthReducer.isAuth) {
      dispatch(loadUser());
    }
  }, [AuthReducer.isAuth, dispatch]);

  if (!AuthReducer.user) {
    return (
      <div>
        <Navbar
          style={{
            backgroundColor: "#D4F1F4",
            paddingBottom: "15px",
            paddingTop: "15px",
          }}
          expand="lg"
          className="header__"
        >
          <Navbar.Brand>
            <img src={Logo} id="logo_" alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto nav_font">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/posts">
                Posts
              </Nav.Link>
              <Nav.Link as={Link} to="/users">
                Users
              </Nav.Link>
              <Nav.Link as={Link} to="/contactUs">
                Contact
              </Nav.Link>

              <NavDropdown id="" title="Help">
                <NavDropdown.Item as={Link} to="/helpcenter">
                  Help center
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/aboutUs">
                  About Us
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Form inline>
              <Link to="/login" className="navTab" style={{ paddingRight: 6 }}>
                <Button variant="outline">
                  <i className="fas fa-sign-in-alt"></i> Sign in
                </Button>
              </Link>
              <Link to="/register" className="navTab">
                <Button variant="outline">
                  <i className="fas fa-user"></i> Sign Up
                </Button>
              </Link>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  } else if (AuthReducer.user.type === false) {
    return (
      <div>
        <Navbar
          style={{
            backgroundColor: "#D4F1F4",
            paddingBottom: "12px",
            paddingTop: "12px",
          }}
          expand="lg"
          className="header__ "
        >
          <Navbar.Brand>
            <img src={Logo} id="logo_" alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto nav_font">
              <Nav.Link as={Link} to="/posts">
                Posts
              </Nav.Link>
              <Nav.Link as={Link} to="/users">
                Users
              </Nav.Link>
              <NavDropdown id="" title="Profile">
                <NavDropdown.Item
                  as={Link}
                  to="/profile/user/personal_information"
                >
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/activity">
                  My Activity
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown id="" title="Help">
                <NavDropdown.Item as={Link} to="/helpcenter">
                  Help center{" "}
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/aboutUs">
                  About Us{" "}
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/contactUs">
                Contact
              </Nav.Link>
            </Nav>
            <div>
            <ArrowDropDownRounded onClick={handleToggle} style={{textAlign:'center', cursor:"pointer"}} />&nbsp;
            <img
                className="chip__img"
                src={AuthReducer.user.avatar}
                alt="avatar"
              />
              {toggle && (
              <div className="contaiiner" style={{top:"62px",width:'250px',right:'50px'}} >
                <div className="settings">
                  <div className="head">
                    <div className="user_info">
                      <h2>
                        {AuthReducer.user.first_name} &nbsp;
                        {AuthReducer.user.last_name}
                      </h2>
                      <small>{AuthReducer.user.username}</small>
                    </div>
                  </div>
                  <div className="body">
                    <dl className="setting">
                      <dd>
                        <li className="setting_item">
                          <i className="fas fa-sign-out-alt"></i>
                          <span
                            className="item_options"
                            onClick={() => {
                              dispatch(logoutUser());
                              handleToggle()
                            }}
                            style={{cursor:"pointer"}}
                          >
                            Sign out
                          </span>
                          <span className="alink">
                            <i className="fas fa-angle-right"></i>
                          </span>
                        </li>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            )}
            </div>
            
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
  if (AuthReducer.user.type === true) {
    return (
      <div>
      </div>
    );
  }
};

export default Header;
