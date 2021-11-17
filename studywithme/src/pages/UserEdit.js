import React, { useState } from "react";
import styled from "styled-components";

import { ProfileEdit } from "../components/ProfileEdit";
import { PasswordEdit } from "../components/PasswordEdit";
import Header from "../shared/Header";

const UserEdit = (props) => {
  const userId = props.match.params.id;

  const [passwordEditState, setPasswordEditState] = useState(true);

  const showProfileEdit = () => {
    setPasswordEditState(true);
  };

  const showPasswordEdit = () => {
    setPasswordEditState(false);
  };
  return (
    <React.Fragment>
      {/* <HeaderMenu>
        <li>
          <MenuItem onClick={showProfileEdit}>프로필 수정</MenuItem>
        </li>
        <li>
          <MenuItem onClick={showPasswordEdit}>비밀번호 변경</MenuItem>
        </li>
      </HeaderMenu> */}
      <Wrap>
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
      </Wrap>
    </React.Fragment>
  );
};

// const HeaderMenu = styled.div`
//   @media screen and (min-width: 768px) {
//     display: none;
//   }
//   @media screen and (max-width: 768px) {
//     display: flex;
//     justify-content: space-evenly;
//   }
// `;

const Wrap = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const MenuWrap = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  min-width: 140px;
  height: 100%;
  overflow: none;
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: space-evenly;
  }
`;
const MenuItem = styled.div`
  display: block;
  color: #000;
  padding: 8px 16px;
  text-decoration: none;
  :hover {
    color: #ffc85c;
  }
`;

const ContentDiv = styled.div`
  padding: 1px 16px;
  height: 700px;
  width: 100%;
`;

export default UserEdit;
