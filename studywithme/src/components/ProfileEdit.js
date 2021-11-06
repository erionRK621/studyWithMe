import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import styled from "styled-components";

import Input from "../elements/Input";
import Image from "../elements/Image";

export const ProfileEdit = () => {
  const dispatch = useDispatch();
  const [nickname, setNickname] = React.useState("");

  const changeNickname = (e) => {
    setNickname(e.target.value);
  };
  const userInfo = useSelector((state) => state.user.userInfo);
  const userId = useSelector((state) => state.user.userInfo.userId);
  const userPic = "http://3.34.44.44/" + userInfo.avatarUrl;

  console.log("닉네임", nickname);

  const editProfile = () => {
    dispatch(userActions.editProfileMiddleware(nickname));
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
          <ChangePic>프로필사진변경</ChangePic>
        </NicknameWrap>
      </NowInfoDiv>
      <InputWrap>
        <Label>닉네임변경</Label>
        <Input value={nickname} _onChange={changeNickname} />
        <Button>닉네임 중복확인</Button>
      </InputWrap>
      <SubmitWrap>
        <Submit onClick={editProfile}>변경하기</Submit>
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
const UserNickname = styled.div`
  margin-bottom: 10px;
`;
const ChangePic = styled.div``;
const InputWrap = styled.div`
  margin: 50px;
  display: flex;
`;
const Label = styled.div`
  min-width: 80px;
  margin: auto;
`;
const Button = styled.button`
  min-width: 80px;
`;
const SubmitWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const Submit = styled.button`
  width: 100px;
`;
