import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/mypage";

import MyPosts from "../components/MyPosts";
import BookMarks from "../components/BookMarks";

import UserInfo from "../components/UserInfo";

const Mypage = (props) => {
  const [bookMarkState, setBookMarkState] = useState(false);

  const userId = props.match.params.id;

  const showMyPost = () => {
    setBookMarkState(false);
    console.log("내가쓴게시물실행");
  };

  const showBookMark = () => {
    setBookMarkState(true);
    console.log("북마크한게시물실행");
  };

  return (
    <React.Fragment>
      <UserInfo userId={userId}></UserInfo>
      <BtnWrap>
        <Mypost onClick={showMyPost}>작성한 게시물</Mypost>
        <MyBookMark onClick={showBookMark}>북마크한 게시물</MyBookMark>
      </BtnWrap>
      {bookMarkState === true ? <BookMarks /> : <MyPosts />}
    </React.Fragment>
  );
};

const BtnWrap = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  margin: 20px;
`;
const Mypost = styled.div`
  width: 50%;
`;

const MyBookMark = styled.div`
  width: 50%;
`;
const PostWrap = styled.div`
  width: 100%;
`;

export default Mypage;
