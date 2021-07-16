import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../Resource/imgs/it-i-help.png"
const About = () => {
  return (
    <div className=" about_us">
      <div className="container">
        <div>
          <h1>ABOUT US</h1>
          <hr color="red" />
        </div>
        <div className="row">
          <div className="col-md-6">
            <b>
              An initiative to establish the values of cooperation and
              volunteering and to link the provider of assistance with a request
              for it to either mention and record an experience, offer an expert
              training course, or provide a free opportunity for the applicant
              depending on the field of the bidder. It's your answer to the
              question.
            </b>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            The primary objective is to assist and spread the spirit of giving
            and volunteering and to share experience and knowledge.
          </div>
        </div>
        <img src={Logo} style={{ width: "80%"}} alt="Logo" />
        <div className="row">
          <div className="col-6">
            <b>
              {" "}
              We believe that sharing expertise and experience creates a
              coherent and strong society.
            </b>
          </div>
          <div className="col-4" style={{ marginTop: "-60px" }}>
            <Card style={{ backgroundColor: "#EC563D" }}>
              <Card.Body>
                <Card.Title>iHELP</Card.Title>
                <Card.Subtitle className="mb-2">
                  aymenby2503@gmail.com
                </Card.Subtitle>
                <Card.Text>4013, Messadine Msaken,Sousse</Card.Text>
                <Card.Text>26 398 196</Card.Text>
                <Card.Link as={Link} to="/contactus" style={{color:'black'}} >
                <i className="fas fa-arrow-circle-right"></i> Contact Us
                </Card.Link>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
