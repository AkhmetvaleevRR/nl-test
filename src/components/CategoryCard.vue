<template>
  <router-link 
    class="category-card"
    :to="`/category/${category.slug}/`" 
    :style="{ backgroundImage: `url(${category.image})`}">
    <p 
      class="category-card__name" 
      :style="{ color: category.text_color? category.text_color : '#FFF'}"
    >
      {{category.name}}
    </p>
  </router-link>
</template>

<script setup lang="js">
defineProps({
  category: Object,
})

</script>

<style>
.category-card {
  border-radius: 5px;
  font-weight: 600;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: 0px;
  position: relative;
  cursor: pointer;
  width: 288px;
  height: 152px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  text-decoration: none;
}

.category-card__image {
  height: 100%;
}

.category-card__name {
  margin: 20px;
}
</style>