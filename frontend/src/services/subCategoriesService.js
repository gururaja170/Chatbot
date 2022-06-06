import http from "./httpService";
import config from "../config.json";

export async function getSubCategories(category) {
  const endpoint = config.apiURL + "/" + category;
  const { data } = await http.get(endpoint);
  return data;
}
