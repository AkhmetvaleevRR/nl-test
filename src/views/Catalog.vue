<template>
  <div class="catalog">
    <div class="catalog__title">
      <router-link 
        to="/" 
        class="catalog__button"
        role="button"
      >
        <img class="catalog__icon" src="@/assets/icons/backIcon.svg" alt="navigation icon">
      </router-link>
      <h1>{{store.currentCategory.name}}</h1>
    </div>
    <div class="catalog__content">
      <SideMenu 
        :categories="store.currentCategory.children"        
        :category-slug="props.categorySlug"
        :subcategory-slug="props.subcategorySlug"
        @selectCategory="loadData" 
        @closeMenu="showMenu = false"
        v-if="isMenuShowed">
      </SideMenu>
      <div class="catalog__list" v-if="products.length > 0 && !isLoading">
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
  <ui-button 
    type="icon" 
    class="mobile-button mobile-button__menu"
    aria-label="Открыть меню"
    v-show="showMobileMenuButton"
    @click="showMenu = !showMenu"
  >
    <img class="catalog__icon" src="@/assets/icons/menuIcon.svg" alt="menu icon">
  </ui-button>
  <router-link 
    to="/" 
    class="mobile-button mobile-button__back"
    role="button"
    v-show="showMobileBackButton"
    aria-label="Вернуться на главную"
  >
    <img class="catalog__icon" src="@/assets/icons/backIcon.svg" alt="navigation icon">
  </router-link>
</template>

<script setup lang="js">
import { ref, watch, computed, onMounted, onUnmounted } from 'vue';
import { fetchProducts } from '@/services/api.js';
import { useStore } from '../stores/store';
import uiButton from '../components/ui/uiButton.vue';
import SideMenu from '../components/nav/sideMenu.vue';
import CatalogCard from '../components/CatalogCard.vue';  
import Loader from '../components/ui/Loader.vue';

const props = defineProps({
  categorySlug: {
    type: String,
    required: true
  },
  subcategorySlug: {
    type: String,
    required: false
  }
});

const store = useStore();
const products = ref([]);
const showMenu = ref(false);
const isMobile = ref(false);
const isLoading = ref(false);

const checkScreenWidth = () => {
  isMobile.value = window.innerWidth <= 1024;
};

onMounted(() => {
  checkScreenWidth();
  window.addEventListener('resize', checkScreenWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenWidth);
});

const hasChildren = computed(() => {
  return store.currentCategory.children && store.currentCategory.children.length > 2;
});

const showMobileMenuButton = computed(() => {
  return isMobile.value && hasChildren.value;
});

const showMobileBackButton = computed(() => {
  return isMobile.value && !hasChildren.value;
});

const isMenuShowed = computed(() => {
  return hasChildren.value && (isMobile.value?showMenu.value:true);
});

const loadData = async () => {
  try {
    isLoading.value = true

    if (store.categories.length === 0) {
      await store.loadCategories();
    }
    store.currentCategory = store.categories.find(
      category => category.slug === props.categorySlug
    );
    
    const response = await fetchProducts(
      props.categorySlug,
      props.subcategorySlug,
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


.mobile-button {
  position: absolute;
  z-index: 1;
  top: 12px;
  right: 20px;
  display: none;
}

.catalog__icon {
  height: 48px;
}

@media (max-width: 1024px) {
  .catalog {
    margin-top: 92px;
    width: 100%;
  }
  .catalog__title {
    display: none;
  }
  .mobile-button {
    display: block;
  }
}
</style>