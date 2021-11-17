import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("user")}`,
  },
  withCredentials: true,
});

const formInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
  headers: {
    "content-type": "multipart/form-data",
    accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("user")}`,
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
  getPost: () => instance.get("/api/posts?searchMode=main", {}),
  getFilterPost: (queryString) =>
    instance.get(`/api/posts?searchMode=filter${queryString}`),
  getDetailPost: (postId) => instance.get(`/api/posts/${postId}`),
  addPost: (formData) => formInstance.post("api/posts", formData),
  editPostAxios: (postId, formData) =>
    formInstance.put(`/api/posts/${postId}`, formData),
  deletePostAxios: (postId) => instance.delete(`api/posts/${postId}`),

  // 팔로우
  followUserAxios: (userId) => instance.post("api/follows", { userId }),
  unfollowUserAxios: (userId) =>
    instance.delete("api/follows", { data: { userId: userId } }),

  // 북마크
  loadBookmarkListAxios: () => instance.get("api/mypage/mybookmarks"),
  addBookmarkAxios: (postId) => instance.post(`api/bookmarks/${postId}`),
  deleteBookmarkAxios: (postId) => instance.delete(`api/bookmarks/${postId}`),

  // 좋아요
  addLikeAxios: (postId) => instance.post(`api/posts/${postId}/like`),
  deleteLikeAxios: (postId) => instance.delete(`api/posts/${postId}/like`),

  // 댓글 좋아요
  addCommentLikeAxios: (postId, commentId) =>
    instance.post(`api/posts/${postId}/comments/${commentId}/like`),
  deleteCommentLikeAxios: (postId, commentId) =>
    instance.delete(`api/posts/${postId}/comments/${commentId}/like`),

  //마이페이지 게시물 가져오기
  getMyPostAxios: (userId) =>
    instance.get(`/api/mypage/myposts/${userId}`, { userId }),
  getBookMarkAxios: (userId) =>
    instance.get(`/api/mypage/mybookmarks/${userId}`, { userId }),

  //마이페이지 팔로워,팔로잉 정보가져오기
  getFollowingsAxios: (userId) =>
    instance.get(`/api/followings/${userId}`, { userId }),
  getFollowersAxios: (userId) =>
    instance.get(`/api/followers/${userId}`, { userId }),

  //회원정보
  getUser: (userId) => instance.get(`/api/mypage/myinfo/${userId}`, { userId }),
  editProfileAxios: (formData) =>
    formInstance.put("/api/users/profileEdit", formData),
  editUserPwdAxios: (password) => instance.put("/api/users/edit", password),

  // 댓글 가져오기
  addCommentAxios: (postId, comment) =>
    instance.post(`/api/posts/${postId}/comments`, comment),
  getCommentAxios: (postId,page) => instance.get(`/api/posts/${postId}/comments?pagination=${page}`),
  deleteCommentAxios: (postId, commentId) =>
    instance.delete(`api/posts/${postId}/comments/${commentId}`),
};
