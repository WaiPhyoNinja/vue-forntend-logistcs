<template>
    <div class="page-wrapper">
        <Header />

        <!-- Login Section -->
        <section class="login-one">
            <div class="container">
                <div class="login-one__form">
                    <div class="inner-title text-center">
                        <h3>{{ isLoginMode ? 'Login Here' : 'Sign Up' }}</h3>
                    </div>
                    <form id="login-one__form" name="Login-one_form" @submit.prevent="handleSubmit">
                        <div class="row">
                            <!-- Registration Fields -->
                            <div v-if="!isLoginMode" class="col-xl-12">
                                <div class="form-group">
                                    <div class="input-box">
                                        <input type="text" v-model="formData.firstName" placeholder="First Name..." required>
                                    </div>
                                </div>
                            </div>
                            
                            <div v-if="!isLoginMode" class="col-xl-12">
                                <div class="form-group">
                                    <div class="input-box">
                                        <input type="text" v-model="formData.lastName" placeholder="Last Name..." required>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xl-12">
                                <div class="form-group">
                                    <div class="input-box">
                                        <input type="email" v-model="formData.email" id="formEmail" placeholder="Email..."
                                            required>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-12">
                                <div class="form-group">
                                    <div class="input-box">
                                        <input type="password" v-model="formData.password" id="formPassword"
                                            placeholder="Password..." required>
                                    </div>
                                </div>
                            </div>

                            <!-- Confirm Password (Register only) -->
                            <div v-if="!isLoginMode" class="col-xl-12">
                                <div class="form-group">
                                    <div class="input-box">
                                        <input type="password" v-model="formData.confirmPassword" placeholder="Confirm Password..." required>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xl-12">
                                <div class="form-group">
                                    <button class="thm-btn" type="submit" :disabled="isSubmitting" :data-loading-text="isSubmitting ? 'Please wait...' : ''">
                                        {{ isSubmitting ? 'Please wait...' : (isLoginMode ? 'Login Here' : 'Sign UP') }}
                                        <span><i class="icon-right-arrow"></i></span>
                                    </button>
                                </div>
                            </div>
                            <div v-if="isLoginMode" class="remember-forget">
                                <div class="checked-box1">
                                    <input type="checkbox" v-model="rememberMe" id="saveinfo">
                                    <label for="saveinfo">
                                        <span></span>
                                        Remember me
                                    </label>
                                </div>
                                <div class="forget">
                                    <a href="#" @click.prevent="showForgotPassword">Forget password?</a>
                                </div>
                            </div>

                            <div class="create-account text-center">
                                <p v-if="isLoginMode">Not registered yet? <a href="#" @click.prevent="toggleMode">Create an Account</a></p>
                                <p v-else>Already have an account? <a href="#" @click.prevent="toggleMode">Login Here</a></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>

        <Footer />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import Swal from 'sweetalert2';
import Header from '../../layouts/Header.vue';
import Footer from '../../layouts/Footer.vue';

const router = useRouter();
const { login, register, requestPasswordReset } = useAuth();

const isLoginMode = ref(true);
const isSubmitting = ref(false);
const errorMessage = ref('');
const rememberMe = ref(false);

const formData = ref({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: ''
});

const toggleMode = () => {
    isLoginMode.value = !isLoginMode.value;
    errorMessage.value = '';
    resetForm();
};

const resetForm = () => {
    formData.value = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        confirmPassword: ''
    };
};

const handleSubmit = async () => {
    errorMessage.value = '';

    // Validate passwords match for registration
    if (!isLoginMode.value && formData.value.password !== formData.value.confirmPassword) {
        errorMessage.value = 'Passwords do not match';
        return;
    }

    isSubmitting.value = true;

    try {
        let result;

        if (isLoginMode.value) {
            result = await login(formData.value.email, formData.value.password);
        } else {
            result = await register(formData.value);
        }

        if (result.success) {
            Swal.fire({
                title: 'Success!',
                text: isLoginMode.value ? 'Logged in successfully!' : 'Registration successful!',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#e03e2d'
            });

            // Redirect to home or dashboard
            router.push('/');
        } else {
            errorMessage.value = result.error;
        }
    } catch (error) {
        errorMessage.value = 'An unexpected error occurred';
        console.error('Auth error:', error);
    } finally {
        isSubmitting.value = false;
    }
};

const showForgotPassword = () => {
    Swal.fire({
        title: 'Reset Password',
        input: 'email',
        inputLabel: 'Enter your email address',
        inputPlaceholder: 'your@email.com',
        showCancelButton: true,
        confirmButtonText: 'Send Reset Link',
        confirmButtonColor: '#e03e2d'
    }).then(async (result) => {
        if (result.isConfirmed) {
            const response = await requestPasswordReset(result.value);

            if (response.success) {
                Swal.fire({
                    title: 'Email Sent!',
                    text: 'Check your email for password reset instructions',
                    icon: 'success',
                    confirmButtonColor: '#e03e2d'
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: response.error,
                    icon: 'error',
                    confirmButtonColor: '#e03e2d'
                });
            }
        }
    });
};
</script>

<style scoped></style>
