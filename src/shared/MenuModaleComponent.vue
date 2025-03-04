<script>
import { store } from '../store.js';
import menuLabel from '../../public/data/appLabels.json';

export default {
  name: 'MenuModale',
  emits: ["closeModale"],
  data() {
    return {
      store,
      menuLabel,
    };
  },
  methods: {
    closeMenu() {
      this.$emit('closeModale');
    },
  },
};
</script>


<template>

  <div class="menu-modale">
    <div class="top-menu">
      <ul>
        <li @click="closeMenu" v-for="(menu, index) in menuLabel.menus" :kay="index">
          <router-link class="hover-ball" :to="{ name: `${menu.toLowerCase()}` }"> {{ menu }} </router-link>
        </li>
      </ul>
    </div>
    <hr>
    <div class="sub-menu">
      <div class="social-icon"></div>
      <div class="policy">
        <ul>
          <li v-for="(policy, index) in menuLabel.policies" :key="index" @click="closeMenu">
            <a class="hover-link" :href="policy.link" target="_blank" rel="noopener noreferrer" translate="no"> {{
              policy.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>


<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

.menu-modale {
  color: #fff;
  padding: 25px 45px;

  .top-menu {
    min-height: 250px;

    .policy {

      ul {

        li {

          a.link {
            color: white;
            padding-top: 10px;

          }
        }
      }
    }

  }

  .sub-menu {
    height: 50px;
    display: flex;
    justify-content: space-between;

    ul {

      li {
        display: inline-block;
        padding-right: 15px;
        cursor: pointer;
      }
    }

  }
}
</style>
