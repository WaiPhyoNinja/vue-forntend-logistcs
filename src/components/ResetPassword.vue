<template>
  <div class="reset-password-page">
    <!-- Background Pattern -->
    <div class="background-pattern"></div>

    <div class="reset-password-container">
      <div class="reset-password-card">
        
        <!-- Logo Section -->
        <div class="logo-section">
          <router-link to="/" class="logo-link">
            <img :src="logoUrl" alt="Logo" class="reset-logo" v-if="logoUrl">
          </router-link>
        </div>

        <div v-if="!isSuccess">
          <!-- Header -->
          <div class="card-header">
            <div class="icon-wrapper">
              <i class="fas fa-lock"></i>
            </div>
            <h2 class="card-title">Reset Password</h2>
            <p class="card-subtitle">Create a new secure password for your account</p>
          </div>

          <!-- Form -->
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <div class="input-group">
                <label for="password" class="input-label">
                  <i class="fas fa-key"></i>
                  New Password
                </label>
                <div class="input-wrapper">
                  <input
                    id="password"
                    v-model="formData.password"
                    type="password"
                    class="input-field"
                    placeholder="Enter new password (min. 8 characters)"
                    required
                    minlength="8"
                  />
                  <span class="input-icon">
                    <i class="fas fa-eye-slash"></i>
                  </span>
                </div>
              </div>

              <div class="input-group">
                <label for="confirmPassword" class="input-label">
                  <i class="fas fa-check-circle"></i>
                  Confirm Password
                </label>
                <div class="input-wrapper">
                  <input
                    id="confirmPassword"
                    v-model="formData.confirmPassword"
                    type="password"
                    class="input-field"
                    placeholder="Re-enter your password"
                    required
                    minlength="8"
                  />
                  <span class="input-icon">
                    <i class="fas fa-eye-slash"></i>
                  </span>
                </div>
              </div>

              <div v-if="errorMessage" class="error-alert">
                <i class="fas fa-exclamation-circle"></i>
                <span>{{ errorMessage }}</span>
              </div>

              <button type="submit" class="submit-btn" :disabled="isLoading">
                <span v-if="isLoading" class="btn-content">
                  <i class="fas fa-spinner fa-spin"></i>
                  Resetting Password...
                </span>
                <span v-else class="btn-content">
                  <i class="fas fa-shield-alt"></i>
                  Reset Password
                </span>
              </button>
            </form>

            <div class="card-footer">
              <router-link to="/" class="back-link">
                <i class="fas fa-arrow-left"></i>
                Back to Home
              </router-link>
            </div>
          </div>
        </div>

        <!-- Success State -->
        <div v-else class="success-state">
          <div class="success-animation">
            <div class="checkmark-circle">
              <div class="checkmark-stem"></div>
              <div class="checkmark-kick"></div>
            </div>
          </div>
          <h2 class="success-title">Password Reset Successfully!</h2>
          <p class="success-text">Your password has been updated. You can now login with your new password.</p>
          <router-link to="/" class="success-btn">
            <i class="fas fa-home"></i>
            Go to Home
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();
const { resetPassword } = useAuth();

const formData = ref({
  password: '',
  confirmPassword: ''
});

const resetToken = ref('');
const errorMessage = ref('');
const isLoading = ref(false);
const isSuccess = ref(false);
const headerData = ref(null);

// Compute logo URL
const logoUrl = computed(() => {
  if (headerData.value?.logo) {
    const baseUrl = import.meta.env.VITE_DIRECTUS_URL || 'http://0.0.0.0:8055';
    return `${baseUrl}/assets/${headerData.value.logo}`;
  }
  return '/assets/img/logo.png';
});

// Fetch header data for logo
const fetchHeaderData = async () => {
  try {
    const baseUrl = import.meta.env.VITE_DIRECTUS_URL || 'http://0.0.0.0:8055';
    const response = await fetch(`${baseUrl}/items/header?fields=logo`);
    const data = await response.json();
    if (data.data && data.data.length > 0) {
      headerData.value = data.data[0];
    }
  } catch (error) {
    console.error('Failed to fetch header data:', error);
  }
};

onMounted(() => {
  // Fetch logo
  fetchHeaderData();
  
  // Get token from URL query parameter
  resetToken.value = route.query.token || '';
  
  if (!resetToken.value) {
    Swal.fire({
      title: 'Invalid Reset Link',
      text: 'This password reset link is invalid or has expired.',
      icon: 'error',
      confirmButtonColor: '#e03e2d'
    }).then(() => {
      router.push('/');
    });
  }
});

const handleSubmit = async () => {
  errorMessage.value = '';

  // Validate passwords match
  if (formData.value.password !== formData.value.confirmPassword) {
    errorMessage.value = 'Passwords do not match';
    return;
  }

  // Validate password length
  if (formData.value.password.length < 8) {
    errorMessage.value = 'Password must be at least 8 characters long';
    return;
  }

  isLoading.value = true;

  try {
    const result = await resetPassword(resetToken.value, formData.value.password);

    if (result.success) {
      isSuccess.value = true;
      
      // Redirect to home after 3 seconds
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } else {
      Swal.fire({
        title: 'Reset Failed',
        text: result.error || 'Failed to reset password. The link may have expired.',
        icon: 'error',
        confirmButtonColor: '#e03e2d'
      });
    }
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: 'An unexpected error occurred. Please try again.',
      icon: 'error',
      confirmButtonColor: '#e03e2d'
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Main Container */
.reset-password-page {
  min-height: 100vh;
  position: relative;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  overflow: hidden;
}

.background-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255, 255, 255, 0.02) 35px, rgba(255, 255, 255, 0.02) 70px);
  pointer-events: none;
}

.reset-password-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 20px;
  position: relative;
  z-index: 1;
}

/* Card */
.reset-password-card {
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
  overflow: hidden;
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Logo Section */
.logo-section {
  text-align: center;
  padding: 30px 40px 20px;
  background: linear-gradient(135deg, #e03e2d 0%, #c42d1f 100%);
}

.logo-link {
  display: inline-block;
}

.reset-logo {
  max-width: 180px;
  height: auto;
  filter: brightness(0) invert(1);
}

/* Card Header */
.card-header {
  text-align: center;
  padding: 40px 40px 30px;
  border-bottom: 1px solid #f0f0f0;
}

.icon-wrapper {
  width: 70px;
  height: 70px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #e03e2d 0%, #c42d1f 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(224, 62, 45, 0.3);
}

.icon-wrapper i {
  font-size: 32px;
  color: #ffffff;
}

.card-title {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 10px;
}

.card-subtitle {
  font-size: 15px;
  color: #666;
  margin: 0;
  line-height: 1.6;
}

/* Card Body */
.card-body {
  padding: 40px;
}

/* Input Groups */
.input-group {
  margin-bottom: 25px;
}

.input-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

.input-label i {
  color: #e03e2d;
  font-size: 16px;
}

.input-wrapper {
  position: relative;
}

.input-field {
  width: 100%;
  padding: 14px 45px 14px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 15px;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

.input-field:focus {
  outline: none;
  border-color: #e03e2d;
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(224, 62, 45, 0.1);
}

.input-field::placeholder {
  color: #999;
}

.input-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  cursor: pointer;
  transition: color 0.3s;
}

.input-icon:hover {
  color: #e03e2d;
}

/* Error Alert */
.error-alert {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  background: #fff5f5;
  border: 1px solid #feb2b2;
  border-radius: 10px;
  color: #c53030;
  font-size: 14px;
  margin-bottom: 25px;
}

.error-alert i {
  font-size: 18px;
}

/* Submit Button */
.submit-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #e03e2d 0%, #c42d1f 100%);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(224, 62, 45, 0.3);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(224, 62, 45, 0.4);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.btn-content i {
  font-size: 18px;
}

/* Card Footer */
.card-footer {
  text-align: center;
  padding-top: 25px;
  border-top: 1px solid #f0f0f0;
  margin-top: 30px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #e03e2d;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s;
}

.back-link:hover {
  gap: 12px;
  color: #c42d1f;
}

.back-link i {
  font-size: 14px;
  transition: transform 0.3s;
}

.back-link:hover i {
  transform: translateX(-3px);
}

/* Success State */
.success-state {
  padding: 60px 40px;
  text-align: center;
}

.success-animation {
  margin-bottom: 30px;
}

.checkmark-circle {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  position: relative;
  border-radius: 50%;
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  box-shadow: 0 10px 30px rgba(72, 187, 120, 0.3);
  animation: scaleIn 0.5s ease-out;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

.checkmark-stem,
.checkmark-kick {
  position: absolute;
  background: #ffffff;
  border-radius: 2px;
}

.checkmark-stem {
  width: 5px;
  height: 40px;
  left: 50px;
  top: 25px;
  transform: rotate(45deg);
  animation: drawStem 0.3s ease-out 0.3s forwards;
  transform-origin: bottom;
  opacity: 0;
}

.checkmark-kick {
  width: 5px;
  height: 20px;
  left: 35px;
  top: 48px;
  transform: rotate(-45deg);
  animation: drawKick 0.3s ease-out 0.5s forwards;
  transform-origin: bottom;
  opacity: 0;
}

@keyframes drawStem {
  from {
    height: 0;
    opacity: 1;
  }
  to {
    height: 40px;
    opacity: 1;
  }
}

@keyframes drawKick {
  from {
    height: 0;
    opacity: 1;
  }
  to {
    height: 20px;
    opacity: 1;
  }
}

.success-title {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 15px;
}

.success-text {
  font-size: 16px;
  color: #666;
  margin: 0 0 35px;
  line-height: 1.6;
}

.success-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 40px;
  background: linear-gradient(135deg, #e03e2d 0%, #c42d1f 100%);
  color: #ffffff;
  text-decoration: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(224, 62, 45, 0.3);
}

.success-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(224, 62, 45, 0.4);
}

.success-btn i {
  font-size: 18px;
}

/* Responsive */
@media (max-width: 576px) {
  .reset-password-container {
    padding: 20px 15px;
  }

  .reset-password-card {
    border-radius: 15px;
  }

  .logo-section {
    padding: 25px 30px 15px;
  }

  .reset-logo {
    max-width: 140px;
  }

  .card-header {
    padding: 30px 30px 25px;
  }

  .icon-wrapper {
    width: 60px;
    height: 60px;
  }

  .icon-wrapper i {
    font-size: 28px;
  }

  .card-title {
    font-size: 24px;
  }

  .card-subtitle {
    font-size: 14px;
  }

  .card-body {
    padding: 30px;
  }

  .success-state {
    padding: 50px 30px;
  }

  .checkmark-circle {
    width: 80px;
    height: 80px;
  }

  .checkmark-stem {
    height: 32px;
    left: 40px;
    top: 20px;
  }

  .checkmark-kick {
    height: 16px;
    left: 28px;
    top: 38px;
  }

  @keyframes drawStem {
    from {
      height: 0;
      opacity: 1;
    }
    to {
      height: 32px;
      opacity: 1;
    }
  }

  @keyframes drawKick {
    from {
      height: 0;
      opacity: 1;
    }
    to {
      height: 16px;
      opacity: 1;
    }
  }

  .success-title {
    font-size: 22px;
  }

  .success-text {
    font-size: 15px;
  }
}
</style>
