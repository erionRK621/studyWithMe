import React from "react";
import styled from "styled-components";
import { AiTwotoneSetting } from "react-icons/ai";

import Image from "../elements/Image";
import Text from "../elements/Text";

const Mypage = () => {
  return (
    <React.Fragment>
      <UserInfo>
        <LeftDiv>
          <ProfileImg>
            <Image size="100"></Image>
          </ProfileImg>
        </LeftDiv>

        <RightDiv>
          <TopDiv>
            <AiTwotoneSetting cursor="pointer" size="1.7em"></AiTwotoneSetting>
          </TopDiv>
          <MiddleDiv>
            <Nickname>닉네임</Nickname>
          </MiddleDiv>
          <BottomDiv>
            <Text>게시글 1개</Text>
            <Text>팔로우 2명</Text>
            <Text>팔로잉 3명</Text>
          </BottomDiv>
        </RightDiv>
      </UserInfo>
      <div>포스트들</div>
    </React.Fragment>
  );
};

const UserInfo = styled.div`
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

export default Mypage;
