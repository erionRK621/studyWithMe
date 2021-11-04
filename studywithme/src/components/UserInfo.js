import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { AiTwotoneSetting } from "react-icons/ai";
import { actionCreators as userActions } from "../redux/modules/user";

import Image from "../elements/Image";
import Text from "../elements/Text";

const UserInfo = (props) => {
  const dispatch = useDispatch();
  const { history } = props;

  //state 조회
  const userInfo = useSelector((state) => state.user.userInfo);
  const userPic = "http://3.35.235.79/" + userInfo.avatarUrl;

  console.log("user정보받아왔니", userInfo);

  useEffect(() => {
    dispatch(userActions.getUserDB());
  }, []);
  return (
    <React.Fragment>
      <UserInfoWrap>
        <LeftDiv>
          <ProfileImg>
            <Image size="100" src={userPic}></Image>
          </ProfileImg>
        </LeftDiv>

        <RightDiv>
          <TopDiv>
            <AiTwotoneSetting cursor="pointer" size="1.7em"></AiTwotoneSetting>
          </TopDiv>
          <MiddleDiv>
            <Nickname>{userInfo.nickname}</Nickname>
          </MiddleDiv>
          <BottomDiv>
            <Text>게시글 {userInfo.postCnt}개</Text>
            <Text>팔로우 2명</Text>
            <Text>팔로잉 3명</Text>
          </BottomDiv>
        </RightDiv>
      </UserInfoWrap>
    </React.Fragment>
  );
};

const UserInfoWrap = styled.div`
  width: 100%;
  height: 300px;
  background-color: lightgray;
  display: flex;
  margin: auto;
`;
const LeftDiv = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProfileImg = styled.div`
  height: 77px;
  width: 77px;
`;

const RightDiv = styled.div`
  width: 70%;
  height: 100%;
`;
const TopDiv = styled.div`
  display: flex;
  height: 10%;
  flex-direction: row-reverse;
`;
const MiddleDiv = styled.div`
  display: flex;
  height: 40%;
  padding: 40px 40px 40px 60px;
`;
const Nickname = styled.div`
  font-size: 48px;
`;

const BottomDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 50%;
  margin: auto;
`;

export default UserInfo;
