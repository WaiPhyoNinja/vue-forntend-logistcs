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
                                <h2>Request a Quote</h2>
                                <p>Fill in the details below to get an instant shipping quote</p>
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
                                        <h3><i class="fas fa-user-circle"></i> Sender Information</h3>
                                    </div>

                                    <div class="row bs-gutter-x-20">
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>First Name *</label>
                                                <input type="text" v-model="formData.sender.firstName"
                                                    placeholder="Enter first name" required />
                                            </div>
                                        </div>
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>Last Name *</label>
                                                <input type="text" v-model="formData.sender.lastName"
                                                    placeholder="Enter last name" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-xl-12">
                                            <div class="billing_input_box">
                                                <label>Company Name</label>
                                                <input type="text" v-model="formData.sender.company"
                                                    placeholder="Enter company name (optional)" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row bs-gutter-x-20">
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>Email Address *</label>
                                                <input type="email" v-model="formData.sender.email"
                                                    placeholder="example@email.com" required />
                                            </div>
                                        </div>
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>Phone Number *</label>
                                                <input type="tel" v-model="formData.sender.phone"
                                                    placeholder="+95 XXX XXX XXXX" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-xl-12">
                                            <div class="billing_input_box">
                                                <label>Pickup Address *</label>
                                                <input type="text" v-model="formData.sender.address"
                                                    placeholder="Street address" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row bs-gutter-x-20">
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>City *</label>
                                                <input type="text" v-model="formData.sender.city"
                                                    placeholder="Enter city" required />
                                            </div>
                                        </div>
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>State/Region *</label>
                                                <input type="text" v-model="formData.sender.state"
                                                    placeholder="Enter state/region" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row bs-gutter-x-20">
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>Country *</label>
                                                <select v-model="formData.sender.country" class="form-select" required>
                                                    <option value="">Select a country</option>
                                                    <option value="myanmar">Myanmar</option>
                                                    <option value="thailand">Thailand</option>
                                                    <option value="singapore">Singapore</option>
                                                    <option value="malaysia">Malaysia</option>
                                                    <option value="vietnam">Vietnam</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>Postal Code</label>
                                                <input type="text" v-model="formData.sender.postalCode"
                                                    placeholder="Enter postal code" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Step 2: Receiver Information -->
                                <div class="form-section" v-show="currentStep === 2">
                                    <div class="section-header">
                                        <h3><i class="fas fa-map-marker-alt"></i> Receiver Information</h3>
                                    </div>

                                    <div class="row bs-gutter-x-20">
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>First Name *</label>
                                                <input type="text" v-model="formData.receiver.firstName"
                                                    placeholder="Enter first name" required />
                                            </div>
                                        </div>
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>Last Name *</label>
                                                <input type="text" v-model="formData.receiver.lastName"
                                                    placeholder="Enter last name" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-xl-12">
                                            <div class="billing_input_box">
                                                <label>Company Name</label>
                                                <input type="text" v-model="formData.receiver.company"
                                                    placeholder="Enter company name (optional)" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row bs-gutter-x-20">
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>Email Address *</label>
                                                <input type="email" v-model="formData.receiver.email"
                                                    placeholder="example@email.com" required />
                                            </div>
                                        </div>
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>Phone Number *</label>
                                                <input type="tel" v-model="formData.receiver.phone"
                                                    placeholder="+95 XXX XXX XXXX" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-xl-12">
                                            <div class="billing_input_box">
                                                <label>Delivery Address *</label>
                                                <input type="text" v-model="formData.receiver.address"
                                                    placeholder="Street address" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row bs-gutter-x-20">
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>City *</label>
                                                <input type="text" v-model="formData.receiver.city"
                                                    placeholder="Enter city" required />
                                            </div>
                                        </div>
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>State/Region *</label>
                                                <input type="text" v-model="formData.receiver.state"
                                                    placeholder="Enter state/region" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row bs-gutter-x-20">
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>Country *</label>
                                                <select v-model="formData.receiver.country" class="form-select"
                                                    required>
                                                    <option value="">Select a country</option>
                                                    <option value="myanmar">Myanmar</option>
                                                    <option value="thailand">Thailand</option>
                                                    <option value="singapore">Singapore</option>
                                                    <option value="malaysia">Malaysia</option>
                                                    <option value="vietnam">Vietnam</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>Postal Code</label>
                                                <input type="text" v-model="formData.receiver.postalCode"
                                                    placeholder="Enter postal code" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Step 3: Shipment Details -->
                                <div class="form-section" v-show="currentStep === 3">
                                    <div class="section-header">
                                        <h3><i class="fas fa-box"></i> Shipment Details</h3>
                                    </div>

                                    <div class="row bs-gutter-x-20">
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>Shipment Type *</label>
                                                <select v-model="formData.shipment.type" class="form-select" required>
                                                    <option value="">Select shipment type</option>
                                                    <option value="document">Document</option>
                                                    <option value="parcel">Parcel</option>
                                                    <option value="freight">Freight</option>
                                                    <option value="express">Express</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-xl-6">
                                            <div class="billing_input_box">
                                                <label>Service Type *</label>
                                                <select v-model="formData.shipment.service" class="form-select"
                                                    required>
                                                    <option value="">Select service type</option>
                                                    <option value="standard">Standard Delivery</option>
                                                    <option value="express">Express Delivery</option>
                                                    <option value="overnight">Overnight</option>
                                                    <option value="economy">Economy</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row bs-gutter-x-20">
                                        <div class="col-xl-4">
                                            <div class="billing_input_box">
                                                <label>Weight (kg) *</label>
                                                <input type="number" v-model="formData.shipment.weight"
                                                    placeholder="0.00" step="0.01" min="0" required />
                                            </div>
                                        </div>
                                        <div class="col-xl-4">
                                            <div class="billing_input_box">
                                                <label>Length (cm)</label>
                                                <input type="number" v-model="formData.shipment.length" placeholder="0"
                                                    min="0" />
                                            </div>
                                        </div>
                                        <div class="col-xl-4">
                                            <div class="billing_input_box">
                                                <label>Width (cm)</label>
                                                <input type="number" v-model="formData.shipment.width" placeholder="0"
                                                    min="0" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row bs-gutter-x-20">
                                        <div class="col-xl-4">
                                            <div class="billing_input_box">
                                                <label>Height (cm)</label>
                                                <input type="number" v-model="formData.shipment.height" placeholder="0"
                                                    min="0" />
                                            </div>
                                        </div>
                                        <div class="col-xl-4">
                                            <div class="billing_input_box">
                                                <label>Quantity *</label>
                                                <input type="number" v-model="formData.shipment.quantity"
                                                    placeholder="1" min="1" required />
                                            </div>
                                        </div>
                                        <div class="col-xl-4">
                                            <div class="billing_input_box">
                                                <label>Declared Value ($)</label>
                                                <input type="number" v-model="formData.shipment.declaredValue"
                                                    placeholder="0.00" step="0.01" min="0" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-xl-12">
                                            <div class="billing_input_box">
                                                <label>Package Description *</label>
                                                <textarea v-model="formData.shipment.description"
                                                    placeholder="Describe the contents of your shipment" rows="3"
                                                    required></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-xl-12">
                                            <div class="billing_input_box">
                                                <label>Special Instructions</label>
                                                <textarea v-model="formData.shipment.specialInstructions"
                                                    placeholder="Any special handling requirements (optional)"
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
                                                    <span></span>Add insurance coverage
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
                                                Previous
                                            </button>
                                            <button 
                                                v-if="currentStep < 3" 
                                                type="button" 
                                                @click="nextStep" 
                                                class="thm-btn"
                                            >
                                                Next Step
                                                <span><i class="fas fa-arrow-right"></i></span>
                                            </button>
                                            <button 
                                                v-if="currentStep === 3" 
                                                type="submit" 
                                                class="thm-btn" 
                                                :disabled="isSubmitting"
                                            >
                                                {{ isSubmitting ? 'Submitting...' : 'Submit Quote Request' }}
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
                                <h3>Quote Summary</h3>
                            </div>

                            <div class="quote-route">
                                <div class="route-item">
                                    <div class="icon">
                                        <i class="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div class="content">
                                        <p class="label">From</p>
                                        <p class="value">{{ senderLocation || 'Not specified' }}</p>
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
                                        <p class="label">To</p>
                                        <p class="value">{{ receiverLocation || 'Not specified' }}</p>
                                    </div>
                                </div>
                            </div>

                            <ul class="sidebar-quote-summary__list list-unstyled">
                                <li>
                                    <div class="left-text">
                                        <p><i class="fas fa-box"></i> Shipment Type</p>
                                    </div>
                                    <div class="right-text">
                                        <p>{{ formData.shipment.type || '-' }}</p>
                                    </div>
                                </li>

                                <li>
                                    <div class="left-text">
                                        <p><i class="fas fa-shipping-fast"></i> Service</p>
                                    </div>
                                    <div class="right-text">
                                        <p>{{ formData.shipment.service || '-' }}</p>
                                    </div>
                                </li>

                                <li>
                                    <div class="left-text">
                                        <p><i class="fas fa-weight"></i> Weight</p>
                                    </div>
                                    <div class="right-text">
                                        <p>{{ formData.shipment.weight || '0' }} kg</p>
                                    </div>
                                </li>

                                <li
                                    v-if="formData.shipment.length && formData.shipment.width && formData.shipment.height">
                                    <div class="left-text">
                                        <p><i class="fas fa-ruler-combined"></i> Dimensions</p>
                                    </div>
                                    <div class="right-text">
                                        <p>{{ formData.shipment.length }} × {{ formData.shipment.width }} × {{
                                            formData.shipment.height }} cm</p>
                                    </div>
                                </li>

                                <li>
                                    <div class="left-text">
                                        <p><i class="fas fa-boxes"></i> Quantity</p>
                                    </div>
                                    <div class="right-text">
                                        <p>{{ formData.shipment.quantity || '1' }} package(s)</p>
                                    </div>
                                </li>

                                <li v-if="formData.shipment.declaredValue">
                                    <div class="left-text">
                                        <p><i class="fas fa-dollar-sign"></i> Declared Value</p>
                                    </div>
                                    <div class="right-text">
                                        <p>${{ parseFloat(formData.shipment.declaredValue).toFixed(2) }}</p>
                                    </div>
                                </li>

                                <li v-if="formData.shipment.insurance">
                                    <div class="left-text">
                                        <p><i class="fas fa-shield-alt"></i> Insurance</p>
                                    </div>
                                    <div class="right-text">
                                        <p class="text-success">Included</p>
                                    </div>
                                </li>
                            </ul>

                            <div class="quote-info-box">
                                <h4><i class="fas fa-info-circle"></i> What Happens Next?</h4>
                                <ul>
                                    <li><i class="fas fa-check"></i> Submit your quote request</li>
                                    <li><i class="fas fa-check"></i> Our team reviews your details</li>
                                    <li><i class="fas fa-check"></i> Receive quote within 24 hours</li>
                                    <li><i class="fas fa-check"></i> Approve and schedule pickup</li>
                                </ul>
                            </div>

                            <div class="sidebar-quote-summary__bottom">
                                <p class="text1">
                                    By submitting this form, you agree to our
                                    <a href="#">terms and conditions</a> and
                                    <a href="#">privacy policy</a>.
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
import { ref, computed } from 'vue'
import Footer from '../layouts/Footer.vue'
import Header from '../layouts/Header.vue'

const isSubmitting = ref(false)
const currentStep = ref(1)

const steps = [
    { label: 'Sender Info', icon: 'fa-user-circle' },
    { label: 'Receiver Info', icon: 'fa-map-marker-alt' },
    { label: 'Shipment Details', icon: 'fa-box' }
]

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
    isSubmitting.value = true

    try {
        // Here you would typically send the data to your API
        console.log('Quote Request Data:', formData.value)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))

        alert('Quote request submitted successfully! We will contact you within 24 hours.')
        resetForm()
        currentStep.value = 1
    } catch (error) {
        console.error('Error submitting quote:', error)
        alert('An error occurred. Please try again.')
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
            alert('Please fill in all required sender information fields.')
            return false
        }
    } else if (currentStep.value === 2) {
        const { firstName, lastName, email, phone, address, city, state, country } = formData.value.receiver
        if (!firstName || !lastName || !email || !phone || !address || !city || !state || !country) {
            alert('Please fill in all required receiver information fields.')
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
