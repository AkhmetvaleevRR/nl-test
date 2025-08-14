<template>
  <div class="navigation-bar">
    <div class="navigation-bar__content">
      <button class="navigation-bar__button" @click="$emit('show-modal')">
        <img class="icon" src="@/assets/icons/navIcon.svg" alt="navigation icon">
        <p>{{store.currentCity.city?store.currentCity.city:"Новосибирск"}}</p>
      </button>   
    </div>
  </div>
</template>

<script setup lang="js">
import { useStore } from '../../stores/store';
const store = useStore();
</script>

<style scoped>
.navigation-bar {
  background-color: white;
  box-shadow: 0px 2px 4px 0px #2727271A;
  width: 100%;
  min-height: 72px;
  display: flex;
  justify-content: center;
}

.navigation-bar__content {
  width: 70%;
  min-height: 72px;  
  display: flex;
  justify-content: flex-start;
}


.navigation-bar__button {
  border: none;
  background-color: inherit;
  cursor: pointer;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

@media (max-width: 1024px) {
  .navigation-bar {
    position: fixed;
    z-index: 1;
  }
}
</style>