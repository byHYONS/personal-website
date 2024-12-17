<script>
// import:
import HeaderComponent from './shared/HeaderComponent.vue';
import FooterComponent from './shared/FooterComponent.vue';



export default {
  nome: 'App',
  components: {
    HeaderComponent,
    FooterComponent,
  }
}

</script>



<template>

  <!--? HEADER -->
  <HeaderComponent />

  <!--? CONTENT -->
  <div class="topbar">
    <router-view></router-view>
  </div>

  <!--? FOOTER -->
  <FooterComponent />


</template>


<style lang="scss" scoped>
.topbar {
  margin-top: 150px;
}
</style>
