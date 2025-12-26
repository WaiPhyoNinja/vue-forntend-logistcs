<template>
    <div class="page-wrapper">
        <Header />
        <section class="request-quote-page">
            <div class="container">
                <div class="row">
                    <!-- Main Form Section -->
                    <div class="col-xl-8 col-lg-7">
                        <div class="quote-details">
                            <div class="quote-title">
                                <h2>{{ t.pageTitle }}</h2>
                                <p>{{ t.pageSubtitle }}</p>
                            </div>

                            <!-- Step Progress Indicator -->
                            <div class="step-progress">
                                <div 
                                    v-for="(step, index) in steps" 
                                    :key="index" 
                                    class="step-item"
                                    :class="{ 
                                        'active': currentStep === index + 1, 
                                        'completed': currentStep > index + 1 
                                    }"
                                >
                                    <div class="step-number">
                                        <i v-if="currentStep > index + 1" class="fas fa-check"></i>
                                        <span v-else>{{ index + 1 }}</span>
                                    </div>
                                    <div class="step-label">{{ step.label }}</div>
                                    <div v-if="index < steps.length - 1" class="step-line"></div>
                                </div>
                            </div>

                            <form @submit.prevent="handleSubmit" class="quote-details-form">
                                <!-- Step 1: Sender Information -->
                                <div class="form-section" v-show="currentStep === 1">
                                    <div class="section-header">
                                        <h3><i class="fas fa-user-circle"></i> {{ t.senderTitle }}</h3>
                                    </div>

                                    <div class="row bs-gutter-x-20">
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>{{ t.firstName }} {{ t.required }}</label>
                                                <input type="text" v-model="formData.sender.firstName"
                                                    :placeholder="t.enterFirstName" required />
                                            </div>
                                        </div>
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>{{ t.lastName }} {{ t.required }}</label>
                                                <input type="text" v-model="formData.sender.lastName"
                                                    :placeholder="t.enterLastName" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-xl-12">
                                            <div class="billing_input_box">
                                                <label>{{ t.companyName }}</label>
                                                <input type="text" v-model="formData.sender.company"
                                                    :placeholder="t.enterCompany" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row bs-gutter-x-20">
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>{{ t.email }} {{ t.required }}</label>
                                                <input type="email" v-model="formData.sender.email"
                                                    :placeholder="t.enterEmail" required />
                                            </div>
                                        </div>
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>{{ t.phone }} {{ t.required }}</label>
                                                <input type="tel" v-model="formData.sender.phone"
                                                    :placeholder="t.enterPhone" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-xl-12">
                                            <div class="billing_input_box">
                                                <label>{{ t.pickupAddress }} {{ t.required }}</label>
                                                <input type="text" v-model="formData.sender.address"
                                                    :placeholder="t.streetAddress" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row bs-gutter-x-20">
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>{{ t.city }} {{ t.required }}</label>
                                                <input type="text" v-model="formData.sender.city"
                                                    :placeholder="t.enterCity" required />
                                            </div>
                                        </div>
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>{{ t.state }} {{ t.required }}</label>
                                                <input type="text" v-model="formData.sender.state"
                                                    :placeholder="t.enterState" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row bs-gutter-x-20">
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>{{ t.country }} {{ t.required }}</label>
                                                <select v-model="formData.sender.country" class="form-select" required>
                                                    <option value="">{{ t.selectCountry }}</option>
                                                    <option value="myanmar">{{ t.myanmar }}</option>
                                                    <option value="thailand">{{ t.thailand }}</option>
                                                    <option value="singapore">{{ t.singapore }}</option>
                                                    <option value="malaysia">{{ t.malaysia }}</option>
                                                    <option value="vietnam">{{ t.vietnam }}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>{{ t.postalCode }}</label>
                                                <input type="text" v-model="formData.sender.postalCode"
                                                    :placeholder="t.enterPostal" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Step 2: Receiver Information -->
                                <div class="form-section" v-show="currentStep === 2">
                                    <div class="section-header">
                                        <h3><i class="fas fa-map-marker-alt"></i> {{ t.receiverTitle }}</h3>
                                    </div>

                                    <div class="row bs-gutter-x-20">
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>{{ t.firstName }} {{ t.required }}</label>
                                                <input type="text" v-model="formData.receiver.firstName"
                                                    :placeholder="t.enterFirstName" required />
                                            </div>
                                        </div>
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>{{ t.lastName }} {{ t.required }}</label>
                                                <input type="text" v-model="formData.receiver.lastName"
                                                    :placeholder="t.enterLastName" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-xl-12">
                                            <div class="billing_input_box">
                                                <label>{{ t.companyName }}</label>
                                                <input type="text" v-model="formData.receiver.company"
                                                    :placeholder="t.enterCompany" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row bs-gutter-x-20">
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>{{ t.email }} {{ t.required }}</label>
                                                <input type="email" v-model="formData.receiver.email"
                                                    :placeholder="t.enterEmail" required />
                                            </div>
                                        </div>
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>{{ t.phone }} {{ t.required }}</label>
                                                <input type="tel" v-model="formData.receiver.phone"
                                                    :placeholder="t.enterPhone" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-xl-12">
                                            <div class="billing_input_box">
                                                <label>{{ t.deliveryAddress }} {{ t.required }}</label>
                                                <input type="text" v-model="formData.receiver.address"
                                                    :placeholder="t.streetAddress" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row bs-gutter-x-20">
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>{{ t.city }} {{ t.required }}</label>
                                                <input type="text" v-model="formData.receiver.city"
                                                    :placeholder="t.enterCity" required />
                                            </div>
                                        </div>
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>{{ t.state }} {{ t.required }}</label>
                                                <input type="text" v-model="formData.receiver.state"
                                                    :placeholder="t.enterState" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row bs-gutter-x-20">
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>{{ t.country }} {{ t.required }}</label>
                                                <select v-model="formData.receiver.country" class="form-select"
                                                    required>
                                                    <option value="">{{ t.selectCountry }}</option>
                                                    <option value="myanmar">{{ t.myanmar }}</option>
                                                    <option value="thailand">{{ t.thailand }}</option>
                                                    <option value="singapore">{{ t.singapore }}</option>
                                                    <option value="malaysia">{{ t.malaysia }}</option>
                                                    <option value="vietnam">{{ t.vietnam }}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>{{ t.postalCode }}</label>
                                                <input type="text" v-model="formData.receiver.postalCode"
                                                    :placeholder="t.enterPostal" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Step 3: Shipment Details -->
                                <div class="form-section" v-show="currentStep === 3">
                                    <div class="section-header">
                                        <h3><i class="fas fa-box"></i> {{ t.shipmentTitle }}</h3>
                                    </div>

                                    <div class="row bs-gutter-x-20">
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>{{ t.shipmentType }} {{ t.required }}</label>
                                                <select v-model="formData.shipment.type" class="form-select" required>
                                                    <option value="">{{ t.selectShipmentType }}</option>
                                                    <option value="document">{{ t.document }}</option>
                                                    <option value="parcel">{{ t.parcel }}</option>
                                                    <option value="freight">{{ t.freight }}</option>
                                                    <option value="express">{{ t.express }}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>{{ t.serviceType }} {{ t.required }}</label>
                                                <select v-model="formData.shipment.service" class="form-select"
                                                    required>
                                                    <option value="">{{ t.selectServiceType }}</option>
                                                    <option value="standard">{{ t.standardDelivery }}</option>
                                                    <option value="express">{{ t.expressDelivery }}</option>
                                                    <option value="overnight">{{ t.overnight }}</option>
                                                    <option value="economy">{{ t.economy }}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row bs-gutter-x-20">
                                        <div class="col-xl-4">
                                            <div class="billing_input_box">
                                                <label>{{ t.weight }} {{ t.required }}</label>
                                                <input type="number" v-model="formData.shipment.weight"
                                                    placeholder="0.00" step="0.01" min="0" required />
                                            </div>
                                        </div>
                                        <div class="col-xl-4">
                                            <div class="billing_input_box">
                                                <label>{{ t.length }}</label>
                                                <input type="number" v-model="formData.shipment.length" placeholder="0"
                                                    min="0" />
                                            </div>
                                        </div>
                                        <div class="col-xl-4">
                                            <div class="billing_input_box">
                                                <label>{{ t.width }}</label>
                                                <input type="number" v-model="formData.shipment.width" placeholder="0"
                                                    min="0" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row bs-gutter-x-20">
                                        <div class="col-xl-4">
                                            <div class="billing_input_box">
                                                <label>{{ t.height }}</label>
                                                <input type="number" v-model="formData.shipment.height" placeholder="0"
                                                    min="0" />
                                            </div>
                                        </div>
                                        <div class="col-xl-4">
                                            <div class="billing_input_box">
                                                <label>{{ t.quantity }} {{ t.required }}</label>
                                                <input type="number" v-model="formData.shipment.quantity"
                                                    placeholder="1" min="1" required />
                                            </div>
                                        </div>
                                        <div class="col-xl-4">
                                            <div class="billing_input_box">
                                                <label>{{ t.declaredValue }}</label>
                                                <input type="number" v-model="formData.shipment.declaredValue"
                                                    placeholder="0.00" step="0.01" min="0" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-xl-12">
                                            <div class="billing_input_box">
                                                <label>{{ t.packageDescription }} {{ t.required }}</label>
                                                <textarea v-model="formData.shipment.description"
                                                    :placeholder="t.describePackage" rows="3"
                                                    required></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-xl-12">
                                            <div class="billing_input_box">
                                                <label>{{ t.specialInstructions }}</label>
                                                <textarea v-model="formData.shipment.specialInstructions"
                                                    :placeholder="t.specialHandling"
                                                    rows="3"></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-xl-12">
                                            <div class="checked-box">
                                                <input type="checkbox" v-model="formData.shipment.insurance"
                                                    id="insurance" />
                                                <label for="insurance">
                                                    <span></span>{{ t.insurance }}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Navigation Buttons -->
                                <div class="row">
                                    <div class="col-xl-12">
                                        <div class="quote-form-btns">
                                            <button 
                                                v-if="currentStep > 1" 
                                                type="button" 
                                                @click="prevStep" 
                                                class="thm-btn btn-outline"
                                            >
                                                <span><i class="fas fa-arrow-left"></i></span>
                                                {{ t.previous }}
                                            </button>
                                            <button 
                                                v-if="currentStep < 3" 
                                                type="button" 
                                                @click="nextStep" 
                                                class="thm-btn"
                                            >
                                                {{ t.nextStep }}
                                                <span><i class="fas fa-arrow-right"></i></span>
                                            </button>
                                            <button 
                                                v-if="currentStep === 3" 
                                                type="submit" 
                                                class="thm-btn" 
                                                :class="{ 'btn-login-required': !isAuthenticated }"
                                                :disabled="isSubmitting"
                                            >
                                                <span v-if="!isAuthenticated"><i class="fas fa-lock"></i></span>
                                                {{ isSubmitting ? t.submitting : (isAuthenticated ? t.submitQuote : t.loginToSubmit) }}
                                                <span><i class="icon-right-arrow"></i></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <!-- Quote Summary Sidebar -->
                    <div class="col-xl-4 col-lg-5">
                        <div class="sidebar-quote-summary">
                            <div class="title-box">
                                <h3>{{ t.summaryTitle }}</h3>
                            </div>

                            <div class="quote-route">
                                <div class="route-item">
                                    <div class="icon">
                                        <i class="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div class="content">
                                        <p class="label">{{ t.from }}</p>
                                        <p class="value">{{ senderLocation || t.notSpecified }}</p>
                                    </div>
                                </div>

                                <div class="route-arrow">
                                    <i class="fas fa-arrow-down"></i>
                                </div>

                                <div class="route-item">
                                    <div class="icon">
                                        <i class="fas fa-map-pin"></i>
                                    </div>
                                    <div class="content">
                                        <p class="label">{{ t.to }}</p>
                                        <p class="value">{{ receiverLocation || t.notSpecified }}</p>
                                    </div>
                                </div>
                            </div>

                            <ul class="sidebar-quote-summary__list list-unstyled">
                                <li>
                                    <div class="left-text">
                                        <p><i class="fas fa-box"></i> {{ t.shipmentTypeLabel }}</p>
                                    </div>
                                    <div class="right-text">
                                        <p>{{ formData.shipment.type || '-' }}</p>
                                    </div>
                                </li>

                                <li>
                                    <div class="left-text">
                                        <p><i class="fas fa-shipping-fast"></i> {{ t.serviceLabel }}</p>
                                    </div>
                                    <div class="right-text">
                                        <p>{{ formData.shipment.service || '-' }}</p>
                                    </div>
                                </li>

                                <li>
                                    <div class="left-text">
                                        <p><i class="fas fa-weight"></i> {{ t.weightLabel }}</p>
                                    </div>
                                    <div class="right-text">
                                        <p>{{ formData.shipment.weight || '0' }} kg</p>
                                    </div>
                                </li>

                                <li
                                    v-if="formData.shipment.length && formData.shipment.width && formData.shipment.height">
                                    <div class="left-text">
                                        <p><i class="fas fa-ruler-combined"></i> {{ t.dimensionsLabel }}</p>
                                    </div>
                                    <div class="right-text">
                                        <p>{{ formData.shipment.length }} × {{ formData.shipment.width }} × {{
                                            formData.shipment.height }} cm</p>
                                    </div>
                                </li>

                                <li>
                                    <div class="left-text">
                                        <p><i class="fas fa-boxes"></i> {{ t.quantityLabel }}</p>
                                    </div>
                                    <div class="right-text">
                                        <p>{{ formData.shipment.quantity || '1' }} {{ t.packages }}</p>
                                    </div>
                                </li>

                                <li v-if="formData.shipment.declaredValue">
                                    <div class="left-text">
                                        <p><i class="fas fa-dollar-sign"></i> {{ t.declaredValueLabel }}</p>
                                    </div>
                                    <div class="right-text">
                                        <p>${{ parseFloat(formData.shipment.declaredValue).toFixed(2) }}</p>
                                    </div>
                                </li>

                                <li v-if="formData.shipment.insurance">
                                    <div class="left-text">
                                        <p><i class="fas fa-shield-alt"></i> {{ t.insuranceLabel }}</p>
                                    </div>
                                    <div class="right-text">
                                        <p class="text-success">{{ t.included }}</p>
                                    </div>
                                </li>
                            </ul>

                            <!-- Login Warning for Non-Authenticated Users -->
                            <div v-if="!isAuthenticated" class="quote-login-warning">
                                <div class="warning-icon">
                                    <i class="fas fa-lock"></i>
                                </div>
                                <div class="warning-content">
                                    <h5>{{ t.loginRequired }}</h5>
                                    <p>{{ t.loginRequiredText }}</p>
                                    <button @click="router.push('/login')" class="login-btn">
                                        <i class="fas fa-sign-in-alt"></i> {{ t.loginNow }}
                                    </button>
                                </div>
                            </div>

                            <!-- User Info for Authenticated Users -->
                            <div v-else class="quote-user-info">
                                <div class="user-icon">
                                    <i class="fas fa-user-check"></i>
                                </div>
                                <div class="user-content">
                                    <h5>{{ t.loggedIn }}</h5>
                                    <p>{{ user?.email || 'User' }}</p>
                                </div>
                            </div>

                            <div class="quote-info-box">
                                <h4><i class="fas fa-info-circle"></i> {{ t.whatHappens }}</h4>
                                <ul>
                                    <li><i class="fas fa-check"></i> {{ t.step1 }}</li>
                                    <li><i class="fas fa-check"></i> {{ t.step2 }}</li>
                                    <li><i class="fas fa-check"></i> {{ t.step3 }}</li>
                                    <li><i class="fas fa-check"></i> {{ t.step4 }}</li>
                                </ul>
                            </div>

                            <div class="sidebar-quote-summary__bottom">
                                <p class="text1">
                                    {{ t.termsText }}
                                    <a href="#">{{ t.termsLink }}</a> {{ t.and }}
                                    <a href="#">{{ t.privacyLink }}</a>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </div>

</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Footer from '../layouts/Footer.vue'
import Header from '../layouts/Header.vue'
import { useAuth } from '@/composables/useAuth'
import { useLanguage } from '@/composables/useLanguage'
import { quoteTranslations } from '@/locales/quote'
import { createItem } from '@directus/sdk'
import directus from '@/services/directus'
import Swal from 'sweetalert2'

const router = useRouter()
const { isAuthenticated, user, checkAuth } = useAuth()
const { currentLanguage } = useLanguage()
const isSubmitting = ref(false)
const currentStep = ref(1)

// Translation helper
const useQuoteTranslation = (lang) => {
    return quoteTranslations[lang] || quoteTranslations['en-US']
}

// Computed translation object
const t = computed(() => useQuoteTranslation(currentLanguage.value))

const steps = computed(() => [
    { label: t.value.stepSenderInfo, icon: 'fa-user-circle' },
    { label: t.value.stepReceiverInfo, icon: 'fa-map-marker-alt' },
    { label: t.value.stepShipmentDetails, icon: 'fa-box' }
])

const formData = ref({
    sender: {
        firstName: '',
        lastName: '',
        company: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postalCode: ''
    },
    receiver: {
        firstName: '',
        lastName: '',
        company: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postalCode: ''
    },
    shipment: {
        type: '',
        service: '',
        weight: '',
        length: '',
        width: '',
        height: '',
        quantity: 1,
        declaredValue: '',
        description: '',
        specialInstructions: '',
        insurance: false
    }
})

const senderLocation = computed(() => {
    const { city, country } = formData.value.sender
    if (city && country) {
        return `${city}, ${country.charAt(0).toUpperCase() + country.slice(1)}`
    }
    return city || country ? (city || country) : null
})

const receiverLocation = computed(() => {
    const { city, country } = formData.value.receiver
    if (city && country) {
        return `${city}, ${country.charAt(0).toUpperCase() + country.slice(1)}`
    }
    return city || country ? (city || country) : null
})

const handleSubmit = async () => {
    // Check if user is authenticated before submitting
    await checkAuth()
    
    if (!isAuthenticated.value) {
        const result = await Swal.fire({
            title: t.value.loginTitle,
            text: t.value.loginText,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e03e2d',
            cancelButtonColor: '#6c757d',
            confirmButtonText: t.value.yesLogin,
            cancelButtonText: t.value.cancel
        })

        if (result.isConfirmed) {
            // Save form data to sessionStorage before redirecting
            sessionStorage.setItem('pendingQuoteRequest', JSON.stringify(formData.value))
            sessionStorage.setItem('quoteRequestStep', currentStep.value.toString())
            
            // Redirect to login page
            router.push('/login')
        }
        return
    }

    isSubmitting.value = true

    try {
        // Prepare data for Directus
        const quoteData = {
            // Sender information
            sender_first_name: formData.value.sender.firstName,
            sender_last_name: formData.value.sender.lastName,
            sender_company: formData.value.sender.company || null,
            sender_email: formData.value.sender.email,
            sender_phone: formData.value.sender.phone,
            sender_address: formData.value.sender.address,
            sender_city: formData.value.sender.city,
            sender_state: formData.value.sender.state,
            sender_country: formData.value.sender.country,
            sender_postal_code: formData.value.sender.postalCode || null,
            
            // Receiver information
            receiver_first_name: formData.value.receiver.firstName,
            receiver_last_name: formData.value.receiver.lastName,
            receiver_company: formData.value.receiver.company || null,
            receiver_email: formData.value.receiver.email,
            receiver_phone: formData.value.receiver.phone,
            receiver_address: formData.value.receiver.address,
            receiver_city: formData.value.receiver.city,
            receiver_state: formData.value.receiver.state,
            receiver_country: formData.value.receiver.country,
            receiver_postal_code: formData.value.receiver.postalCode || null,
            
            // Shipment information
            shipment_type: formData.value.shipment.type,
            service_type: formData.value.shipment.service,
            weight: parseFloat(formData.value.shipment.weight),
            length: formData.value.shipment.length ? parseFloat(formData.value.shipment.length) : null,
            width: formData.value.shipment.width ? parseFloat(formData.value.shipment.width) : null,
            height: formData.value.shipment.height ? parseFloat(formData.value.shipment.height) : null,
            quantity: parseInt(formData.value.shipment.quantity),
            declared_value: formData.value.shipment.declaredValue ? parseFloat(formData.value.shipment.declaredValue) : null,
            description: formData.value.shipment.description,
            special_instructions: formData.value.shipment.specialInstructions || null,
            insurance: formData.value.shipment.insurance,
            status: 'pending'
        }

        console.log('Submitting quote request to Directus:', quoteData)

        // Submit to Directus
        const result = await directus.request(createItem('quote_requests', quoteData))
        
        console.log('Quote request created successfully:', result)

        await Swal.fire({
            title: t.value.successTitle,
            text: t.value.successText,
            icon: 'success',
            confirmButtonColor: '#e03e2d',
            timer: 3000
        })

        // Clear saved form data
        sessionStorage.removeItem('pendingQuoteRequest')
        sessionStorage.removeItem('quoteRequestStep')
        
        resetForm()
        currentStep.value = 1
    } catch (error) {
        console.error('Error submitting quote:', error)
        
        let errorMessage = t.value.errorText
        
        // Handle specific error cases
        if (error.response?.status === 401) {
            errorMessage = 'Authentication failed. Please log in again.'
        } else if (error.response?.status === 403) {
            errorMessage = 'You do not have permission to submit quote requests.'
        } else if (error.errors) {
            errorMessage = error.errors.map(e => e.message).join(', ')
        }
        
        await Swal.fire({
            title: t.value.errorTitle,
            text: errorMessage,
            icon: 'error',
            confirmButtonColor: '#e03e2d'
        })
    } finally {
        isSubmitting.value = false
    }
}

const nextStep = () => {
    if (validateCurrentStep()) {
        if (currentStep.value < 3) {
            currentStep.value++
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }
}

const prevStep = () => {
    if (currentStep.value > 1) {
        currentStep.value--
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

const validateCurrentStep = () => {
    // Basic validation for each step
    if (currentStep.value === 1) {
        const { firstName, lastName, email, phone, address, city, state, country } = formData.value.sender
        if (!firstName || !lastName || !email || !phone || !address || !city || !state || !country) {
            alert(t.value.fillRequired)
            return false
        }
    } else if (currentStep.value === 2) {
        const { firstName, lastName, email, phone, address, city, state, country } = formData.value.receiver
        if (!firstName || !lastName || !email || !phone || !address || !city || !state || !country) {
            alert(t.value.fillRequiredReceiver)
            return false
        }
    }
    return true
}

const resetForm = () => {
    currentStep.value = 1
    formData.value = {
        sender: {
            firstName: '',
            lastName: '',
            company: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            country: '',
            postalCode: ''
        },
        receiver: {
            firstName: '',
            lastName: '',
            company: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            country: '',
            postalCode: ''
        },
        shipment: {
            type: '',
            service: '',
            weight: '',
            length: '',
            width: '',
            height: '',
            quantity: 1,
            declaredValue: '',
            description: '',
            specialInstructions: '',
            insurance: false
        }
    }
}

// Restore form data if user returns from login
onMounted(async () => {
    await checkAuth()
    
    const savedFormData = sessionStorage.getItem('pendingQuoteRequest')
    const savedStep = sessionStorage.getItem('quoteRequestStep')
    
    if (savedFormData && isAuthenticated.value) {
        try {
            formData.value = JSON.parse(savedFormData)
            if (savedStep) {
                currentStep.value = parseInt(savedStep)
            }
            
            await Swal.fire({
                title: t.value.welcomeBack,
                text: t.value.welcomeBackText,
                icon: 'info',
                confirmButtonColor: '#e03e2d',
                timer: 3000
            })
        } catch (error) {
            console.error('Error restoring form data:', error)
        }
    }
})
</script>

<style scoped>
.request-quote-page {
    padding: 100px 0;
    background: #f8f9fa;
}

.quote-details {
    background: #fff;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.08);
}

.quote-title {
    margin-bottom: 40px;
    padding-bottom: 20px;
    border-bottom: 2px solid #f0f0f0;
}

.quote-title h2 {
    font-size: 32px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 10px;
}

.quote-title p {
    color: #666;
    margin: 0;
}

/* Step Progress Indicator */
.step-progress {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    padding: 30px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 10px;
    position: relative;
}

.step-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    position: relative;
    z-index: 1;
}

.step-number {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
    transition: all 0.3s ease;
    border: 3px solid transparent;
}

.step-item.active .step-number {
    background: #fff;
    color: #667eea;
    border-color: #fff;
    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
}

.step-item.completed .step-number {
    background: #28a745;
    border-color: #28a745;
}

.step-label {
    font-size: 14px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
    text-align: center;
    transition: all 0.3s ease;
}

.step-item.active .step-label {
    color: #fff;
    font-size: 15px;
}

.step-item.completed .step-label {
    color: #fff;
}

.step-line {
    position: absolute;
    top: 25px;
    left: 50%;
    width: 100%;
    height: 3px;
    background: rgba(255, 255, 255, 0.3);
    z-index: -1;
    transition: all 0.3s ease;
}

.step-item.completed .step-line {
    background: #28a745;
}

.form-section {
    margin-bottom: 40px;
    padding: 30px;
    background: #fafbfc;
    border-radius: 8px;
    border-left: 4px solid var(--thm-primary, #ff6b35);
}

.section-header {
    margin-bottom: 25px;
}

.section-header h3 {
    font-size: 22px;
    font-weight: 600;
    color: #1a1a1a;
    display: flex;
    align-items: center;
    gap: 10px;
}

.section-header h3 i {
    color: var(--thm-primary, #ff6b35);
}

.billing_input_box {
    margin-bottom: 20px;
}

.billing_input_box label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #333;
    font-size: 14px;
}

.billing_input_box input,
.billing_input_box textarea,
.billing_input_box .form-select {
    width: 100%;
    padding: 12px 20px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    font-size: 14px;
    transition: all 0.3s ease;
    background: #fff;
}

.billing_input_box input:focus,
.billing_input_box textarea:focus,
.billing_input_box .form-select:focus {
    outline: none;
    border-color: var(--thm-primary, #ff6b35);
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
}

.billing_input_box textarea {
    resize: vertical;
    min-height: 100px;
}

.form-select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 16px 12px;
    padding-right: 40px;
}

.checked-box {
    display: flex;
    align-items: center;
    margin: 15px 0;
}

.checked-box input[type="checkbox"] {
    width: 18px;
    height: 18px;
    margin-right: 10px;
    cursor: pointer;
}

.checked-box label {
    cursor: pointer;
    user-select: none;
    color: #333;
    font-size: 14px;
}

.quote-form-btns {
    display: flex;
    gap: 15px;
    justify-content: flex-end;
    margin-top: 30px;
    padding-top: 30px;
    border-top: 2px solid #f0f0f0;
}

.thm-btn {
    padding: 15px 35px;
    font-weight: 600;
    border-radius: 5px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
    background: var(--thm-primary, #ff6b35);
    color: #fff;
}

.thm-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 107, 53, 0.3);
}

.thm-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
}

.thm-btn.btn-login-required {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    animation: pulse 2s infinite;
}

.thm-btn.btn-login-required:hover {
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

@keyframes pulse {
    0%, 100% {
        box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7);
    }
    50% {
        box-shadow: 0 0 0 10px rgba(102, 126, 234, 0);
    }
}

.thm-btn.btn-outline {
    background: transparent;
    border: 2px solid #ddd;
    color: #666;
}

.thm-btn.btn-outline:hover {
    background: #f8f9fa;
    border-color: #999;
    box-shadow: none;
}

/* Sidebar Styles */
.sidebar-quote-summary {
    background: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.08);
    position: sticky;
    top: 100px;
}

.title-box {
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid #f0f0f0;
}

.title-box h3 {
    font-size: 24px;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0;
}

.quote-route {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 25px;
    border-radius: 8px;
    margin-bottom: 25px;
    color: #fff;
}

.route-item {
    display: flex;
    align-items: center;
    gap: 15px;
}

.route-item .icon {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
}

.route-item .content .label {
    font-size: 12px;
    opacity: 0.9;
    margin-bottom: 5px;
}

.route-item .content .value {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
}

.route-arrow {
    text-align: center;
    padding: 10px 0;
    font-size: 20px;
    opacity: 0.8;
}

.sidebar-quote-summary__list {
    margin: 0;
    padding: 0;
    list-style: none;
}

.sidebar-quote-summary__list li {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    border-bottom: 1px solid #f0f0f0;
}

.sidebar-quote-summary__list li:last-child {
    border-bottom: none;
}

.sidebar-quote-summary__list .left-text p {
    margin: 0;
    color: #666;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.sidebar-quote-summary__list .left-text i {
    color: var(--thm-primary, #ff6b35);
    width: 16px;
}

.sidebar-quote-summary__list .right-text p {
    margin: 0;
    font-weight: 600;
    color: #1a1a1a;
    font-size: 14px;
    text-align: right;
}

.sidebar-quote-summary__list .right-text .text-success {
    color: #28a745;
}

.quote-info-box {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    margin: 25px 0;
}

.quote-info-box h4 {
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.quote-info-box h4 i {
    color: var(--thm-primary, #ff6b35);
}

.quote-info-box ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

.quote-info-box ul li {
    padding: 8px 0;
    color: #666;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.quote-info-box ul li i {
    color: #28a745;
    font-size: 12px;
}

/* Login Warning Box */
.quote-login-warning {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    padding: 20px;
    border-radius: 8px;
    margin: 25px 0;
    display: flex;
    align-items: center;
    gap: 15px;
    box-shadow: 0 4px 15px rgba(245, 87, 108, 0.3);
}

.warning-icon {
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.warning-icon i {
    color: #fff;
    font-size: 24px;
}

.warning-content {
    flex: 1;
}

.warning-content h5 {
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 8px;
}

.warning-content p {
    color: rgba(255, 255, 255, 0.95);
    font-size: 13px;
    margin-bottom: 12px;
    line-height: 1.5;
}

.login-btn {
    background: #fff;
    color: #f5576c;
    padding: 8px 20px;
    border: none;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    transition: all 0.3s ease;
}

.login-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* User Info Box */
.quote-user-info {
    background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
    padding: 20px;
    border-radius: 8px;
    margin: 25px 0;
    display: flex;
    align-items: center;
    gap: 15px;
    box-shadow: 0 4px 15px rgba(56, 239, 125, 0.3);
}

.user-icon {
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.user-icon i {
    color: #fff;
    font-size: 24px;
}

.user-content {
    flex: 1;
}

.user-content h5 {
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 5px;
}

.user-content p {
    color: rgba(255, 255, 255, 0.95);
    font-size: 13px;
    margin: 0;
    word-break: break-word;
}

.sidebar-quote-summary__bottom {
    margin-top: 25px;
    padding-top: 20px;
    border-top: 2px solid #f0f0f0;
}

.sidebar-quote-summary__bottom .text1 {
    font-size: 12px;
    color: #999;
    line-height: 1.6;
    margin: 0;
}

.sidebar-quote-summary__bottom a {
    color: var(--thm-primary, #ff6b35);
    text-decoration: none;
}

.sidebar-quote-summary__bottom a:hover {
    text-decoration: underline;
}

/* Responsive */
@media (max-width: 991px) {
    .sidebar-quote-summary {
        position: static;
        margin-top: 30px;
    }

    .quote-details {
        padding: 25px;
    }

    .form-section {
        padding: 20px;
    }

    .step-progress {
        padding: 20px 15px;
    }

    .step-number {
        width: 40px;
        height: 40px;
        font-size: 16px;
    }

    .step-label {
        font-size: 12px;
    }

    .step-line {
        top: 20px;
    }
}

@media (max-width: 767px) {
    .quote-form-btns {
        flex-direction: column;
        gap: 10px;
    }

    .thm-btn {
        width: 100%;
        justify-content: center;
    }

    .quote-title h2 {
        font-size: 24px;
    }

    .step-progress {
        padding: 15px 10px;
    }

    .step-label {
        font-size: 11px;
        margin-top: 5px;
    }

    .step-number {
        width: 35px;
        height: 35px;
        font-size: 14px;
    }
}

@media (max-width: 575px) {
    .step-label {
        display: none;
    }

    .step-progress {
        justify-content: center;
        gap: 20px;
    }
}
</style>
