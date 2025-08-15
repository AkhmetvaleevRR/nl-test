<template>
  <div class="categories-menu">    
    <div class="categories-menu__mobile-actions">
      <ui-button type="icon" class="categories-menu__close-button"
        @click="router.push(`/`)"
      >
        На главную
      </ui-button>
      <ui-button type="icon" class="categories-menu__back-button" @click="$emit('closeMenu')">        
        <img class="icon" src="@/assets/icons/crossIcon.svg" alt="cross icon">
      </ui-button>
    </div>
    <ul class="categories-menu__list">
      <li class="categories-menu__item"
        @click="changeCategory(props.categorySlug)"
        :class="{'active': !props.subcategorySlug}"
        
      >
        Все продукты
      </li>
      <li 
        class="categories-menu__item"        
        v-for="category in props.categories"
        :key="category.id"
        @click="changeCategory(props.categorySlug, category.slug)"
        :class="{'active': props.subcategorySlug === category.slug}"
      >
        {{ category.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="js">
import { useRouter } from 'vue-router'
import uiButton from '../ui/uiButton.vue';

const emit = defineEmits(['selectCategory', 'closeMenu']);
const router  = useRouter();

const changeCategory = async (slug, subSlug) => {
  if (subSlug) {
    await router.push(`/category/${slug}/${subSlug}`);
  } else {
    await router.push(`/category/${slug}`);
  }
  emit('selectCategory', { slug, subSlug });
}

const props = defineProps({
  categories: {
    type: Array,
    required: true,
    default: () => []
  },
  categorySlug: {
    type: String,
  },
  subcategorySlug: {
    type: String,
  }
})
</script>

<style>
.categories-menu__list {
  list-style: none;
  padding: 0;
  width: 240px;
  margin: 0;
}

.categories-menu__item {
  padding: 12px 8px;
  text-decoration: none;
  cursor: pointer;
  border-bottom: 1px solid #E9EEF3; 
}

.categories-menu__item.active {
  background-color: #E9EEF3;
}

.categories-menu__mobile-actions {
  display: none;
}

.categories-menu__close-button {  
  font-size: 1em;
}

@media (max-width: 1024px) {
  .categories-menu__mobile-actions {
    height: 70px;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
  }

  .categories-menu {
    position: fixed;
    top: 0;
    right: 0;
    width: 280px;
    height: 100vh;
    background: white;
    z-index: 1000;
    transition: left 0.3s ease;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  }

  .categories-menu__list {
    width: 100%;
  }
}
</style>
