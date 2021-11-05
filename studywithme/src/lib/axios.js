import axios from "axios";
import { getCookie } from "../shared/cookie";

const instance = axios.create({
  baseURL: "http://3.34.44.44",
  // baseURL: "http://3.35.235.79",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    Authorization: `Bearer ${getCookie("user")}`,
  },
  withCredentials: true,
});

const formInstance = axios.create({
  baseURL: "http://3.34.44.44",
  // baseURL: "http://3.35.235.79",
  headers: {
    "content-type": "multipart/form-data",
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

  // 회원탈퇴
  deleteAccountAxios: () => instance.post("/api/users/withdrawal"),

  //게시물
  getPost: () => instance.get("/api/posts", {}),
  getFilterPost: (queryString) =>
    instance.get(`/api/posts?searchMode=filter${queryString}`),
  getDetailPost: (postId) => instance.get(`/api/posts/${postId}`),
  addPost: (formData) => formInstance.post("api/posts", formData),
  editPostAxios: (postId, formData) => formInstance.put(`/api/posts/${postId}`, formData),

  // 북마크 조회
  loadBookmarkListAxios: () => instance.get("api/mypage/mybookmarks"),

  // 북마크 추가
  addBookmarkAxios: (postId) => instance.post(`api/bookmarks/${postId}`),

  // 북마크 취소
  deleteBookmarkAxios: (postId) => instance.delete(`api/bookmarks/${postId}`),

  //마이페이지 게시물 가져오기
  getMyPostAxios: (userId) => instance.get("/api/mypage/myposts", { userId }),
  getBookMarkAxios: (userId) =>
    instance.get("/api/mypage/mybookmarks", { userId }),

  //회원정보 가져오기
  getUser: (userId) => instance.get("/api/mypage/myinfo", { userId }),

  // 댓글 가져오기
  addCommentAxios: (postId, comment) => instance.post(`/api/posts/${postId}/comments`, comment),
  getCommentAxios: (postId) => instance.get(`/api/posts/${postId}/comments`),
};
