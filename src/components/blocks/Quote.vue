<template>
    <section class="banner-two">
    <div class="banner-two__pattern" style="background-image: url(assets/images/shapes/banner-two-pattern.png);"></div>
    <div class="banner-two__map-1">
        <img src="../../assets/img/banner-two-map-1.png" alt="" class="img-bounce">
    </div>
    <div class="container">
        <div class="row">
            <div class="col-xl-7">
                <div class="banner-two__left" v-if="translatedContent">
                    <p class="banner-two__sub-title">{{ translatedContent.title }}</p>
                    <h2 class="banner-two__title">{{ translatedContent.header }} <br>
                        <span ref="typedElement" class="typed-effect"></span><span class="typed-cursor typed-cursor--blink" v-show="showCursor">|</span>
                    </h2>
                    <p class="banner-two__text" v-html="translatedContent.content"></p>
                    <div class="banner-two__tab-box tabs-box">
                        <ul class="tab-buttons clearfix list-unstyled">
                            <li data-tab="#air" class="tab-btn">
                                <p>Air Freight</p>
                            </li>
                            <li data-tab="#road" class="tab-btn">
                                <p>Road Freight</p>
                            </li>
                            <li data-tab="#ocean" class="tab-btn active-btn">
                                <p>Ocean Freight</p>
                            </li>
                        </ul>

                        <div class="tabs-content">

                            <!--tab-->
                            <div class="tab" id="air" style="display: none;">
                                <div class="banner-two__tab-form-box">
                                    <form class="banner-two__tab-form mc-form" data-url="MC_FORM_URL" novalidate="novalidate">
                                        <div class="banner-two__tab-form-input-box">
                                            <input type="email" placeholder="Enter Transport Id" name="EMAIL">
                                            <button type="submit" class="banner-two__tab-form-btn"><span class="icon-search"></span></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <!--tab-->

                            <!--tab-->
                            <div class="tab" id="road" style="display: none;">
                                <div class="banner-two__tab-form-box">
                                    <form class="banner-two__tab-form mc-form" data-url="MC_FORM_URL" novalidate="novalidate">
                                        <div class="banner-two__tab-form-input-box">
                                            <input type="email" placeholder="Enter Transport Id" name="EMAIL">
                                            <button type="submit" class="banner-two__tab-form-btn"><span class="icon-search"></span></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <!--tab-->

                            <!--tab-->
                            <div class="tab active-tab" id="ocean" style="display: block;">
                                <div class="banner-two__tab-form-box">
                                    <form class="banner-two__tab-form mc-form" data-url="MC_FORM_URL" novalidate="novalidate">
                                        <div class="banner-two__tab-form-input-box">
                                            <input type="email" placeholder="Enter Transport Id" name="EMAIL">
                                            <button type="submit" class="banner-two__tab-form-btn"><span class="icon-search"></span></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <!--tab-->
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-5">
                <div class="banner-two__right wow slideInRight animated" data-wow-delay="100ms" data-wow-duration="2500ms" style="visibility: visible; animation-duration: 2500ms; animation-delay: 100ms; animation-name: slideInRight;">
                    <div class="banner-two__form-box">
                        <form class="contact-form-validated banner-two__form" @submit.prevent="handleSubmit">
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6">
                                    <div class="input-box">
                                        <input type="text" v-model="formData.name" placeholder="Name" required>
                                        <div class="icon"><span class="icon-user-1"></span></div>
                                    </div>
                                </div>

                                <div class="col-xl-6 col-lg-6 col-md-6">
                                    <div class="input-box">
                                        <input type="email" v-model="formData.email" placeholder="Email" required>
                                        <div class="icon"><span class="icon-email"></span></div>
                                    </div>
                                </div>

                                <div class="col-xl-6 col-lg-6 col-md-6">
                                    <div class="input-box">
                                        <input type="text" v-model="formData.phone" placeholder="Phone" required>
                                        <div class="icon"><span class="icon-phone"></span></div>
                                    </div>
                                </div>
                                
                                <div class="col-xl-6 col-lg-6 col-md-6">
                                    <div class="input-box">
                                        <input type="text" v-model="formData.subject" placeholder="Subject" required>
                                        <div class="icon"><span class="icon-email"></span></div>
                                    </div>
                                </div>

                                <div class="col-xl-12">
                                    <div class="input-box">
                                        <input type="text" v-model="formData.transport_id" placeholder="Transport ID (Optional)">
                                        <div class="icon"><span class="icon-box1"></span></div>
                                    </div>
                                </div>

                                <div class="col-xl-12">
                                    <div class="input-box">
                                        <textarea v-model="formData.address" placeholder="Content" required></textarea>
                                        <div class="icon style2"><span class="icon-location"></span></div>
                                    </div>
                                </div>

                                <div class="col-xl-12">
                                    <div class="banner-two__form-btn">
                                        <button type="submit" class="thm-btn" :disabled="isSubmitting">
                                            {{ isSubmitting ? 'Sending...' : 'Submit Contact' }}
                                            <span><i class="icon-right-arrow"></i></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="result">
                                <p v-if="submitMessage" :class="submitStatus">{{ submitMessage }}</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script setup>
import { computed, onMounted, watch, ref, nextTick } from 'vue';
import { useLanguage } from '@/composables/useLanguage';
import directus from '@/services/directus';
import { createItem } from '@directus/sdk';
import Swal from 'sweetalert2';

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
});

const { currentLanguage, getTranslation } = useLanguage();

const typedElement = ref(null);
const showCursor = ref(true);
let typedInstance = null;

// Form data
const formData = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  transport_id: '',
  address: '',
  reply_status: 'pending'
});

const isSubmitting = ref(false);
const submitMessage = ref('');
const submitStatus = ref('');

// Handle form submission
const handleSubmit = async () => {
  isSubmitting.value = true;
  submitMessage.value = '';
  submitStatus.value = '';
  
  try {
    await directus.request(
      createItem('contact_us', {
        name: formData.value.name,
        email: formData.value.email,
        phone: formData.value.phone,
        subject: formData.value.subject,
        address: formData.value.address,
        transport_id: formData.value.transport_id || null,
        reply_status: 'pending'
      })
    );
    
    // Show success with SweetAlert
    Swal.fire({
      title: 'Success!',
      text: 'Your contact us has been submitted successfully!',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#e03e2d'
    });
    
    // Reset form
    formData.value = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      transport_id: '',
      address: '',
      reply_status: 'pending'
    };
  } catch (error) {
    console.error('Error submitting form:', error);
    
    // Show error with SweetAlert
    Swal.fire({
      title: 'Error!',
      text: 'Failed to submit your contact us. Please try again.',
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#e03e2d'
    });
  } finally {
    isSubmitting.value = false;
  }
};

// Get translated content
const translatedContent = computed(() => {
  return getTranslation(props.data?.translations);
});

// Get animation text array
const animationTexts = computed(() => {
  if (!translatedContent.value?.animation_text) return [];
  return translatedContent.value.animation_text.split(',').map(text => text.trim());
});

// Initialize Typed.js animation
const initTypedAnimation = () => {
  if (!typedElement.value || !window.Typed) return;
  
  // Destroy previous instance if exists
  if (typedInstance) {
    typedInstance.destroy();
  }
  
  // Create new Typed instance
  typedInstance = new window.Typed(typedElement.value, {
    strings: animationTexts.value,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000,
    loop: true,
    showCursor: false // We use our own cursor
  });
};

// Watch for language changes and reinitialize
watch([currentLanguage, translatedContent], async () => {
  await nextTick();
  initTypedAnimation();
});

// Initialize on mount
onMounted(() => {
  nextTick(() => {
    initTypedAnimation();
  });
});

</script>

<style scoped>
.typed-cursor {
  animation: blink 0.7s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.result {
  margin-top: 20px;
}

.result p {
  padding: 15px;
  border-radius: 5px;
  margin: 0;
}

.result .success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.result .error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.thm-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Myanmar Language Font Sizes */
body.myanmar-lang .banner-two__sub-title {
  font-size: 15px;
}

body.myanmar-lang .banner-two__title {
  font-size: 42px;
  line-height: 1.3;
  margin-top: 15px;
  margin-bottom: 20px;
}

body.myanmar-lang .banner-two__text {
  font-size: 15px;
  line-height: 1.6;
}

body.myanmar-lang .typed-effect {
  font-size: 32px;
  
  display: inline-block;
}

/* Thai Language Font Sizes */
body.thai-lang .banner-two__sub-title {
  font-size: 15px;
}

body.thai-lang .banner-two__title {
  font-size: 42px;
  line-height: 1.3;
  margin-top: 15px;
  margin-bottom: 20px;
}

body.thai-lang .banner-two__text {
  font-size: 15px;
  line-height: 1.6;
}

body.thai-lang .typed-effect {
  font-size: 42px;
  margin-bottom: 20px;
  display: inline-block;
}
</style>