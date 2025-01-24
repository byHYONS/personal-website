<script>
// import:
import { store } from '../store';
import MenuComponent from './MenuComponent.vue';


export default {
  name: 'Header',
  components: {
    MenuComponent,

  },
  data() {
    return {
      store,
      lastScrollTop: 0,
      isNavbarHidden: false,
      scrollTimeout: null,
    }
  },
  methods: {
    handleScroll() {
      const currentScrollTop = window.scrollY;

      //INFO: Movimento immediato: Mostra o nasconde la navbar
      if (currentScrollTop > this.lastScrollTop + 50 && this.isNavbarVisible) {
        this.hideNavbar(); // Nascondi la navbar scrollando verso il basso
      } else if (currentScrollTop < this.lastScrollTop - 50 && !this.isNavbarVisible) {
        this.showNavbar(); // Mostra la navbar scrollando verso l'alto
      }

      // Debounce: Aggiorna la posizione dello scroll
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }

      this.scrollTimeout = setTimeout(() => {
        this.lastScrollTop = currentScrollTop;
      }, 100);
    },

    showNavbar() {
      document.querySelector('.header-float').classList.remove('no-navbar');
      this.isNavbarVisible = true;
    },

    hideNavbar() {
      document.querySelector('.header-float').classList.add('no-navbar');
      this.isNavbarVisible = false;
    },
    initializeNavbar() {
      const currentScrollTop = window.scrollY;

      if (currentScrollTop > 100) {
        this.hideNavbar(); // Nasconde la navbar se si parte con uno scroll > 100px
      } else {
        this.showNavbar(); // Mostra la navbar se si parte con uno scroll <= 100px
      }

      this.lastScrollTop = currentScrollTop;
    },
  },

  mounted() {
    this.initializeNavbar();
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  },
};

</script>



<template>

  <header>
    <div class="header-float">
      <div class="menubar">

        <!-- logo sito -->
        <div class="logo">
          <router-link :to="{ name: 'home' }" class="link-logo">
            <svg translate="no" width="100%" height="100%" viewBox="0 0 6513 1955" version="1.1"
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"
              xmlns:serif="http://www.serif.com/"
              style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><text x="1892.04px"
                y="1532.67px"
                style="font-family:'STHeiti';font-size:833.333px;fill:#161f28;stroke:#cad0d9;stroke-width:4.17px;">PARATORE</text>
              <rect x="716.429" y="821.35" width="483.829" height="762.946"
                style="fill:#cad0d9;stroke:#fff;stroke-width:3.96px;stroke-linecap:square;stroke-miterlimit:1.5;" />
              <path
                d="M340.796,1573.52l235.675,0.033l1.017,-343.446l751.716,-356.608l0.529,-310.875l-355.087,-0.371l0.671,902.483l698.975,0.729l0.266,-300.27l-344.391,-216.105l0.196,623.992l676.816,0.425"
                style="fill:none;stroke:#161f28;stroke-width:33.33px;stroke-linecap:square;stroke-miterlimit:1.5;" />
              <text x="1959.62px" y="721.608px"
                style="font-family:'STHeiti';font-size:416.667px;fill:#161f28;">SAMUELE</text>
            </svg>
          </router-link>
        </div>

        <!-- componente per il menu -->
        <MenuComponent />
      </div>
    </div>
  </header>

</template>



<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

header {


  .header-float {
    padding: 15px 0;

    .menubar {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    position: fixed;
    top: 35px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 90%;
    height: 100px;
    border-radius: 55px;
    background-color: #f2f;
    box-shadow: 5px 5px 5px rgba(80, 80, 80, 0.3);
    color: #fff;
    opacity: .9;
    padding: 10px 45px;
    transition: transform 0.4s ease-out,
    visibility 0.4s ease-out;
    z-index: 120;

    .logo {
      display: flex;
      justify-content: start;
      width: 100%;
      height: 100%;

      .link-logo {
        padding: 0 25px;

        svg {
          margin-left: -10px;
          filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.2));
          transition: transform 0.4s ease-out, filter 0.4s ease-out;

          &:hover {
            transform: scale(1.05);
          }
        }
      }
    }

    &.header-float.no-navbar {
      transform: translateY(-150px);
      visibility: hidden;
      transition: transform 0.4s ease-out, visibility 0.4s ease-out, opacity 0.4s ease-out;
    }
  }

  #app {
    height: 100px;
  }

  ul {
    padding: 0;
  }

  a {
    text-decoration: none;
  }

  li {
    list-style-type: none;
  }

  a {
    color: $text1;

    &:hover {
      font-weight: 600;
    }
  }
}
</style>
