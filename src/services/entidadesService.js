import axios from 'axios';

export default {
	getEntidades(limit = 10, page = 1) {
		return axios
			.get(`https://test.agetic.gob.bo/apigateway/entidades?limite=${limit}&pagina=${page}`)
			.then((data) => {
				return data.data;
			})
			.catch((err) => {
				return err.response.data.error;
			});
	} /* 
  getServicio(id) {
    return axios
      .get(`/servicios/${id}`)
      .then(data => {
        return data.data;
      })
      .catch(err => {
        return err.response.data.error;
      });
  },
  patchServicio(id, data) {
    return axios
      .patch(`/servicios/${id}`, data)
      .then(data => {
        return data.data;
      })
      .catch(err => {
        return err.response.data.error;
      });
  },
  searchServicio(query) {
    return axios
      .get(`/servicios?palabraClave=${query}`)
      .then(data => {
        return data.data;
      })
      .catch(err => {
        return err.response.data.error;
      });
  },
  postServicio(data) {
    return axios
      .post(`/servicios`, data)
      .then(data => {
        return data.data;
      })
      .catch(err => {
        return err.response.data.error;
      });
  } */
};
