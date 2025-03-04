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

      if (currentScrollTop > 250) {
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
            <img class="img" src="/public/favicon/samuele-paratore-logo.svg" alt="Logo Samuele Paratore">
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
    border-radius: 35px;
    background-color: $color_01;
    box-shadow: 3px 3px 5px rgba(80, 80, 80, 0.1);
    color: $color_02;
    opacity: .9;
    padding: 10px 45px;
    transition: transform 0.4s ease-out,
    visibility 0.4s ease-out;
    z-index: 120;

    .logo {
      display: flex;
      justify-content: start;
      width: 100%;
      height: 75px;

      .link-logo {
        padding: 0 25px;
        width: 100%;
        height: 100%;

        img.img {
          height: 100%;
          width: auto;
          object-fit: contain;
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
    color: color_02;

    &:hover {
      font-weight: 600;
    }
  }
}

@media (max-width: 450px) {
  header {
    .header-float {
      .logo {
        .link-logo {
          padding: 0;
        }
      }
    }
  }

}
</style>
