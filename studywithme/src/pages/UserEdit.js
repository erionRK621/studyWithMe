import React from "react";
import styled from "styled-components";

const UserEdit = () => {
  return (
    <React.Fragment>
      <MenuWrap>
        <li>
          <MenuItem>프로필 수정</MenuItem>
        </li>
        <li>
          <MenuItem>비밀번호 변경</MenuItem>
        </li>
      </MenuWrap>

      <ContentDiv>
        <h1>내용표시구간</h1>
      </ContentDiv>
    </React.Fragment>
  );
};

const MenuWrap = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 25%;
  background-color: #f1f1f1;
  position: fixed;
  height: 100%;
  overflow: auto;
`;
const MenuItem = styled.div`
  display: block;
  color: #000;
  padding: 8px 16px;
  text-decoration: none;
  :hover {
    background-color: red;
    border-radius: 10px;
  }
`;

const ContentDiv = styled.div`
  margin-left: 25%;
  padding: 1px 16px;
  height: 1000px;
`;

export default UserEdit;
