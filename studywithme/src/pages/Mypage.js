import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/mypage";

import MyPosts from "../components/MyPosts";
import BookMarks from "../components/BookMarks";
import UserInfo from "../components/UserInfo";

const Mypage = (props) => {
  // 현재 로그인 된 사용자 아이디
  const logInUserId = useSelector((state) => state.user.user)?.userId.toString();
  // 현재 조회 중인 마이페이지의 사용자 아이디
  const myPageUserId = props.match.params.id;
  const isMe = (logInUserId === myPageUserId) ? true : false;

  // console.log("logInUserId", logInUserId, typeof (logInUserId));
  // console.log("myPageUserId", myPageUserId, typeof (myPageUserId));
  console.log("isMe", isMe);

  const [myPostsSelected, setMyPostsSelected] = useState(true);

  const showMyPosts = () => {
    setMyPostsSelected(true);
    console.log("게시물 탭 실행");
  };

  const showMyBookMarks = () => {
    setMyPostsSelected(false);
    console.log("북마크 탭실행");
  };

  return (
    <React.Fragment>
      <HeaderWrap>
        <UserInfo myPageUserId={myPageUserId} isMe={isMe}></UserInfo>
      </HeaderWrap>
      <BtnWrap>
        <Mypost onClick={showMyPosts}>게시물</Mypost>
        {isMe ? <MyBookMark onClick={showMyBookMarks}>북마크</MyBookMark> : null}
      </BtnWrap>
      {myPostsSelected === true ? <MyPosts myPageUserId={myPageUserId} /> : <BookMarks myPageUserId={myPageUserId} />}
    </React.Fragment>
  );
};

const HeaderWrap = styled.div`
padding: 30px 20px 0;
width: calc(100%-40px);
margin-bottom: 0;
flex-grow: 1;
margin: 0 auto 30px;
max-width: 935px;
align-items: stretch;
display: flex;
flex-direction: column;
flex-shrink: 0;
`


const BtnWrap = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  margin: 20px;
`;
const Mypost = styled.div`
  width: 50%;
  ::active {
    border-bottom: gray;
  }
`;

const MyBookMark = styled.div`
  width: 50%;
`;
const PostWrap = styled.div`
  width: 100%;
`;

export default Mypage;
