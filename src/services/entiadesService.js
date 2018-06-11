import axios from "axios";
import {
  ENTIDADES_URL
}
from '@/config/config';

export const getEntidades = (limit = 10, page = 1) => {
  return axios.get(`${ENTIDADES_URL}?limite=${limit}&pagina=${page}`);
};
export const updateServicios = id => {
  return id;
};
export const servicios = {
  getEntidades,
  updateServicios
};