<template>
  <button :class="type === 'icon' ? 'ui-button__icon' : 'ui-button'">
    <slot />
  </button>
</template>

<script setup lang="js">
defineProps({
  type: {
    type: String ['icon', 'primary'],
    default: "primary"
  },
})
</script>

<style scoped>
button {
  margin: 0;
}
.ui-button {
  padding: 14px 24px;
  border-radius: 24px;
  border: none;
  cursor: pointer;
  background: linear-gradient(to right, #FFA800, #FF6F00);
  box-shadow: 0px 8px 10px 0px #ffa80078;
  color: #fff;
}

.ui-button:disabled {
  background: #fff;
  color: #27272780;
  border: 2px solid #9797974D;
  box-shadow: none;
  cursor: not-allowed;
}

a {
  text-decoration: none;
}

.ui-button__icon {
  border: none;
  background-color: transparent;
  cursor: pointer;
}
</style>
