<script>
import MenuModale from './MenuModaleComponent.vue';

export default {
  name: 'MenuComponent',
  components: {
    MenuModale,
  },
  data() {
    return {
      isMenuOpen: false,
    }
  },
  methods: {
    // comportamento apertura modale
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;

      const overlay = document.getElementById("overLay");
      const setOverlay = document.getElementById("set-overlay");

      if (this.isMenuOpen) {
        document.body.style.overflow = "hidden";
        overlay.classList.add('animated-gradient-bg');
        overlay.classList.add('visible');
        setOverlay.classList.add('set-overlay');
      } else {
        document.body.style.overflow = "auto";
        overlay.classList.remove('visible');
        setOverlay.classList.remove('set-overlay');
        setTimeout(() => {
          overlay.classList.remove('animated-gradient-bg');
        }, 500);

      }
    }

  },
};
</script>


<template>

  <nav aria-label="Navigazione principale">
    <!--? humburger icona -->
    <div class="hamb-icon" @click="toggleMenu">
      <!-- icona tre lineette per apertura -->
      <div class="hamb-line hl-1" :class="{ isHidden: isMenuOpen }"></div>
      <div class="hamb-line hl-2" :class="{ isHidden: isMenuOpen }"></div>
      <div class="hamb-line hl-3" :class="{ isHidden: isMenuOpen }"></div>
      <!-- icona due lineette per chiusura -->
      <div class="hamb-close hc-1" :class="{ isVisible: isMenuOpen }"></div>
      <div class="hamb-close hc-2" :class="{ isVisible: isMenuOpen }"></div>
    </div>
    <!-- menu modale componente-->
    <div class="modale" :class="{ modaleOn: isMenuOpen }">
      <MenuModale @closeModale="toggleMenu" />
    </div>
  </nav>

</template>


<style lang="scss" scoped>
@use '../assets/scss/partials/common' as *;
@use '../assets/scss/partials/variables' as *;

nav {

  padding-left: 20px;

  .modale {
    display: none;
    position: fixed;
    top: 155px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 90%;
    min-height: 300px;
    border-radius: 35px;
    background-color: $color_01;
    transition: opacity .7s cubic-bezier(0.25, 0.1, 0.25, 1.0);
  }

  .modaleOn {
    display: block;
    opacity: .95;
  }

  .hamb-icon {
    position: relative;
    height: 40px;
    width: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-end;
    cursor: pointer;

    &:hover .hamb-line {
      width: 100%;
    }

    .hamb-line {
      height: 3px;
      background-color: $color_02;
      color: $color_02;
      border-color: $color_02;
      transition: width .5s cubic-bezier(0.68, -0.55, 0.265, 1.55),
        opacity .9s cubic-bezier(0.25, 0.1, 0.25, 1.0);
    }

    .hl-1 {
      width: 50%;
    }

    .hl-2 {
      width: 100%;
    }

    .hl-3 {
      width: 75%;
    }

    .hamb-close {
      position: absolute;
      width: 100%;
      height: 3px;
      background-color: $color_02;
      color: $color_02;
      border-color: $color_02;
      transition: transform .5s cubic-bezier(0.25, 0.1, 0.25, 1.0),
    }

    .isHidden {
      opacity: 0;
      visibility: hidden;
    }

    .isVisible {
      opacity: 1;
      visibility: visible;
    }

    .isVisible.hc-1 {
      transform: rotate(40deg);
    }

    .isVisible.hc-2 {
      transform: rotate(-40deg);
    }
  }
}

@media screen and (max-width: 550px) {
  nav {
    .hamb-icon {
      width: 40px;
      height: 30px;
    }
  }
}
</style>
