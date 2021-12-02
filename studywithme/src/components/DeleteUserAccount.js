import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import styled from "styled-components";
import { regExPasswordTest } from "../shared/regEx";
import Swal from "sweetalert2";
import axios from "axios";
import { apis } from "../lib/axios";

import Input from "../elements/Input";
import Image from "../elements/Image";
import dotenv from "dotenv";
dotenv.config();

export const DeleteUserAccount = (props) => {
  const dispatch = useDispatch();
  const userType = props.userType;
  const userInfo = useSelector((state) => state.user.userInfo);
  const userPic = `${process.env.REACT_APP_IMAGE_URI}/${userInfo.avatarUrl}`;
  const userId = useSelector((state) => state.user.userInfo.userId);

  console.log("userType", userType);

  const [password, setPassword] = useState("");

  const changePwdOld = (e) => {
    setPassword(e.target.value);
  };

  const deleteUserAccountInput = {
    password: password,
  };

  const deleteUserAccount = () => {
    apis
      .deleteUserAccountAxios(password)
      .then((result) => {
        Swal.fire(result.data.message, "", "success");
        dispatch(userActions.logOut());
        window.location("/");
      })
      .catch((error) => {
        Swal.fire(error.response.data.message, "", "error");
      })
  }

  useEffect(() => {
    dispatch(userActions.getUserDB(userId));
  }, [dispatch, userId]);

  return (
    <React.Fragment>
      <NowInfoDiv>
        {/* <PicDIv> */}
        <Image minWidth="100px" size="100" src={userPic}></Image>
        {/* </PicDIv> */}

        <NicknameWrap>
          <UserNickname>{userInfo.nickname}</UserNickname>
        </NicknameWrap>
      </NowInfoDiv>
      {userType === "local" ?
        <InputList>
          <InputWrap>
            <Label>비밀번호</Label>
            <PasswordInput
              value={password}
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={changePwdOld}
            />
          </InputWrap>
        </InputList>
        : null}
      <SubmitWrap>
        <Submit onClick={deleteUserAccount}>회원 탈퇴</Submit>
      </SubmitWrap>
    </React.Fragment>
  );
};

const NowInfoDiv = styled.div`
  display: flex;
  margin: 50px 0px 30px 0;
  justify-content: center;
`;

const NicknameWrap = styled.div`
  width: 200px;
  margin: auto 80px auto 20px;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  @media screen and (max-width: 768px) {
    font-size: 16px;
    width: 150px;
    margin-left: 20px;
  }
`;
const UserNickname = styled.div``;

const InputList = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputWrap = styled.div`
  margin: 20px auto;
  display: flex;
  width: 315px;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const PasswordInput = styled.input`
    bgColor="#E0E0E0"
    width="200px"
`;

const Label = styled.div`
  width: 350px;
  margin: auto;
  text-align: start;

  padding: 0 4px 0 0;
  @media screen and (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;
const SubmitWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  /* margin: auto; */
`;

const Submit = styled.button`
  min-width: 200px;
  height: 45px;
  font-size: 16px;
  background-color: #ffc85c;
  border-radius: 10px;
  width: 200px;
  border: none;
  padding: 8px 0px;
  margin-left: 5px;
  cursor: pointer;
`;
