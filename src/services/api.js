import axios from "axios";

const api = axios.create({
  baseURL: `/api`,
});
export const fetchCities = (term) =>
  api.get(`/city/?country=ru&term=${term}`);
export const fetchCityData = (id) => api.get(`/city/?id=${id}`);
export const fetchCategories = (cityId) =>
  api.get(`/menutags/?city=${cityId}`);
export const fetchProducts = (slug, subslug, cityId) => api.get(`/menutags/${subslug?subslug:slug}/?city=${cityId}`);
