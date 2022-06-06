import http from "./httpService";
import config from "../config.json";

const faqEndPoint = config.apiURL + "/faq";
const questionEndPoint = config.apiURL + "/question";

export async function saveFaq(faq) {
  faq = await http.post(faqEndPoint, faq);
  return faq;
}

export async function updateFaq(faq) {
  faq = await http.put(`${faqEndPoint}/${faq.question}`, faq);
  return faq;
}

export async function getFaqs(pageId, subCategory) {
  try {
    const { data } = await http.get(`${faqEndPoint}/${pageId}/${subCategory}`);
    return data;
  } catch (error) {
    return null;
  }
}

export async function getFaq(faqId) {
  try {
    const { data } = await http.get(`${faqEndPoint}/${faqId}/`);
    return data;
  } catch (error) {
    return null;
  }
}

export async function getFaqsBasedOnMsg(msg) {
  const data = await http.get(`${questionEndPoint}/${msg}/`);
  return data;
}

export async function getUnAnsweredFaqs() {
  const { data } = await http.get(questionEndPoint);
  return data;
}
