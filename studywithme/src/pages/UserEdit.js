import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { ProfileEdit } from "../components/ProfileEdit";
import { PasswordEdit } from "../components/PasswordEdit";

const UserEdit = () => {
  const [passwordEditState, setPasswordEditState] = useState(true);
  console.log(passwordEditState);
  const showProfileEdit = () => {
    setPasswordEditState(true);
    console.log("닉네임수정실행");
  };

  const showPasswordEdit = () => {
    setPasswordEditState(false);
    console.log("비밀번호수정실행");
  };
  return (
    <React.Fragment>
      <MenuWrap>
        <li>
          <MenuItem onClick={showProfileEdit}>프로필 수정</MenuItem>
        </li>
        <li>
          <MenuItem onClick={showPasswordEdit}>비밀번호 변경</MenuItem>
        </li>
      </MenuWrap>

      <ContentDiv>
        {passwordEditState === true ? <ProfileEdit /> : <PasswordEdit />}
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
  }
`;

const ContentDiv = styled.div`
  margin-left: 25%;
  padding: 1px 16px;
  height: 1000px;
`;

export default UserEdit;