<script>
import footerLabel from '../../public/data/appLabels.json';

export default {
  nome: 'Footer',
  data() {
    return {
      footerLabel,
    }
  },
}

</script>


<template>

  <footer>
    <div class="container">
      <div class="row text-lg-start text-md-center text-sm-center text-center justify-content-center py-100">
        <div class="col-lg-3 col-md-4 col-sm-6 col-12  w-md-auto my-5 text-md-start text-center">
          <img src="/public/favicon/samuele-paratore-solo-logo.svg" alt="Samuele Paratore solo logo">
          <small class="legacy d-block mt-3 mx-auto mx-md-0 col-6 col-sm-7 col-md-8">
            All rights reserved and trademarks registered.
            The reproduction of any material contained within this website is strictly prohibited.
          </small>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 col-12 my-5">
          <p class=""> <span class="headline">Informazioni:</span> </p>
          <p translate="no" class="mt-3">
            <span class="fw-normal fs-5">geom. Samuele Paratore</span> <br>
            Varese • ITALY <br>
            info@samueleparatore.com <br>
            <small>PI 03654740129 • REA VA 372696</small>
          </p>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 col-12 my-5">
          <p class=""> <span class="headline">Menu di Navigazione:</span> </p>
          <ul class="">
            <li class="nav-item" v-for="(menu, index) in footerLabel.menus" :key="index">
              <router-link class="hover-link" :to="{ name: `${menu.toLowerCase()}` }"> {{ menu }} </router-link>
            </li>
          </ul>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 col-12 my-5">
          <p class=""> <span class="headline">Saguimi Su:</span> </p>
          <div class="d-flex flex-wrap justify-content-center  justify-content-lg-start gap-3"
            v-for="(social, index) in footerLabel.socialIcons" key="index">
            <div class="logo-social" :class="social.class">
              <a :href="social.url" target="_blank" rel="noopener noreferrer">
                <img :src="social.image" :alt="`Social: ${social.name}`">
              </a>
            </div>
          </div>
        </div>
        <!-- Socket -->
        <div class="col-lg-12 my-5 socket">
          <hr>
          <p translate="no" class="mt-35 copyright">All Rights Reserved • byHYONS™ • © 2025</p>
        </div>
      </div>
    </div>
  </footer>

</template>


<style lang="scss" scoped>
// import
@use '../assets/scss/partials/variables' as *;

footer {
  background-color: $color_01;
  min-height: 550px;

  ul {
    padding: 0;
  }

  .copyright {
    color: $color_07;
    font-weight: 100;
  }

  img {
    width: 150px;
    margin-left: -8px;
    filter: drop-shadow(5px 5px 5px rgba(86, 83, 83, 0.2));
    transition: .3s;

    &:hover {
      transform: scale(1.05);
    }
  }

  small.legacy {
    align-self: center;
    color: $color_07;
    font-size: 9px;
    font-style: italic;
    font-weight: 100;
    opacity: .8;
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
    color: $color_02;
  }

  .logo-social {
    transition: .3s;

    img {
      margin-left: 0;
      filter: invert(100);
    }

    &:hover {
      transform: scale(1.05);
    }
  }

  .instagram {
    width: 130px;
  }

  .github {
    width: 130px;
    margin-top: 10px;
  }

  .linkedin {
    width: 130px;
    margin-top: 15px;
  }

  .socket {
    hr {
      border: none;
      height: 1.5px;
      background: $gradient_03;
      margin: 20px 0;
    }
  }
}
</style>
