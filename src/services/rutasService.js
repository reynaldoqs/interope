import axios from "axios";
import {
  RUTAS_URL
}
from '@/config/config';

export const getRutas = (limit = 10, page = 1) => {
  return axios.get(`${RUTAS_URL}?limite=${limit}&pagina=${page}`);
};
export const getRuta = id => {
  return axios.get(`${RUTAS_URL}/${id}`);
};
export const patchRuta = (id, datos) => {
  return axios.patch(`${RUTAS_URL}/${id}`, datos);
};
export const searchRuta = query => {
  return axios.get(`${RUTAS_URL}?palabraClave=${query}`);
};
export const postRuta = datos => {
  return axios.post(RUTAS_URL, datos);
};