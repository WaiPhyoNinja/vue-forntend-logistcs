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
                                        <i class="fas fa-file-invoice"></i> {{ t.myRequestQuote }}
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
                        <h3>{{ t.myRequestQuote }}</h3>                            <!-- Quote Requests Section -->
                            <div class="quote-requests-section" style="margin-bottom: 40px;">
                                <h4 style="margin-top: 0; margin-bottom: 20px; color: #e03e2d;">
                                    <i class="fas fa-file-invoice"></i> Quote Requests
                                </h4>
                                
                                <div v-if="loadingQuotes" class="loading-state">
                                    <i class="fas fa-spinner fa-spin" style="font-size: 40px; color: #e03e2d;"></i>
                                    <p>Loading quote requests...</p>
                                </div>
                                
                                <div v-else-if="quoteRequests.length === 0" class="empty-state">
                                    <i class="fas fa-file-invoice" style="font-size: 50px; color: #ccc;"></i>
                                    <p>No quote requests found</p>
                                    <button @click="router.push('/request-quote')" class="thm-btn" style="margin-top: 15px;">
                                        Request a Quote
                                        <span><i class="icon-right-arrow"></i></span>
                                    </button>
                                </div>
                                
                                <div v-else class="quotes-list">
                                    <div v-for="quote in quoteRequests" :key="quote.id" class="quote-item">
                                        <div class="quote-header">
                                            <div class="quote-id">
                                                <strong>Quote #{{ quote.id.substring(0, 8) }}</strong>
                                                <span :class="['status-badge', `status-${quote.status}`]">
                                                    {{ quote.status }}
                                                </span>
                                            </div>
                                            <div class="quote-date">
                                                <i class="fas fa-calendar"></i>
                                                {{ formatDate(quote.date_created) }}
                                            </div>
                                        </div>
                                        
                                        <div class="quote-details">
                                            <div class="quote-route">
                                                <div class="route-info">
                                                    <i class="fas fa-map-marker-alt text-success"></i>
                                                    <div>
                                                        <strong>From:</strong>
                                                        <p>{{ quote.sender_city }}, {{ quote.sender_country }}</p>
                                                    </div>
                                                </div>
                                                <div class="route-arrow">
                                                    <i class="fas fa-arrow-right"></i>
                                                </div>
                                                <div class="route-info">
                                                    <i class="fas fa-map-pin text-danger"></i>
                                                    <div>
                                                        <strong>To:</strong>
                                                        <p>{{ quote.receiver_city }}, {{ quote.receiver_country }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div class="quote-info-grid">
                                                <div class="info-item">
                                                    <i class="fas fa-box"></i>
                                                    <span>{{ quote.shipment_type }}</span>
                                                </div>
                                                <div class="info-item">
                                                    <i class="fas fa-shipping-fast"></i>
                                                    <span>{{ quote.service_type }}</span>
                                                </div>
                                                <div class="info-item">
                                                    <i class="fas fa-weight"></i>
                                                    <span>{{ quote.weight }} kg</span>
                                                </div>
                                                <div class="info-item">
                                                    <i class="fas fa-boxes"></i>
                                                    <span>{{ quote.quantity }} package(s)</span>
                                                </div>
                                            </div>
                                            
                                            <div class="quote-actions">
                                                <button @click="viewQuoteDetails(quote)" class="btn-view-details">
                                                    <i class="fas fa-eye"></i> View Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Regular Orders Section -->
                            <!-- <div class="orders-section" style="margin-top: 40px;">
                                <h4 style="margin-bottom: 20px; color: #e03e2d;">
                                    <i class="fas fa-box"></i> Orders
                                </h4>
                                
                                <div v-if="orders.length === 0" class="empty-state">
                                    <i class="fas fa-box-open" style="font-size: 50px; color: #ccc;"></i>
                                    <p>{{ t.noOrders }}</p>
                                </div>
                                <div v-else class="orders-list">
                                    <div v-for="order in orders" :key="order.id" class="order-item">
                                        <h4>{{ t.orderNumber }} #{{ order.id }}</h4>
                                        <p>{{ t.orderDate }}: {{ new Date(order.date_created).toLocaleDateString() }}</p>
                                        <p>{{ t.orderStatus }}: <span class="badge">{{ order.status }}</span></p>
                                    </div>
                                </div>
                            </div> -->
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
import { readItems } from '@directus/sdk';
import directus from '@/services/directus';
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
const quoteRequests = ref([]);
const loadingQuotes = ref(false);

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

onMounted(async () => {
    if (user.value) {
        profileData.value = {
            first_name: user.value.first_name || '',
            last_name: user.value.last_name || '',
            email: user.value.email || ''
        };
        
        // Fetch quote requests
        await fetchQuoteRequests();
    }
});

const fetchQuoteRequests = async () => {
    loadingQuotes.value = true;
    try {
        const response = await directus.request(
            readItems('quote_requests', {
                sort: ['-date_created'],
                limit: 50
            })
        );
        quoteRequests.value = response;
        console.log('Quote requests loaded:', response);
    } catch (error) {
        console.error('Error fetching quote requests:', error);
        if (error.response?.status !== 403) {
            Swal.fire({
                title: 'Error',
                text: 'Failed to load quote requests',
                icon: 'error',
                confirmButtonColor: '#e03e2d'
            });
        }
    } finally {
        loadingQuotes.value = false;
    }
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const viewQuoteDetails = (quote) => {
    const details = `
        <div style="text-align: left;">
            <h4 style="color: #e03e2d; margin-bottom: 15px;">Shipment Details</h4>
            
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <h5 style="margin-top: 0; color: #333;">From (Sender)</h5>
                <p style="margin: 5px 0;"><strong>Name:</strong> ${quote.sender_first_name} ${quote.sender_last_name}</p>
                ${quote.sender_company ? `<p style="margin: 5px 0;"><strong>Company:</strong> ${quote.sender_company}</p>` : ''}
                <p style="margin: 5px 0;"><strong>Email:</strong> ${quote.sender_email}</p>
                <p style="margin: 5px 0;"><strong>Phone:</strong> ${quote.sender_phone}</p>
                <p style="margin: 5px 0;"><strong>Address:</strong> ${quote.sender_address}, ${quote.sender_city}, ${quote.sender_state}, ${quote.sender_country}</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <h5 style="margin-top: 0; color: #333;">To (Receiver)</h5>
                <p style="margin: 5px 0;"><strong>Name:</strong> ${quote.receiver_first_name} ${quote.receiver_last_name}</p>
                ${quote.receiver_company ? `<p style="margin: 5px 0;"><strong>Company:</strong> ${quote.receiver_company}</p>` : ''}
                <p style="margin: 5px 0;"><strong>Email:</strong> ${quote.receiver_email}</p>
                <p style="margin: 5px 0;"><strong>Phone:</strong> ${quote.receiver_phone}</p>
                <p style="margin: 5px 0;"><strong>Address:</strong> ${quote.receiver_address}, ${quote.receiver_city}, ${quote.receiver_state}, ${quote.receiver_country}</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                <h5 style="margin-top: 0; color: #333;">Package Information</h5>
                <p style="margin: 5px 0;"><strong>Type:</strong> ${quote.shipment_type}</p>
                <p style="margin: 5px 0;"><strong>Service:</strong> ${quote.service_type}</p>
                <p style="margin: 5px 0;"><strong>Weight:</strong> ${quote.weight} kg</p>
                ${quote.length && quote.width && quote.height ? 
                    `<p style="margin: 5px 0;"><strong>Dimensions:</strong> ${quote.length} × ${quote.width} × ${quote.height} cm</p>` : ''}
                <p style="margin: 5px 0;"><strong>Quantity:</strong> ${quote.quantity} package(s)</p>
                ${quote.declared_value ? `<p style="margin: 5px 0;"><strong>Declared Value:</strong> $${quote.declared_value}</p>` : ''}
                <p style="margin: 5px 0;"><strong>Insurance:</strong> ${quote.insurance ? 'Yes' : 'No'}</p>
                <p style="margin: 5px 0;"><strong>Description:</strong> ${quote.description}</p>
                ${quote.special_instructions ? `<p style="margin: 5px 0;"><strong>Special Instructions:</strong> ${quote.special_instructions}</p>` : ''}
            </div>
        </div>
    `;
    
    Swal.fire({
        title: `Quote Request #${quote.id.substring(0, 8)}`,
        html: details,
        width: '700px',
        confirmButtonColor: '#e03e2d',
        confirmButtonText: 'Close'
    });
};

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

/* Quote Requests Styles */
.loading-state {
    text-align: center;
    padding: 40px;
}

.loading-state p {
    color: #666;
    margin-top: 15px;
    font-size: 16px;
}

.quotes-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.quote-item {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.quote-item:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
}

.quote-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.quote-id {
    display: flex;
    align-items: center;
    gap: 15px;
}

.quote-id strong {
    font-size: 16px;
}

.status-badge {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    text-transform: capitalize;
    background: rgba(255, 255, 255, 0.2);
}

.status-badge.status-pending {
    background: #fbbf24;
    color: #92400e;
}

.status-badge.status-reviewed {
    background: #60a5fa;
    color: #1e3a8a;
}

.status-badge.status-quoted {
    background: #34d399;
    color: #065f46;
}

.status-badge.status-approved {
    background: #10b981;
    color: #064e3b;
}

.status-badge.status-rejected {
    background: #f87171;
    color: #7f1d1d;
}

.quote-date {
    font-size: 14px;
    opacity: 0.9;
    display: flex;
    align-items: center;
    gap: 5px;
}

.quote-details {
    padding: 20px;
}

.quote-route {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
    padding: 15px;
    background: #f9fafb;
    border-radius: 8px;
}

.route-info {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    flex: 1;
}

.route-info i {
    font-size: 20px;
    margin-top: 3px;
}

.route-info strong {
    display: block;
    font-size: 12px;
    color: #6b7280;
    margin-bottom: 3px;
}

.route-info p {
    margin: 0;
    color: #111827;
    font-size: 14px;
    font-weight: 500;
}

.route-arrow {
    color: #9ca3af;
    font-size: 18px;
}

.quote-info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
    margin-bottom: 20px;
}

.info-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    background: #f9fafb;
    border-radius: 6px;
}

.info-item i {
    color: #e03e2d;
    font-size: 18px;
}

.info-item span {
    font-size: 14px;
    color: #374151;
    font-weight: 500;
}

.quote-actions {
    display: flex;
    justify-content: flex-end;
    padding-top: 15px;
    border-top: 1px solid #e5e7eb;
}

.btn-view-details {
    background: #e03e2d;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
}

.btn-view-details:hover {
    background: #c02d1f;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(224, 62, 45, 0.3);
}

.btn-view-details i {
    font-size: 16px;
}

@media (max-width: 768px) {
    .quote-route {
        flex-direction: column;
        gap: 10px;
    }
    
    .route-arrow {
        transform: rotate(90deg);
    }
    
    .quote-info-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .quote-header {
        flex-direction: column;
        gap: 10px;
        align-items: flex-start;
    }
}
</style>
