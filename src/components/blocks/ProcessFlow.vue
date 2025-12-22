<template>
    <section class="process-one" v-if="translatedContent">
        <div class="process-one__map" style="background-image: url(assets/images/shapes/process-one-map.png);">
        </div>
        <div class="container">
            <div class="section-title text-center sec-title-animation animation-style2">
                <div class="section-title__tagline-box">
                    <span class="section-title__tagline-border"></span>
                    <div class="section-title__shape-1">
                        <i class="fas fa-plane"></i>
                    </div>
                    <h6 class="section-title__tagline">{{ translatedContent.sub_title }}</h6>
                    <span class="section-title__tagline-border"></span>
                    <div class="section-title__shape-2">
                        <i class="fas fa-plane"></i>
                    </div>
                </div>
                <h3 class="section-title__title title-animation" v-html="translatedContent.header"></h3>
            </div>
            <div class="process-one__inner">
                <ul class="process-one__list list-unstyled">
                    <li v-for="(item, index) in processItems" :key="index">
                        <div class="process-one__icon">
                            <span :class="item.icon"></span>
                            <div class="process-one__count"></div>
                        </div>
                        <h4 class="process-one__title">{{ item.title }}</h4>
                        <div class="process-one__text" v-html="item.content"></div>
                        <div class="process-one__shpae-1" v-if="index < processItems.length - 1"></div>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue';
import { useLanguage } from '@/composables/useLanguage';

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

const { currentLanguage, getTranslation } = useLanguage();

// Get translated content based on current language
const translatedContent = computed(() => {
  return getTranslation(props.data?.translations);
});

// Get process items from the content
const processItems = computed(() => {
  if (!translatedContent.value?.content) return [];
  
  const content = translatedContent.value.content;
  
  // If content has translations array, get all translations for current language
  if (content.translations && Array.isArray(content.translations)) {
    return content.translations
      .filter(t => t.languages_code === currentLanguage.value)
      .map(translation => ({
        icon: getIconClass(translation.number),
        title: translation.title,
        content: translation.content,
        image: content.image
      }));
  }
  
  return [];
});

// Map process numbers to icon classes
const getIconClass = (number) => {
  const iconMap = {
    '01': 'icon-phone-call',
    '02': 'icon-box1',
    '03': 'icon-packaging',
    '04': 'icon-truck'
  };
  return iconMap[number] || 'icon-phone-call';
};

// Get background image URL for the map
const getImageUrl = (fileId) => {
  if (!fileId) return '';
  return `http://0.0.0.0:8055/assets/${fileId}`;
};

// Strip HTML tags for plain text display
const stripHtml = (html) => {
  if (!html) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};
</script><style scoped>
/* All styles are loaded from the main CSS files */
</style>