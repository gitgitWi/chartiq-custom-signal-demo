<script setup lang="ts">
import ChartDetailPage from './components/pages/ChartDetailPage.vue';
</script>

<template>
  <chart-detail-page id="chart-detail-page" />
</template>

<style lang="scss">
@import './styles';

#chart-detail-page {
  @extend .reset-box;
  width: 100%;
}

#app {
  width: 100%;
  height: 100%;
}
</style>
