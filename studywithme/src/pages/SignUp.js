import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { actionCreators as userActions } from "../redux/modules/user";

import Grid from "../elements/Grid";
import Text from "../elements/Text";
import Input from "../elements/Input";
import Button from "../elements/Button";


const SignUp = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const onChangeEmail = (e) => {
        // console.log(e.target.value);
        setEmail(e.target.value);
    }

    const onChangeNickName = (e) => {
        // console.log(e.target.value);
        setNickname(e.target.value);
    }

    const onChangePassword = (e) => {
        // console.log(e.target.value);
        setPassword(e.target.value);
    }

    const onChangeConfirmPassword = (e) => {
        // console.log(e.target.value);
        setConfirmPassword(e.target.value);
    }

    const onClickSignUp = () => {
        console.log("회원가입 실행");
        console.log("이메일", email);
        console.log("닉네임", nickname);
        console.log("비밀번호", password);
        console.log("비밀번호 확인", confirmPassword);
        // 회원가입 미들웨어 디스패치
        dispatch(userActions.signUpMiddleware());
    }

    const onClickEmailCheck = () => {
        console.log("이메일 중복 체크 실행");
        // 정규표현식에 부합하는지 확인

        // 정규 표현식에 부합하지 않는다면
        // warning 띄우기
        // 이메일 상태 삭제

        // 정규표현식에 부합한다면
        // warning 없음
        // 이메일 상태 셋팅
    }

    const onClickNicknameCheck = () => {
        console.log("닉네임 중복 체크 실행");
    }

    return (
        <Grid>
            {/* 페이지 제목 */}
            <Grid>
                <h1> 회원가입 페이지 </h1>
            </Grid>

            {/* 페이지 본문 */}
            <Grid
                width="20%"
            >
                {/* 이메일 */}
                <Grid
                    is_flex
                >
                    <Grid>
                        <Text>이메일</Text>
                    </Grid>
                    <Grid>
                        <Input
                            value={email}
                            _onChange={onChangeEmail}
                        />
                    </Grid>
                    <Grid>
                        <Button
                        >
                            중복 확인
                        </Button>
                    </Grid>
                </Grid>

                {/* 닉네임 */}
                <Grid
                    is_flex
                >
                    <Grid>
                        <Text>닉네임</Text>
                    </Grid>
                    <Grid>
                        <Input
                            value={nickname}
                            _onChange={onChangeNickName}
                        />
                    </Grid>
                    <Grid>
                        <Button
                        >
                            중복 확인
                        </Button>
                    </Grid>
                </Grid>

                {/* 비밀번호 */}
                <Grid
                    is_flex
                >
                    <Grid>
                        <Text>비밀번호</Text>
                    </Grid>
                    <Grid>
                        <Input
                            value={password}
                            _onChange={onChangePassword}
                        />
                    </Grid>
                    <Grid>
                        {/* <Button>중복 확인</Button> */}
                    </Grid>
                </Grid>

                {/* 비밀번호 확인 */}
                <Grid
                    is_flex
                >
                    <Grid>
                        <Text>비밀번호 확인</Text>
                    </Grid>
                    <Grid>
                        <Input
                            value={confirmPassword}
                            _onChange={onChangeConfirmPassword}
                        />
                    </Grid>
                    <Grid>
                        {/* <Button>중복 확인</Button> */}
                    </Grid>
                </Grid>

                {/* 회원가입 버튼 */}
                <Grid>
                    <Button
                        _onClick={onClickSignUp}
                    >
                        회원가입
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default SignUp;