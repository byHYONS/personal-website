<script>

import { store } from '../store';
import CanvasBHY from '../components/CanvasComponent.vue';


export default {
  nome: 'Home',
  props: {

  },
  components: {
    CanvasBHY,

  },
  data() {
    return {
      store,

    }
  },
}

</script>



<template>
  <h1 class="ta-center mt-20"> {{ store.text }}</h1>
  <div class="container-sm">
    <img src="../../public/favicon/byh.svg" alt="logo">
  </div>

</template>



<style lang="scss" scoped></style>
