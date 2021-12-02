import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

// 컴포넌트
import { ProfileEdit } from "../components/ProfileEdit";
import { PasswordEdit } from "../components/PasswordEdit";
import { DeleteUserAccount } from "../components/DeleteUserAccount";


const UserEdit = (props) => {
  const userType = useSelector((state) => state.user.userInfo.provider);
  const [profileEditState, setProfileEditState] = useState(true);
  const [passwordEditState, setPasswordEditState] = useState(false);
  const [deleteAccountState, setDeleteAccountState] = useState(false);

  console.log("userType", userType);

  const showProfileEdit = () => {
    setProfileEditState(true);
    setPasswordEditState(false);
    setDeleteAccountState(false);
  };

  const showPasswordEdit = () => {
    setProfileEditState(false);
    setPasswordEditState(true);
    setDeleteAccountState(false);
  };

  const showDeleteAccount = () => {
    setProfileEditState(false);
    setPasswordEditState(false);
    setDeleteAccountState(true);
  }

  return (
    <React.Fragment>
      <Wrap>
        <MenuWrap>
          <li>
            <MenuItem onClick={showProfileEdit}>프로필 수정</MenuItem>
          </li>
          {userType === "local" ? (
            <li>
              <MenuItem onClick={showPasswordEdit}>비밀번호 변경</MenuItem>
            </li>
          ) : null}
          <li>
            <MenuItem onClick={showDeleteAccount}>회원 탈퇴</MenuItem>
          </li>
        </MenuWrap>
        <ContentDiv>
          {profileEditState ? <ProfileEdit /> :
            passwordEditState ? <PasswordEdit /> : <DeleteUserAccount userType={userType} />}
        </ContentDiv>
      </Wrap>
    </React.Fragment>
  );
}

const Wrap = styled.div`
  display: flex;
  min-height: calc(100vh - 180px);
  height: 100%;
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
  cursor: pointer;
`;

const ContentDiv = styled.div`
  padding: 1px 16px;
  height: 700px;
  width: 100%;
  @media screen and (max-width: 768px) {
    width: 80%;
    margin: auto;
  }
`;

export default UserEdit;
