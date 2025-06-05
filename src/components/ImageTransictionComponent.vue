<script>

export default {
  name: 'ImagesTransiction',
  components: {

  },
  emits: ["closeModale"],  // componente figlio
  props: ["imagesTransiction", "textsTransiction", "path"],
  data() {
    return {
      currentIndex: 0,
      interval: null,
    };
  },
  methods: {
    startTransiction() {
      this.interval = setInterval(this.nextImage, 4000);
    },
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.imagesTransiction.length;
    }

  },
  mounted() {
    this.startTransiction()
  },
  beforeUnmount() {
    clearInterval(this.interval)
  }
}

</script>


<template>
  <div class="image-transiction">
    <img v-for="(image, index) in imagesTransiction" :key="index" :src="`/${path}/${image}`"
      :class="{ active: index === currentIndex }" alt="Immagini in Transizione" class="image">
  </div>
</template>


<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

.image-transiction {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    object-fit: contain;
    opacity: 0;
    transition: opacity 2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .active.image {
    opacity: 1;
  }
}
</style>
