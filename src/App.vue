<script setup>
import CityModal from '@/components/CityModal.vue';
import { useStore } from './stores/store';
import { ref } from 'vue';
import NavBar from '@/components/nav/NavBar.vue'

const store = useStore();
const showModal = ref(false);;
</script>

<template>
  <NavBar v-model="store.currentCity.id" @showModal="showModal = true;"/>
    <router-view></router-view>
  <CityModal v-model="showModal"/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
