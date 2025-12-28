<template>
    <section class="page-header">
        <div class="page-header__bg" :style="`background-image: url(${backgroundImageUrl});`">
        </div>
        <div class="container">
            <div class="page-header__inner">
                <div class="page-header__img-1" v-if="headerImageUrl">
                    <img :src="headerImageUrl" alt="">
                </div>
                <div class="page-header__shape-1 float-bob-y" v-if="animationImageUrl">
                    <img :src="animationImageUrl" alt="">
                </div>
                <h3>{{ pageTitle }}</h3>
                <div class="thm-breadcrumb__inner">
                    <ul class="thm-breadcrumb list-unstyled">
                        <li v-for="(link, index) in breadcrumbLinks" :key="index">
                            <a v-if="link.link" :href="link.link">{{ link.link_text }}</a>
                            <span v-else>{{ link.link_text }}</span>
                            <span v-if="index < breadcrumbLinks.length - 1" class="fas fa-angle-right" style="margin: 0 10px;"></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useLanguage } from '@/composables/useLanguage';

const { currentLanguage } = useLanguage();

const headerData = ref(null);
const loading = ref(false);

const directusUrl = 'http://0.0.0.0:8055';

// Computed properties for current language translation
const currentTranslation = computed(() => {
    if (!headerData.value?.translations) return null;
    return headerData.value.translations.find(
        t => t.languages_code === currentLanguage.value
    ) || headerData.value.translations.find(
        t => t.languages_code === 'en-US'
    );
});

const pageTitle = computed(() => {
    return currentTranslation.value?.title || 'Page Title';
});

const breadcrumbLinks = computed(() => {
    if (currentTranslation.value?.link && currentTranslation.value.link.length > 0) {
        return currentTranslation.value.link;
    }
    // Default breadcrumb if no data from API
    return [
        { link: '/', link_text: 'Home' },
        { link: null, link_text: pageTitle.value }
    ];
});

const headerImageUrl = computed(() => {
    if (headerData.value?.header_image) {
        return `${directusUrl}/assets/${headerData.value.header_image}`;
    }
    return 'assets/images/backgrounds/page-header-bg.jpg';
});

const backgroundImageUrl = computed(() => {
    if (headerData.value?.header_bg_image) {
        return `${directusUrl}/assets/${headerData.value.header_bg_image}`;
    }
    return 'assets/images/backgrounds/page-header-bg.jpg';
});


const animationImageUrl = computed(() => {
    if (headerData.value?.animation_image) {
        return `${directusUrl}/assets/${headerData.value.animation_image}`;
    }
    return null;
});

const fetchHeaderData = async () => {
    loading.value = true;
    try {
        console.log('Fetching header data from:', `${directusUrl}/items/block_header`);
        
        // Try using direct fetch for public access
        const response = await fetch(`${directusUrl}/items/block_header?fields=*,translations.*`);
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data);

        if (data.data && data.data.length > 0) {
            headerData.value = data.data[0];
            console.log('Page header data loaded:', headerData.value);
            console.log('Current translation:', currentTranslation.value);
        } else {
            console.warn('No header data found in API response');
        }
    } catch (error) {
        console.error('Error fetching header data:', error);
        console.warn('Component will use default fallback values');
    } finally {
        loading.value = false;
        console.log('Header loading complete. headerData:', headerData.value);
        console.log('Page Title:', pageTitle.value);
        console.log('Breadcrumbs:', breadcrumbLinks.value);
    }
};

onMounted(() => {
    fetchHeaderData();
});
</script>