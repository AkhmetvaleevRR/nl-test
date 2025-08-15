<template>
  <div class="navigation-bar">
    <div class="navigation-bar__content">
      <ui-button 
        type="icon" 
        class="navigation-bar__button" 
        @click="$emit('show-modal')"        
        aria-label="Выбрать город"
      >
        <img 
          class="icon" 
          src="@/assets/icons/navIcon.svg" 
          alt="navigation icon" 
          width="16"
          height="16"
        >
        <p>{{store.currentCity.city?store.currentCity.city:"Новосибирск"}}</p>
      </ui-button>
    </div>
  </div>
</template>

<script setup lang="js">
import uiButton from '../ui/uiButton.vue';
import { useStore } from '../../stores/store';
const store = useStore();
</script>

<style scoped>
.navigation-bar {
  background-color: #fff;
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
  .navigation-bar__content {
    padding: 0 5%;
    width: 100%;
  }
}
</style>