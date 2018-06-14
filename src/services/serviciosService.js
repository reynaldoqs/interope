import axios from "axios";
import {
  SERVICES_URL
}
from '@/config/config';

export const getServicios = (limit = 10, page = 1) => {
  return axios.get(`${SERVICES_URL}?limite=${limit}&pagina=${page}`);
};
export const getServicio = id => {
  return axios.get(`${SERVICES_URL}/${id}`);
};
export const patchServicio = (id, datos) => {
  return axios.patch(`${SERVICES_URL}/${id}`, datos);
};
export const searchServicio = query => {
  return axios.get(`${SERVICES_URL}?palabraClave=${query}`);
};
export const postServicio = datos => {
  return axios.post(SERVICES_URL, datos);
};