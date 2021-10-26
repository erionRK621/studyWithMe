import axios from "axios";
import { getCookie } from "../shared/cookie";

const instance = axios.create({
  // baseURL: "http://localhost:4000",

  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    Authorization: `Bearer ${getCookie("focus-with-me!!")}`,
  },
  withCredentials: true,
});

export const apis = {

};