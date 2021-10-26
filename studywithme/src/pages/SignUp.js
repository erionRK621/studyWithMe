import React from "react";

const SignUp = () => {


    const emailCheck = () => {
        console.log("이메일 중복 체크 실행");
        // 정규표현식에 부합하는지 확인

        // 정규 표현식에 부합하지 않는다면
        // warning 띄우기
        // 이메일 상태 삭제

        // 정규표현식에 부합한다면
        // warning 없음
        // 이메일 상태 셋팅
    }

    const nicknameCheck = () => {
        console.log("닉네임 중복 체크 실행");
    }

    const login = () => {
        console.log("회원가입 실행");
        // 회원가입 미들웨어 디스패치
    }

    return (
        <React.Fragment>
            <div
                style={{
                    margin: "auto",
                    width: "50%",

                }}
            >
                <h1
                    style={{
                        textAlign: "center",
                    }}
                >
                    회원가입 페이지
                </h1>

                {/* 이메일 */}
                <div
                    style={{
                        // width: "70%",
                        display: "flex",
                        margin: "5px auto",
                        justifyContent: "center"
                    }}
                >
                    <div
                        style={{
                            width: "30%"
                        }}
                    >
                        이메일
                    </div>
                    <div>
                        <input
                            placeholder="allnighter@studywithme.com"
                        />
                    </div>
                    <div
                        style={{
                            marginLeft: "5px",
                        }}
                    >
                        <button
                            onClick={emailCheck}
                        >
                            중복 확인
                        </button>
                    </div>
                </div>

                {/* 닉네임 */}
                <div
                    style={{
                        // width: "70%",
                        display: "flex",
                        margin: "5px auto",
                        justifyContent: "center"
                    }}
                >
                    <div
                        style={{
                            width: "30%"
                        }}
                    >
                        닉네임
                    </div>
                    <div>
                        <input
                            placeholder="allnighter"
                        />
                    </div>
                    <div
                        style={{
                            marginLeft: "5px",
                        }}
                    >
                        <button
                            onClick={nicknameCheck}
                        >
                            중복 확인
                        </button>
                    </div>
                </div>

                {/* 패스워드 */}
                <div
                    style={{
                        // width: "70%",
                        display: "flex",
                        margin: "5px auto",
                        justifyContent: "center"
                    }}
                >
                    <div
                        style={{
                            width: "30%"
                        }}
                    >
                        패스워드
                    </div>
                    <div>
                        <input />
                    </div>
                </div>

                {/* 패스워드 확인 */}
                <div
                    style={{
                        // width: "70%",
                        display: "flex",
                        margin: "5px auto",
                        justifyContent: "center"
                    }}
                >
                    <div
                        style={{
                            width: "30%"
                        }}
                    >
                        패스워드 확인
                    </div>
                    <div>
                        <input />
                    </div>
                </div>

                {/* 회원가입 버튼 */}
                <div
                    style={{
                        margin: "5px 0px",
                        width: "100%",
                    }}
                >
                    <button
                        style={{
                            textAlign: "center",
                            width: "100%"
                        }}

                        onClick={login}
                    >
                        회원가입
                    </button>
                </div>
            </div>


        </React.Fragment>
    )
}

export default SignUp;