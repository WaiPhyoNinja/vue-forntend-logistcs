<template>
    <footer class="site-footer">
        <div class="site-footer__shape-bg"></div>
        <div class="container">
            <div class="site-footer__top">
                <div class="row">
                    <div class="col-xl-12">
                        <div class="footer-widget__column footer-widget__newsletter">
                            <h3 class="footer-widget__newsletter-title">Subscribe To Our Newsletter To<br> Get Latest Update</h3>
                            <form class="footer-widget__newsletter-form" @submit.prevent="handleSubscribe">
                                <div class="footer-widget__newsletter-form-input-box">
                                    <input type="email" placeholder="Enter email" name="email" v-model="email">
                                </div>
                                <button type="submit" class="footer-widget__newsletter-btn thm-btn">
                                    Subscribe <span><i class="icon-right-arrow"></i></span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="site-footer__middle">
                <div class="row">
                    <div class="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="100ms">
                        <div class="footer-widget__column footer-widget__about">
                            <div class="footer-widget__logo">
                                <router-link to="/">
                                    <img :src="footerLogoUrl" alt="Footer Logo">
                                </router-link>
                            </div>
                            <p class="footer-widget__about-text">
                                {{ footerTranslation?.footer_content || 'Secure other greater pleasures, or else he endures pains to avoid worse pains selection' }}
                            </p>
                            <div class="site-footer__social">
                                <a v-for="social in socialIcons" :key="social.id" :href="social.link" target="_blank" rel="noopener noreferrer">
                                    <img :src="getSocialIconUrl(social.icon)" :alt="social.link" style="width: 16px; height: 16px; object-fit: contain;">
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="200ms">
                        <div class="footer-widget__column footer-widget__usefull-link">
                            <div class="footer-widget__title-box">
                                <h3 class="footer-widget__title">{{ quickLinksTitle }}</h3>
                            </div>
                            <div class="footer-widget__link-box">
                                <ul class="footer-widget__link list-unstyled">
                                    <li v-for="item in quickLinksMenu" :key="item.id">
                                        <router-link v-if="item.type === 'URL'" :to="item.url || '#'">
                                            {{ getMenuItemTranslation(item)?.title || item.url }}
                                        </router-link>
                                        <router-link v-else-if="item.type === 'Posts'" :to="getMenuItemUrl(item)">
                                            {{ getMenuItemTranslation(item)?.title || 'Post' }}
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-6 col-md-6 wow fadeInUp animated" data-wow-delay="300ms" style="visibility: visible; animation-delay: 300ms;">
                            <div class="footer-widget__column footer-widget__services">
                                <div class="footer-widget__title-box">
                                    <h3 class="footer-widget__title">{{ servicesTitle }}</h3>
                                </div>
                                <ul class="footer-widget__link list-unstyled">
                                    <li v-for="item in servicesMenu" :key="item.id">
                                        <router-link v-if="item.type === 'URL'" :to="item.url || '#'">
                                            {{ getMenuItemTranslation(item)?.title || item.url }}
                                        </router-link>
                                        <router-link v-else-if="item.type === 'Posts'" :to="getMenuItemUrl(item)">
                                            {{ getMenuItemTranslation(item)?.title || 'Post' }}
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    <div class="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="400ms">
                        <div class="footer-widget__column footer-widget__contact">
                            <div class="footer-widget__title-box">
                                <h3 class="footer-widget__title">Contact</h3>
                            </div>
                            <ul class="footer-widget__contact-list list-unstyled">
                                <li>
                                    <div class="icon">
                                        <span class="icon-phone-call"></span>
                                    </div>
                                    <div class="content">
                                        <p><a :href="'tel:' + (currentTranslation?.phone || '+92 (8800) 6780')">
                                            {{ currentTranslation?.phone || '+92 (8800) 6780' }}
                                        </a></p>
                                    </div>
                                </li>
                                <li>
                                    <div class="icon">
                                        <span class="icon-email"></span>
                                    </div>
                                    <div class="content">
                                        <p><a :href="'mailto:' + (currentTranslation?.email || 'info@tanspot24.com')">
                                            {{ currentTranslation?.email || 'info@tanspot24.com' }}
                                        </a></p>
                                    </div>
                                </li>
                                <li>
                                    <div class="icon">
                                        <span class="icon-location1"></span>
                                    </div>
                                    <div class="content">
                                        <p>{{ currentTranslation?.address || '4517 Washington Ave. Manchester, 95' }}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="site-footer__bottom">
                <div class="container">
                    <div class="site-footer__bottom-inner">
                        <p class="site-footer__bottom-text">© Copywright 2025 by <a href="/">westeastfreight.com</a> All Rights Reserved.</p>
                        <ul class="list-unstyled site-footer__bottom-menu">
                            <li><router-link to="/contact">Support</router-link></li>
                            <li><a href="#">Terms and Condition</a></li>
                            <li><a href="#">Privacy and Policy</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import directus from '@/services/directus';
import { readItems } from '@directus/sdk';
import { useLanguage } from '@/composables/useLanguage';

const { getTranslation } = useLanguage();
const email = ref('');
const locationData = ref(null);
const footerData = ref(null);
const socialIcons = ref([]);
const quickLinksMenu = ref([]);
const quickLinksMenuData = ref(null);
const servicesMenu = ref([]);
const servicesMenuData = ref(null);

const currentTranslation = computed(() => {
  if (!locationData.value || !locationData.value.translations) return null;
  return getTranslation(locationData.value.translations);
});

const footerTranslation = computed(() => {
  if (!footerData.value || !footerData.value.translations) return null;
  return getTranslation(footerData.value.translations);
});

const quickLinksTitle = computed(() => {
  if (!quickLinksMenuData.value?.translations) return quickLinksMenuData.value?.title || 'Quick Links';
  const translation = getTranslation(quickLinksMenuData.value.translations);
  return translation?.menu_header || quickLinksMenuData.value?.title || 'Quick Links';
});

const servicesTitle = computed(() => {
  if (!servicesMenuData.value?.translations) return servicesMenuData.value?.title || 'Services';
  const translation = getTranslation(servicesMenuData.value.translations);
  return translation?.menu_header || servicesMenuData.value?.title || 'Services';
});

const footerLogoUrl = computed(() => {
  if (!footerData.value?.footer_logo) {
    return 'https://dreamlayout.mnsithub.com/php/tanspotphp/assets/images/resources/footer-logo.png';
  }
  const baseUrl = import.meta.env.VITE_DIRECTUS_URL || 'http://0.0.0.0:8055';
  return `${baseUrl}/assets/${footerData.value.footer_logo}`;
});

const getSocialIconUrl = (iconId) => {
  if (!iconId) return '';
  const baseUrl = import.meta.env.VITE_DIRECTUS_URL || 'http://0.0.0.0:8055';
  return `${baseUrl}/assets/${iconId}`;
};

const getMenuItemTranslation = (item) => {
  if (!item.translations || !Array.isArray(item.translations)) return null;
  return getTranslation(item.translations);
};

const getMenuItemUrl = (item) => {
  if (item.type === 'Posts' && item.posts) {
    return `/post/${item.posts}`;
  }
  return item.url || '#';
};

const handleSubscribe = () => {
    console.log('Subscribe email:', email.value);
    // Add your subscription logic here
    email.value = '';
};

onMounted(async () => {
  try {
    // Fetch location data from Directus
    const locationResponse = await directus.request(
      readItems('locations', {
        fields: ['*', 'translations.*'],
        filter: { status: { _eq: 'published' } }
      })
    );
    
    if (locationResponse && locationResponse.length > 0) {
      locationData.value = locationResponse[0];
    }

    // Fetch footer data from Directus
    const footerResponse = await directus.request(
      readItems('footer', {
        fields: ['*', 'translations.*'],
        filter: { status: { _eq: true } }
      })
    );
    
    if (footerResponse && footerResponse.length > 0) {
      footerData.value = footerResponse[0];
      
    }

    // Fetch social icons from Directus
    const socialResponse = await directus.request(
      readItems('social_icons', {
        fields: ['*', 'translations.*'],
        filter: { status: { _eq: true } }
      })
    );
    
    if (socialResponse && socialResponse.length > 0) {
      socialIcons.value = socialResponse;
     
    }

    // Fetch quick links menu from Directus
    const menuResponse = await directus.request(
      readItems('menu', {
        fields: ['*', 'items.*', 'items.translations.*', 'translations.*'],
        filter: { menu_id: { _eq: 'quick_links' }, is_active: { _eq: true } }
      })
    );
    
    if (menuResponse && menuResponse.length > 0) {
      quickLinksMenuData.value = menuResponse[0];
      quickLinksMenu.value = menuResponse[0].items || [];
    
    }

    // Fetch services menu from Directus
    const servicesResponse = await directus.request(
      readItems('menu', {
        fields: ['*', 'items.*', 'items.translations.*', 'translations.*'],
        filter: { menu_id: { _eq: 'services' }, is_active: { _eq: true } }
      })
    );
    
    if (servicesResponse && servicesResponse.length > 0) {
      servicesMenuData.value = servicesResponse[0];
      servicesMenu.value = servicesResponse[0].items || [];
    
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>

<style>
/* Myanmar language support for footer */
body.myanmar-lang footer .footer-widget__title {
    font-size: 0.95em;
}

body.myanmar-lang footer .footer-widget__link a,
body.myanmar-lang footer .footer-widget__about-text,
body.myanmar-lang footer .footer-widget__contact-list p {
    font-size: 1em;
}

/* Thai language support for footer */
body.thai-lang footer .footer-widget__title {
    font-size: 0.95em;
}

body.thai-lang footer .footer-widget__link a,
body.thai-lang footer .footer-widget__about-text,
body.thai-lang footer .footer-widget__contact-list p {
    font-size: 1em;
}
</style>
