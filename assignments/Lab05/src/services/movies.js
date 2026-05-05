import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1/movies",
  headers: {
    "Content-Type": "application/json",
  },
});

class MovieDataService {
  getAll(params = {}) {
    return api.get("/", { params });
  }

  get(id) {
    return api.get(`/id/${id}`);
  }

  findByTitle(title, params = {}) {
    return api.get("/", {
      params: {
        ...params,
        title,
      },
    });
  }

  findByRating(rated, params = {}) {
    return api.get("/", {
      params: {
        ...params,
        rated,
      },
    });
  }

  createReview(data) {
    return api.post("/review", data);
  }

  updateReview(data) {
    return api.put("/review", data);
  }

  deleteReview(data) {
    return api.delete("/review", { data });
  }

  getRatings() {
    return api.get("/ratings");
  }
}

export default new MovieDataService();
