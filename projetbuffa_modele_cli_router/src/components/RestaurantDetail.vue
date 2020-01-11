<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item full_height_max md-scrollbar">
        <div v-if="restaurant.name != null">
          <md-card>
            <md-card-header>
              <div class="md-title">Informations</div>
            </md-card-header>

            <md-card-content>

              <div class="md-display-1 color_black talign_center">{{restaurant.name}}</div>
              <br>
              <div class="md-display-0 talign_center">Situé au {{restaurant.address.building}}
                {{restaurant.address.street}}
                ,{{restaurant.address.zipcode}} {{restaurant.borough}}</div>
              <br>
              <!-- <div class="md-subheading mtop">Nom : <div class="md-headline">{{restaurant.name}}</div></div>
              <br>
              <div class="md-subheading ">Cuisine : <div class="md-headline">{{restaurant.cuisine}}</div></div>
              <br>
              <div class="md-display-1 talign_center mtop">Address</div>
              <br>
              <div class="md-subheading mtop">Building : <div class="md-headline">{{restaurant.address.building}}</div></div>
              <br>
              <div class="md-subheading ">Street : <div class="md-headline">{{restaurant.address.street}}</div></div>
              <br>
              <div class="md-subheading ">Zipcode : <div class="md-headline">{{restaurant.address.zipcode}}</div></div> -->


              <div class="md-subheading mtop ">Nom : {{restaurant.name}}</div>
              <br>
              <div class="md-subheading ">Cuisine : {{restaurant.cuisine}}</div>
              <br>
              <div class="md-display-1 talign_center mtop">Address</div>
              <br>
              <div class="md-subheading mtop ">Building : {{restaurant.address.building}}</div>
              <br>
              <div class="md-subheading ">Street : {{restaurant.address.street}}</div>
              <br>
              <div class="md-subheading ">Zipcode : {{restaurant.address.zipcode}}</div>
            </md-card-content>
          </md-card>



          <!-- <h1>Restaurant {{restaurant.name}}</h1> -->
          <!-- <h2>Situé au {{restaurant.address.building}} {{restaurant.address.street}} ,{{restaurant.address.zipcode}}
          </h2> -->

          <!-- <form v-on:submit="modifierRestaurant(id)">
            <div class="md-title">Modifier restaurant</div>
            Nom :
            <input name="name" id="name" v-model="restaurant.name" /><br>
            Cuisine:
            <input name="cuisine" id="cuisine" v-model="restaurant.cuisine" /><br>
            <p>Address</p>
            Building : <input name="building" id="building" v-model="restaurant.address.building" /><br>
            Street : <input name="street" id="street" v-model="restaurant.address.street" /><br>
            Zipcode : <input name="zipcode" id="zipcode" v-model="restaurant.address.zipcode" /><br>
            <md-button type="submit">Modifier restaurant</md-button>
          </form> -->
          <div>
            <md-table v-model="restaurant.grades" md-sort="date" md-sort-order="asc" md-card>
              <md-table-toolbar>
                <h1 class="md-title">Notes</h1>
              </md-table-toolbar>
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Date" md-sort-by="date">{{ item.date }}</md-table-cell>
                <md-table-cell md-label="Grade" md-sort-by="grade">{{ item.grade }}</md-table-cell>
                <md-table-cell md-label="Score" md-sort-by="score">{{ item.score }}</md-table-cell>
              </md-table-row>
            </md-table>
          </div>
        </div>
        <div class="container_details talign_center" v-if="restaurant.name == null">

          <md-progress-spinner :md-diameter="100" :md-stroke="10" md-mode="indeterminate" class="spinner_wait">
          </md-progress-spinner>
        </div>
      </div>
      <div class="md-layout-item">
        <md-card>

          <md-card-content class="custom_card">
            <div id="map" class="map"></div>
          </md-card-content>
        </md-card>
      </div>
    </div>
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
    data: function () {
      return {
        L: null,
        restaurant: {
          name: null,
          cuisine: null,
          address: {
            building: null,
            street: null,
            zipcode: null
          }
        },
        apiURL: "http://localhost:8081/api/restaurants",
        map: null,
        tileLayer: null,
        layers: []
      };
    },
    mounted() {
      console.log("AVANT AFFICHAGE Resto!");
      this.L = window.L;
      //console.log("On va chercher les détails du restaurant id = " + this.$route.params.id);
      this.getDataFromServer(this.$route.params.id);
      this.initMap();
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
          if (this.map != null) {
            this.map.setView([this.restaurant.address.coord[1], this.restaurant.address.coord[0]], 4);
            this.L.marker([this.restaurant.address.coord[1], this.restaurant.address.coord[0]]).addTo(this.map);
            setTimeout(this.flyto, 500);
            // this.map.flyTo([this.restaurant.address.coord[1], this.restaurant.address.coord[0]], 17, {duration: 2});
            // .setView([this.restaurant.address.coord[1], this.restaurant.address.coord[0]], 18, {animate: true, duration: 1});

          }
        } catch (err) {
          console.log("Erreur dans les fetchs GET " + err.msg);
        }
      },
      async modifierRestaurant(id) {
        // eviter le comportement par defaut
        event.preventDefault();
        console.log(id);
        let donneesFormulaire = new FormData();
        donneesFormulaire.append("nom", document.getElementById('name').value);
        donneesFormulaire.append("cuisine", document.getElementById('cuisine').value);

        try {
          let url = this.apiURL + "/" + id;
          let reponseJSON = await fetch(url, {
            method: "PUT",
            body: donneesFormulaire
          });
          let reponseJS = await reponseJSON.json();
          console.log(reponseJS.msg);

          this.restaurant.name = document.getElementById('name').value;
          this.restaurant.cuisine = document.getElementById('cuisine').value;
          this.restaurant.address.building = document.getElementById('building').value;
          this.restaurant.address.street = document.getElementById('street').value;
          this.restaurant.address.zipcode = document.getElementById('zipcode').value;

          this.getDataFromServer(id); // on rafraichit
        } catch (err) {
          console.log("Erreur dans le fetchs PUT " + err.msg);
        }

      },
      flyto() {
        this.map.flyTo([this.restaurant.address.coord[1], this.restaurant.address.coord[0]], 17, { duration: 2, easeLinearity: 0.05 });
      },
      initMap() {

        console.log("Initialisation");
        this.map = this.L.map('map');
        // .setView([43.62663234302636, 7.064208984375001], 12);

        this.tileLayer = this.L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 18,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
          }
        );
        this.tileLayer.addTo(this.map);
        this.map.on('click', (e) => {
          var pos = e.latlng;
          console.log(pos);
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .custom_card {
    padding: 0px;
  }

  .md-card {
    /* width: 85%; */
    margin: 15px;
    /* display: inline-block; */
    /* vertical-align: top; */
  }

  .container_details {
    margin-top: 35px;
    margin-bottom: 35px;
  }

  .color_black {
    color: black;
  }

  .talign_center {
    width: 100%;
    text-align: center;
  }

  .mtop {
    margin-top: 10px;
  }

  .spinner_wait {
    position: absolute;
    top: 50%;
    left: 25%;
    transform: translate(-50%, -50%);
  }
</style>