import http from "../http-common";

class ComposantDataService {
  getAll(page = 0) {
    return http.get(`?page=${page}`);
  }

  get(id) {
    return http.get(`/id/${id}`);
  }

  find(query, by = "nom", page = 0) {
    return http.get(`?${by}=${query}&page=${page}`);
  } 

}

export default new ComposantDataService();