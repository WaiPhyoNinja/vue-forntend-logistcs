<template>
  <div class="reset-password-container">
    <div class="reset-password-box">
      <div class="reset-password-header">
        <h2>{{ isSuccess ? 'Password Reset Successfully' : 'Reset Password' }}</h2>
      </div>

      <div v-if="!isSuccess" class="reset-password-body">
        <p class="instruction-text">Enter your new password below.</p>
        
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="password">New Password</label>
            <input
              id="password"
              v-model="formData.password"
              type="password"
              class="form-control"
              placeholder="Enter new password"
              required
              minlength="8"
            />
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              v-model="formData.confirmPassword"
              type="password"
              class="form-control"
              placeholder="Confirm new password"
              required
              minlength="8"
            />
          </div>

          <div v-if="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
          </div>

          <button type="submit" class="btn btn-primary btn-block" :disabled="isLoading">
            <span v-if="isLoading">Resetting...</span>
            <span v-else>Reset Password</span>
          </button>
        </form>

        <div class="back-to-login">
          <router-link to="/">Back to Home</router-link>
        </div>
      </div>

      <div v-else class="success-message">
        <div class="success-icon">✓</div>
        <p>Your password has been reset successfully!</p>
        <router-link to="/" class="btn btn-primary">Go to Home</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
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

onMounted(() => {
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
.reset-password-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.reset-password-box {
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  max-width: 450px;
  width: 100%;
  overflow: hidden;
}

.reset-password-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  text-align: center;
}

.reset-password-header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.reset-password-body {
  padding: 40px;
}

.instruction-text {
  color: #666;
  margin-bottom: 30px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-control:focus {
  outline: none;
  border-color: #667eea;
}

.alert {
  padding: 12px 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.alert-danger {
  background-color: #fee;
  color: #c33;
  border: 1px solid #fcc;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-block {
  width: 100%;
}

.back-to-login {
  text-align: center;
  margin-top: 20px;
}

.back-to-login a {
  color: #667eea;
  text-decoration: none;
  font-size: 14px;
}

.back-to-login a:hover {
  text-decoration: underline;
}

.success-message {
  padding: 60px 40px;
  text-align: center;
}

.success-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.success-message p {
  font-size: 18px;
  color: #333;
  margin-bottom: 30px;
}
</style>
