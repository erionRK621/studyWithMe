import React, { useEffect, useState } from "react";
import styled from "styled-components";
import dotenv from "dotenv";
import { useSelector, useDispatch } from "react-redux";
import { AiTwotoneSetting } from "react-icons/ai";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as myActions } from "../redux/modules/mypage";
import { history } from "../redux/configStore";

import Image from "../elements/Image";
import FollowerModal from "./FollowerModal";
import FollowModal from "./FollowModal";

dotenv.config();

const UserInfo = (props) => {
  // console.log("props", props);

  const dispatch = useDispatch();

  const [followerModalOpen, setFollowerModalOpen] = useState(false);
  const [followModalOpen, setFollowModalOpen] = useState(false);

  const followerModalClose = () => {
    setFollowerModalOpen(!followerModalOpen);
  };
  const followModalClose = () => {
    setFollowModalOpen(!followModalOpen);
  };

  //state 조회
  const userInfo = useSelector((state) => state.user.userInfo);
  const followerList = useSelector((state) => state.mypage?.followerIdList);
  const followingList = useSelector((state) => state.mypage?.followingIdList);
  const userPic = `${process.env.REACT_APP_IMAGE_URI}/${userInfo?.avatarUrl}`;
  const myPageUserId = props.myPageUserId;
  const isMe = props.isMe;

  useEffect(() => {
    dispatch(userActions.getUserDB(myPageUserId));
    dispatch(myActions.getFollowingsMiddleware(myPageUserId));
    dispatch(myActions.getFollowersMiddleware(myPageUserId));
  }, []);

  return (
    <React.Fragment>
      <UserInfoWrap>
        <UserProfilePicWrap>
          <ProfilePic src={userPic} alt="Profile Pic" />
        </UserProfilePicWrap>
        <UserProfileWrap>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <UserNickname>{userInfo?.nickname}</UserNickname>
            {isMe ? (
              <UserInfoEditButton
                onClick={() => {
                  history.push("/userEdit/" + myPageUserId);
                }}
              >
                회원정보 수정
              </UserInfoEditButton>
            ) : null}
          </div>
          <BottomDiv>
            <div style={{ fontSize: "20px" }}>게시물 {userInfo?.postCnt}개</div>
            <Button onClick={followerModalClose}>
              팔로워 {followerList?.length}명
            </Button>
            {followerModalOpen && (
              <FollowerModal
                modalClose={followerModalClose}
                followerList={followerList}
              />
            )}
            <Button onClick={followModalClose}>
              팔로우 {followingList?.length}명
            </Button>
            {followModalOpen && (
              <FollowModal
                modalClose={followModalClose}
                followingList={followingList}
              />
            )}
          </BottomDiv>
        </UserProfileWrap>
      </UserInfoWrap>
    </React.Fragment>
  );
};

const UserInfoWrap = styled.div`
  margin-bottom: 44px;
  flex-direction: row;
  align-items: stretch;
  display: flex;
  flex-shrink: 0;
  padding: 0;
  position: relative;
`;

const UserProfilePicWrap = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  margin-right: 30px;
  flex-shrink: 0;
  align-items: stretch;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  position: relative;
`;

const ProfilePic = styled.img`
  height: 185px;
  width: 185px;
  border-radius: 50%;
  align-items: center;
  align-self: center;
  display: block;
  flex: none;
  justify-content: center;
`;

const UserProfileWrap = styled.section`
  flex-basis: 30px;
  flex-grow: 2;
  flex-shrink: 1;
  min-width: 0;
  align-items: stretch;
  display: flex;
  flex-direction: column;
  margin: 0 0 0 50px;
  padding: 0;
  position: relative;
`;

const UserNicknameWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UserNickname = styled.h2`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 300;
  font-size: 32px;
  line-height: 45px;
  margin: -5px 0 -6px;
`;

const UserInfoEditButton = styled.button`
  width: 120px;
  height: 32px;
  border: 0;
  border-radius: 4px;
  background: #ffc85c;
  color: black;
  cursor: pointer;
  font-size: 16px;
`;

const Button = styled.div`
  font-size: 20px;
  cursor: pointer;
`;

const BottomDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 50%;
  margin: auto;
`;

export default UserInfo;
