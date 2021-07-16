import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addReport } from "../../redux/action/reportAction";

// interface ReportState{
//     body:string,
//     checkbox: any
// }

const Report = ({ handleClose, show, post, match }:any) => {
  const AuthReducer = useSelector((state:any) => state.AuthReducer);
  const dispatch = useDispatch();

  const [report, setReport] = useState({
    body: "",
    checkbox: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement > 
  ) :void => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please select a problem If someone is in immediate danger, get help
          before reporting. Don't wait.
        <Form>
              {" "}
              <select
                style={{marginTop:'30px',marginBottom:'30px'}}
                className="form-select col-12"
                name="checkbox"
                onChange={handleChange}
              >
                <option value="">--</option>
                <option value="Harassment">Harassment</option>
                <option value="AdultContent">Adult Content</option>
                <option value="HateSpeech">Hate Speech</option>
                <option value="Spam">Spam</option>
              </select>
          <Form.Group>
            <Form.Label as="h5">Something Else</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              type="text"
              placeholder="something else ..."
              name="body"
              onChange={handleChange}
            />
          </Form.Group>
          <Button
            variant="primary"
            onClick={(e) => {
              if (AuthReducer.isAuth) {
                e.preventDefault();
                handleClose();
                dispatch(addReport(post, report));
              } else {
                alert("Connect first (LINK TO LOGIN) ");
              }
            }}
          >
            Submit
          </Button>
          &nbsp;
          <Button variant="info" onClick={handleClose}>
            Cancel
          </Button>
        </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Report;
