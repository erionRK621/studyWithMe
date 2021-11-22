import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import styled from "styled-components";
import { regExPasswordTest } from "../shared/regEx";

import Input from "../elements/Input";
import Image from "../elements/Image";
import dotenv from "dotenv";
dotenv.config();

export const PasswordEdit = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  console.log(userInfo.email);
  const userPic = `${process.env.REACT_APP_IMAGE_URI}/${userInfo.avatarUrl}`;
  const userId = useSelector((state) => state.user.userInfo.userId);

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
    // 비밀번호 규칙 확인
    if (!regExPasswordTest(editPwdInputs.passwordNew)) {
      window.alert(
        "비밀번호는 영문, 숫자, 특수 문자를 포함하여 8자 이상이어야 합니다."
      );
      // console.log("비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다.");
      return;
    }
    // 비밀번호 일치 여부 확인
    else if (editPwdInputs.passwordNew !== editPwdInputs.confirmPasswordNew) {
      window.alert("비밀번호가 일치하지 않습니다.");
      // console.log("비밀번호가 일치하지 않습니다.");
      return;
    } else if (
      userInfo.email.split("@")[0].match(editPwdInputs.passwordNew) !== null ||
      editPwdInputs.passwordNew.match(userInfo.email.split("@")[0]) !== null
    ) {
      window.alert("이메일이 포함된 비밀번호는 사용할 수 없습니다.");
      return;
    } else {
      dispatch(userActions.editPwdMiddleware(editPwdInputs));
    }

    setPasswordOld("");
    setPasswordNew("");
    setconfirmPasswordNew("");
  };

  useEffect(() => {
    dispatch(userActions.getUserDB(userId));
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
            bgColor="#E0E0E0"
            value={passwordOld}
            type="password"
            placeholder="이전 비밀번호를 입력해주세요"
            _onChange={changePwdOld}
            width="200px"
          />
        </InputWrap>
        <InputWrap>
          <Label>새 비밀번호</Label>
          <Input
            bgColor="#E0E0E0"
            value={passwordNew}
            type="password"
            placeholder="새로운 비밀번호를 입력해주세요"
            _onChange={changePwdNew}
            width="200px"
          />
        </InputWrap>
        <InputWrap>
          <Label>새 비밀번호 확인</Label>
          <Input
            bgColor="#E0E0E0"
            value={confirmPasswordNew}
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
            _onChange={ConfirmPwdNew}
            width="200px"
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
  margin: 50px 0px 30px 0;
  justify-content: center;
`;

const NicknameWrap = styled.div`
  width: 120px;
  margin: auto 80px auto 20px;
  display: flex;
  flex-direction: column;
  font-size: 36px;
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
`;
const Label = styled.div`
  width: 350px;
  margin: auto;
  text-align: right;
  padding: 0 4px 0 0;
`;
const SubmitWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  /* margin: auto; */
`;

const Submit = styled.button`
  min-width: 80px;
  height: 45px;
  font-size: 16px;
  background-color: #ffc85c;
  border-radius: 10px;
  width: 320px;
  border: none;
  padding: 8px 0px;
  margin-left: 5px;
`;
