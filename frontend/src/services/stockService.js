import http from "./httpService";
import config from "../config.json";

const endpoint = config.apiURL + "/stocks";

export async function getStock({ _id }) {
  const { data } = await http.get(`${endpoint}/${_id}`);
  return data;
}

export async function getStocks() {
  const { data } = await http.get(endpoint);
  return data;
}
