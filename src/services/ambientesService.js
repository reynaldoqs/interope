import axios from "axios";
import {
  AMBIENTES_URL
}
from '@/config/config';

export const getAmbientes = (limit = 10, page = 1) => {
  return axios.get(`${AMBIENTES_URL}?limite=${limit}&pagina=${page}`);
};
export const getAmbiente = id => {
  return axios.get(`${AMBIENTES_URL}/${id}`);
};
export const servicios = {
  getAmbientes,
  getAmbiente
};