import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import styled from "styled-components";

import Input from "../elements/Input";
import Image from "../elements/Image";

export const PasswordEdit = () => {
  const dispatch = useDispatch();

  const [nickname, setNickname] = React.useState("");

  const changeNickname = (e) => {
    setNickname(e.target.value);
  };

  const userInfo = useSelector((state) => state.user.userInfo);
  const userPic = "http://3.34.44.44/" + userInfo.avatarUrl;

  console.log("user정보받아왔니", userInfo);

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
          <Input value={nickname} _onChange={changeNickname} />
        </InputWrap>
        <InputWrap>
          <Label>새 비밀번호</Label>
          <Input value={nickname} _onChange={changeNickname} />
        </InputWrap>
        <InputWrap>
          <Label>새 비밀번호 확인</Label>
          <Input value={nickname} _onChange={changeNickname} />
        </InputWrap>
      </InputList>
      <SubmitWrap>
        <Submit>변경하기</Submit>
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
