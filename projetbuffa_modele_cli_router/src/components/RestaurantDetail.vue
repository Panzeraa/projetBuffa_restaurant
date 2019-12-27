<template>
  <div>
    <h1>Restaurant {{restaurant.name}}</h1>
    <h2>Situé au {{restaurant.address.building}} {{restaurant.address.street}} ,{{restaurant.address.zipcode}} </h2>
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
        restaurant: {
          name: null,
          address : {
            building : null,
            street : null,
            zipcode : null
          }
        },
        nom: "",
        cuisine: "",
        apiURL: "http://localhost:8081/api/restaurants"
      };
    },
    mounted() {
      console.log("AVANT AFFICHAGE Resto!");
      //console.log("On va chercher les détails du restaurant id = " + this.$route.params.id);

      // console.log("eeee" + this.$route.params);
      this.getDataFromServer(this.$route.params.id);

    },
    methods: {
      async getDataFromServer(id) {
        // ici on fait un fetch pour récupérer le détail du restaurant
        let url = this.apiURL + "/" + id;

        try {
          let reponseJSON = await fetch(url, {
            method: "GET"
          });
          let reponseJS = await reponseJSON.json();
          this.restaurant = reponseJS.restaurant;
          console.log(reponseJS);
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
