import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import styled from "styled-components";

import Input from "../elements/Input";
import Image from "../elements/Image";
import dotenv from "dotenv";
dotenv.config();

export const PasswordEdit = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const userPic = `${process.env.REACT_APP_IMAGE_URI}/${userInfo.avatarUrl}`;

  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [confirmPasswordNew, setconfirmPasswordNew] = useState("");

  const changePwdOld = (e) => {
    setPasswordOld(e.target.value);
  };
  const changePwdNew = (e) => {
    setPasswordNew(e.target.value);
  };
  const ConfirmPwdNew = (e) => {
    setconfirmPasswordNew(e.target.value);
  };

  const editPwdInputs = {
    passwordOld: passwordOld,
    passwordNew: passwordNew,
    confirmPasswordNew: confirmPasswordNew,
  };

  const editPwd = () => {
    dispatch(userActions.editPwdMiddleware(editPwdInputs));
    setPasswordOld("");
    setPasswordNew("");
    setconfirmPasswordNew("");
  };

  useEffect(() => {
    dispatch(userActions.getUserDB());
  }, []);

  return (
    <React.Fragment>
      <NowInfoDiv>
        <Image style={{ width: "30%" }} size="100" src={userPic}></Image>
        <NicknameWrap>
          <UserNickname>{userInfo.nickname}</UserNickname>
        </NicknameWrap>
      </NowInfoDiv>
      <InputList>
        <InputWrap>
          <Label>이전 비밀번호</Label>
          <Input
            value={passwordOld}
            type="password"
            placeholder="이전 비밀번호를 입력해주세요"
            _onChange={changePwdOld}
          />
        </InputWrap>
        <InputWrap>
          <Label>새 비밀번호</Label>
          <Input
            value={passwordNew}
            type="password"
            placeholder="새로운 비밀번호를 입력해주세요"
            _onChange={changePwdNew}
          />
        </InputWrap>
        <InputWrap>
          <Label>새 비밀번호 확인</Label>
          <Input
            value={confirmPasswordNew}
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
            _onChange={ConfirmPwdNew}
          />
        </InputWrap>
      </InputList>
      <SubmitWrap>
        <Submit onClick={editPwd}>확인</Submit>
      </SubmitWrap>
    </React.Fragment>
  );
};

const NowInfoDiv = styled.div`
  display: flex;
  margin: 50px;
`;

const NicknameWrap = styled.div`
  width: 70%;
  margin: auto;
  display: flex;
  flex-direction: column;
`;
const UserNickname = styled.div``;

const InputList = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputWrap = styled.div`
  margin: 20px 0;
  display: flex;
  width: 600px;
`;
const Label = styled.div`
  width: 300px;
  margin: auto;
  text-align: right;
  padding: 0 4px 0 0;
`;
const SubmitWrap = styled.div`
  display: flex;
  justify-content: start;
  margin-left: 396px;
`;

const Submit = styled.button`
  min-width: 80px;
  height: 45px;
  font-size: 16px;
  background-color: #ffc85c;
  border-radius: 10px;
  width: 100px;
  border: none;
  padding: 8px 0px;
  margin-left: 5px;
`;
