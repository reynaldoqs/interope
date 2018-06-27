import axios from "axios";
import notificationApi from "@/utils/showNotification";
export default {
  getAmbientes(limit = 10, page = 1) {
    return axios
      .get(`/ambientes?limite=${limit}&pagina=${page}`)
      .then(data => {
        return data.data;
      })
      .catch(err => {
        let error = err.response.data.error;
        notificationApi.showError(error);
        return error;
      });
  },
  getAmbiente(id) {
    return axios
      .get(`/ambientes/${id}`)
      .then(data => {
        return data.data;
      })
      .catch(err => {
        let error = err.response.data.error;
        notificationApi.showError(error);
        return error;
      });
  },
  patchAmbiente(id, data) {
    return axios
      .patch(`/ambientes/${id}`, data)
      .then(data => {
        return data.data;
      })
      .catch(err => {
        let error = err.response.data.error;
        notificationApi.showError(error);
        return error;
      });
  },
  searchAmbiente(query) {
    return axios
      .get(`/ambientes?palabraClave=${query}`)
      .then(data => {
        return data.data;
      })
      .catch(err => {
        let error = err.response.data.error;
        notificationApi.showError(error);
        return error;
      });
  },
  postAmbiente(data) {
    return axios
      .post(`/ambientes`, data)
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
