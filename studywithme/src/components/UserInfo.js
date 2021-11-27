import React, { useEffect, useState } from "react";
import styled from "styled-components";
import dotenv from "dotenv";
import { useSelector, useDispatch } from "react-redux";

import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as myActions } from "../redux/modules/mypage";
import { history } from "../redux/configStore";

import FollowerModal from "./FollowerModal";
import FollowModal from "./FollowModal";

dotenv.config();

const UserInfo = (props) => {

  const dispatch = useDispatch();

  const [followerModalOpen, setFollowerModalOpen] = useState(false);
  const [followModalOpen, setFollowModalOpen] = useState(false);

  const followerModalClose = () => {
    setFollowerModalOpen(!followerModalOpen);
  };
  const followModalClose = () => {
    setFollowModalOpen(!followModalOpen);
  };
  const changeFollowState = (userId, isFollowing) => {
    if (isFollowing) {
      dispatch(userActions.unfollowUserMiddleware(userId));
    } else {
      dispatch(userActions.followUserMiddleware(userId));
    }
  };

  //state 조회
  const userInfo = useSelector((state) => state.user.userInfo);
  const isFollowing = useSelector((state) => state.user.isFollowing);
  const followerList = useSelector((state) => state.mypage?.followerIdList);
  const followingList = useSelector((state) => state.mypage?.followingIdList);
  const userPic = `${process.env.REACT_APP_IMAGE_URI}/${userInfo?.avatarUrl}`;
  const myPageUserId = props.myPageUserId;
  const isMe = props.isMe;

  useEffect(() => {
    dispatch(userActions.getUserDB(myPageUserId));
    dispatch(myActions.getFollowingsMiddleware(myPageUserId));
    dispatch(myActions.getFollowersMiddleware(myPageUserId));
  }, [dispatch,myPageUserId]);

  return (
    <React.Fragment>
      <UserInfoWrap>
        <UserProfilePicWrap>
          <ProfilePic src={userPic} alt="Profile Pic" />
        </UserProfilePicWrap>
        <UserProfileWrap>
          <NicknameWrap>
            <UserNickname>{userInfo?.nickname}</UserNickname>
            {isMe ? (
              <UserInfoEditButton
                onClick={() => {
                  history.push("/userEdit/" + myPageUserId);
                }}
              >
                회원정보 수정
              </UserInfoEditButton>
            ) : (
              <FollowButton
                onClick={() => {
                  changeFollowState(userInfo.userId, isFollowing);
                }}
              >
                {isFollowing ? "언팔로우" : "팔로우"}
              </FollowButton>
            )}
          </NicknameWrap>
          <BottomDiv>
            <Post>게시물 {userInfo?.postCnt}개</Post>
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
  @media screen and (max-width: 768px) {
    margin: 0px;
  }
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
  @media screen and (max-width: 768px) {
    height: 150px;
    width: 150px;
    margin: auto;
  }
`;
const NicknameWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: 50%;
    margin: 20px 0px;
  }
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
  @media screen and (max-width: 768px) {
    height: 50%;
    margin: auto 20px;
  }
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
  width: 70%;
  text-align: center;
  @media screen and (max-width: 768px) {
    font-size: 20px;
    min-width: 200px;
  }
`;

const UserInfoEditButton = styled.button`
  width: 120px;
  height: 32px;
  border: 0;
  border-radius: 10px;
  background: #ffc85c;
  color: black;
  cursor: pointer;
  font-size: 16px;
  @media screen and (max-width: 768px) {
    width: 80px;
    font-size: 8px;
    height: 24px;
  }
`;

const FollowButton = styled.button`
  width: 120px;
  height: 32px;
  border: 0;
  border-radius: 10px;
  background: #ffc85c;
  color: black;
  cursor: pointer;
  font-size: 16px;
  @media screen and (max-width: 768px) {
    width: 80px;
    font-size: 8px;
    height: 24px;
  }
`;
const Post = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    font-size: 13px;
    margin: 4px auto;
  }
`;

const Button = styled.div`
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    font-size: 13px;
    margin: 4px auto;
  }
`;

const BottomDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 50%;
  margin: auto;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    width: 100%;
    margin: auto;
    height: 50%;
  }
`;

export default UserInfo;
