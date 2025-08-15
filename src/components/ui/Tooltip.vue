<template>
  <div class="tooltip-container" 
      @mouseenter="showTooltip = true"
      @mouseleave="showTooltip = false">
    <slot/>
    <div 
      class="tooltip"
      v-show="showTooltip && props.maxLength < props.content.length"
    >
      {{ content }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  content: String,
  maxLength: Number
});

const showTooltip = ref(false);
</script>

<style scoped>
.tooltip-container {
  position: relative;
  display: block;
}

.tooltip {
  top: -80px;
  right: 0;
  position: absolute;
  z-index: 1;
  padding: 8px 12px;
  background: #979797e1;
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.4;
  pointer-events: none;
}
</style>