<template>
  <div class="modal" v-if="showModal">
    <div class="modal__content">
      <div class="modal__title">        
        <h2>Выбор населённого пункта</h2>
        <button class="modal__close-button" @click="close">        
          <img class="icon" src="@/assets/icons/crossIcon.svg" alt="cross icon">
        </button>      
      </div>
      <div class="modal__search">
        <div class="modal__search-result">
          <input
            type="text"
            v-model="searchQuery"
            @input="handleSearch"
            placeholder="Например, Санкт-петербург"
            class="modal__input"
          >
          <button class="modal__clear-button" @click="clearSearch">        
            <img class="icon" src="@/assets/icons/crossIcon.svg" alt="cross icon">
          </button>      
          <ul class="modal__list" v-if="citiesArr.length">
            <li 
              v-for="city in citiesArr" 
              :key="city" 
              @click="selectCity(city)"
              class="modal__item"
              :class="{ 'modal__item--selected': city === selectedCity }"
            >
            {{ city.label }}
            </li>
          </ul>        
        </div>      
        <ui-button
          @click="confirmSelection"
          :disabled="!selectedCity"
          class="modal__button"
        >
          ПОДТВЕРДИТЬ
        </ui-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { fetchCities } from '@/services/api';
import uiButton from './ui/uiButton.vue';
import { useStore } from '@/stores/store';

const store = useStore();

const showModal = defineModel()
const citiesArr = ref([]);

const emit = defineEmits(['city-changed']);

const searchQuery = ref('');
const selectedCity = ref(null);
const debounceTimer = ref(null);
const isLoading = ref(false);
const canConfirm = ref(false);

const searchCities = async (term) => {
  try {
    isLoading.value = true;
    const response = await fetchCities(term);
    citiesArr.value = response.data.data;
  } catch (err) {
    console.error('Ошибка загрузки данных:', err);
  } finally {
    isLoading.value = false;
  }
};

const handleSearch = () => {
  if (searchQuery.value.length >= 3){
    clearTimeout(debounceTimer.value);
    debounceTimer.value = setTimeout(() => {
      searchCities(searchQuery.value);
    }, 300);
  }
};

const selectCity = (city) => {
  selectedCity.value = city;
  canConfirm.value = true;
  searchQuery.value = city.label;
  citiesArr.value = [];
};

const confirmSelection = () => {
  if (selectedCity.value) {
    store.setCity(selectedCity.value);
    close();
  }
};

const clearSearch = () => {
  searchQuery.value = '';
}

const close = () => {
  clearSearch();
  selectedCity.value = null;
  showModal.value = false;
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal__content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 40%;
}

.modal__title {
  display: flex;    
  justify-content: space-between;
}

.modal__title h2 {
  margin-bottom: 16px;
  font-size: 20px;
  text-align: center;
}

.modal__search {
  display: flex;
  gap: 8px;
  position: relative;
  width: 100%;
}

.modal__search-result {
  position: relative;
  width: 70%;
}

.modal__input {
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  line-height: 48px;
  width: 100%;
  padding: 0 12px;
  box-sizing: border-box;
}

.modal__input:focus-visible {
  outline: none;
}

.modal__list {
  position: absolute;
  top: 36px;
  left: 0;
  right: 0;
  list-style: none;
  padding: 4px 0 0 0;
  margin: 4px 0 0 0;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #eee;
  border-top: 0;
  border-radius: 0 0 4px 4px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 10;
}

.modal__close-button, .modal__clear-button {
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.modal__clear-button {
  position: absolute;
  top: 16px;
  right: 8px;
}

.modal__button {
  flex: 1;
  letter-spacing: 1.75px;
  font-size: 16px;
  line-height: 21px;
  padding: 12px;
}

.modal__item {
  padding: 12px;
  cursor: pointer;
  color: #979797;
  transition: background 0.2s;
}

.modal__item:hover {
  color: #000;
}

.modal__item--selected {
  background: #e3f2fd;
  color: #1976d2;
}

.modal__empty {
  padding: 16px;
  text-align: center;
  color: #666;
}
</style>