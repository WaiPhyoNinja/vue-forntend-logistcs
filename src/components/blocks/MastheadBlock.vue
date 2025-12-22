<template>
  <section class="banner-one">
            <div class="banner-one__pattern"
                style="background-image: url(../../assets/img/banner-ong-pattern.png);"></div>
            <div class="banner-one__img aos-init aos-animate" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="0">
                <img :src="getImageUrl(blockData?.masthead_image)" alt="">
            </div>
            <div class="banner-one__shape-3 float-bob-y">
                <img src="../../assets/img/shapes/banner-one-shape-3.png" alt="">
            </div>
            <div class="banner-one__line-shpae1"></div>
            <div class="banner-one__line-shpae2"></div>
            <div class="container">
                <div class="banner-one__inner">
                    <div class="banner-one__content-box">
                        <p class="banner-one__sub-title">{{ translation?.sub_title ?? '' }}</p>
                        <h2 class="banner-one__title">{{ translation?.title ?? '' }} <br>
                            <span class="typed-effect typed-fade-out" id="type-1"
                                :data-strings="typedStrings">{{ translation?.type_effect ?? '' }}</span>
                                <span class="typed-cursor"></span>
                        </h2>
                        <p class="banner-one__text" v-html="translation?.content ?? ''"></p>
                        <div class="banner-one__btn-and-review-box">
                            <div class="banner-one__btn-box">
                                <router-link :to="translation?.link ?? '/about'" class="thm-btn">{{ translation?.link_text ?? 'Discover More' }}
                                    <span><i class="icon-right-arrow"></i></span>
                                </router-link>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
</template>

<script setup>
import { computed, onMounted, watch, ref } from 'vue';
import { useLanguage } from '@/composables/useLanguage';

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

const { getTranslation, currentLanguage } = useLanguage();

const blockData = computed(() => props.data);
const translation = computed(() => {
  if (!blockData.value?.translations) return null;
  return getTranslation(blockData.value.translations);
});

let typedInstance = ref(null);

const initTypedEffect = () => {
  // Destroy previous instance if exists
  if (typedInstance.value) {
    typedInstance.value.destroy();
    typedInstance.value = null;
  }

  // Clear the element content first
  const typeElement = document.getElementById('type-1');
  if (typeElement) {
    typeElement.textContent = '';
  }

  setTimeout(() => {
    if (window.Typed && typeElement) {
      const words = translation.value?.type_effect || 'Transport,Provider,Services';
      const wordsArray = words.split(',').map(s => s.trim()).filter(s => s);
      
      if (wordsArray.length > 0) {
        typedInstance.value = new window.Typed('#type-1', {
          strings: wordsArray,
          typeSpeed: 80,
          backSpeed: 50,
          backDelay: 1500,
          startDelay: 300,
          loop: true,
          showCursor: true,
          cursorChar: '|'
        });
      }
    }
  }, 150);
};

const typedStrings = computed(() => {
  if (translation.value?.typed_words) {
    return translation.value.typed_words;
  }
  return 'Transport, Provider, Services';
});

const reviewImages = computed(() => {
  if (translation.value?.review_images) {
    try {
      return JSON.parse(translation.value.review_images);
    } catch {
      return [];
    }
  }
  if (blockData.value?.review_images) {
    try {
      return JSON.parse(blockData.value.review_images);
    } catch {
      return [];
    }
  }
  return [];
});

const getImageUrl = (imageId) => {
  if (!imageId) return '';
  if (imageId.startsWith('http')) return imageId;
  const url = `http://localhost:8055/assets/${imageId}`;
  return url;
};

onMounted(() => {
  initTypedEffect();
});

// Watch for language changes and reinitialize typed effect
watch(currentLanguage, () => {
  // Add a small delay to ensure translation has updated
  setTimeout(() => {
    initTypedEffect();
  }, 100);
});
</script>

<style>
/* Myanmar language font size adjustments */
body.myanmar-lang .banner-one__sub-title {
  font-size: 20px !important;
}

body.myanmar-lang .banner-one__title {
  font-size: 60px !important;
}

body.myanmar-lang .banner-one__title .typed-effect,
body.myanmar-lang .banner-one__title .typed-cursor {
  font-size: 40px !important;
}

body.myanmar-lang .banner-one__text,
body.myanmar-lang .thm-btn {
  font-size: 0.9em !important;
}

/* Thai language font size adjustments */
body.thai-lang .banner-one__sub-title {
  font-size:  20px !important;
}

body.thai-lang .banner-one__title {
  font-size: 60px !important;
}

body.thai-lang .banner-one__title .typed-effect,
body.thai-lang .banner-one__title .typed-cursor {
  font-size: 45px !important;
}

body.thai-lang .banner-one__text,
body.thai-lang .thm-btn {
  font-size: 0.9em !important;
}
</style>
