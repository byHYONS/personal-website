<script>
// import:
import { store } from '../store';


export default {
   nome: 'Header',
   data(){
      return{
        store,
        scroll: false,

      }
   },
  methods: {
    topHeader(){
      this.scroll = window.scrollY > 100
      if (this.scroll) {
      document.querySelector('nav').className = 'float';
      }
      else {
        document .querySelector('nav').className = 'navbar navbar-expand-md navbar-light bg-white shadow-sm';
      }
    }
  },
  mounted(){
    window.addEventListener("scroll", this.topHeader)
  },
  beforeDestroy() {
    window.remuveEventListener("scroll", this.topHeader)
  },
}

</script>



<template>
  
  <header>    
    <nav  class="no-float">
            <div class="container">
                  <router-link :to="{name: 'home'}" class="navbar-brand d-flex align-items-center">
                    <div class="logo_byhyons">
                      <svg  translate="no" width="100%" height="100%" viewBox="0 0 6513 1955" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><text x="1892.04px" y="1532.67px" style="font-family:'STHeiti';font-size:833.333px;fill:#161f28;stroke:#cad0d9;stroke-width:4.17px;">PARATORE</text><rect x="716.429" y="821.35" width="483.829" height="762.946" style="fill:#cad0d9;stroke:#fff;stroke-width:3.96px;stroke-linecap:square;stroke-miterlimit:1.5;"/><path d="M340.796,1573.52l235.675,0.033l1.017,-343.446l751.716,-356.608l0.529,-310.875l-355.087,-0.371l0.671,902.483l698.975,0.729l0.266,-300.27l-344.391,-216.105l0.196,623.992l676.816,0.425" style="fill:none;stroke:#161f28;stroke-width:33.33px;stroke-linecap:square;stroke-miterlimit:1.5;"/><text x="1959.62px" y="721.608px" style="font-family:'STHeiti';font-size:416.667px;fill:#161f28;">SAMUELE</text></svg>
                    </div>
                  </router-link>
                <!--? nav bar -->
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <router-link :to="{name: 'home'}" class="mr-15 link">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{name: 'contact'}" class="link">Contact</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
  </header>

</template>



<style lang="scss" scoped>
// import
@use '../assets/scss/partials/variables' as *;

header {
  position: sticky;
  top: 0;

  .float {
  position: fixed;
  top: 35px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  margin: 5px auto;
  border-radius: 55px;
  background-color: #fff;
  box-shadow: 5px 5px 5px rgba(80, 80, 80, 0.3);
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  padding: 15px 45px;
  transition:
    opacity 0.5s ease-in-out,
    visibility 0.5s ease-in-out;
  }
  .no-float{
  transition:
    opacity 0.5s ease-in-out,
    visibility 0.5s ease-in-out;

  }
  
  #app {
    height: 100px;
  }

    ul {padding: 0;}
    a {text-decoration: none;}
    li {list-style-type: none;}

    svg {
      margin-left: -10px; 
      filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.2));
      transition: .3s;
      &:hover {transform: scale(1.05);}}

    a {
      color: $text1;
        &:hover {           
            font-weight: 600;
        }
    }
}




</style>
