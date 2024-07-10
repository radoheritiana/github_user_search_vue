import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import VueAwesomePaginate from 'vue-awesome-paginate'

// import the necessary css file

import 'vue-awesome-paginate/dist/style.css'

const app = createApp(App)

app.use(VueAwesomePaginate)

app.mount('#app')
