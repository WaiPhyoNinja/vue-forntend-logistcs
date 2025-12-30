<template>
    <section class="about-one" v-if="aboutContent">
    <div class="container">
        <div class="row">
            <div class="col-xl-6">
                <div class="about-one__left wow slideInLeft animated" data-wow-delay="100ms" data-wow-duration="2500ms" style="visibility: visible; animation-duration: 2500ms; animation-delay: 100ms; animation-name: slideInLeft;">
                    <div class="about-one__img-box">
                        <div class="about-one__img">
                            <img :src="imageUrl" alt="About Us">
                        </div>
                        <div class="about-one__circle-text">
                            <div class="about-one__round-text-box">
                                <div class="inner">
                                    <div class="about-one__curved-circle rotate-me" v-html="animationText"></div>
                                </div>
                                <div class="overlay-icon-box">
                                    <a :href="translation?.link || '#'"><i class="icon-plane"></i></a>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
            <div class="col-xl-6">
                <div class="about-one__right">
                    <div class="section-title text-left sec-title-animation animation-style2">
                        <div class="section-title__tagline-box">
                            <span class="section-title__tagline-border"></span>
                            <div class="section-title__shape-1">
                                <i class="fas fa-plane"></i>
                            </div>
                            <h6 class="section-title__tagline">{{ translation?.title_tagline || 'ABOUT US' }}</h6>
                            <span class="section-title__tagline-border"></span>
                            <div class="section-title__shape-2">
                                <i class="fas fa-plane"></i>
                            </div>
                        </div>
                        <h3 class="section-title__title title-animation" v-html="translation?.header"></h3>
                    </div>
                    <div class="about-one__text" v-html="translation?.content"></div>
                    <div class="about-one__point-box" v-if="translation?.content_descrption && translation.content_descrption.length > 0">
                        <ul class="about-one__point">
                            <li v-for="(item, index) in translation.content_descrption" :key="index">
                                <div class="about-one__point-icon">
                                    <span :class="index === 0 ? 'icon-worldwide-shipping-1' : 'icon-24-hours-service'"></span>
                                </div>
                                <div class="about-one__point-content" v-html="item.content_text"></div>
                            </li>
                        </ul>
                    </div>
                    <div class="about-one__point-box-two" v-if="translation?.content_descrption && translation.content_descrption.length > 0">
                        <ul class="about-one__point-two" v-for="(item, index) in translation.content_descrption" :key="index">
                            <li v-for="(label, labelIndex) in item.content_label" :key="labelIndex">
                                <div class="icon">
                                    <span class="fas fa-check"></span>
                                </div>
                                <div class="text">
                                    <p>{{ label }}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="about-one__btn-and-author-box">
                        <div class="about-one__btn-box">
                            <a :href="translation?.link || '#'" class="thm-btn">{{ translation?.link_text || 'Read More' }}
                                <span><i class="icon-right-arrow"></i></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useLanguage } from '@/composables/useLanguage';

const props = defineProps({
    data: {
        type: Object,
        required: false,
        default: () => ({})
    }
});

const { currentLanguage } = useLanguage();
const aboutContent = ref(null);
const loading = ref(true);

const translation = computed(() => {
    if (!aboutContent.value || !aboutContent.value.translations) return null;
    
    const trans = aboutContent.value.translations.find(
        t => t.languages_code === currentLanguage.value
    );
    
    return trans || aboutContent.value.translations[0];
});

const imageUrl = computed(() => {
    if (!aboutContent.value?.image) return '';
    return `http://0.0.0.0:8055/assets/${aboutContent.value.image}`;
});

const animationText = computed(() => {
    return translation.value?.animation_text || 'Welcome To Our Company Property since 2018';
});

const fetchAboutContent = async () => {
    try {
        loading.value = true;
        const response = await fetch('http://0.0.0.0:8055/items/block_about_us?fields=*,translations.*');
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
            aboutContent.value = data.data[0];
        }
    } catch (error) {
        console.error('Error fetching about content:', error);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchAboutContent();
});

onMounted(() => {
    fetchAboutContent();
});

</script>

<style scoped>
.about-one {
    margin-bottom: 30px;
}
</style>