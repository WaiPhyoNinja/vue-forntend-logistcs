<template>
    <div class="page-wrapper">
        <Header />
        
        <section class="my-account-section">
            <div class="container">
                
                <div class="row" style="margin-top: 50px;">
                    <!-- Account Info -->
                    <div class="col-lg-4">
                        <div class="account-sidebar">
                            <div class="user-info-box">
                                <div class="user-avatar">
                                    <i class="fas fa-user-circle" style="font-size: 80px; color: #e03e2d;"></i>
                                </div>
                                <h3>{{ user?.first_name }} {{ user?.last_name }}</h3>
                                <p>{{ user?.email }}</p>
                            </div>
                            
                            <ul class="account-menu">
                                <li :class="{ 'active': activeTab === 'profile' }">
                                    <a href="#" @click.prevent="activeTab = 'profile'">
                                        <i class="fas fa-user"></i> {{ t.profileInfo }}
                                    </a>
                                </li>
                                <li :class="{ 'active': activeTab === 'orders' }">
                                    <a href="#" @click.prevent="activeTab = 'orders'">
                                        <i class="fas fa-box"></i> {{ t.myOrders }}
                                    </a>
                                </li>
                                <li :class="{ 'active': activeTab === 'password' }">
                                    <a href="#" @click.prevent="activeTab = 'password'">
                                        <i class="fas fa-lock"></i> {{ t.changePassword }}
                                    </a>
                                </li>
                                <li>
                                    <a href="#" @click.prevent="handleLogout">
                                        <i class="fas fa-sign-out-alt"></i> {{ t.logout }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    <!-- Account Content -->
                    <div class="col-lg-8">
                        <!-- Profile Tab -->
                        <div v-if="activeTab === 'profile'" class="account-content-box">
                            <h3>{{ t.profileInfo }}</h3>
                            <form @submit.prevent="updateProfile">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>{{ t.firstName.replace('...', '') }}</label>
                                            <input type="text" v-model="profileData.first_name" class="form-control" required>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>{{ t.lastName.replace('...', '') }}</label>
                                            <input type="text" v-model="profileData.last_name" class="form-control" required>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>{{ t.email.replace('...', '') }}</label>
                                            <input type="email" v-model="profileData.email" class="form-control" disabled>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <button type="submit" class="thm-btn" :disabled="isUpdating">
                                            {{ isUpdating ? t.updating : t.updateProfile }}
                                            <span><i class="icon-right-arrow"></i></span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        
                        <!-- Orders Tab -->
                        <div v-if="activeTab === 'orders'" class="account-content-box">
                            <h3>{{ t.myOrders }}</h3>
                            <div v-if="orders.length === 0" class="empty-state">
                                <i class="fas fa-box-open" style="font-size: 60px; color: #ccc;"></i>
                                <p>{{ t.noOrders }}</p>
                            </div>
                            <div v-else class="orders-list">
                                <div v-for="order in orders" :key="order.id" class="order-item">
                                    <h4>{{ t.orderNumber }} #{{ order.id }}</h4>
                                    <p>{{ t.orderDate }}: {{ new Date(order.date_created).toLocaleDateString() }}</p>
                                    <p>{{ t.orderStatus }}: <span class="badge">{{ order.status }}</span></p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Password Tab -->
                        <div v-if="activeTab === 'password'" class="account-content-box">
                            <h3>{{ t.changePassword }}</h3>
                            <form @submit.prevent="updatePassword">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>{{ t.currentPassword }}</label>
                                            <input type="password" v-model="passwordData.current" class="form-control" required>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>{{ t.newPassword }}</label>
                                            <input type="password" v-model="passwordData.new" class="form-control" required>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>{{ t.confirmNewPassword }}</label>
                                            <input type="password" v-model="passwordData.confirm" class="form-control" required>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <button type="submit" class="thm-btn" :disabled="isUpdating">
                                            {{ isUpdating ? t.updating : t.updatePassword }}
                                            <span><i class="icon-right-arrow"></i></span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <Footer />
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { useLanguage } from '@/composables/useLanguage';
import { useAuthTranslation } from '@/locales/auth';
import Swal from 'sweetalert2';
import Header from '../layouts/Header.vue';
import Footer from '../layouts/Footer.vue';

const router = useRouter();
const { user, logout } = useAuth();
const { currentLanguage } = useLanguage();
const t = computed(() => useAuthTranslation(currentLanguage.value));

const activeTab = ref('profile');
const isUpdating = ref(false);
const orders = ref([]);

const profileData = ref({
    first_name: '',
    last_name: '',
    email: ''
});

const passwordData = ref({
    current: '',
    new: '',
    confirm: ''
});

onMounted(() => {
    if (user.value) {
        profileData.value = {
            first_name: user.value.first_name || '',
            last_name: user.value.last_name || '',
            email: user.value.email || ''
        };
    }
});

const updateProfile = async () => {
    isUpdating.value = true;
    
    try {
        // TODO: Implement profile update API call
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
        
        Swal.fire({
            title: t.value.success,
            text: t.value.profileUpdated,
            icon: 'success',
            confirmButtonColor: '#e03e2d'
        });
    } catch (error) {
        Swal.fire({
            title: t.value.error,
            text: 'Failed to update profile',
            icon: 'error',
            confirmButtonColor: '#e03e2d'
        });
    } finally {
        isUpdating.value = false;
    }
};

const updatePassword = async () => {
    if (passwordData.value.new !== passwordData.value.confirm) {
        Swal.fire({
            title: t.value.error,
            text: t.value.newPasswordMismatch,
            icon: 'error',
            confirmButtonColor: '#e03e2d'
        });
        return;
    }
    
    isUpdating.value = true;
    
    try {
        // TODO: Implement password update API call
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
        
        passwordData.value = { current: '', new: '', confirm: '' };
        
        Swal.fire({
            title: t.value.success,
            text: t.value.passwordUpdated,
            icon: 'success',
            confirmButtonColor: '#e03e2d'
        });
    } catch (error) {
        Swal.fire({
            title: t.value.error,
            text: 'Failed to update password',
            icon: 'error',
            confirmButtonColor: '#e03e2d'
        });
    } finally {
        isUpdating.value = false;
    }
};

const handleLogout = async () => {
    const result = await Swal.fire({
        title: t.value.logout,
        text: t.value.logoutConfirm,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#e03e2d',
        cancelButtonColor: '#6c757d',
        confirmButtonText: t.value.yes,
        cancelButtonText: t.value.cancel
    });

    if (result.isConfirmed) {
        await logout();
        router.push('/');
    }
};
</script>

<style scoped>
.my-account-section {
    padding: 80px 0;
    background-color: #f8f9fa;
}

.page-header h2 {
    font-size: 42px;
    color: #1a3353;
    margin-bottom: 10px;
}

.account-sidebar {
    background: #ffffff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
}

.user-info-box {
    text-align: center;
    padding-bottom: 30px;
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 30px;
}

.user-info-box h3 {
    margin-top: 15px;
    color: #1a3353;
    font-size: 20px;
}

.user-info-box p {
    color: #6b7280;
    margin: 5px 0 0 0;
}

.account-menu {
    list-style: none;
    padding: 0;
    margin: 0;
}

.account-menu li {
    margin-bottom: 10px;
}

.account-menu li a {
    display: flex;
    align-items: center;
    padding: 12px 15px;
    color: #1a3353;
    text-decoration: none;
    border-radius: 5px;
    transition: all 0.3s;
}

.account-menu li a i {
    margin-right: 10px;
    width: 20px;
}

.account-menu li:hover a,
.account-menu li.active a {
    background-color: #e03e2d;
    color: #ffffff;
}

.account-content-box {
    background: #ffffff;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
}

.account-content-box h3 {
    color: #1a3353;
    font-size: 28px;
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 2px solid #e03e2d;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    color: #1a3353;
    font-weight: 600;
    margin-bottom: 8px;
}

.form-control {
    width: 100%;
    height: 50px;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    padding: 0 20px;
    font-size: 16px;
    transition: all 0.3s;
}

.form-control:focus {
    outline: none;
    border-color: #e03e2d;
}

.form-control:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
}

.empty-state {
    text-align: center;
    padding: 60px 20px;
}

.empty-state p {
    color: #6b7280;
    font-size: 18px;
    margin-top: 20px;
}

.order-item {
    padding: 20px;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    margin-bottom: 15px;
}

.badge {
    background-color: #e03e2d;
    color: #ffffff;
    padding: 3px 10px;
    border-radius: 3px;
    font-size: 12px;
}
</style>
