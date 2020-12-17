import { Iauth } from "./types";

export const setContext = ({ username, password }: Iauth) => {
  localStorage.setItem("username", username || "");
  localStorage.setItem("password", password || "");
};

export const getContext = (): Iauth | null => {
  if (localStorage.getItem("username")) {
    return {
      username: localStorage.getItem("username") || "",
      password: localStorage.getItem("password") || "",
    };
  }
  return null;
};

export const removeContext = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("password");
};
