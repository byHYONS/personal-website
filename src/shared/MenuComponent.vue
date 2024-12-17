<script>

import { store } from '../store.js';

export default {
  name: 'MenuComponent',
  data() {
    return {
      store,
    }
  },
}
</script>

<template>

  <nav>
    <!--? nav bar -->
    <div class="hamb-icon">
      <div class="hamb-line hl-1"></div>
      <div class="hamb-line hl-2"></div>
      <div class="hamb-line hl-3"></div>
    </div>


    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <router-link :to="{ name: 'home' }" class="mr-15 link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'contact' }" class="link">Contact</router-link>
        </li>
      </ul>
    </div>
  </nav>

</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

nav {
  padding: 0 25px;

  .hamb-icon {
    height: 40px;
    width: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-end;
    cursor: pointer;

    &:hover .hamb-line {
      width: 100%;
      transition: cubic-bezier(0.68, -0.55, 0.265, 1.55) .5s;
    }

    .hamb-line {
      height: 4px;
      background-color: #000;
      color: #000;
      border-color: #000;
      transition: cubic-bezier(0.68, -0.55, 0.265, 1.55) .5s;

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
  }
}
</style>
