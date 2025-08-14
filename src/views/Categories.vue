<template>
  <div class="categories">
    <h1>Категории товаров</h1>
    <div class="categories-table" v-if="!isLoading">
      <CategoryCard 
        v-for="category in store.categories" 
        :key="category.id" 
        :category="category"
        @click="store.currentCategory = category"
      />
    </div>
    <Loader v-else/>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import CategoryCard from '@/components/CategoryCard.vue';
import { useStore } from '../stores/store';
import Loader from '@/components/ui/Loader.vue';
const store = useStore();
const isLoading = ref(false);

watch(() => store.currentCity.id,
 (newCity) => {
    if (newCity) {
      store.loadCategories();
    }
  },
  { immediate: true }
)

</script>

<style scoped>

.categories {
  width: 70%;
}

.categories h1 {
  font-weight: 600;
  font-size: 44px;
  line-height: 44px;
  letter-spacing: 0px;
  margin: 20px 5px 20px 0;
}

.city-button {
  margin-bottom: 20px;
  padding: 8px 16px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.categories-table {
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 22px;
}


@media (max-width: 1024px) {
  .categories {
    width: 100%;
  }
  .categories h1 {
    font-weight: 600;
    font-size: 24px;
    line-height: 24px;
    text-align: center;
    margin: 20px 0;
  }
  .categories-table {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 22px;
  }
}
</style>