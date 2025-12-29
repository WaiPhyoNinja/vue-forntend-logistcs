<script setup>
import { onMounted, watch, ref } from 'vue';
import Footer from '../layouts/Footer.vue';
import Header from '../layouts/Header.vue';
import Chat from './Chat.vue';
import MobileSlider from './MobileSlider.vue';
import ScrollToTop from './ScrollToTop.vue';
import SearchPopup from './SearchPopup.vue';
import SliderWidget from './SliderWidget.vue';
import BlockRenderer from './BlockRenderer.vue';
import NotFound from './NotFound.vue';
import { useBlocks } from '@/composables/useBlocks';
import { useRoute } from 'vue-router';

const route = useRoute();
const { blocks, loading, fetchPageBlocks } = useBlocks();
const pageNotFound = ref(false);

const loadPage = async () => {
  // Reset page not found state
  pageNotFound.value = false;
  
  // Build permalink from route params
  let permalink = route.path;
  
  // Fetch page blocks based on permalink
  const page = await fetchPageBlocks(permalink);
  
  // If no page found and blocks are empty, show 404
  if (!page && blocks.value.length === 0) {
    pageNotFound.value = true;
  }
};

onMounted(async () => {
  await loadPage();

  // Initialize Bootstrap dropdowns for language switcher
  if (window.bootstrap) {
    const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
    [...dropdownElementList].map(dropdownToggleEl => new window.bootstrap.Dropdown(dropdownToggleEl));
  }
});

// Watch for route changes and reload page
watch(() => route.path, async () => {
  await loadPage();
});
</script>

<template>
    <div class="page-wrapper">
        <Header />
        
        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <p>Loading...</p>
        </div>
        
        <!-- 404 Page -->
        <NotFound v-else-if="pageNotFound" />
        
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
