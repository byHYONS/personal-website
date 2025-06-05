<script>
import HeaderComponent from './shared/HeaderComponent.vue';
import FooterComponent from './shared/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent,
  },
}
</script>


<template>

  <!--? HEADER -->
  <HeaderComponent />

  <!--? CONTENT -->
  <main>
    <router-view></router-view>
  </main>

  <!--? FOOTER -->
  <FooterComponent />

</template>


<style lang="scss" scoped></style>
