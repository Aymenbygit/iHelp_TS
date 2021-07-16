import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="text-center text-lg-start bg-light text-muted">
        <section
          className="mb-4 text-center p-4 "
          style={{ backgroundColor: "#EBECED" }}
        >
          <a
            className="btn btn-primary btn-floating m-1"
            style={{ backgroundColor: "#3b5998" }}
            href="#!"
            role="button"
          >
            <i className="fab fa-facebook-f"></i>
          </a>

          <a
            className="btn btn-primary btn-floating m-1"
            style={{ backgroundColor: "#55acee" }}
            href="#!"
            role="button"
          >
            <i className="fab fa-twitter"></i>
          </a>

          <a
            className="btn btn-primary btn-floating m-1"
            style={{ backgroundColor: "#dd4b39" }}
            href="#!"
            role="button"
          >
            <i className="fab fa-google"></i>
          </a>

          <a
            className="btn btn-primary btn-floating m-1"
            style={{ backgroundColor: "#ac2bac" }}
            href="#!"
            role="button"
          >
            <i className="fab fa-instagram"></i>
          </a>

          <a
            className="btn btn-primary btn-floating m-1"
            style={{ backgroundColor: "#0082ca" }}
            href="#!"
            role="button"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>

          <a
            className="btn btn-primary btn-floating m-1"
            style={{ backgroundColor: "#333333" }}
            href="#!"
            role="button"
          >
            <i className="fab fa-github"></i>
          </a>
        </section>
        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h3 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3"></i> iHelp
                </h3>
                <h5>knowledge sharing platform</h5>
              </div>
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Users</h6>
                <p>
                  <Link to="/users" className="text-reset">
                    Consult
                  </Link>
                </p>
                <br/>
                <h6 className="text-uppercase fw-bold mb-4">Posts</h6>
                <p>
                  <Link to="/posts" className="text-reset">
                    Check
                  </Link>
                </p>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">About</h6>
                <p>
                  <Link to="/aboutUs" className="text-reset">
                    About Us
                  </Link>
                </p>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Support</h6>
                <p>
                  <i className="fas fa-info me-3"></i>
                  <Link to="/helpcenter" className="text-reset">
                    Help Center
                  </Link>
                </p>
                <p>
                  <i className="fas fa-address-card me-3"></i>
                  <Link to="/contactUs" className="text-reset">
                    Contact
                  </Link>
                </p>
                <p>
                  <i className="fas fa-home me-3"></i> Sousse, 4013, TUNISIA
                </p>
                <p>
                  <i className="fas fa-envelope me-3"></i> aymenby2503@gmail.com
                </p>
                <p>
                  <i className="fas fa-phone me-3"></i> +216 26 398 196
                </p>
              </div>
            </div>
          </div>
        </section>
        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2021 Copyright
        </div>
      </footer>
    </div>
  );
};

export default Footer;
