
<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import directus from '@/services/directus';
import { readItems } from '@directus/sdk';
import { useLanguage } from '@/composables/useLanguage';

const { currentLanguage, setLanguage, initLanguage, getTranslation } = useLanguage();
const locationData = ref(null);
const socialIcons = ref([]);
const menuItems = ref([]);
const isDropdownOpen = ref(false);
const isDropdownOpenSticky = ref(false);

const currentTranslation = computed(() => {
  if (!locationData.value || !locationData.value.translations) return null;
  return getTranslation(locationData.value.translations);
});

const changeLanguage = (lang) => {
  setLanguage(lang);
  isDropdownOpen.value = false;
  isDropdownOpenSticky.value = false;
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
  isDropdownOpenSticky.value = false;
};

const toggleDropdownSticky = () => {
  isDropdownOpenSticky.value = !isDropdownOpenSticky.value;
  isDropdownOpen.value = false;
};

// Language display info
const languages = [
  { code: 'en', name: 'English', flag: 'us', fullCode: 'en-US' },
  { code: 'mm', name: 'Myanmar', flag: 'mm', fullCode: 'mm' },
  { code: 'th', name: 'ThaiLand', flag: 'th', fullCode: 'th' }
];

const currentLanguageInfo = computed(() => {
  return languages.find(lang => lang.fullCode === currentLanguage.value) || languages[0];
});

const getSocialIconUrl = (iconId) => {
  if (!iconId) return '';
  return `http://0.0.0.0:8055/assets/${iconId}`;
};

// Watch for language changes and apply body class
watch(currentLanguage, (newLang) => {
  // Remove all language classes first
  document.body.classList.remove('myanmar-lang', 'thai-lang');
  
  // Add appropriate class based on language
  if (newLang === 'mm') {
    document.body.classList.add('myanmar-lang');
  } else if (newLang === 'th') {
    document.body.classList.add('thai-lang');
  }
}, { immediate: true });

const getMenuItemTranslation = (item) => {
  if (!item.translations || !Array.isArray(item.translations)) return null;
  return getTranslation(item.translations);
};

onMounted(async () => {
  try {
    // Initialize language from localStorage or default to English
    initLanguage();

    // Fetch location data from Directus
    const response = await directus.request(
      readItems('locations', {
        fields: ['*', 'translations.*'],
        filter: { status: { _eq: 'published' } }
      })
    );
    
    if (response && response.length > 0) {
      locationData.value = response[0];
      console.log('Location data loaded:', locationData.value);
      console.log('Current translation:', currentTranslation.value);
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
      console.log('Social icons loaded:', socialIcons.value);
    }

    // Fetch menu from Directus
    const menuResponse = await directus.request(
      readItems('menu', {
        fields: ['*', 'items.*', 'items.translations.*', 'items.sub_menu.*', 'items.sub_menu.translations.*'],
        filter: { menu_id: { _eq: 'header' }, is_active: { _eq: true } }
      })
    );
    
    if (menuResponse && menuResponse.length > 0) {
      menuItems.value = menuResponse[0].items || [];
      console.log('Menu items loaded:', menuItems.value);
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      const dropdowns = document.querySelectorAll('.main-menu__language-box');
      let clickedInside = false;
      
      dropdowns.forEach(dropdown => {
        if (dropdown && dropdown.contains(e.target)) {
          clickedInside = true;
        }
      });
      
      if (!clickedInside) {
        isDropdownOpen.value = false;
        isDropdownOpenSticky.value = false;
      }
    });
  } catch (error) {
    console.error('Error fetching location data:', error);
  }
});
</script>

<template>
    <header class="main-header">
            <div class="main-menu__top">
                <div class="main-menu__top-inner">
                    <ul class="list-unstyled main-menu__contact-list">
                        <li>
                            <div class="icon">
                                <i class="icon-phone-call"></i>
                            </div>
                            <div class="text">
                                <p><a :href="'tel:' + (currentTranslation?.phone || '')">
                                    {{ currentTranslation?.phone || '' }}
                                </a></p>
                            </div>
                        </li>
                        <li>
                            <div class="icon">
                                <i class="icon-email"></i>
                            </div>
                            <div class="text">
                                <p><a :href="'mailto:' + (currentTranslation?.email || '')">
                                    {{ currentTranslation?.email || '' }}
                                </a></p>
                            </div>
                        </li>
                        <li>
                            <div class="icon">
                                <i class="icon-location1"></i>
                            </div>
                            <div class="text">
                                <p>{{ currentTranslation?.address || '' }}</p>
                            </div>
                        </li>
                    </ul>
                    <p class="main-menu__top-welcome-text">Welcome to Our Tanspot Office</p>
                    <div class="main-menu__top-right">
                        <div class="main-menu__top-time">
                            <div class="main-menu__top-time-icon">
                                <span class="fas fa-clock"></span>
                            </div>
                            <p class="main-menu__top-text">{{ currentTranslation?.opening_hours || '' }}</p>
                        </div>
                        <div class="main-menu__social">
                            <a v-for="social in socialIcons" :key="social.id" :href="social.link" target="_blank" rel="noopener noreferrer">
                                <img :src="getSocialIconUrl(social.icon)" :alt="social.link" style="width: 16px; height: 16px; object-fit: contain;">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <nav class="main-menu">
                <div class="main-menu__wrapper">
                    <div class="main-menu__wrapper-inner">
                        <div class="main-menu__left">
                            <div class="main-menu__logo">
                                <a href="#"><img src="https://dreamlayout.mnsithub.com/php/tanspotphp/assets/images/resources/logo-1.png" alt=""></a>
                            </div>
                        </div>
                        <div class="main-menu__main-menu-box">
                            <a href="#" class="mobile-nav__toggler"><i class="fa fa-bars"></i></a>
                            <ul class="main-menu__list" :class="{ 'myanmar-active': currentLanguage === 'mm', 'thai-active': currentLanguage === 'th' }">
                                <li v-for="item in menuItems" :key="item.id" :class="{ 'dropdown': item.type === 'Group' && item.sub_menu && item.sub_menu.length > 0 }">
                                    <a :href="item.url || '#'">{{ getMenuItemTranslation(item)?.title || item.url }}</a>
                                    <ul v-if="item.type === 'Group' && item.sub_menu && item.sub_menu.length > 0" class="shadow-box">
                                        <li v-for="subItem in item.sub_menu" :key="subItem.id">
                                            <a :href="subItem.url || '#'">{{ getMenuItemTranslation(subItem)?.title || subItem.url }}</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div class="main-menu__right">
                            
                            <div class="main-menu__search-cart-box">
                                <div class="main-menu__search-cart-box">
                                    <div class="main-menu__language-box dropdown" :class="{ 'show': isDropdownOpen }">
                                        <a href="#" class="main-menu__language dropdown-toggle" @click.prevent="toggleDropdown">
                                            <img :src="`https://flagcdn.com/w20/${currentLanguageInfo.flag}.png`" :alt="currentLanguageInfo.name" class="current-flag">
                                            <span>{{ currentLanguageInfo.name }}</span>
                                        </a>
                                        <ul class="dropdown-menu shadow-box" :class="{ 'show': isDropdownOpen }">
                                            <li v-for="lang in languages" :key="lang.code" :class="{ 'active': currentLanguage === lang.fullCode }">
                                                <a href="#" @click.prevent="changeLanguage(lang.code)">
                                                    <img :src="`https://flagcdn.com/w20/${lang.flag}.png`" :alt="lang.name">
                                                    {{ lang.name }}
                                                    <i v-if="currentLanguage === lang.fullCode" class="fas fa-check"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="main-menu__nav-sidebar-icon">
                                <a class="navSidebar-button" href="#">
                                    <span class="icon-dots-menu-one"></span>
                                    <span class="icon-dots-menu-two"></span>
                                    <span class="icon-dots-menu-three"></span>
                                </a>
                            </div>
                            <div class="main-menu__btn-box">
                                <a href="#" class="thm-btn">Track Order<span><i
                                            class="icon-right-arrow"></i></span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
    </header>
    <!-- Sticky Header -->
    <div class="stricky-header stricked-menu main-menu">
        <div class="sticky-header__content"></div><!-- /.sticky-header__content -->
    </div>
    <!-- /.stricky-header -->
     <div class="stricky-header stricked-menu main-menu">
            <div class="sticky-header__content">
                <div class="main-menu__wrapper">
                    <div class="main-menu__wrapper-inner">
                        <div class="main-menu__left">
                            <div class="main-menu__logo">
                                <a href="#"><img src="https://dreamlayout.mnsithub.com/php/tanspotphp/assets/images/resources/logo-1.png" alt=""></a>
                            </div>
                        </div>
                        <div class="main-menu__main-menu-box">
                            <a href="#" class="mobile-nav__toggler"><i class="fa fa-bars"></i></a>
                            <ul class="main-menu__list" :class="{ 'myanmar-active': currentLanguage === 'mm', 'thai-active': currentLanguage === 'th' }">
                                <li v-for="item in menuItems" :key="item.id" :class="{ 'dropdown': item.type === 'Group' && item.sub_menu && item.sub_menu.length > 0 }">
                                    <a :href="item.url || '#'">{{ getMenuItemTranslation(item)?.title || item.url }}</a>
                                    <ul v-if="item.type === 'Group' && item.sub_menu && item.sub_menu.length > 0" class="shadow-box">
                                        <li v-for="subItem in item.sub_menu" :key="subItem.id">
                                            <a :href="subItem.url || '#'">{{ getMenuItemTranslation(subItem)?.title || subItem.url }}</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div class="main-menu__right">
                            <div class="main-menu__call">
                                <div class="main-menu__call-icon">
                                    <i class="icon-phone-call"></i>
                                </div>
                                <div class="main-menu__call-content">
                                    <p class="main-menu__call-sub-title">Call Anytime</p>
                                    <h5 class="main-menu__call-number"><a href="tel:9288006780">+92 ( 8800 ) -
                                            6780</a></h5>
                                </div>
                            </div>
                            <div class="main-menu__search-cart-box">
                                <div class="main-menu__language-box dropdown" :class="{ 'show': isDropdownOpenSticky }">
                                    <a href="#" class="main-menu__language dropdown-toggle" @click.prevent="toggleDropdownSticky">
                                        <img :src="`https://flagcdn.com/w20/${currentLanguageInfo.flag}.png`" :alt="currentLanguageInfo.name" class="current-flag">
                                        <span>{{ currentLanguageInfo.name }}</span>
                                    </a>
                                    <ul class="dropdown-menu shadow-box" :class="{ 'show': isDropdownOpenSticky }">
                                        <li v-for="lang in languages" :key="lang.code" :class="{ 'active': currentLanguage === lang.fullCode }">
                                            <a href="#" @click.prevent="changeLanguage(lang.code)">
                                                <img :src="`https://flagcdn.com/w20/${lang.flag}.png`" :alt="lang.name">
                                                {{ lang.name }}
                                                <i v-if="currentLanguage === lang.fullCode" class="fas fa-check"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="main-menu__nav-sidebar-icon">
                                <a class="navSidebar-button" href="#">
                                    <span class="icon-dots-menu-one"></span>
                                    <span class="icon-dots-menu-two"></span>
                                    <span class="icon-dots-menu-three"></span>
                                </a>
                            </div>
                            <div class="main-menu__btn-box">
                                <a href="contact.php" class="thm-btn">Track Order<span><i
                                            class="icon-right-arrow"></i></span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div><!-- /.sticky-header__content -->
        </div>
</template>

<style scoped>
.main-menu__language-box {
    position: relative;
}

.main-menu__language {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 15px;
    color: var(--tanspot-black);
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
}

.main-menu__language:hover {
    color: var(--tanspot-base);
}

.main-menu__language .current-flag {
    width: 20px;
    height: auto;
}

.main-menu__language i.fa-chevron-down {
    font-size: 12px;
    margin-left: 4px;
}

.main-menu__language-box .dropdown-menu {
    min-width: 180px;
    padding: 10px 0;
    margin-top: 10px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background: #fff;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.main-menu__language-box .dropdown-menu.show {
    display: block;
}

.main-menu__language-box .dropdown-menu li {
    position: relative;
    list-style: none;
}

.main-menu__language-box .dropdown-menu li.active a {
    background-color: #f5f5f5;
    font-weight: 600;
}

.main-menu__language-box .dropdown-menu li a {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 20px;
    color: var(--tanspot-black);
    transition: all 0.3s ease;
    position: relative;
    text-decoration: none;
}

.main-menu__language-box .dropdown-menu li a:hover {
    background-color: var(--tanspot-base);
    color: #fff;
}

.main-menu__language-box .dropdown-menu li a img {
    width: 20px;
    height: auto;
}

.main-menu__language-box .dropdown-menu li a .fa-check {
    margin-left: auto;
    font-size: 14px;
    color: var(--tanspot-base);
}

.main-menu__language-box .dropdown-menu li a:hover .fa-check {
    color: #fff;
}

/* Myanmar language specific styling */
.myanmar-text {
    font-size: 0.85em;
}

.main-menu__list a {
    transition: font-size 0.3s ease;
}

.main-menu__list.myanmar-active a {
    font-size: 0.95em;
}

.main-menu__list.thai-active a {
    font-size: 0.95em;
}

/* Global Myanmar font size */
body.myanmar-lang {
    font-size: 15px;
}

body.myanmar-lang h1,
body.myanmar-lang h2,
body.myanmar-lang h3,
body.myanmar-lang h4,
body.myanmar-lang h5,
body.myanmar-lang h6 {
    font-size: 0.95em;
}

body.myanmar-lang p,
body.myanmar-lang span,
body.myanmar-lang a,
body.myanmar-lang li,
body.myanmar-lang div {
    font-size: 0.95em;
}

body.myanmar-lang .main-menu__call-number,
body.myanmar-lang .main-menu__top-text,
body.myanmar-lang .main-menu__call-sub-title {
    font-size: 0.9em;
}

/* Global Thai font size */
body.thai-lang {
    font-size: 15px;
}

body.thai-lang h1,
body.thai-lang h2,
body.thai-lang h3,
body.thai-lang h4,
body.thai-lang h5,
body.thai-lang h6 {
    font-size: 1em;
}

body.thai-lang p,
body.thai-lang span,
body.thai-lang a,
body.thai-lang li,
body.thai-lang div {
    font-size: 1em;
}

body.thai-lang .main-menu__call-number,
body.thai-lang .main-menu__top-text,
body.thai-lang .main-menu__call-sub-title {
    font-size: 0.95em;
}
</style>
