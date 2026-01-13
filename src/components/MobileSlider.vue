<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import directus from '@/services/directus';
import { readItems } from '@directus/sdk';
import { useLanguage } from '@/composables/useLanguage';
import { useMobileNav } from '@/composables/useMobileNav';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const { currentLanguage, getTranslation } = useLanguage();
const { isMobileNavOpen, toggleMobileNav } = useMobileNav();
const { isAuthenticated, user } = useAuth();

const menuItems = ref([]);
const locationData = ref(null);
const socialIcons = ref([]);

const currentTranslation = computed(() => {
  if (!locationData.value || !locationData.value.translations) return null;
  return getTranslation(locationData.value.translations);
});

const getMenuItemTranslation = (item) => {
  if (!item.translations || !Array.isArray(item.translations)) return null;
  return getTranslation(item.translations);
};

const getSocialIconUrl = (iconId) => {
  if (!iconId) return '';
  const baseUrl = import.meta.env.VITE_DIRECTUS_URL || '';
  return `${baseUrl}/assets/${iconId}`;
};

const handleNavClick = (url) => {
  if (url && url !== '#') {
    router.push(url);
    toggleMobileNav();
  }
};

onMounted(async () => {
  try {
    // Fetch menu from Directus
    const menuResponse = await directus.request(
      readItems('menu', {
        fields: ['*', 'items.*', 'items.translations.*', 'items.sub_menu.*', 'items.sub_menu.translations.*'],
        filter: { menu_id: { _eq: 'header' }, is_active: { _eq: true } }
      })
    );
    
    if (menuResponse && menuResponse.length > 0) {
      menuItems.value = menuResponse[0].items || [];
    }

    // Fetch location data
    const response = await directus.request(
      readItems('locations', {
        fields: ['*', 'translations.*'],
        filter: { status: { _eq: 'published' } }
      })
    );
    
    if (response && response.length > 0) {
      locationData.value = response[0];
    }

    // Fetch social icons
    const socialResponse = await directus.request(
      readItems('social_icons', {
        fields: ['*', 'translations.*'],
        filter: { status: { _eq: true } }
      })
    );
    
    if (socialResponse && socialResponse.length > 0) {
      socialIcons.value = socialResponse;
    }
  } catch (error) {
    console.error('Error fetching mobile nav data:', error);
  }
});
</script>

<template>
    <div class="mobile-nav__wrapper" :class="{ 'expanded': isMobileNavOpen }">
        <div class="mobile-nav__overlay mobile-nav__toggler" @click="toggleMobileNav"></div>
        <!-- /.mobile-nav__overlay -->
        <div class="mobile-nav__content">
            <span class="mobile-nav__close mobile-nav__toggler" @click="toggleMobileNav"><i class="fa fa-times"></i></span>
            <div class="logo-box">
                <a href="#" @click.prevent="handleNavClick('/')" aria-label="logo image">
                    <img src="https://dreamlayout.mnsithub.com/php/tanspotphp/assets/images/resources/logo-3.png"
                        width="140" alt="Tanspot Logo">
                </a>
            </div>
            <!-- /.logo-box -->
            <div class="mobile-nav__container">
                <ul class="main-menu__list">
                    <li v-for="item in menuItems" :key="item.id" :class="{ 'dropdown': item.type === 'Group' && item.sub_menu && item.sub_menu.length > 0 }">
                        <a :href="item.url || '#'" @click.prevent="handleNavClick(item.url)">
                            {{ getMenuItemTranslation(item)?.title || item.url }}
                            <button v-if="item.type === 'Group' && item.sub_menu && item.sub_menu.length > 0" aria-label="dropdown toggler">
                                <i class="fa fa-angle-down"></i>
                            </button>
                        </a>
                        <ul v-if="item.type === 'Group' && item.sub_menu && item.sub_menu.length > 0" class="shadow-box">
                            <li v-for="subItem in item.sub_menu" :key="subItem.id">
                                <a :href="subItem.url || '#'" @click.prevent="handleNavClick(subItem.url)">
                                    {{ getMenuItemTranslation(subItem)?.title || subItem.url }}
                                </a>
                            </li>
                        </ul>
                    </li>
                    
                    <!-- User Menu Items -->
                    <li v-if="isAuthenticated">
                        <a href="#" @click.prevent="handleNavClick('/my-account')">My Account</a>
                    </li>
                    <li v-else>
                        <a href="#" @click.prevent="handleNavClick('/login')">Login</a>
                    </li>
                </ul>
            </div>
            <!-- /.mobile-nav__container -->

            <ul class="mobile-nav__contact list-unstyled">
                <li v-if="currentTranslation?.email">
                    <i class="fa fa-envelope"></i>
                    <a :href="'mailto:' + currentTranslation.email">{{ currentTranslation.email }}</a>
                </li>
                <li v-if="currentTranslation?.phone">
                    <i class="fas fa-phone"></i>
                    <a :href="'tel:' + currentTranslation.phone">{{ currentTranslation.phone }}</a>
                </li>
            </ul><!-- /.mobile-nav__contact -->
            <div class="mobile-nav__top">
                <div class="mobile-nav__social" v-if="socialIcons.length > 0">
                    <a v-for="social in socialIcons" :key="social.id" :href="social.link" target="_blank" rel="noopener noreferrer">
                        <img :src="getSocialIconUrl(social.icon)" :alt="social.link" style="width: 16px; height: 16px; object-fit: contain;">
                    </a>
                </div><!-- /.mobile-nav__social -->
            </div><!-- /.mobile-nav__top -->

        </div>
        <!-- /.mobile-nav__content -->
    </div>
</template>

<style scoped>
.mobile-nav__social a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    margin-right: 8px;
    transition: all 0.3s ease;
}

.mobile-nav__social a:hover {
    background: var(--tanspot-base, #e03e2d);
    transform: translateY(-3px);
}

.mobile-nav__social a img {
    filter: brightness(0) invert(1);
}
</style>
