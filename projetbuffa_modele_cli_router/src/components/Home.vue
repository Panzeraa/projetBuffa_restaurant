<template>
  <div>
    <div class="accueil_page">
      <h1 class="title_acc">R-explorer</h1>
      <br>
      <img class="acc_picture"
     src="../../public/R_ico.png"
     alt="Icone">
      <br>
      <h1>Bienvenue sur restaurant explorer</h1>
      <br>
      <h1>Cliquez sur <router-link to="/restaurants">RESTAURANTS</router-link> pour acceder à la liste des restaurants</h1>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    props: {
      msg: String
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title_acc {
    font-size: 50px;
  }
  .accueil_page{
    text-align: center;
  }
  .acc_picture{
    height: 50vh;
  }
</style>