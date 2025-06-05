<script>
import { Carousel, Navigation, Slide } from 'vue3-carousel';

export default {
  name: 'Carousel',
  components: {
    Carousel,
    Navigation,
    Slide,
  },
  emits: ["closeModale"],  // componente figlio
  props: ["imagesCarousel", "textsCarousel", "path"],
  data() {
    return {
      settings: {
        snapAlign: "left",
      },
    };
  },
  methods: {

  },
  mounted() {

  },
}

</script>


<template>
  <div class="carousel">
    <Carousel :item-to-show="3" v-bind="settings" :wrap-around="true">
      <Slide v-for="(image, index) in imagesCarousel" key="index">
        <div class="carousel-item">
          <div class="carousel-image">
            <img :src="`/${path}/${image}`" alt="Immagini Carosello" class="image-fluid">
          </div>
          <div class="carousel-info">
            <h3> {{ textsCarousel[index % textsCarousel.length] }} </h3>
          </div>
        </div>
      </Slide>
      <template #addons>
        <Navigation>
          <template #next>
            <button class="carousel__next">
              <i class="fas fa-arrow-right-long"></i>
            </button>
          </template>
          <template #prev>
            <button class="carousel__prev">
              <i class="fas fa-arrow-left-long"></i>
            </button>
          </template>
        </Navigation>
      </template>
    </Carousel>
  </div>
</template>


<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

.carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;

  .carousel-item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 20px;
  }

  .carousel-info {
    text-align: left;
    color: color_08;
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 6px;
  }

  .carousel-image {
    width: 100%;
    height: auto;
    object-fit: contain;
    overflow: hidden;
    border-radius: 20px;
  }

  .carousel__next {
    position: absolute;
    top: -190px;
    left: -20px;
    font-size: 18px;
    padding: 5px;
    background-color: green;
    border-radius: 50%;
    color: $color_02;
  }

  .carousel__prev {
    position: absolute;
    top: -190px;
    left: 450px;
    font-size: 18px;
    padding: 5px;
    background-color: green;
    border-radius: 50%;
    color: $color_02;
  }

}
</style>
