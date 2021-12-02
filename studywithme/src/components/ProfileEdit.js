import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import styled from "styled-components";
import Swal from "sweetalert2";

import Input from "../elements/Input";
import Image from "../elements/Image";
import Upload from "./Upload";
import dotenv from "dotenv";
dotenv.config();

export const ProfileEdit = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const userId = useSelector((state) => state.user.user?.userId);

  const [userPic, setUserPic] = React.useState(
    `${process.env.REACT_APP_IMAGE_URI}/${userInfo.avatarUrl}`
  );
  const dispatch = useDispatch();
  const [nickname, setNickname] = React.useState(userInfo?.nickname);
  const [selectedFile, setSelectedFile] = React.useState(null);

  const nicknameCheckInput = { nickname: nickname };

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
    if (nicknameCheckInput.nickname === "") {
      Swal.fire("닉네임을 입력해주세요", "", "error");
    } else {
      dispatch(userActions.checkNicknameMiddleware(nicknameCheckInput));
    }
  };

  useEffect(() => {
    dispatch(userActions.getUserDB(userId));
  }, [dispatch, userId]);
  return (
    <React.Fragment>
      <Wrap>
        <NowInfoDiv>
          <Image minWidth="100px" size="100" src={userPic}></Image>
          <NicknameWrap>
            <UserNickname>{userInfo?.nickname}</UserNickname>
            <UploadButton>
              <PicChange>프로필 사진 변경</PicChange>
              <Upload _onChange={handleFileChange} display="none" />
            </UploadButton>
          </NicknameWrap>
        </NowInfoDiv>
        <InputWrap>
          <Label>닉네임 변경</Label>
          <Line>
            <Input
              bgColor="#E0E0E0"
              placeholder={nickname}
              value={nickname}
              _onChange={changeNickname}
              width="150px"
            />
            <Button onClick={onClickNicknameCheck}>중복 확인</Button>
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
  margin: 0 auto;
`;

const NowInfoDiv = styled.div`
  display: flex;
  margin: 50px 0 30px 0;
  justify-content: center;
`;

const NicknameWrap = styled.div`
  width: 200px;
  margin: auto 80px auto 20px;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  @media screen and (max-width: 768px) {
    margin-left: 20px;
    width: 150px;
  }
`;

const UploadButton = styled.label`
  color: #ffc85c;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const PicChange = styled.div`
  @media screen and (max-width: 768px) {
    font-size: 14px;
    width: 130px;
  }
`;

const UserNickname = styled.div`
  margin-bottom: 10px;
  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const InputWrap = styled.div`
  margin: 30px 0 32px 0px;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;
const Label = styled.div`
  margin: auto 0;
  min-width: 80px;
  font-size: 16px;
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;
const Line = styled.div`
  display: flex;
  justify-content: start;
`;

const Button = styled.button`
  height: 45px;
  font-size: 16px;
  background-color: #ffc85c;
  border-radius: 10px;
  width: 130px;
  border: none;
  padding: 8px 0px;
  margin-left: 12px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    font-size: 12px;
    width: 80px;
  }
`;
const SubmitWrap = styled.div`
  display: flex;
  justify-content: center;
  /* margin-left: 223px; */
`;

const Submit = styled.button`
  height: 45px;
  font-size: 16px;
  background-color: #ffc85c;
  border-radius: 10px;
  width: 370px;
  border: none;
  padding: 4px 0px;
  margin-left: 3px;
  cursor: pointer;
`;
