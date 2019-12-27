<template>
<div>
  <h1>Restaurant n° {{id}}</h1>
  <form>
    <input><br>
    <input><br>
    <input type="submit" value="Modifier">
  </form>
  <H1>DONNEES DU RESTO {{id}}</H1>
  {{restaurants}}
  <!--
  <md-table v-model="restaurants">

    <md-table-row slot="md-table-row" slot-scope="{ item }">
      <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
      <md-table-cell md-label="Cuisine" md-sort-by="cuisine">{{ item.cuisine }}</md-table-cell>
    </md-table-row>
  </md-table>
  -->


  </div>
</template>

<script>
export default {
  name: "RestaurantDetail",
  props: {},
  computed: { // computed data, permet de définir des data "calculées"
    id() {
        // on y accèdera par {{id}} dans le template, et par this.id
        // dans le code
      return this.$route.params.id
    }
  },
  data: function() {
    return {
      restaurants: [],
      nom: "",
      cuisine: "",
      apiURL: "http://localhost:8081/api/restaurants/"
    };
  },
  mounted() {
    console.log("AVANT AFFICHAGE !");
    console.log("On va chercher les détails du restaurant id = " + this.$route.params.id);
    console.log("ID = " + this.id);
    console.log(this.$route.params);
  },
  methods: {
    async getDataFromServer() {
      // ici on fait un fetch pour récupérer le détail du restaurant
      let url =
              this.apiURL +
              this.$route.params.id;
      console.log(url);

      try {
        let reponseJSON = await fetch(url, {
          method: "GET"
        });
        let reponseJS = await reponseJSON.json();
        this.restaurants = reponseJS.data;
      } catch (err) {
        console.log("Erreur dans les fetchs GET " + err.msg);
      }
    },
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
