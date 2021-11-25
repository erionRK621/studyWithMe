import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";


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
  const user = useSelector((state) => state.user.user);
  console.log(user);
  // console.log("logInUserId", logInUserId, typeof (logInUserId));
  // console.log("myPageUserId", myPageUserId, typeof (myPageUserId));
  // console.log("isMe", isMe);

  const [postsTabSelected, setPostsTabSelected] = useState(true);

  const selectPostsTab = () => {
    setPostsTabSelected(true);
  };

  const selectBookMarksTab = () => {
    setPostsTabSelected(false);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      <Wrap>
        <HeaderWrap>
          <UserInfo myPageUserId={myPageUserId} isMe={isMe}></UserInfo>
        </HeaderWrap>
        {/* 탭 선택 섹션 */}
        <BtnWrap>
          <TabWrap>
            <PostsTab
              postsTabSelected={postsTabSelected}
              onClick={selectPostsTab}
            >
              {postsTabSelected ? <MyPostsTabOn /> : <MyPostsTabOff />}
              게시물
            </PostsTab>
          </TabWrap>

          {isMe ? (
            <TabWrap>
              <BookmarksTab
                onClick={selectBookMarksTab}
                postsTabSelected={postsTabSelected}
              >
                {postsTabSelected ? (
                  <MyBookmarksTabOff />
                ) : (
                  <MyBookmarksTabOn />
                )}
                북마크
              </BookmarksTab>
            </TabWrap>
          ) : null}
        </BtnWrap>
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
      </Wrap>
    </React.Fragment>
  );
};
const Wrap = styled.div`
  height: 100%;
  min-height: calc(100vh - 180px);
  margin: auto;
  max-width: 1134px;
  padding: 20px;
  @media screen and (max-width: 768px) {
    max-width: 768px;
  }
`;

const HeaderWrap = styled.div`
  margin-bottom: 0;
  flex-grow: 1;
  margin: 0 auto 30px 0;
  max-width: 1134px;
  align-items: stretch;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  @media screen and (max-width: 768px) {
    max-width: 768px;
  }
`;
const BtnWrap = styled.div`
  border-top: 1px solid rgba(var(--b38, 219, 219, 219), 1);
  width: 100%;
  max-width: 1134px;

  display: flex;
  justify-content: center;
  text-align: center;
  margin: auto;
  @media screen and (max-width: 768px) {
    max-width: 768px;
  }
`;

const TabWrap = styled.div`
  width: 50%;
  margin: 9px auto;
  display: flex;
`;

const PostsTab = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: auto;
  font-size: 20px;
  color: ${(props) => {
    const postsTabSelected = props.postsTabSelected;

    if (postsTabSelected === true) {
      return "#ffc85c";
    } else {
      return "#9e9d9d";
    }
  }};
`;

const BookmarksTab = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: auto;
  font-size: 20px;
  color: ${(props) => {
    const postsTabSelected = props.postsTabSelected;

    if (postsTabSelected === true) {
      return "#9e9d9d";
    } else {
      return "#ffc85c";
    }
  }};
`;

export default MyPage;

