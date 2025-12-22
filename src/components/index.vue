<script setup>
import { onMounted } from 'vue';
import Footer from '../layouts/Footer.vue';
import Header from '../layouts/Header.vue';
import Chat from './Chat.vue';
import MobileSlider from './MobileSlider.vue';
import ScrollToTop from './ScrollToTop.vue';
import SearchPopup from './SearchPopup.vue';
import SliderWidget from './SliderWidget.vue';
import BlockRenderer from './BlockRenderer.vue';
import { useBlocks } from '@/composables/useBlocks';
import { useRoute } from 'vue-router';

const route = useRoute();
const { blocks, loading, fetchPageBlocks } = useBlocks();

onMounted(async () => {
  // Fetch page blocks based on current route
  const permalink = route.path || '/';
  await fetchPageBlocks(permalink);

  // Initialize Bootstrap dropdowns for language switcher
  if (window.bootstrap) {
    const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
    [...dropdownElementList].map(dropdownToggleEl => new window.bootstrap.Dropdown(dropdownToggleEl));
  }
});
</script>

<template>
    <div class="page-wrapper">
        <Header />
        
        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <p>Loading...</p>
        </div>
        
        <!-- Dynamic Blocks -->
        <BlockRenderer v-else :blocks="blocks" />
    
        <Footer />
    </div>
    <Chat />
    <MobileSlider />
    <SearchPopup />
    <ScrollToTop />
    <SliderWidget />
</template>

<style scoped>
/* All styles are loaded from the main CSS files */
.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}
</style>
