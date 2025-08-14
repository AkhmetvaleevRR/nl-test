<template>
  <div class="catalog">
    <div class="catalog__title">
      <router-link 
        to="/" 
        class="catalog__button"
        role="button"
      >
        <img class="icon" src="@/assets/icons/backIcon.svg" alt="navigation icon">
      </router-link>
      <h1>{{store.currentCategory.name}}</h1>
    </div>
    <div class="catalog__content" v-show="!isLoading">
      <SideMenu :categories="store.currentCategory.children" :category-slug="route.params.categorySlug" @selectCategory="loadData" v-if="store.currentCategory.children.length > 2"></SideMenu>
      <div class="catalog__list" v-if="products.length > 0">
        <CatalogCard
          v-for="product in products" 
          :key="product.id" 
          :product="product" 
        />
      </div>
      <span class="catalog__message" v-else>
        Продукты не найдены
      </span>
    </div>
    <Loader v-show="isLoading"/>
  </div>
</template>

<script setup lang="js">
import { ref, watch } from 'vue';
import { fetchProducts } from '@/services/api.js';
import { useStore } from '../stores/store';
import { useRoute } from 'vue-router'
import SideMenu from '../components/nav/sideMenu.vue';
import CatalogCard from '../components/CatalogCard.vue';  
import Loader from '../components/ui/Loader.vue';

const route = useRoute()
const store = useStore();
const products = ref([]);
const isLoading = ref(false);

const loadData = async () => {
  try {
    isLoading.value = true

    if (store.categories.length === 0) {
      await store.loadCategories();
    }
    
    store.currentCategory = store.categories.find(
      category => category.slug === route.params.categorySlug
    );
    
    const response = await fetchProducts(
      route.params.categorySlug,
      route.params.subcategorySlug,
      store.currentCity.id
    )

    products.value = response.data.products;
  } catch (error) {
    console.error('Ошибка загрузки:', error)
  } finally {
    isLoading.value = false
  }
}

watch(() => store.currentCity.id, 
  async (newCity) => {
    if (newCity) {
      await loadData();
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.catalog {
  width: 70%;
}

.catalog__content {
  display: flex;
  justify-content: center;
  gap: 32px;
}

.catalog__list {
  width: 100%;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.catalog__button {
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.catalog__title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.catalog__message {
  text-align: center;
}
</style>