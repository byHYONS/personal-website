//? iport istanza vue:
import { createApp } from 'vue';

//? import router:
import { router } from "./router";

//? import style scss:
import './assets/scss/main.scss';

//? import bootstrap:
import * as bootstrap from 'bootstrap';

//? import typography:
import '@fontsource/ubuntu-condensed';

//? import font-awesome:
import "@fortawesome/fontawesome-free/js/all.js";

//? import App Vue:
import App from './App.vue';

//? append createApp in #app:
createApp(App)
    .use(router)
    .mount('#app');
