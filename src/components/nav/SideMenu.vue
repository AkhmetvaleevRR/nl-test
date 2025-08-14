<template>
  <div class="categories-menu">
    <ul class="categories-menu__list">
      <li class="categories-menu__item"
        @click="changeCategory(categorySlug)"
        :class="{'active': !route.params.subcategorySlug}"
      >
        Все продукты
      </li>
      <li 
        class="categories-menu__item"        
        v-for="category in allCategories"
        :key="category.id"
        @click="changeCategory(categorySlug, category.slug)"
        :class="{'active': route.params.subcategorySlug === category.slug}"
      >
        {{ category.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="js">
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router'
const emit = defineEmits(['selectCategory']);
const route = useRoute ();
console.log(route)
const router  = useRouter();

const changeCategory = (slug, subSlug) => {
  if (subSlug) {    
    router.push(`/category/${slug}/${subSlug}`);
    emit('selectCategory', subSlug);
  }
  else {    
    router.push(`/category/${slug}/`);
    emit('selectCategory', slug);
  }
} 
const props = defineProps({
  categories: {
    type: Array,
    required: true,
    default: () => []
  },
  categorySlug: {
    type: String,
    required: true
  }
})

const allCategories = computed(() => {
    return [
      ...props.categories
    ];
  }
);

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

.categories-menu__item a{
  font-size: 1em;
  font-weight: 400;
  text-decoration: none;
  color: #000;
}

.categories-menu__item.active {
  background-color: #E9EEF3;
}


@media (max-width: 1024px) {
  .categories-menu {
    position: fixed;
    top: 0;
    left: -100%;
    width: 280px;
    height: 100vh;
    background: white;
    z-index: 1000;
    transition: left 0.3s ease;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  }

  .categories-menu.active {
    left: 0;
  }

  .categories-menu__list {
    width: 100%;
    padding-top: 60px;
  }

  .menu-toggle {
    display: block;
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px;
  }

  .close-menu {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
  }
}
</style>
