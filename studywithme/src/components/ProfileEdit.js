import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import styled from "styled-components";

import Input from "../elements/Input";
import Image from "../elements/Image";
import Upload from "./Upload";
import dotenv from "dotenv";
dotenv.config();

export const ProfileEdit = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const userId = useSelector((state) => state.user.user?.userId);
  console.log(userInfo.avatarUrl);

  const [userPic, setUserPic] = React.useState(
    `${process.env.REACT_APP_API_URI}/${userInfo.avatarUrl}`
  );
  const dispatch = useDispatch();
  const [nickname, setNickname] = React.useState(userInfo?.nickname);
  const [selectedFile, setSelectedFile] = React.useState(null);

  const nicknameCheckInput = { nickname: nickname };
  console.log("닉네임", nickname);

  const changeNickname = (e) => {
    setNickname(e.target.value);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();

    // 미리보기를 위해 file을 읽어온다
    if (file && file.type.match("image.*")) {
      reader.readAsDataURL(file);
    } else {
      setUserPic("");
    }

    reader.onloadend = () => {
      const imagePreview = reader.result;
      //base64로 된 이미지를 가져온다(string형태)
      setUserPic(imagePreview);
    };
  };

  // formData라는 instance에 담아 보냄
  // const handleFileUpload = () => {
  //   const formData = new FormData();
  //   formData.append("file", selectedFile);
  //   for (let entry of formData.entries()) {
  //     console.log(entry);
  //   }
  // };

  const editProfile = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("nicknameNew", nickname);
    dispatch(userActions.editProfileMiddleware(userId, formData));
  };

  const onClickNicknameCheck = () => {
    // console.log("nicknameCheckInput", nicknameCheckInput);
    if (nicknameCheckInput.nickname === "") {
      window.alert("닉네임을 입력해주세요");
    } else {
      dispatch(userActions.checkNicknameMiddleware(nicknameCheckInput));
    }
  };

  useEffect(() => {
    dispatch(userActions.getUserDB());
  }, []);
  return (
    <React.Fragment>
      <Wrap>
        <NowInfoDiv>
          <Image style={{ width: "30%" }} size="100" src={userPic}></Image>
          <NicknameWrap>
            <UserNickname>{userInfo?.nickname}</UserNickname>
            <UploadButton>
              <div>프로필 사진 변경</div>
              <Upload _onChange={handleFileChange} display="none" />
            </UploadButton>
          </NicknameWrap>
        </NowInfoDiv>
        <InputWrap>
          <Label>닉네임변경</Label>
          <Line>
            <Input
              placeholder={nickname}
              value={nickname}
              _onChange={changeNickname}
              width="200px"
            />
            <Button onClick={onClickNicknameCheck}>닉네임 중복확인</Button>
          </Line>
        </InputWrap>
        <SubmitWrap>
          <Submit onClick={editProfile}>확인</Submit>
        </SubmitWrap>
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  width: 100%;
  margin: auto;
`;

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

const UploadButton = styled.label`
  color: #ffc85c;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const UserNickname = styled.div`
  margin-bottom: 10px;
`;
const ChangePic = styled.div``;

const InputWrap = styled.div`
  margin: 50px 0 50px 150px;
  display: flex;
  flex-direction: column;
  /* @media screen and (max-width: 768px) {
    flex-direction: column;
  } */
`;
const Label = styled.div`
  /* margin: auto; */
  min-width: 80px;
`;
const Line = styled.div`
  display: flex;
  justify-content: start;
`;

const Button = styled.button`
  min-width: 130px;
  height: 45px;
  font-size: 16px;
  background-color: #ffc85c;
  border-radius: 10px;
  width: 180px;
  border: none;
  padding: 8px 0px;
  margin-left: 10px;
`;
const SubmitWrap = styled.div`
  display: flex;
  justify-content: start;
  margin-left: 223px;
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
