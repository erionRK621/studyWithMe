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
  const userPic = `${process.env.REACT_APP_API_URI}/${userInfo.avatarUrl}`;

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
          <Input value={passwordOld} type="password" _onChange={changePwdOld} />
        </InputWrap>
        <InputWrap>
          <Label>새 비밀번호</Label>
          <Input value={passwordNew} type="password" _onChange={changePwdNew} />
        </InputWrap>
        <InputWrap>
          <Label>새 비밀번호 확인</Label>
          <Input
            value={confirmPasswordNew}
            type="password"
            _onChange={ConfirmPwdNew}
          />
        </InputWrap>
      </InputList>
      <SubmitWrap>
        <Submit onClick={editPwd}>변경하기</Submit>
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
`;
const Label = styled.div`
  min-width: 110px;
  margin: auto;
  text-align: right;
  padding: 0 4px 0 0;
`;
const SubmitWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const Submit = styled.button`
  width: 100px;
`;
