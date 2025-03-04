<script>
// import:
import { store } from './store.js';
import HeaderComponent from './shared/HeaderComponent.vue';
import FooterComponent from './shared/FooterComponent.vue';

export default {
  nome: 'App',
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      store,
    }
  },
}

</script>



<template>

  <!--? HEADER -->
  <HeaderComponent />

  <!--? CONTENT -->
  <router-view></router-view>
  <!--? FOOTER -->

  <FooterComponent />


</template>


<style lang="scss" scoped></style>
