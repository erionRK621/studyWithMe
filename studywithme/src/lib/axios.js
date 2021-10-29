import axios from "axios";
import { getCookie } from "../shared/cookie";

const instance = axios.create({
  // baseURL: "http://3.34.44.44",
  baseURL: "http://3.35.235.79",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    Authorization: `Bearer ${getCookie("user")}`,
  },
  withCredentials: true,
});

export const apis = {
  // 회원가입
  signUpAxios: (user) => instance.post("/api/users/signup", user),

  // 이메일 중복 확인
  checkEmailAxios: (email) => instance.post("/api/users/emailexist", email),

  // 닉네임 중복 확인
  checkNicknameAxios: (nickname) =>
    instance.post("/api/users/nicknameexist", nickname),

  // 로그인
  logInAxios: (user) => instance.post("/api/users/login", user),

  // 사용자 인증
  isMeAxios: () => instance.get("/api/users/isme"),

  // 회원탈퇴
  deleteAccountAxios: () => instance.post("/api/users/withdrawal"),

  //게시물 가져오기
  getPost: () => instance.get("/api/posts/:postId", {}),

  addPost : (formData) => instance.post("api/test2", formData),
};
