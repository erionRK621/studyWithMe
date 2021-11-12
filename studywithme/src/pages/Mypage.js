import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/mypage";

import { ReactComponent as MyPostsTabOn } from "../icon/MyPostsTabOn.svg";
import { ReactComponent as MyPostsTabOff } from "../icon/MyPostsTabOff.svg";
import { ReactComponent as MyBookmarksTabOn } from "../icon/MyBookmarksTabOn.svg";
import { ReactComponent as MyBookmarksTabOff } from "../icon/MyBookmarksTabOff.svg";

import MyPosts from "../components/MyPosts";
import BookMarks from "../components/BookMarks";
import UserInfo from "../components/UserInfo";

const MyPage = (props) => {
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
        <TabWrap>
          <MyPostsTabOff />
          <MyPostsTab onClick={showMyPosts}>게시물</MyPostsTab>
        </TabWrap>
        <TabWrap>
          {isMe ?
            <MyBookmarksTab onClick={showMyBookMarks}>북마크 </MyBookmarksTab>
            :
            null
          }
        </TabWrap>
      </BtnWrap>
      {myPostsSelected === true ? <MyPosts myPageUserId={myPageUserId} myPostsSelected={myPostsSelected} /> : <BookMarks myPageUserId={myPageUserId} myPostsSelected={myPostsSelected} />}
    </React.Fragment>
  );
};

const HeaderWrap = styled.div`
padding: 30px 20px 0;
width: calc(100%-40px);
margin-bottom: 0;
flex-grow: 1;
margin: 0 auto 30px;
max-width: 1090px;
align-items: stretch;
display: flex;
flex-direction: column;
flex-shrink: 0;
`
const BtnWrap = styled.div`
  border-top: 1px solid rgba(var(--b38,219,219,219),1);
  width: 100%;
  max-width: 1090px;
  display: flex;
  justify-content: center;
  text-align: center;
  margin: auto;
`;

const TabWrap = styled.div`
  width: 100%;
  margin: 10px auto;
  display: flex;
`;

const MyPostsTab = styled.div`
  margin: auto;
  font-size: 20px;
  font-color: #9e9d9d;
  :hover {
    color: #ffc85c;
  }
`;

const MyBookmarksTab = styled.div`
  margin: 10px auto;
  font-size: 20px;
  font-color: #9e9d9d;
  :hover {
    color: #ffc85c;
  }
`;

const PostWrap = styled.div`
  width: 100%;
`;

export default MyPage;