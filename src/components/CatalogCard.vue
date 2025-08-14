<template>
  <div class="card">    
    <img :src=product.main_image_thumb_300 alt="product_image">
    <p class="card_name">
      {{product.category.name}}
    </p>
    <p class="present_name">
      {{product.present_name}}
    </p>
    <p class="comment">
      {{product.comment_name}}
    </p>
    <p class="price">
      {{product.price + ' ₽'}}
    </p>
    <ui-button class="card__button" :disabled="!product.allowed || !product.available">
      {{product.allowed || product.available? 'В корзину':'Нет в наличии'}}
    </ui-button>
  </div>
</template>

<script setup lang="js">
import uiButton from './ui/uiButton.vue';
defineProps({
  product: Object,
})
</script>

<style scoped>
.card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  overflow: hidden;
  display: grid;
  row-gap: 15px;
  grid-template-rows: 276px 14px max-content 20px 24px 40px 24px;
  grid-template-columns: 32px 212px 32px;
}


.card img {
  width: 100%;
  overflow: hidden;
  height: auto;
  grid-column: 1 / -1;
  grid-row: 1;
}

.card .card_name {
  font-size: 0.9em;
  color: #666;
  margin: 5px 0;
  grid-column: 2;
  grid-row: 2;
}

.card .present_name {
  font-size: 20px;
  font-weight: 600;
  color: #000;
  margin: 10px 0;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  grid-column: 2;
  grid-row: 3;
}

.card .comment {
  font-size: 1em;
  margin: 0;
  grid-column: 2;
  grid-row: 4;
}

.card .price {
  font-size: 1.5em;
  font-weight: 600;
  color: #000;
  margin: 0 0 10px;
  grid-column: 2;
  grid-row: 5;
}

.card__button {
  font-size: 18px;
  padding: 6px 24px;
  grid-column: 2;
  grid-row: 6;
}
</style>