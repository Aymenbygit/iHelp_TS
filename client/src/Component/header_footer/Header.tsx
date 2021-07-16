import React, { useEffect } from "react";
import {
  Navbar,
  Button,
  Form,
  NavDropdown,
  Nav,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logoutUser } from "../../redux/action/authAction";
import Logo from "../../Resource/imgs/it-i-help.png"

const Header = (): any => {
  const AuthReducer = useSelector((state:any) => state.AuthReducer);
  const dispatch = useDispatch();
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
            <img src={Logo} id="logo_" alt='logo'/>
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

              <NavDropdown id='' title="Help">
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
                <Button variant='outline'>
                  <i className="fas fa-sign-in-alt"></i> Sign in
                </Button>
              </Link>
              <Link to="/register" className="navTab">
                <Button variant='outline'>
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
          <img src={Logo} id="logo_" alt='logo'/>
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
              <NavDropdown id='' title="Profile">
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
              <NavDropdown id='' title="Help">
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
            <>
              <img
                className="chip__img"
                src={AuthReducer.user.avatar}
                alt="avatar"
              />
              <i className="nav_font">
                {AuthReducer && AuthReducer.user.username}
              </i>
            </>
            <NavDropdown id='' title style={{ paddingRight: "102px" }}>
              <NavDropdown.Item
                onClick={() => {
                  dispatch(logoutUser());
                }}
              >
                <i className="fas fa-sign-out-alt"></i>Log out
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
  if (AuthReducer.user.type === true) {
    return (
      <div>
        <Navbar
          style={{
            backgroundColor: "#D4F1F4",
            paddingBottom: "12px",
            paddingTop: "12px",
          }}
          expand="lg"
          className="header__"
        >
          <Navbar.Brand>
          <img src={Logo} id="logo_" alt='logo'/>
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
              <Nav.Link as={Link} to="/admin/reports">
                Reports
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/messages">
                Messages
              </Nav.Link>
              <NavDropdown id='' title="Profile">
                <NavDropdown.Item
                  as={Link}
                  to="/profile/user/personal_information"
                >
                  My Profile
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <>
              <img
                className="chip__img"
                src={AuthReducer.user.avatar}
                alt="avatar"
              />
              <i className="nav_font">
                {AuthReducer && AuthReducer.user.username}
              </i>
            </>
            <NavDropdown id='' title style={{ paddingRight: "102px" }}>
              <NavDropdown.Item
                onClick={() => {
                  dispatch(logoutUser());
                }}
              >
                <i className="fas fa-sign-out-alt"></i>Log out
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
};

export default Header;
