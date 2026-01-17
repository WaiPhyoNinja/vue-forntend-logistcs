import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './Router/router.js'
import { initGA, registerRouterTracking } from './services/analytics.js'

// Initialize GA4 and track route changes
initGA()
registerRouterTracking(router)

createApp(App).use(router).mount('#app')
