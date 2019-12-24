<template>
  <!-- <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">

  </div> -->
  <div>
    <RestaurantsList />
    <Maps />
  </div>
</template>

<script>
  import Maps from './components/Maps.vue'
  import RestaurantsList from './components/RestaurantsList.vue'

  export default {
    name: 'app',
    components: {
      Maps,
      RestaurantsList
    }
  }
</script>

<style>
  /* #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  } */

  .map {
    /* position: absolute; */
    height: 50vh;
    /* top: 0; right: 0; bottom: 0; left: 0; */
    /* width: 50vw; */
    /* height: 100%; */
    /* width: 100%; */
    /* margin: -10px; */
  }
</style>
