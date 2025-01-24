<script>
// import:
import { store } from '../store.js';
import footerLabel from '../../public/data/appLabels.json';

export default {
  nome: 'Footer',
  data() {
    return {
      store,
      footerLabel,
    }
  },
}

</script>



<template>

  <footer>
    <div class="container">
      <div class="row">
        <div class="col col-xl-3 col-md-6 col-12">
          <div class="logo-byhyons">
            <router-link :to="{ name: 'home' }" class="navbar-brand d-flex align-items-center">
              <div class="logo_byhyons mt-5">
                <!--? SVG -->
                <img src="/public/favicon/samuele-paratore-solo-logo.svg" alt="Samuele Paratore solo logo">
              </div>
            </router-link>
            <!-- ? IINTESTAZIONE DITTA -->
            <div class="credits">
              <p class="mt-3"> <span class="headline">di Samuele Paratore</span> <br>
                Varese • ITALY <br>
                <small>PI 03654740129 • REA VA 372696</small>
              </p>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6 col-12 align">
          <p class="mt-5"> <span class="headline">Menu di Navigazione:</span> </p>
          <ul class="">
            <li class="nav-item" v-for="(menu, index) in footerLabel.menus" :key="index">
              <router-link class="hover-link" :to="{ name: `${menu.toLowerCase()}` }"> {{ menu }} </router-link>
            </li>
          </ul>

        </div>
        <div class="col-xl-3 col-md-6 col-12 align">
          <p class="mt-5"> <span class="headline">Autenticazione:</span> </p>

        </div>
        <div class="col-xl-3 col-md-6 col-12 align">
          <p class="mt-5"> <span class="headline">Saguimi Su:</span> </p>
          <div v-for="(social, index) in footerLabel.socialIcons" key="index">
            <div class="logo-social" :class="social.class">
              <a :href="social.url" target="_blank" rel="noopener noreferrer">
                <img :src="social.image" :alt="`Social: ${social.name}`">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>

</template>



<style lang="scss" scoped>
// import
@use '../assets/scss/partials/variables' as *;


footer {
  background-color: $footer;
  min-height: 550px;

  ul {
    padding: 0;
  }

  

  img {
    width: 150px;
    margin-left: -10px;
    filter: drop-shadow(5px 5px 5px rgba(86, 83, 83, 0.2));
    transition: .3s;

    &:hover {
      transform: scale(1.05);
    }
  }

  .headline {
    font-weight: 600;
    font-size: 18PX;
  }

  .footer-link,
  a {
    padding: 0;
    font-size: 18px;
  }

  .align {
    margin-top: 30px;
  }

  p {
    font-size: 15px;
    color: $text2;
  }

  .logo-social {
    transition: .3s;

    img {
      filter: invert(100);
    }

    &:hover {
      transform: scale(1.05);
    }
  }

  .instagram {
    width: 170px;
  }

  .github {
    width: 150px;
    margin-top: 10px;
  }
}

/* @media (max-width: 1200px) {

  footer {
    .container {
      .row {
        padding: 30px;

        .col-12 {
          text-align: center;
          margin-bottom: 50px;

          .logo-social {
            width: 30%;
            margin: 0 auto;
          }
        }
      }

    }
  }

}

@media (max-width: 767px) {

  footer {
    .container {
      .row {
        .col-12 {
          margin-top: 50px;
          text-align: center;
          margin-bottom: 80px;

          .logo-social {
            width: 30%;
            margin: 0 auto;
          }
        }
      }

    }
  }

} */
</style>
