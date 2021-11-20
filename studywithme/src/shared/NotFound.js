import React from "react";
import {history} from "../redux/configStore";
const NotFound = (props) => {
  return (
    <div style={{ paddingTop:"50px"}}>
      존재하지 않는 페이지입니다.
      <br />
      <h1>404</h1><br/>
      <button onClick={()=>{history.goBack()}}>돌아가기</button>
    </div>
  );
};

export default NotFound;
