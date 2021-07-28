import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  ListGroupItem,
  ListGroup,
  Container,
} from "react-bootstrap";
import { getMessages, readMsg } from "../../redux/action/messageAction";
import { Link } from "react-router-dom";
import { useState } from "react";

const MsgList = () => {
  const dispatch = useDispatch();
  const MsgReducer = useSelector((state:any) => state.MsgReducer);
  const [msgData, setMsgData] = useState(MsgReducer)
  // console.log(MsgReducer)
  console.log(msgData)
  const filter = (button:any) => {
    if(button === 'All'){
      return setMsgData(MsgReducer)
    }
    const filteredData = MsgReducer.filter((item:any)=>item.read === button )
    setMsgData(filteredData)
  }
  useEffect(() => {
    dispatch(getMessages());
  }, [dispatch]);
  useEffect(()=>{
    setMsgData(MsgReducer);
  }, [MsgReducer]);
  return (
    <div className="msg_container">
      <div
        className="msg_left_nav "
        style={{
          color: "white",
          fontWeight: 300,
          borderBottom: "1px solid #353535",
        }}
      ></div>
      <div className="msg_right col-xl-9">
        <div>
          <Container>
            <div className="btn-group">
              <button type='button' className="btn btn-primary" onClick={()=>filter('All')} >All</button>
              <button type='button' className="btn btn-primary" onClick={()=>filter(true)} >Read</button>
              <button type='button' className="btn btn-primary" onClick={()=>filter(false)} >Unread</button>
            </div>
          </Container>
          {msgData.map((msg:any, i:any) => (
              <div key={i} >
                <Card  style={{ margin: 25 }}>
                  <Card.Body>
                    <Card.Title>{msg.subject}</Card.Title>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>{msg.body}</ListGroupItem>
                    <ListGroupItem>{msg.name}</ListGroupItem>
                    <ListGroupItem>{msg.email}</ListGroupItem>
                  </ListGroup>
                  <Card.Body style={{ textAlign: "center" }}>
                    <Card.Link as={Link} to={`/admin/message/${msg._id}`} >
                    <button type='button' className="btn btn-primary" onClick={()=>[dispatch(readMsg(msg._id))]} >See full message</button>  
                    </Card.Link>
                  </Card.Body>
                </Card>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MsgList;
