<template>
  <div class="modal" v-if="showModal">
    <div class="modal__content">
      <div class="modal__title">        
        <h2>Выбор населённого пункта</h2>
        <ui-button type="icon" class="modal__button--close" @click="close">        
          <img class="icon" src="@/assets/icons/crossIcon.svg" alt="cross icon">
        </ui-button>      
      </div>
      <div class="modal__search">
        <div class="modal__search-result"        
          :class="{ 'has-results': citiesArr.length && searchQuery.length > 2 }"
        >
          <input
            type="text"
            v-model="searchQuery"
            @input="handleSearch"
            placeholder="Например, Санкт-петербург"
            class="modal__input"
          >
          <ui-button type="icon" class="modal__button--clear" @click="clearSearch" v-show="searchQuery.length > 0">        
            <img class="icon" src="@/assets/icons/crossIcon.svg" alt="cross icon">
          </ui-button>
          <ul class="modal__list" v-if="citiesArr.length && searchQuery.length > 2">
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
          class="modal__button--approve"
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
    }, 500);
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
  margin-bottom: 16px;
}

.modal__title h2 {
  margin: 0;
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
  border-radius: 4px;
  margin: 1px;
}

.modal__input {
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  line-height: 48px;
  width: 100%;
  padding: 0 12px;
  box-sizing: border-box;
  border: 1px solid #272727;
  transition: border-radius 0.2s;
}

.modal__search-result.has-results .modal__list {
  margin: 0;
  border: 1px solid #272727;
  border-top: none ;
}

.modal__search-result.has-results::after {
  content: "";
  position: absolute;
  width: 90%;
  right: 30px;
  bottom: 5px;
  height: 1px;
  background-color: #9797974D;
  z-index: 20;
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
  border-top: none;
  border-radius: 0 0 4px 4px;
  background-color: #fff;
  z-index: 10;
}

.modal__button--close, .modal__button--clear {
  border: none;
  background-color: #fff;
  cursor: pointer;
}

.modal__button--clear {
  position: absolute;
  top: 16px;
  right: 8px;
}

.modal__button--approve {
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

@media (max-width: 1024px) {
  .modal__content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 100%;
  }
  .modal__search {
    flex-direction: column;
  }

  .modal__search-result {
    width: 100%;
  }
}
</style>