import { createApp } from 'vue'
import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login'
import clientSecret from '../client_secret_532089225272-1im33klerc0hmvspgo6mh08aobithavt.apps.googleusercontent.com.json'

const app = createApp(App)
app.use(vue3GoogleLogin, {
    clientId: clientSecret.WLc.client_id,
    scope: 'https://www.googleapis.com/auth/drive'
})
app.mount('#app')
