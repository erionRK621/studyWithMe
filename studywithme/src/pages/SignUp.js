import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { KAKAO_AUTH_URL } from "../shared/kakaoOAuth";
import { actionCreators as userActions } from "../redux/modules/user";
import {
  regExEmailTest,
  regExPasswordTest,
  regExNicknameTest,
} from "../shared/regEx";
import Swal from "sweetalert2";
import axios from "axios";
import { apis } from "../lib/axios";

// Font Awesome-related
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle as farCheckCircle } from "@fortawesome/free-regular-svg-icons"

import Grid from "../elements/Grid";
import KakaoLogo from "../icon/KakaoLogo.png";

const SignUp = () => {
  const dispatch = useDispatch();

  const [emailUsername, setEmailUsername] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkEmailSuccessState, setCheckEmailSuccessState] = useState(false);
  const [checkNicknameSuccessState, setCheckNicknameSuccessState] = useState(false);

  const onChangeEmailUsername = (e) => {
    setEmailUsername(e.target.value);
  };

  const onChangeEmailDomain = (e) => {
    setEmailDomain(e.target.value);
  };

  const onChangeNickName = (e) => {
    setNickname(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onClickEmailCheck = () => {
    if (emailUsername === "" || emailDomain === "") {
      Swal.fire("이메일을 입력해주세요", "", "error");
    }
    else {
      const emailCheckInput = { email: `${emailUsername}@${emailDomain}` };
      // 이메일 중복확인 미들웨어 실행
      apis
        .checkEmailAxios(emailCheckInput)
        .then((response) => {
          // window.alert(response.data.message);
          Swal.fire(response.data.message, "", "success");
          setCheckEmailSuccessState(true);
        })
        .catch((error) => {
          // window.alert(error.response.data.message);
          Swal.fire(error.response.data.message, "", "error");
          setCheckEmailSuccessState(false);
        });

    }
  };

  const onClickNicknameCheck = () => {
    if (nickname === "") {
      Swal.fire("닉네임을 입력해주세요", "", "error");
    }
    else {
      const nicknameCheckInput = { nickname: nickname };
      // dispatch(userActions.checkNicknameMiddleware(nicknameCheckInput));
      // 닉네임 중복확인 미들웨어 실행
      apis
        .checkNicknameAxios(nicknameCheckInput)
        .then((response) => {
          Swal.fire(response.data.message, "", "success");
          setCheckNicknameSuccessState(true);
        })
        .catch((error) => {
          Swal.fire(error.response.data.message, "", "error");
          setCheckNicknameSuccessState(false);
        });

    }
  };

  const onClickSignUp = () => {
    const signUpInputs = {
      email: `${emailUsername}@${emailDomain}`,
      nickname: nickname,
      password: password,
      confirmPassword: confirmPassword,
    };

    // 이메일 규칙 확인
    if (!regExEmailTest(signUpInputs.email)) {
      Swal.fire("이메일 형식이 올바르지 않습니다.", "", "error");
      return;
    }
    // 이메일 50자 이하 여부 확인
    if (signUpInputs.email.length > 50) {
      Swal.fire("이메일을 50자 이하로 입력해주세요.", "", "error");
    }
    // 닉네임 규칙 확인
    else if (!regExNicknameTest(signUpInputs.nickname)) {
      Swal.fire("닉네임 형식이 올바르지 않습니다.", "", "error");
      return;
    }
    // 닉네임 20자 이하 여부 확인
    else if (signUpInputs.nickname.length > 10) {
      Swal.fire("닉네임을 10자 이하로 입력해주세요.", "", "error");
      return;
    }
    // 닉네임 2자 이상 여부 확인
    else if (signUpInputs.nickname.length < 2) {
      Swal.fire("닉네임을 2자 이상 입력해주세요.", "", "error");
      return;
    }

    // 비밀번호 규칙 확인
    else if (!regExPasswordTest(signUpInputs.password)) {
      Swal.fire(
        "비밀번호는 영문, 숫자, 특수 문자를 포함하여 8자 이상이어야 합니다.",
        "",
        "error"
      );
      return;
    }
    // 비밀번호 일치 여부 확인
    else if (signUpInputs.password !== signUpInputs.confirmPassword) {
      Swal.fire("비밀번호가 일치하지 않습니다.", "", "error");
      return;
    }
    // 이메일, 비밀번호간 상호간에 포함되었는지 여부 확인
    else if (
      signUpInputs.email.split("@")[0].match(signUpInputs.password) !== null ||
      signUpInputs.password.match(signUpInputs.email.split("@")[0]) !== null
    ) {
      Swal.fire("이메일이 포함된 비밀번호는 사용할 수 없습니다.", "", "error");
      return;
    }

    else if (checkEmailSuccessState === false) {
      Swal.fire("이메일 중복 확인을 해주세요.", "", "error");
    }

    else if (checkNicknameSuccessState === false) {
      Swal.fire("닉네임 중복 확인을 해주세요.", "", "error");
    }

    else {
      dispatch(userActions.signUpMiddleware(signUpInputs));
    }
  };

  return (
    <Grid width="360px" margin="0px auto" padding="60px 0px">
      <SignUpTitle>회원가입</SignUpTitle>
      <KakaoSignUpWrapper>
        <a
          href={KAKAO_AUTH_URL}
          style={{
            margin: "0px 10px",
          }}
        >
          <KakaoIcon src={KakaoLogo} alt="카카오 아이콘" />
        </a>
        <KakaoLoginTitle>카카오 계정으로 간편하게 회원가입</KakaoLoginTitle>
      </KakaoSignUpWrapper>
      <Form>
        <EmailWrapper>
          <Label>이메일</Label>
          <EmailInputGroup>
            <EmailInputUsername>
              <EmailInput
                placeholder="이메일"
                value={emailUsername}
                type="email"
                onChange={onChangeEmailUsername}
              />
            </EmailInputUsername>
            <EmailInputSeparator>@</EmailInputSeparator>
            <EmailInputDomain>
              <EmailInput
                placeholder="도메인"
                value={emailDomain}
                type="email"
                onChange={onChangeEmailDomain}
              />
            </EmailInputDomain>
          </EmailInputGroup>
        </EmailWrapper>
        {checkEmailSuccessState === true ?
          <EmailCheckButtonWrapper>
            <EmailValidationButton onClick={onClickEmailCheck}>
              이메일 중복 확인
              <CheckIconWrap>
                <FontAwesomeIcon
                  style={{
                    width: "18px",
                    height: "18px",
                    color: "yellowgreen",
                  }}
                  icon={farCheckCircle}
                />
              </CheckIconWrap>
            </EmailValidationButton>
          </EmailCheckButtonWrapper>
          :
          <EmailCheckButtonWrapper>
            <EmailValidationButton onClick={onClickEmailCheck}>
              이메일 중복 확인
            </EmailValidationButton>
          </EmailCheckButtonWrapper>
        }
        <NicknameWrapper>
          <Label>닉네임</Label>
          <InputReqDescription>
            한글, 영문, 숫자로 이루어진 별명을 입력해주세요. (10자 이하)
          </InputReqDescription>
          <NicknameInputContainer>
            <NicknameInput
              placeholder="별명"
              value={nickname}
              type="text"
              onChange={onChangeNickName}
            />
            {checkNicknameSuccessState === true ?
              <NicknameValidationButton onClick={onClickNicknameCheck}>
                닉네임 중복 확인
                <CheckIconWrap>
                  <FontAwesomeIcon
                    style={{
                      width: "18px",
                      height: "18px",
                      color: "yellowgreen",
                    }}
                    icon={farCheckCircle}
                  />
                </CheckIconWrap>
              </NicknameValidationButton>
              :
              <NicknameValidationButton onClick={onClickNicknameCheck}>
                닉네임 중복 확인
              </NicknameValidationButton>
            }
          </NicknameInputContainer>
        </NicknameWrapper>
        <PasswordWrapper>
          <Label>비밀번호</Label>
          <InputReqDescription>
            특수 문자를 포함한 8자 이상의 비밀번호를 입력해주세요.
          </InputReqDescription>
          <PasswordInput
            placeholder="비밀번호"
            value={password}
            type="password"
            onChange={onChangePassword}
          ></PasswordInput>
        </PasswordWrapper>
        <PasswordWrapper>
          <Label>비밀번호 확인</Label>
          <PasswordInput
            placeholder="비밀번호 확인"
            value={confirmPassword}
            type="password"
            onChange={onChangeConfirmPassword}
          ></PasswordInput>
        </PasswordWrapper>
        <SignUpButton onClick={onClickSignUp}>회원가입하기</SignUpButton>
      </Form>
      <ToLoginGuide>
        이미 아이디가 있으신가요?
        <ToLoginLink href="/login">로그인</ToLoginLink>
      </ToLoginGuide>
    </Grid>
  );
};

export default SignUp;

const SignUpTitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
`;

const KakaoSignUpWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0px;
  padding-bottom: 30px;
  border-bottom: 1px solid rgb(237, 237, 237);
`;

const KakaoIcon = styled.img`
  width: 48px;
  height: 48px;
`;

const KakaoLoginTitle = styled.div`
  font-size: 12px;
  text-align: center;
  margin: 15px 0px;
  color: rgb(117, 117, 117);
`;

const Form = styled.div`
  margin: 0px;
  padding: 0px;
`;

const Label = styled.label`
  display: block;
  width: 100%;
  margin: 0px 0px 12px;
  font-size: 15px;
  font-weight: bold;
  color: #292929;
  line-height: 21px;
  word-break: keep-all;
`;

const EmailWrapper = styled.div``;

const EmailInputGroup = styled.div`
  display: flex;
`;

const EmailInputUsername = styled.span`
  display: flex;
`;

const EmailInput = styled.input`
  display: block;
  box-sizing: border-box;
  height: 40px;
  width: 100%;
  padding: 0 15px;
  line-height: 40px;
  border-radius: 4px;
  border: solid 1px #dbdbdb;
  background-color: #ffffff;
  color: #424242;
  font-size: 15px;
`;

const EmailInputSeparator = styled.span`
  flex: 0 0 20px;
  text-align: center;
  line-height: 40px;
  color: #dbdbdb;
`;

const EmailInputDomain = styled.span``;

const EmailCheckButtonWrapper = styled.div`
  display: flex;
  margin-bottom: 30px;
  padding-top: 2px;
`;

const EmailValidationButton = styled.button`
  margin-top: 10px;
  width: 100%;
  height: 40px;
  padding: 0;
  background: #f7f8fa;
  color: black;
  border-color: #dadce0;
  line-height: 20px;
  font-size: 15px;
  min-height: 40px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  font-weight: 700;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
`;

const NicknameWrapper = styled.div`
  margin-bottom: 30px;
`;

const NicknameInputContainer = styled.div`
  display: flex;
`;

const NicknameInput = styled.input`
  padding: 8px 15px 9px;
  display: inline-block;
  width: 100%;
  height: 40px;
  min-height: 40px;
  margin: 0;
  border: 1px solid #dbdbdb;
  color: #000;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 15px;
  line-height: 21px;
`;

const NicknameValidationButton = styled.button`
  margin-left: 10px;
  width: 250px;
  height: 40px;
  padding: 0;
  background: #f7f8fa;
  color: black;
  border-color: #dadce0;
  line-height: 20px;
  font-size: 15px;
  min-height: 40px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  font-weight: 700;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
`;

const PasswordWrapper = styled.div`
  margin-bottom: 30px;
`;

const InputReqDescription = styled.div`
  margin-bottom: 10px;
  font-size: 13px;
  color: #757575;
  line-height: 1.4;
`;

const PasswordInput = styled.input`
  padding: 8px 15px 9px;
  display: inline-block;
  width: 100%;
  height: 40px;
  min-height: 40px;
  margin: 0;
  border: 1px solid #dbdbdb;
  color: #000;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 15px;
  line-height: 21px;
`;

const SignUpButton = styled.button`
  width: 100%;
  font-size: 15px;
  line-height: 26px;
  padding: 11px 10px;
  background: #f7f8fa;
  color: black;
  border-color: #dadce0;
  display: inline-block;
  border: 1px solid transparent;
  font-weight: 700;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
`;

const ToLoginGuide = styled.p`
  color: #424242;
  font-size: 15px;
  text-align: center;
  margin-top: 30px;
`;

const ToLoginLink = styled.a`
  text-decoration: underline;
  font-weight: bold;
  display: inline-block;
  padding-left: 10px;
  cursor: pointer;
  font-size: 15px;
  text-align: center;
`;

const CheckIconWrap = styled.div`
  align-items: center;
  margin-left: 4px;
`;