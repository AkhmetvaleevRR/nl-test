import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import {fetchCityData, fetchCategories} from '@/services/api'

export const useStore = defineStore("store", () => {

  //city
  const defaultCity = {
    id: 1,
    city: 'Новосибирск'
  }
  const currentCity = ref(
    JSON.parse(localStorage.getItem("selectedCity")) || defaultCity
  );
  const getCurrentCity = computed(() => currentCity.value);
  const setCity = (cityObj) => {
    currentCity.value = cityObj;
    localStorage.setItem("selectedCity", JSON.stringify(cityObj));
  };

  //categories
  
  const categories = ref([]);  
  const lastUpdated = ref(null);
  const categoriesLoading = ref(false);
  
  const error = ref(null);
  const loadCategories = async () => {
    try {
      categoriesLoading.value = true;
      error.value = null;

      if (!currentCity.value || !currentCity.value.id) {
        const cityResponse = await fetchCityData(currentCity.value.id);
        currentCity.value = cityResponse.data.data;
      }
      const categoriesResponse = await fetchCategories(currentCity.value.id);
      const newCategories = categoriesResponse.data.tags;

      updateCategories(newCategories);
    } catch (err) {
      error.value = err.message;
      console.error("Ошибка загрузки данных:", err);
    } finally {
      categoriesLoading.value = false;
    }
  };

  const hasCategoriesChanged = (newCategories) => {
    return JSON.stringify(categories.value) !== JSON.stringify(newCategories);
  };

  const updateCategories = (newCategories) => {
    if (hasCategoriesChanged(newCategories)) {
      categories.value = newCategories;
      lastUpdated.value = new Date();
    }
  };

  const currentCategory = ref({});


  return {
    currentCategory,
    currentCity,
    getCurrentCity,
    setCity,
    categories,
    lastUpdated,
    loadCategories,
    updateCategories,
    hasCategoriesChanged,
  };
});
