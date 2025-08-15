<template>
  <div class="card">    
    <img :src=props.product.main_image_thumb_300 alt="product_image" width="276" height="276">
    <p class="card__name  ">
      {{props.product.category.name}}
    </p>    
    <Tooltip :content="props.product.present_name" :max-length=maxLength class="card__present-name">
      <p>
        {{cropName}}
      </p>
    </Tooltip>
    <p class="card__comment">
      {{props.product.comment_name}}
    </p>
    <p class="card__price">
      {{props.product.price + ' ₽'}}
    </p>
    <ui-button class="card__button" :disabled="!productAvailable">
      {{productAvailable? 'В корзину':'Нет в наличии'}}
    </ui-button>
  </div>
</template>

<script setup lang="js">
import {computed} from 'vue';
import Tooltip from './ui/Tooltip.vue';
import uiButton from './ui/uiButton.vue';
const props = defineProps({
  product: Object,
})


const maxLength = 40;

const productAvailable = computed(() => props.product.allowed || props.product.available)

const cropName = computed(() => {
  if (props.product.present_name.length <= maxLength) return props.product.present_name;  
  return props.product.present_name.substring(0, props.product.present_name.lastIndexOf(' ', maxLength)) + '...';
});
</script>

<style scoped>
.card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: grid;
  row-gap: 8px;
  grid-template-rows: 276px 14px 72px 50px 24px 40px 24px;
  grid-template-columns: 32px 212px 32px;
}


.card img {
  width: 100%;
  height: auto;
  grid-column: 1 / -1;
  grid-row: 1;
}

.card__name {
  font-size: 0.9em;
  color: #666;
  margin: 5px 0;
  grid-column: 2;
  grid-row: 2;
}

.card__present-name {
  font-size: 20px;
  font-weight: 600;
  color: #000;
  grid-column: 2;
  grid-row: 3;
  line-height: 1.2;
}

.card__present-name p{
  margin: 0;
}

.card__comment {
  font-size: 1em;
  margin: 0;
  grid-column: 2;
  grid-row: 4;
}

.card__price {
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