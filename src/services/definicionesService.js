import axios from 'axios';
import { DEFINICIONES_URL } from '@/config/config';

export const getDefiniciones = (limit = 10, page = 1) => {
	return axios.get(`${DEFINICIONES_URL}?limite=${limit}&pagina=${page}`);
};
export const getDefinicion = (id) => {
	return axios.get(`${DEFINICIONES_URL}/${id}`);
};
export const patchDefinicion = (id, datos) => {
	return axios.patch(`${DEFINICIONES_URL}/${id}`, datos);
};
export const searchDefinicion = (query) => {
	return axios.get(`${DEFINICIONES_URL}?nombre=${query}`);
};
export const postDefinicion = (datos) => {
	return axios.post(DEFINICIONES_URL, datos);
};
