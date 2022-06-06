import config from "../config.json";
import http from "./httpService";
import jwtDecode from "jwt-decode";
const endpoint = config.apiURL + "/auth";

const tokenKey = "growwToken";

http.setJwt(getJwt());

export async function login({ email, password }) {
  const { data: jwt } = await http.post(endpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}
