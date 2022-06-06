import http from "./httpService";
import config from "../config.json";

const endPoint = config.apiURL + "/users";

export async function saveUser({ name, email, password }) {
  let user = {
    name,
    email,
    password,
  };
  user = await http.post(endPoint, user);
  return user;
}

export async function updateKyc({ email }) {
  const { data } = await http.put(`${endPoint}/${email}`, { email });
  return data;
}

export async function getUser(user) {
  try {
    const _id = user._id;
    const { data } = await http.get(`${endPoint}/${_id}`);
    return data;
  } catch (error) {
    return null;
  }
}
