import React from "react";
import styled from "styled-components";
import Image from "../elements/Image";
import Text from "../elements/Text";

const Mypage = () => {
  return (
    <React.Fragment>
      <UserInfo>
        <LeftDiv>
          <Image>프로필 사진</Image>
        </LeftDiv>

        <RightDiv>
          <UpDiv>
            <Text>닉네임</Text>
            <EditBtn>수정버튼</EditBtn>
          </UpDiv>
          <DownDiv>
            <Text>게시글 1개</Text>
            <Text>팔로우 2명</Text>
            <Text>팔로잉 3명</Text>
          </DownDiv>
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
`;
const RightDiv = styled.div`
  width: 70%;
  height: 100%;
`;
const UpDiv = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50%;
  padding: 40px;
  padding-right: 0;
`;
const DownDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 50%;
  margin: auto;
`;
const EditBtn = styled.button``;

export default Mypage;
