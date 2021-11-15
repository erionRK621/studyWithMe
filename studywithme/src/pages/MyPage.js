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

  const [postsTabSelected, setPostsTabSelected] = useState(true);
  console.log("postsSelected", postsTabSelected, typeof (postsTabSelected));

  const selectPostsTab = () => {
    setPostsTabSelected(true);
    console.log("게시물 탭 선택");
  };

  const selectBookMarksTab = () => {
    setPostsTabSelected(false);
    console.log("북마크 탭 선택");
  };

  return (
    <React.Fragment>
      <HeaderWrap>
        <UserInfo myPageUserId={myPageUserId} isMe={isMe}></UserInfo>
      </HeaderWrap>

      {/* 탭 선택 섹션 */}
      {postsTabSelected === true ? (
        // MyPostsTab 선택한 경우? postsTabSelected = true
        <BtnWrap>
          <TabWrap>
            <PostsTab postsTabSelected={postsTabSelected}>
              <MyPostsTabOn />
              게시물
            </PostsTab>
          </TabWrap>
          <TabWrap>
            {isMe ? (
              <BookmarksTab
                onClick={selectBookMarksTab}
                postsTabSelected={postsTabSelected}
              >
                <MyBookmarksTabOff />
                북마크
              </BookmarksTab>
            ) : null}
          </TabWrap>
        </BtnWrap>
      ) : (
        // MyBookmarksTab 선택한 경우? postsTabSelected = false
        <BtnWrap>
          <TabWrap>
            <PostsTab
              onClick={selectPostsTab}
              postsTabSelected={postsTabSelected}
            >
              <MyPostsTabOff />
              게시물
            </PostsTab>
          </TabWrap>
          <TabWrap>
            {isMe ? (
              <BookmarksTab postsTabSelected={postsTabSelected}>
                <MyBookmarksTabOn />
                북마크
              </BookmarksTab>
            ) : null}
          </TabWrap>
        </BtnWrap>
      )}
      {/* 포스트 카드 섹션 */}
      {postsTabSelected === true ? (
        <MyPosts
          myPageUserId={myPageUserId}
          postsTabSelected={postsTabSelected}
        />
      ) : (
        <BookMarks
          myPageUserId={myPageUserId}
          postsTabSelected={postsTabSelected}
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

const PostsTab = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: auto;
  font-size: 20px;
  color: ${props => {
    const postsTabSelected = props.postsTabSelected;

    if (postsTabSelected === true) {
      return '#ffc85c';
    }
    else {
      return '#9e9d9d';
    }
  }};
`;

const BookmarksTab = styled.div`
cursor: pointer;
margin: 10px auto;
display: flex;
align-items: center;
font-size: 20px;
color: ${props => {
    const postsTabSelected = props.postsTabSelected;

    if (postsTabSelected === true) {
      return '#9e9d9d';
    }
    else {
      return '#ffc85c';
    }
  }};
`;

const PostWrap = styled.div`
width: 100 %;
`;

export default MyPage;