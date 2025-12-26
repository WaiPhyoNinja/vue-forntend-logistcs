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
                                    <i class="fas fa-file-invoice"></i> {{ t.quoteRequests }}
                                </h4>
                                
                                <div v-if="loadingQuotes" class="loading-state">
                                    <i class="fas fa-spinner fa-spin" style="font-size: 40px; color: #e03e2d;"></i>
                                    <p>{{ t.loadingQuotes }}</p>
                                </div>
                                
                                <div v-else-if="quoteRequests.length === 0" class="empty-state">
                                    <i class="fas fa-file-invoice" style="font-size: 50px; color: #ccc;"></i>
                                    <p>{{ t.noQuotesFound }}</p>
                                    <button @click="router.push('/request-quote')" class="thm-btn" style="margin-top: 15px;">
                                        {{ t.requestQuote }}
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
                                                        <strong>{{ t.from }}:</strong>
                                                        <p>{{ quote.sender_city }}, {{ quote.sender_country }}</p>
                                                    </div>
                                                </div>
                                                <div class="route-arrow">
                                                    <i class="fas fa-arrow-right"></i>
                                                </div>
                                                <div class="route-info">
                                                    <i class="fas fa-map-pin text-danger"></i>
                                                    <div>
                                                        <strong>{{ t.to }}:</strong>
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
                                                    <i class="fas fa-eye"></i> {{ t.viewDetails }}
                                                </button>
                                                <button 
                                                    v-if="quote.status === 'pending'" 
                                                    @click="editQuote(quote)" 
                                                    class="btn-edit-quote"
                                                >
                                                    <i class="fas fa-edit"></i> {{ t.editQuote }}
                                                </button>
                                                <button 
                                                    v-if="quote.status === 'approved'" 
                                                    @click="downloadPDF(quote)" 
                                                    class="btn-download-pdf"
                                                >
                                                    <i class="fas fa-download"></i> {{ t.downloadPDF }}
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
    const trans = t.value;
    const details = `
        <div style="text-align: left;">
            <h4 style="color: #e03e2d; margin-bottom: 15px;">${trans.shipmentDetails}</h4>
            
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <h5 style="margin-top: 0; color: #333;">${trans.fromSender}</h5>
                <p style="margin: 5px 0;"><strong>${trans.name}:</strong> ${quote.sender_first_name} ${quote.sender_last_name}</p>
                ${quote.sender_company ? `<p style="margin: 5px 0;"><strong>${trans.company}:</strong> ${quote.sender_company}</p>` : ''}
                <p style="margin: 5px 0;"><strong>${trans.email.replace('...', '')}:</strong> ${quote.sender_email}</p>
                <p style="margin: 5px 0;"><strong>${trans.phone}:</strong> ${quote.sender_phone}</p>
                <p style="margin: 5px 0;"><strong>${trans.address}:</strong> ${quote.sender_address}, ${quote.sender_city}, ${quote.sender_state}, ${quote.sender_country}</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <h5 style="margin-top: 0; color: #333;">${trans.toReceiver}</h5>
                <p style="margin: 5px 0;"><strong>${trans.name}:</strong> ${quote.receiver_first_name} ${quote.receiver_last_name}</p>
                ${quote.receiver_company ? `<p style="margin: 5px 0;"><strong>${trans.company}:</strong> ${quote.receiver_company}</p>` : ''}
                <p style="margin: 5px 0;"><strong>${trans.email.replace('...', '')}:</strong> ${quote.receiver_email}</p>
                <p style="margin: 5px 0;"><strong>${trans.phone}:</strong> ${quote.receiver_phone}</p>
                <p style="margin: 5px 0;"><strong>${trans.address}:</strong> ${quote.receiver_address}, ${quote.receiver_city}, ${quote.receiver_state}, ${quote.receiver_country}</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                <h5 style="margin-top: 0; color: #333;">${trans.packageInfo}</h5>
                <p style="margin: 5px 0;"><strong>${trans.type}:</strong> ${quote.shipment_type}</p>
                <p style="margin: 5px 0;"><strong>${trans.service}:</strong> ${quote.service_type}</p>
                <p style="margin: 5px 0;"><strong>${trans.weight}:</strong> ${quote.weight} kg</p>
                ${quote.length && quote.width && quote.height ? 
                    `<p style="margin: 5px 0;"><strong>${trans.dimensions}:</strong> ${quote.length} × ${quote.width} × ${quote.height} cm</p>` : ''}
                <p style="margin: 5px 0;"><strong>${trans.quantity}:</strong> ${quote.quantity} package(s)</p>
                ${quote.declared_value ? `<p style="margin: 5px 0;"><strong>${trans.declaredValue}:</strong> $${quote.declared_value}</p>` : ''}
                <p style="margin: 5px 0;"><strong>${trans.insurance}:</strong> ${quote.insurance ? trans.yes : trans.no}</p>
                <p style="margin: 5px 0;"><strong>${trans.description}:</strong> ${quote.description}</p>
                ${quote.special_instructions ? `<p style="margin: 5px 0;"><strong>${trans.specialInstructions}:</strong> ${quote.special_instructions}</p>` : ''}
            </div>
        </div>
    `;
    
    Swal.fire({
        title: `Quote Request #${quote.id.substring(0, 8)}`,
        html: details,
        width: '700px',
        confirmButtonColor: '#e03e2d',
        confirmButtonText: trans.close
    });
};

const editQuote = (quote) => {
    // Store the quote data in sessionStorage for editing
    const quoteData = {
        id: quote.id,
        isEditing: true,
        sender_first_name: quote.sender_first_name,
        sender_last_name: quote.sender_last_name,
        sender_company: quote.sender_company || '',
        sender_email: quote.sender_email,
        sender_phone: quote.sender_phone,
        sender_address: quote.sender_address,
        sender_city: quote.sender_city,
        sender_state: quote.sender_state,
        sender_zip: quote.sender_zip || '',
        sender_country: quote.sender_country,
        receiver_first_name: quote.receiver_first_name,
        receiver_last_name: quote.receiver_last_name,
        receiver_company: quote.receiver_company || '',
        receiver_email: quote.receiver_email,
        receiver_phone: quote.receiver_phone,
        receiver_address: quote.receiver_address,
        receiver_city: quote.receiver_city,
        receiver_state: quote.receiver_state,
        receiver_zip: quote.receiver_zip || '',
        receiver_country: quote.receiver_country,
        shipment_type: quote.shipment_type,
        service_type: quote.service_type,
        weight: quote.weight,
        length: quote.length || '',
        width: quote.width || '',
        height: quote.height || '',
        quantity: quote.quantity,
        declared_value: quote.declared_value || '',
        insurance: quote.insurance,
        description: quote.description,
        special_instructions: quote.special_instructions || ''
    };
    
    sessionStorage.setItem('editQuoteData', JSON.stringify(quoteData));
    
    // Navigate to request quote page
    router.push('/request-quote');
};

const downloadPDF = async (quote) => {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        
        // Colors
        const primaryColor = [224, 62, 45]; // #e03e2d
        const darkGray = [51, 51, 51];
        const lightGray = [245, 245, 245];
        const mediumGray = [128, 128, 128];
        const white = [255, 255, 255];
        
        // Header Background with gradient effect
        doc.setFillColor(...primaryColor);
        doc.rect(0, 0, pageWidth, 50, 'F');
        
        // Decorative line
        doc.setFillColor(192, 45, 31); // Darker shade
        doc.rect(0, 50, pageWidth, 2, 'F');
        
        // Company Logo/Name
        doc.setTextColor(...white);
        doc.setFontSize(26);
        doc.setFont('helvetica', 'bold');
        doc.text('LOGISTICS', 20, 22);
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.text('International Shipping Solutions', 20, 30);
        doc.text('Email: info@logistics.com | Phone: +1 234 567 8900', 20, 36);
        
        // Document Title
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text('SHIPPING QUOTE', pageWidth - 20, 25, { align: 'right' });
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.text('REQUEST QUOTATION', pageWidth - 20, 32, { align: 'right' });
        
        let yPos = 62;
        
        // Quote Information Table (Top Right)
        const quoteInfoData = [
            ['Quote Number', `#${quote.id.substring(0, 8).toUpperCase()}`],
            ['Quote Date', new Date(quote.date_created).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })],
            ['Status', quote.status.toUpperCase()],
            ['Valid Until', new Date(new Date(quote.date_created).setDate(new Date(quote.date_created).getDate() + 30)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })]
        ];
        
        doc.autoTable({
            startY: yPos,
            body: quoteInfoData,
            theme: 'grid',
            styles: {
                fontSize: 9,
                cellPadding: 5,
                lineColor: [220, 220, 220],
                lineWidth: 0.5
            },
            columnStyles: {
                0: { 
                    cellWidth: 50, 
                    fontStyle: 'bold',
                    fillColor: [240, 242, 245],
                    textColor: darkGray,
                    halign: 'left'
                },
                1: { 
                    cellWidth: 'auto',
                    textColor: darkGray,
                    halign: 'left'
                }
            },
            margin: { left: pageWidth / 2 + 5, right: 20 }
        });
        
        // Route Information Box (Left side, beside quote info)
        doc.setFillColor(249, 250, 251);
        doc.roundedRect(20, yPos, (pageWidth / 2) - 30, 42, 3, 3, 'F');
        
        doc.setTextColor(...primaryColor);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('ROUTE OVERVIEW', 25, yPos + 8);
        
        doc.setTextColor(...darkGray);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text('FROM:', 25, yPos + 16);
        doc.setFont('helvetica', 'normal');
        doc.text(`${quote.sender_city}, ${quote.sender_country}`, 25, yPos + 22);
        
        // Arrow
        doc.setFontSize(12);
        doc.text('↓', 25, yPos + 28);
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text('TO:', 25, yPos + 34);
        doc.setFont('helvetica', 'normal');
        doc.text(`${quote.receiver_city}, ${quote.receiver_country}`, 25, yPos + 40);
        
        yPos = Math.max(doc.lastAutoTable.finalY, yPos + 42) + 15;
        
        // Section Divider
        doc.setDrawColor(...primaryColor);
        doc.setLineWidth(0.5);
        doc.line(20, yPos, pageWidth - 20, yPos);
        yPos += 10;
        
        // FROM (SENDER) and TO (RECEIVER) Section Header
        doc.setTextColor(...primaryColor);
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.text('SENDER & RECEIVER INFORMATION', 20, yPos);
        yPos += 8;
        
        // Sender and Receiver Tables Side by Side
        const senderData = [
            ['Name', `${quote.sender_first_name} ${quote.sender_last_name}`],
            ...(quote.sender_company ? [['Company', quote.sender_company]] : []),
            ['Email', quote.sender_email],
            ['Phone', quote.sender_phone],
            ['Address', quote.sender_address],
            ['City / State', `${quote.sender_city}, ${quote.sender_state}`],
            ['Country', quote.sender_country]
        ];
        
        // FROM (SENDER) Table
        doc.autoTable({
            startY: yPos,
            body: senderData,
            theme: 'grid',
            styles: {
                fontSize: 9,
                cellPadding: 4,
                lineColor: [220, 220, 220],
                lineWidth: 0.5
            },
            headStyles: {
                fillColor: primaryColor,
                textColor: white,
                fontStyle: 'bold',
                fontSize: 10
            },
            columnStyles: {
                0: { 
                    cellWidth: 35, 
                    fontStyle: 'bold',
                    fillColor: [240, 242, 245],
                    textColor: darkGray
                },
                1: { 
                    cellWidth: 'auto',
                    textColor: darkGray
                }
            },
            margin: { left: 20, right: pageWidth / 2 + 5 },
            didDrawPage: function(data) {
                // Add "FROM" header above table
                doc.setFontSize(10);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(...white);
                doc.setFillColor(...primaryColor);
                doc.rect(20, yPos - 8, (pageWidth / 2) - 25, 7, 'F');
                doc.text('FROM (SENDER)', 22, yPos - 3);
            }
        });
        
        const receiverData = [
            ['Name', `${quote.receiver_first_name} ${quote.receiver_last_name}`],
            ...(quote.receiver_company ? [['Company', quote.receiver_company]] : []),
            ['Email', quote.receiver_email],
            ['Phone', quote.receiver_phone],
            ['Address', quote.receiver_address],
            ['City / State', `${quote.receiver_city}, ${quote.receiver_state}`],
            ['Country', quote.receiver_country]
        ];
        
        // TO (RECEIVER) Table
        doc.autoTable({
            startY: yPos,
            body: receiverData,
            theme: 'grid',
            styles: {
                fontSize: 9,
                cellPadding: 4,
                lineColor: [220, 220, 220],
                lineWidth: 0.5
            },
            columnStyles: {
                0: { 
                    cellWidth: 35, 
                    fontStyle: 'bold',
                    fillColor: [240, 242, 245],
                    textColor: darkGray
                },
                1: { 
                    cellWidth: 'auto',
                    textColor: darkGray
                }
            },
            margin: { left: pageWidth / 2 + 5, right: 20 },
            didDrawPage: function(data) {
                // Add "TO" header above table
                doc.setFontSize(10);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(...white);
                doc.setFillColor(...primaryColor);
                doc.rect(pageWidth / 2 + 5, yPos - 8, (pageWidth / 2) - 25, 7, 'F');
                doc.text('TO (RECEIVER)', pageWidth / 2 + 7, yPos - 3);
            }
        });
        
        yPos = Math.max(doc.lastAutoTable.finalY, doc.previousAutoTable?.finalY || 0) + 15;
        
        // Section Divider
        doc.setDrawColor(...primaryColor);
        doc.setLineWidth(0.5);
        doc.line(20, yPos, pageWidth - 20, yPos);
        yPos += 10;
        
        // SHIPMENT DETAILS Section
        doc.setTextColor(...primaryColor);
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.text('SHIPMENT DETAILS', 20, yPos);
        yPos += 5;
        
        // Shipment Details Table with enhanced styling
        const shipmentTableData = [
            ['Shipment Type', quote.shipment_type],
            ['Service Type', quote.service_type],
            ['Weight', `${quote.weight} kg`],
            ['Quantity', `${quote.quantity} package(s)`],
            ...(quote.length && quote.width && quote.height ? [['Dimensions (L × W × H)', `${quote.length} × ${quote.width} × ${quote.height} cm`]] : []),
            ...(quote.declared_value ? [['Declared Value', `$${quote.declared_value}`]] : []),
            ['Insurance', quote.insurance ? 'Yes ✓' : 'No']
        ];
        
        doc.autoTable({
            startY: yPos + 3,
            body: shipmentTableData,
            theme: 'striped',
            styles: {
                fontSize: 9,
                cellPadding: 5,
                lineColor: [220, 220, 220],
                lineWidth: 0.5
            },
            columnStyles: {
                0: { 
                    cellWidth: 65, 
                    fontStyle: 'bold',
                    fillColor: [240, 242, 245],
                    textColor: darkGray
                },
                1: { 
                    cellWidth: 'auto',
                    textColor: darkGray
                }
            },
            alternateRowStyles: {
                fillColor: [252, 252, 252]
            },
            margin: { left: 20, right: 20 }
        });
        
        yPos = doc.lastAutoTable.finalY + 10;
        
        // Package Description Section
        if (quote.description || quote.special_instructions) {
            // Section Divider
            doc.setDrawColor(...primaryColor);
            doc.setLineWidth(0.5);
            doc.line(20, yPos, pageWidth - 20, yPos);
            yPos += 10;
            
            doc.setTextColor(...primaryColor);
            doc.setFontSize(13);
            doc.setFont('helvetica', 'bold');
            doc.text('PACKAGE DESCRIPTION', 20, yPos);
            yPos += 5;
            
            const descriptionData = [];
            if (quote.description) {
                descriptionData.push(['Description', quote.description]);
            }
            if (quote.special_instructions) {
                descriptionData.push(['Special Instructions', quote.special_instructions]);
            }
            
            doc.autoTable({
                startY: yPos + 3,
                body: descriptionData,
                theme: 'grid',
                styles: {
                    fontSize: 9,
                    cellPadding: 5,
                    lineColor: [220, 220, 220],
                    lineWidth: 0.5
                },
                columnStyles: {
                    0: { 
                        cellWidth: 65, 
                        fontStyle: 'bold',
                        fillColor: [240, 242, 245],
                        textColor: darkGray,
                        valign: 'top'
                    },
                    1: { 
                        cellWidth: 'auto',
                        textColor: darkGray
                    }
                },
                margin: { left: 20, right: 20 }
            });
            
            yPos = doc.lastAutoTable.finalY + 10;
        }
        
        // Terms and Conditions Box
        if (yPos > pageHeight - 60) {
            doc.addPage();
            yPos = 20;
        }
        
        // Section Divider
        doc.setDrawColor(...primaryColor);
        doc.setLineWidth(0.5);
        doc.line(20, yPos, pageWidth - 20, yPos);
        yPos += 10;
        
        // Terms box with rounded corners
        doc.setFillColor(252, 252, 253);
        doc.roundedRect(20, yPos, pageWidth - 40, 35, 2, 2, 'FD');
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.5);
        doc.roundedRect(20, yPos, pageWidth - 40, 35, 2, 2, 'S');
        
        doc.setTextColor(...primaryColor);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text('TERMS & CONDITIONS', 25, yPos + 7);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(...mediumGray);
        const terms = [
            '• This quote is valid for 30 days from the date of issue and subject to availability.',
            '• All rates are subject to change based on fuel surcharges, seasonal adjustments, and market conditions.',
            '• Customer is responsible for accurate declaration of goods, proper packaging, and compliance with all customs regulations.',
            '• Insurance coverage is optional but strongly recommended for high-value or fragile shipments.',
            '• Any additional services or special handling requirements may incur extra charges.'
        ];
        let termsY = yPos + 13;
        terms.forEach(term => {
            const splitTerm = doc.splitTextToSize(term, pageWidth - 60);
            doc.text(splitTerm, 25, termsY);
            termsY += 4 * splitTerm.length;
        });
        
        // Footer
        const footerY = pageHeight - 20;
        
        // Footer background
        doc.setFillColor(249, 250, 251);
        doc.rect(0, footerY - 8, pageWidth, 30, 'F');
        
        // Footer line
        doc.setDrawColor(...primaryColor);
        doc.setLineWidth(1);
        doc.line(20, footerY - 8, pageWidth - 20, footerY - 8);
        
        doc.setTextColor(...darkGray);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text('Thank you for choosing our logistics services!', pageWidth / 2, footerY, { align: 'center' });
        
        doc.setFontSize(7);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...mediumGray);
        doc.text('For questions or support, please contact us at support@logistics.com or call +1 234 567 8900', pageWidth / 2, footerY + 5, { align: 'center' });
        
        doc.setFontSize(7);
        doc.text(`Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} | Document ID: ${quote.id.substring(0, 8).toUpperCase()}`, pageWidth / 2, footerY + 10, { align: 'center' });
        
        // Page numbers
        doc.setFontSize(7);
        doc.text(`Page 1 of 1`, pageWidth - 25, footerY + 10);
        
        // Save the PDF
        doc.save(`Shipment_Quote_${quote.id.substring(0, 8).toUpperCase()}.pdf`);
        
        Swal.fire({
            title: t.value.success,
            text: 'PDF downloaded successfully!',
            icon: 'success',
            confirmButtonColor: '#e03e2d',
            timer: 2000
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        Swal.fire({
            title: t.value.error,
            text: 'Failed to generate PDF. Please make sure jsPDF library is loaded.',
            icon: 'error',
            confirmButtonColor: '#e03e2d'
        });
    }
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
    gap: 10px;
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

.btn-download-pdf {
    background: #10b981;
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

.btn-download-pdf:hover {
    background: #059669;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
}

.btn-download-pdf i {
    font-size: 16px;
}

.btn-edit-quote {
    background: #3b82f6;
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

.btn-edit-quote:hover {
    background: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
}

.btn-edit-quote i {
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
