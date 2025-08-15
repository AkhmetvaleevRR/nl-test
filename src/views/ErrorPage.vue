<template>
  <div class="page">
    <h1>Что-то пошло не так...</h1>
    <div class="page__media-object"></div>
    <p>Возможно, данная страница была удалена, либо возникла какая-то ошибка. Бывает. В любом случае попробуйте начать с главной.</p>
    <router-link to="/">Вернуться на главную</router-link>
  </div>
</template>

<script>
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;    
  align-items: center;
}
.page__media-object {
  width: 294px;
  height: 313px;
  background: url('@/assets/images/not-found.svg') center no-repeat;
  background-size: contain;
}
</style>