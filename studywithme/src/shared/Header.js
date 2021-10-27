import React from "react";
import styled from "styled-components";

export const Header = () => {
  return (
    <HeaderWrap>
      <Wrap>
        <ImageGrid>
          <IMG />
        </ImageGrid>
        <TextGrid>
          <Text>홈</Text>
          <Text>게시글 조회 페이지</Text>
          <Text>상세페이지</Text>
          <Text>마이페이지(아이콘)</Text>
          <Text>로그아웃</Text>
          <Text>알림</Text>
        </TextGrid>
      </Wrap>
    </HeaderWrap>
  );
};

const HeaderWrap = styled.div`
  height: 80px;
  width: 100%;
  background-color: black;
  position: fixed;
  z-index: 10;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: left;
  text-align: center;
`;

const Wrap = styled.div`
  max-width: 900px;
  width: 100%;
  background-color: black;
  display: flex;
  margin: 10px;
  align-items: center;
`;

const ImageGrid = styled.div`
  width: 100px;
  align-items: center;
`;

const TextGrid = styled.div`
  margin: 0 0 0 40px;
  padding: 5px 0 5px 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-width: 700px;
`;

const Text = styled.div`
  color: #ffffff;
  font-size: 14px;
  margin: 0px 12px;

  :hover {
    cursor: pointer;
  }
`;

const IMG = styled.img`
  max-width: 160px;
  :hover {
    cursor: pointer;
  }
`;
export default Header;
