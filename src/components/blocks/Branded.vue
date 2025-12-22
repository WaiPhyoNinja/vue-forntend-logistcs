<template>
    <section class="brand-one">
        <div class="container">
            <div class="brand-one__carousel owl-carousel owl-theme">
                <div class="brand-one__single" v-for="(image, index) in brandImages" :key="index">
                    <div class="brand-one__single-inner">
                        <a href="#"><img :src="getImageUrl(image)" alt=""></a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed, onMounted } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

const blockData = computed(() => props.data);

const brandImages = computed(() => {
  if (blockData.value?.images && Array.isArray(blockData.value.images)) {
    return blockData.value.images;
  }
  return [];
});

const getImageUrl = (imageObj) => {
  if (!imageObj) return '';
  
  // Handle object with directus_files_id
  if (typeof imageObj === 'object' && imageObj.directus_files_id) {
    return `http://0.0.0.0:8055/assets/${imageObj.directus_files_id}`;
  }
  
  // Handle direct string/number ID
  if (typeof imageObj === 'string' || typeof imageObj === 'number') {
    return `http://0.0.0.0:8055/assets/${imageObj}`;
  }
  
  return '';
};

onMounted(() => {
  setTimeout(() => {
    if (window.$ && window.$.fn.owlCarousel) {
      window.$('.brand-one__carousel').owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
          0: { items: 2 },
          600: { items: 3 },
          768: { items: 4 },
          992: { items: 5 },
          1200: { items: 6 }
        }
      });
    }
  }, 500);
});
</script>

<style scoped></style>