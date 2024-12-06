//? importiamo il router:
import { createRouter, createWebHistory } from "vue-router";

//? importiamo le pagine del progetto:
import HomePage from './pages/HomePage.vue';
import ContactPage from './pages/ContactPage.vue';

//? creiamo rotte:
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/contact",
      name: "contact",
      component: ContactPage,
    },
    // {
    //   path: "/Name/:slug", //? rotta parametrica per il detteglio
    //   name: "detail",
    //   component: NomeDetail,
    // },
  ],
});
export { router };