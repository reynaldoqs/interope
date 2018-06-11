import axios from "axios";
import { BASE_URL } from "../config/config";

export const serviceLogin = creds => {
  return axios.post(BASE_URL, creds);
};
export const serviceLogout = () => {
  return true;
};
export const services = {
  serviceLogin,
  serviceLogout
};
