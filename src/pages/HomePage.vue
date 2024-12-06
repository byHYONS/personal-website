<script>

import { store } from '../store';



export default {
   nome: 'Home',
   props: {

   },
   data(){
      return{
        store,

      }
   },
   components: {
    
   }
}

</script>



<template>
  
  <h1 class="ta-center mt-20"> {{ store.text }}</h1>
  <div class="container">
        <img src="../../public/favicon/byh.svg" alt="logo">
    </div>

</template>



<style lang="scss" scoped>




</style>