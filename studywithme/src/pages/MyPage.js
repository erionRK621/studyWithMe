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
  const logInUserId = useSelector(
    (state) => state.user.user
  )?.userId.toString();
  // 현재 조회 중인 마이페이지의 사용자 아이디
  const myPageUserId = props.match.params.id;
  const isMe = logInUserId === myPageUserId ? true : false;

  // console.log("logInUserId", logInUserId, typeof (logInUserId));
  // console.log("myPageUserId", myPageUserId, typeof (myPageUserId));
  // console.log("isMe", isMe);

  const [myPostsSelected, setMyPostsSelected] = useState(true);
  console.log("myPostsSelected", myPostsSelected);

  const selectMyPosts = () => {
    setMyPostsSelected(true);
  };

  const selectMyBookMarks = () => {
    setMyPostsSelected(false);
  };

  return (
    <React.Fragment>
      <HeaderWrap>
        <UserInfo myPageUserId={myPageUserId} isMe={isMe}></UserInfo>
      </HeaderWrap>

      {/* 탭 선택 섹션 */}
      {myPostsSelected === true ? (
        // MyPostsTab 선택한 경우
        // myPostsSelected = true
        <BtnWrap>
          <TabWrap>
            <MyPostsTab myPostsSelected={myPostsSelected}>
              <MyPostsTabOn />
              게시물 ON
            </MyPostsTab>
          </TabWrap>
          <TabWrap>
            {isMe ? (
              <MyBookmarksTab
                onClick={selectMyBookMarks}
                myPostsSelected={myPostsSelected}
              >
                <MyBookmarksTabOff />
                북마크 OFF
              </MyBookmarksTab>
            ) : null}
          </TabWrap>
        </BtnWrap>
      ) : (
        // MyBookmarksTab 선택한 경우
        // myPostsSelected = false
        <BtnWrap>
          <TabWrap>
            <MyPostsTab
              onClick={selectMyPosts}
              myPostsSelected={myPostsSelected}
            >
              <MyPostsTabOff />
              게시물 OFF
            </MyPostsTab>
          </TabWrap>
          <TabWrap>
            {isMe ? (
              <MyBookmarksTab myPostsSelected={myPostsSelected}>
                <MyBookmarksTabOn />
                북마크 ON
              </MyBookmarksTab>
            ) : null}
          </TabWrap>
        </BtnWrap>
      )}
      {/* 포스트 카드 섹션 */}
      {myPostsSelected === true ? (
        <MyPosts
          myPageUserId={myPageUserId}
          myPostsSelected={myPostsSelected}
        />
      ) : (
        <BookMarks
          myPageUserId={myPageUserId}
          myPostsSelected={myPostsSelected}
        />
      )}
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
`;
const BtnWrap = styled.div`
  border-top: 1px solid rgba(var(--b38, 219, 219, 219), 1);
  width: 100%;
  max-width: 1090px;
  display: flex;
  justify-content: center;
  text-align: center;
  margin: auto;
`;

const TabWrap = styled.div`
  width: 100%;
  margin: 9px auto;
  display: flex;
`;

const MyPostsTab = styled.div`
<<<<<<< HEAD:studywithme/src/pages/Mypage.js
cursor: pointer;
display: flex;
align-items: center;
margin: auto;
font-size: 20px;
color: 
${(myPostsSelected) => {
    console.log("myPostsSelected ::::: ", myPostsSelected);
    return (
      myPostsSelected?
        `#ffc85c;` : `#9e9d9d;`
    )
=======
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: auto;
  font-size: 20px;
  color: ${(myPostsSelected) => {
    console.log("myPostsSelected", myPostsSelected);
    return myPostsSelected === true ? `#ffc85c;` : `#9e9d9d;`;
>>>>>>> 36ed35c6a45c430919bc89f279770b9af0a3f46a:studywithme/src/pages/MyPage.js
  }};
`;

const MyBookmarksTab = styled.div`
<<<<<<< HEAD:studywithme/src/pages/Mypage.js
cursor: pointer;
margin: 10px auto;
display: flex;
align-items: center;
font-size: 20px;
color: 
${(myPostsSelected) => {
    console.log("myPostsSelected ::::: ", myPostsSelected);
    return (
      myPostsSelected?
        `#9e9d9d;` : `#ffc85c;`
    )
=======
  cursor: pointer;
  margin: 10px auto;
  display: flex;
  align-items: center;
  font-size: 20px;
  color: ${(myPostsSelected) => {
    console.log("myPostsSelected", myPostsSelected);
    return myPostsSelected === true ? `#9e9d9d;` : `#ffc85c;`;
>>>>>>> 36ed35c6a45c430919bc89f279770b9af0a3f46a:studywithme/src/pages/MyPage.js
  }};
`;

const PostWrap = styled.div`
<<<<<<< HEAD:studywithme/src/pages/Mypage.js
width: 100%;
=======
  width: 100 %;
>>>>>>> 36ed35c6a45c430919bc89f279770b9af0a3f46a:studywithme/src/pages/MyPage.js
`;

export default MyPage;
