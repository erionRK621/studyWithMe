import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/mypage";
import { history } from "../redux/configStore";

import CardPost from "../components/CardPost";

const BookMarks = (props) => {
  const dispatch = useDispatch();

  const myBookmarkList = useSelector((state) => state.mypage.bookmarkedPosts);
  // console.log("마이북마크 받아왔니", myBookmarkList);

  const myPageUserId = props.myPageUserId;
  // console.log("myPageUserId", myPageUserId);

  useEffect(() => {
    dispatch(userActions.getBookMarkMiddleware(myPageUserId));
  }, []);
  return (
    <Wrap>
      <GridWrap>
        {myBookmarkList.map((p, idx) => {
          return (
            <ItemGrid key={p.postId}>
              <CardPost
                page="bookmark"
                {...p}
                onClick={() => {
                  history.push(`/detail/${p.postId}`);
                }}
              />
            </ItemGrid>
          );
        })}
      </GridWrap>
    </Wrap>
  );
};

BookMarks.defaultProps = {
  body: {
    imageCover: "https://t1.daumcdn.net/cfile/tistory/9937F94B5FF1FB7B0E",
    title: "제목",
    categorySpace: "방 안",
    categoryStudyMate: true,
    categoryInterest: "수능",
    avatarUrl:
      "https://newsimg.hankookilbo.com/cms/articlerelease/2017/01/22/201701222050082111_1.jpg",
    date: "2021-11-01T11:29:36.000Z",
    contentEditor: "내용",
    postId: 4,
    userId: 1,
  },
};
const Wrap = styled.div`
  max-width: 1090px;
  margin: auto;
  padding: 20px;
`;

const ItemGrid = styled.div`
  width: 33.33333%;
  box-sizing: border-box;
  padding: 0px 10px;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin-top: 20px;
  }
`;

const GridWrap = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 20px 0px;
  justify-content: flex-start;
`;
export default BookMarks;
