import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

/**
 * ChartIQ custom element 등록
 */
app.config.compilerOptions.isCustomElement = (tag) => /^cq-.*$/.test(tag);
app.component('TemplatePlaceholder', {
  render(createElement: any) {
    console.warn(createElement);
    return createElement('template', this.$slots.default);
  },
});

app.mount('#app');
