import {createApp} from 'vue'
import {createPinia} from 'pinia'
import 'vuetify/styles' // Global CSS has to be imported
import {createVuetify} from 'vuetify'
import App from './App.vue'
import router from './router'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components, directives,
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(vuetify)
app.mount('#app')
