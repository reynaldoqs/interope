import axios from "axios";
import notificationApi from "@/utils/showNotification";
export default {
  getDefiniciones(limit = 10, page = 1) {
    return axios
      .get(`/definiciones?limite=${limit}&pagina=${page}`)
      .then(data => {
        return data.data;
      })
      .catch(err => {
        let error = err.response.data.error;
        notificationApi.showError(error);
        return error;
      });
  },
  getDefinicion(id) {
    return axios
      .get(`/definiciones/${id}`)
      .then(data => {
        return data.data;
      })
      .catch(err => {
        let error = err.response.data.error;
        notificationApi.showError(error);
        return error;
      });
  },
  patchDefinicion(id, data) {
    return axios
      .patch(`/definiciones/${id}`, data)
      .then(data => {
        return data.data;
      })
      .catch(err => {
        let error = err.response.data.error;
        notificationApi.showError(error);
        return error;
      });
  },
  searchDefinicion(query) {
    return axios
      .get(`/definiciones?palabraClave=${query}`)
      .then(data => {
        return data.data;
      })
      .catch(err => {
        let error = err.response.data.error;
        notificationApi.showError(error);
        return error;
      });
  },
  postDefinicion(data) {
    return axios
      .post(`/definiciones`, data)
      .then(data => {
        return data.data;
      })
      .catch(err => {
        let error = err.response.data.error;
        notificationApi.showError(error);
        return error;
      });
  }
};
/* 
import axios from "axios";
import { DEFINICIONES_URL } from "@/config/config";

export const getDefiniciones = (limit = 10, page = 1) => {
  return axios.get(`${DEFINICIONES_URL}?limite=${limit}&pagina=${page}`);
};
export const getDefinicion = id => {
  return axios.get(`${DEFINICIONES_URL}/${id}`);
};
export const patchDefinicion = (id, datos) => {
  return axios.patch(`${DEFINICIONES_URL}/${id}`, datos);
};
export const searchDefinicion = query => {
  return axios.get(`${DEFINICIONES_URL}?nombre=${query}`);
};
export const postDefinicion = datos => {
  return axios.post(DEFINICIONES_URL, datos);
};
 */
