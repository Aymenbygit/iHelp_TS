import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../Administrator/AdminLayout";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./cs.css";
import { deleteOps, getOps, getOpsbyId } from "../../redux/action/postAction";
import {
  addFav,
  allUsers,
  loadUser,
  removeFav,
} from "../../redux/action/authAction";
import { useEffect } from "react";
const Try = () => {

  return (
    <div>
      <div className="success-msg">
        <i className="fa fa-check"></i>message
      </div>
      
    </div>
  );
};

export default Try;
