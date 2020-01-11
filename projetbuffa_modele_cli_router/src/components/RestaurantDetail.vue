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

          <md-card>
            <md-card-header>
              <div class="md-title">Menus</div>
            </md-card-header>

            <md-card-content>
              <div class="md-toolbar-row">
                <md-tabs class="md-scondary">
                  <md-tab id="tab-entree" md-label="Entree" v-on:click="changeMenuView(0)"></md-tab>
                  <md-tab id="tab-plat" md-label="Plat" v-on:click="changeMenuView(1)"></md-tab>
                  <md-tab id="tab-dessert" md-label="Dessert" v-on:click="changeMenuView(2)"></md-tab>
                </md-tabs>
              </div>
              <div v-if="viewMenu == 0">
                <div v-for="entree in menu.entree" v-bind:key="entree.name">
                  {{entree.name}}
                </div>
              </div>
              <div v-if="viewMenu == 1">

              </div>
              <div v-if="viewMenu == 2">

              </div>
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
          <router-link to="/restaurants">
            <md-button class="md-raised" style="margin-left: 7px;">Back</md-button>
          </router-link>
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
        layers: [],
        viewMenu: 0,
        menu: {
          entree: [
            { name: 'avocats mayonnaise' } ,
            { name: 'le tartare de saint jacques' } ,
            { name: 'loeuf "cocotte"' } ,
            { name: 'salade césar' },
            { name: 'salade de saumon' },
            // [ 'le tartare de saint jacques', 'aux échalotes rôties et concombres', 'https://img-3.journaldesfemmes.fr/HqN1d0WRKGYaTXgz6iqxVrmrokE=/748x499/smart/e41e73b2fcc04fa6856cb0cc5d19605c/recipe-jdf/386682.jpg', 8],
            // [ 'l\'oeuf "cocotte"', 'à la crème de morilles et jambon ibérique', 'https://img-3.journaldesfemmes.fr/-UyJc15xaSTjRUz3ed9q8tHwUhQ=/750x/smart/image-icu/10026294_1824786823.jpg', 9],
            // [ 'salade césar', 'salade, blanc de volaille, sauce César, parmesan, tomate, croutons', 'https://static.cuisineaz.com/400x320/i135580-salade-cesar-allegee.jpeg', 10],
            // [ 'salade de saumon', 'Salade verte, avocat, tomates, saumon mariné', 'https://www.adeline-cuisine.fr/wp-content/uploads/2016/08/salade-saumon-fume-avocat-tomate-oignon-ete-recette.jpg', 11]
          ],
          plat: [
            ['plat', 'omelette jambon fromage', 'accompagnée d\'une salade', 'http://assets.kraftfoods.com/recipe_images/174487_STK_66616v0EC_WP.jpg', 13],
            ['plat', 'confit de canard', 'accompagné de pommes de terre sarladaise', 'https://cache.marieclaire.fr/data/photo/w1000_c17/cuisine/137/confitdecanrad.jpg', 13],
            ['plat', 'magret de canard', 'accompagné de pommes de terre sarladaise', 'https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Ffac.2F2018.2F07.2F30.2Fc59bd4cd-4f02-43e3-a450-360e224dfc87.2Ejpeg/748x372/quality/80/crop-from/center/magret-de-canard-aux-pommes.jpeg', 17],
            ['plat', 'entrecôte', 'accompagné de frites', 'https://static.750g.com/images/1200-630/62981abcd38a437bafd35883e8aeff4d/entrecote-grillee-et-frites-maison.jpg', 17],
            ['plat', 'burger périgourdin', 'tomates, steak, magret séché, mi-cuit, salade - Accompagné de frites', 'https://rians-restauration.com/sites/default/files/styles/recettes_full/public/images/recettes/burger_cabecou.png?itok=BntrRstm', 21],
            ['plat', 'dos de lieu noir', 'sauce fruits de mer, accompagné de pommes de terre sarladaise', 'https://static.cuisineaz.com/400x320/i120860-filet-de-lieu-noir-au-four.jpeg', 23],
            ['plat', 'assiette de foie gras mi-cuit', 'accompagné de toasts et salade', 'https://static.750g.com/images/622-auto/bc03d23d06b8a4efa83deb7f437b79f9/terrine-de-foie-gras-mi-cuit.jpg', 25],
            ['plat', 'plat végétarien', 'boulgour provencal, crudité, salade, tomates', 'https://yummix.fr/wp-content/uploads/2019/06/salade-de-boulgour.jpg', 32],
            ['plat', 'cassoulet périgourdin', 'perigourdin cassoulet', 'https://img.aws.la-croix.com/2015/02/20/1283108/Selon-legende-habitants-Castelnaudary-menaces-famine-Anglais-pendant-guerre-Cent-Ans-auraient-prepare-immenses-ragouts-jetant-dans-leur-marmite-tout-leur-restait_0_730_401.jpg', 38],
            ['plat', 'plateau de fromages', 'emmental, conté, cantal, roquefort', 'https://www.lesmaisonsdufromage.fr/158-thickbox_default/plateau-de-fromage-10-personnes.jpg', 42],
          ],
          dessert: [
            ['dessert', 'coupe 1 boules chantilly', 'citron, fraise, vanille, chocolat', 'https://media.toupargel.fr/r-687x390/603-1-coupe-glacee-nougat-framboise-535.jpg', 5],
            ['dessert', 'coupe 2 boules chantilly\',\'citron, fraise, vanille, chocolat', 'https://media.toupargel.fr/r-687x390/603-1-coupe-glacee-nougat-framboise-535.jpg', '', 7],
            ['dessert', 'fondant au chocolat', 'accompagné d\'une glace vanille, chantilly', 'https://i-reg.unimedias.fr/sites/art-de-vivre/files/styles/recipe/public/Import/coulant-fondant-chocolat_ss.jpg', 8],
            ['dessert', 'panna cotta', 'fruit rouge ou vanille', 'https://img-3.journaldesfemmes.fr/fXl8B4z7psj92owpGkTheVRyz_o=/750x/smart/image-icu/10027809_2115190984.jpg', 10],
            ['dessert', 'café gourmand', 'café, trio de vérine du jour', 'https://www.nestleprofessional.fr/sites/g/files/gfb141/f/styles/recipe/public/media/cafe_gourmand_3-3.jpg?itok=E9FYhseC', 12],
          ]
        }
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
      changeMenuView(i) {
        this.viewMenu = i;
      },
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