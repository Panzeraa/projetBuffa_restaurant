<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item full_height_max md-scrollbar">
        <md-card>
          <md-card-area md-inset v-if="restaurant.name != null">
            <md-card-media md-ratio="16:9">
              <img v-bind:src="urlRestaurant" alt="Restaurant">
            </md-card-media>
    
            <md-card-header>
              <h2 class="md-title">{{restaurant.name}}</h2>
              <h4 class="md-subhead">{{restaurant.cuisine}}</h4>
            </md-card-header>
    
            <md-card-content>
              <!-- Illy Coffee served with a complimentary Leonidas Belgian Chocolate with all beverages. -->
            </md-card-content>
          </md-card-area>
          <md-card-content >
          </md-card-content>
        </md-card>
        <md-card>
          <md-card-header>
            <div class="md-title information_detail_line">Emplacement et coordonnées</div>
          </md-card-header>
          <md-card-content class="custom_card">
            <div class="information_detail">
              <div class="information_detail_line">
                <md-icon>location_on</md-icon>
                <span> {{restaurant.address.building}}
                  {{restaurant.address.street}}
                  ,{{restaurant.address.zipcode}} {{restaurant.borough}}</span>
              </div>
              <!-- </div>
            <div> -->
              <div class="information_detail_line">
                <md-icon>phone</md-icon>
                <span> +33 4 54 78 97 54</span>
              </div>
            </div>

            <div id="map" class="map_detail"></div>
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item full_height_max md-scrollbar">
        <div v-if="restaurant.name != null">
          <!-- <md-card>

            <md-card-content>

              <div class="md-display-1 color_black talign_center">{{restaurant.name}}</div>
              <br>
              <div class="md-display-0 talign_center">Situé au {{restaurant.address.building}}
                {{restaurant.address.street}}
                ,{{restaurant.address.zipcode}} {{restaurant.borough}}</div>
              <br>

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
          </md-card> -->

          <md-card>
            <md-card-header>
              <div>
                <div style="float: right">
                  <md-button class="md-icon-button md-raised" v-on:click="showMenuList = !showMenuList">
                    <md-icon class="close_button" v-bind:class="{ close_button_menu: !showMenuList}">keyboard_arrow_up
                    </md-icon>
                  </md-button>
                </div>
                <div class="md-title">Menus</div>
                <h4 class="md-subhead">Choisissez pour votre commande</h4>

              </div>

            </md-card-header>

            <md-card-content class="content_menu" v-bind:class="{ close_content_menu: !showMenuList}"
              v-show="showMenuList">
              <div class="md-toolbar-row">
                <md-tabs class="md-secondary">
                  <md-tab id="tab-entree" md-label="Entree" v-on:click="changeMenuView(0)"></md-tab>
                  <md-tab id="tab-plat" md-label="Plat" v-on:click="changeMenuView(1)"></md-tab>
                  <md-tab id="tab-dessert" md-label="Dessert" v-on:click="changeMenuView(2)"></md-tab>
                </md-tabs>
              </div>
              <div class="center_menu">
                <div v-if="viewMenu == 0">
                  <!-- <div v-for="entree in menuTransform.entree" v-bind:key="entree.name">
                  {{entree.name}}
                </div> -->
                  <!-- <md-card v-for="entree in menuTransform.entree" v-bind:key="entree.name">
                  <md-card-media-cover md-text-scrim>
                    <md-card-media md-ratio="16:9">
                      <img alt="imageMenu" v-bind:src="entree.image">
                    </md-card-media>

                    <md-card-area>
                      <md-card-header>
                        <span class="md-title">{{entree.name}}</span>
                        <span class="md-subhead">{{entree.description}} - {{entree.prix}}</span>
                      </md-card-header>

                      <md-card-actions>
                        <md-button>Action</md-button>
                        <md-button>Action</md-button>
                      </md-card-actions>
                    </md-card-area>
                  </md-card-media-cover>
                </md-card> -->

                  <md-card class="custom_card_menu" v-for="entree in menuTransform.entree" v-bind:key="entree.name">
                    <md-card-media md-ratio="16:9">
                      <img v-bind:src="entree.image" alt="People">
                    </md-card-media>

                    <md-card-header class="custom_header_menu md-scrollbar">
                      <div class="md-title">{{entree.name | capitalize }}</div>
                      <div class="md-subhead">{{entree.description | capitalize }}</div>
                    </md-card-header>

                    <md-card-expand>
                      <md-card-actions md-alignment="space-between">
                        <div>
                          <md-button class="md-icon-button" disabled>
                            {{entree.prix}} €
                          </md-button>
                        </div>
                        <div>
                          <md-button class="md-icon-button md-raised md-primary">
                            <md-icon>add</md-icon>
                          </md-button>
                        </div>
                        <!-- <md-card-expand-trigger>
                      </md-card-expand-trigger> -->
                      </md-card-actions>


                    </md-card-expand>
                  </md-card>
                  <!-- 
                <md-card v-for="entree in menuTransform.entree" v-bind:key="entree.name">
                  <md-card-media-cover md-solid>
                    <md-card-media md-ratio="16:9">
                      <img alt="imageMenu" v-bind:src="entree.image">
                    </md-card-media>

                    <md-card-area>
                      <md-card-header>
                        <span class="md-title">{{entree.name | capitalize }}</span>
                        <span class="md-subhead">{{entree.description | capitalize }}</span>
                      </md-card-header>
                      <md-card-actions>

                        <md-button class="md-icon-button" disabled>
                          {{entree.prix}} €
                        </md-button>
                        <md-button class="md-icon-button">
                          <md-icon>add</md-icon>
                        </md-button>
                      </md-card-actions>
                    </md-card-area>
                  </md-card-media-cover>
                </md-card> -->
                </div>
                <div v-if="viewMenu == 1">
                  <!-- <md-card class="custom_card_menu" v-for="entree in menuTransform.plat" v-bind:key="entree.name">
                  <md-card-media-cover md-solid>
                    <md-card-media md-ratio="16:9">
                      <img alt="imageMenu" v-bind:src="entree.image">
                    </md-card-media>

                    <md-card-area>
                      <md-card-header>
                        <span class="md-title">{{entree.name | capitalize }}</span>
                        <span class="md-subhead">{{entree.description | capitalize }}</span>
                      </md-card-header>
                      <md-card-actions>

                        <md-button class="md-icon-button" disabled>
                          {{entree.prix}} €
                        </md-button>
                        <md-button class="md-icon-button">
                          <md-icon>add</md-icon>
                        </md-button>
                      </md-card-actions>
                    </md-card-area>
                  </md-card-media-cover>
                </md-card> -->
                  <md-card class="custom_card_menu" v-for="entree in menuTransform.plat" v-bind:key="entree.name">
                    <md-card-media md-ratio="16:9">
                      <img v-bind:src="entree.image" alt="People">
                    </md-card-media>

                    <md-card-header class="custom_header_menu md-scrollbar">
                      <div class="md-title">{{entree.name | capitalize }}</div>
                      <div class="md-subhead">{{entree.description | capitalize }}</div>
                    </md-card-header>

                    <md-card-expand>
                      <md-card-actions md-alignment="space-between">
                        <div>
                          <md-button class="md-icon-button" disabled>
                            {{entree.prix}} €
                          </md-button>
                        </div>
                        <div>
                          <md-button class="md-icon-button md-raised md-primary">
                            <md-icon>add</md-icon>
                          </md-button>
                        </div>
                        <!-- <md-card-expand-trigger>
                      </md-card-expand-trigger> -->
                      </md-card-actions>


                    </md-card-expand>
                  </md-card>
                </div>
                <div v-if="viewMenu == 2">
                  <!-- <md-card v-for="entree in menuTransform.dessert" v-bind:key="entree.name">
                  <md-card-media-cover md-solid>
                    <md-card-media md-ratio="16:9">
                      <img alt="imageMenu" v-bind:src="entree.image">
                    </md-card-media>

                    <md-card-area>
                      <md-card-header>
                        <span class="md-title">{{entree.name | capitalize }}</span>
                        <span class="md-subhead">{{entree.description | capitalize }}</span>
                      </md-card-header>
                      <md-card-actions>

                        <md-button class="md-icon-button" disabled>
                          {{entree.prix}} €
                        </md-button>
                        <md-button class="md-icon-button">
                          <md-icon>add</md-icon>
                        </md-button>
                      </md-card-actions>
                    </md-card-area>
                  </md-card-media-cover>
                </md-card> -->
                  <md-card class="custom_card_menu" v-for="entree in menuTransform.dessert" v-bind:key="entree.name">
                    <md-card-media md-ratio="16:9">
                      <img v-bind:src="entree.image" alt="People">
                    </md-card-media>

                    <md-card-header class="custom_header_menu md-scrollbar">
                      <div class="md-title">{{entree.name | capitalize }}</div>
                      <div class="md-subhead">{{entree.description | capitalize }}</div>
                    </md-card-header>

                    <md-card-expand>
                      <md-card-actions md-alignment="space-between">
                        <div>
                          <md-button class="md-icon-button" disabled>
                            {{entree.prix}} €
                          </md-button>
                        </div>
                        <div>
                          <md-button class="md-icon-button md-raised md-primary">
                            <md-icon>add</md-icon>
                          </md-button>
                        </div>
                        <!-- <md-card-expand-trigger>
                      </md-card-expand-trigger> -->
                      </md-card-actions>


                    </md-card-expand>
                  </md-card>
                </div>
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
            <!-- <md-card>
              <md-card-header>
                <div class="md-title">Note</div>
              </md-card-header>
              <md-card-content class="">
                <div class="information_detail">
  

                </div>
    
              </md-card-content>
            </md-card> -->
            <md-table v-model="restaurant.grades" md-sort="date" md-sort-order="asc" md-card>
              <md-table-toolbar>
                <h1 class="md-title">Notes</h1>
              </md-table-toolbar>
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Grade" md-sort-by="grade">
                  <div class="md-icon-button md-raised md-primary">{{ item.grade }}</div></md-table-cell>
                <md-table-cell md-label="Date" md-sort-by="date">{{ item.date }}</md-table-cell>
                <md-table-cell md-label="Score" md-sort-by="score">{{ item.score }}</md-table-cell>
              </md-table-row>
            </md-table>
          </div>
          <router-link to="/restaurants">
            <md-button class="md-icon-button md-raised previous_button">
              <md-icon>arrow_back</md-icon>
            </md-button>
            <!-- <md-button class="md-raised" style="margin-left: 7px;">Back</md-button> -->
          </router-link>
        </div>
        <div class="container_details talign_center" v-if="restaurant.name == null">

          <md-progress-spinner :md-diameter="100" :md-stroke="10" md-mode="indeterminate" class="spinner_wait">
          </md-progress-spinner>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RestaurantDetail",
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    },
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
        urlRestaurant: "",
        apiURL: "http://localhost:8081/api/restaurants",
        map: null,
        tileLayer: null,
        layers: [],
        showMenuList: true,
        viewMenu: 0,
        menuTransform: {},
        restaurantPhoto: [
          "https://www.athenaspahotel.com/media/cache/jadro_resize/rc/uJmoXtmd1563349268/jadroRoot/medias/_a1a8429.jpg",
          "https://media-cdn.tripadvisor.com/media/photo-s/0e/cc/0a/dc/restaurant-chocolat.jpg",
          "https://www.alexane-hotel-spa.com/sites/default/files/styles/mgm_1920_header/public/2019-02/mgm-restaurant-fabio21920-1080.jpg?h=eb99619b&itok=fq8z5IH7",
          "https://images.squarespace-cdn.com/content/v1/5c586a93e666691041d4827c/1553678162967-6DQ6U8E9PURCIAQB821X/ke17ZwdGBToddI8pDm48kPTrHXgsMrSIMwe6YW3w1AZ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0k5fwC0WRNFJBIXiBeNI5fKTrY37saURwPBw8fO2esROAxn-RKSrlQamlL27g22X2A/2019+-03+Restaurant+La+Palme+d%27Or+%C2%A9J.+Kelagopian+%2815%29.jpg?format=2500w",
          "https://www.cottagebise.com/photos/sliders/pages/sliderrestaurant_96_fr.jpg",
          "https://www.byblos.com/wp-content/uploads/Restaurant-Cucina-Byblos_Ambiance_Hotel-Byblos-Saint-Tropez-14-1600x1000.jpg",
          "https://u.tfstatic.com/restaurant_photos/239/306239/169/612/le-restaurant-boudoir-salle-a7e77.jpg",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2vcYw8TKpE9odJxnf4rxYZrRuTHExZX0guetwKdfznn-ToWYmEQ&s",
          "https://www.doitinparis.com/files/2019/bars-restos-food/restos-branches/05/coco/thumbs-1180x525/coco-restaurant.jpg",
          "https://cdn.hotel-terrasses-deze.com/img/restaurant-bar/terrasses-eze-restaurant-tillac-d1-w.jpg",
          "https://www.manoirdekerhuel.fr/wp-content/uploads/2018/04/salle-de-restaurant-kerhuel.jpg",
          "https://www.hotel-grandium.cz/files/hotel/dining/Winter_Garden_127.jpg",
          "https://img.freepik.com/photos-gratuite/restaurant-interieur_1127-3394.jpg?size=626&ext=jpg",
          "https://sf2.viepratique.fr/wp-content/uploads/sites/5/2016/03/rajasthan-villa-750x410.jpg",
          "https://www.alpinachamonix.com/media/cache/jadro_resize/rc/YkrOTApu1574252468/jadroRoot/medias/5b9775b6534ba/alpina-restaurant_2.jpg"

        ],
        menu: {
          entree: [
            // {
            //   name: 'avocats mayonnaise'
            //   description: ''
            // },
            // { name: 'le tartare de saint jacques' },
            // { name: 'loeuf "cocotte"' },
            // { name: 'salade césar' },
            // { name: 'salade de saumon' },
            ['avocats mayonnaise', 'avocat, mayonnaise, salade, tomate', 'https://www.fourchette-et-bikini.fr/sites/default/files/styles/full_320x256/public/8_avocats_farcis_crabe_mayonnaise.jpg?itok=5JZBv0KK', 7],
            ['le tartare de saint jacques', 'aux échalotes rôties et concombres', 'https://img-3.journaldesfemmes.fr/HqN1d0WRKGYaTXgz6iqxVrmrokE=/748x499/smart/e41e73b2fcc04fa6856cb0cc5d19605c/recipe-jdf/386682.jpg', 8],
            ['l\'oeuf "cocotte"', 'à la crème de morilles et jambon ibérique', 'https://img-3.journaldesfemmes.fr/-UyJc15xaSTjRUz3ed9q8tHwUhQ=/750x/smart/image-icu/10026294_1824786823.jpg', 9],
            ['salade césar', 'salade, blanc de volaille, sauce César, parmesan, tomate, croutons', 'https://static.cuisineaz.com/400x320/i135580-salade-cesar-allegee.jpeg', 10],
            ['salade de saumon', 'Salade verte, avocat, tomates, saumon mariné', 'https://www.adeline-cuisine.fr/wp-content/uploads/2016/08/salade-saumon-fume-avocat-tomate-oignon-ete-recette.jpg', 11]
          ],
          plat: [
            ['omelette jambon fromage', 'accompagnée d\'une salade', 'http://assets.kraftfoods.com/recipe_images/174487_STK_66616v0EC_WP.jpg', 13],
            ['confit de canard', 'accompagné de pommes de terre sarladaise', 'https://cache.marieclaire.fr/data/photo/w1000_c17/cuisine/137/confitdecanrad.jpg', 13],
            ['magret de canard', 'accompagné de pommes de terre sarladaise', 'https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Ffac.2F2018.2F07.2F30.2Fc59bd4cd-4f02-43e3-a450-360e224dfc87.2Ejpeg/748x372/quality/80/crop-from/center/magret-de-canard-aux-pommes.jpeg', 17],
            ['entrecôte', 'accompagné de frites', 'https://static.750g.com/images/1200-630/62981abcd38a437bafd35883e8aeff4d/entrecote-grillee-et-frites-maison.jpg', 17],
            ['burger périgourdin', 'tomates, steak, magret séché, mi-cuit, salade - Accompagné de frites', 'https://rians-restauration.com/sites/default/files/styles/recettes_full/public/images/recettes/burger_cabecou.png?itok=BntrRstm', 21],
            ['dos de lieu noir', 'sauce fruits de mer, accompagné de pommes de terre sarladaise', 'https://static.cuisineaz.com/400x320/i120860-filet-de-lieu-noir-au-four.jpeg', 23],
            ['assiette de foie gras mi-cuit', 'accompagné de toasts et salade', 'https://static.750g.com/images/622-auto/bc03d23d06b8a4efa83deb7f437b79f9/terrine-de-foie-gras-mi-cuit.jpg', 25],
            ['plat végétarien', 'boulgour provencal, crudité, salade, tomates', 'https://yummix.fr/wp-content/uploads/2019/06/salade-de-boulgour.jpg', 32],
            ['cassoulet périgourdin', 'perigourdin cassoulet', 'https://img.aws.la-croix.com/2015/02/20/1283108/Selon-legende-habitants-Castelnaudary-menaces-famine-Anglais-pendant-guerre-Cent-Ans-auraient-prepare-immenses-ragouts-jetant-dans-leur-marmite-tout-leur-restait_0_730_401.jpg', 38],
            ['plateau de fromages', 'emmental, conté, cantal, roquefort', 'https://www.lesmaisonsdufromage.fr/158-thickbox_default/plateau-de-fromage-10-personnes.jpg', 42],
          ],
          dessert: [
            ['coupe 1 boules chantilly', 'citron, fraise, vanille, chocolat', 'https://media.toupargel.fr/r-687x390/603-1-coupe-glacee-nougat-framboise-535.jpg', 5],
            ['coupe 2 boules chantilly', 'citron, fraise, vanille, chocolat', 'https://media.toupargel.fr/r-687x390/603-1-coupe-glacee-nougat-framboise-535.jpg', 7],
            ['fondant au chocolat', 'accompagné d\'une glace vanille, chantilly', 'https://i-reg.unimedias.fr/sites/art-de-vivre/files/styles/recipe/public/Import/coulant-fondant-chocolat_ss.jpg', 8],
            ['panna cotta', 'fruit rouge ou vanille', 'https://img-3.journaldesfemmes.fr/fXl8B4z7psj92owpGkTheVRyz_o=/750x/smart/image-icu/10027809_2115190984.jpg', 10],
            ['café gourmand', 'café, trio de vérine du jour', 'https://www.nestleprofessional.fr/sites/g/files/gfb141/f/styles/recipe/public/media/cafe_gourmand_3-3.jpg?itok=E9FYhseC', 12],
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
      this.transformMenudata();
      this.displayRestauPhoto();
    },
    methods: {
      displayRestauPhoto(){
        var i = Math.floor(Math.random() * 15);
        this.urlRestaurant = this.restaurantPhoto[i];
      },
      transformMenudata() {
        let _menu = {};
        this.menuTransform.entree = [];
        this.menuTransform.plat = [];
        this.menuTransform.dessert = [];
        this.menu.entree.forEach(element => {
          _menu = {};
          _menu.name = element[0];
          _menu.description = element[1];
          _menu.image = element[2];
          _menu.prix = element[3];
          this.menuTransform.entree.push(_menu);
        });
        this.menu.plat.forEach(element => {
          _menu = {};
          _menu.name = element[0];
          _menu.description = element[1];
          _menu.image = element[2];
          _menu.prix = element[3];
          this.menuTransform.plat.push(_menu);
        });
        this.menu.dessert.forEach(element => {
          _menu = {};
          _menu.name = element[0];
          _menu.description = element[1];
          _menu.image = element[2];
          _menu.prix = element[3];
          this.menuTransform.dessert.push(_menu);
        });
        console.log(this.menuTransform);
      },
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
    /* padding: 0px; */
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

  .custom_card_menu:hover {
    box-shadow: 0 6px 6px -3px rgba(0, 0, 0, .2), 0 10px 14px 1px rgba(0, 0, 0, .14), 0 4px 18px 3px rgba(0, 0, 0, .12);
  }

  .custom_card_menu {
    /* width: 320px; */
    width: 21vw;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
    text-align: left;
    transition: box-shadow 500ms ease;
    /* box-shadow: 0px; */
  }

  .center_menu {
    display: inline-block;
    text-align: center;
  }

  .custom_header_menu {
    height: 160px;
    max-height: 160px;
    overflow-y: scroll;
  }

  .previous_button {
    position: absolute;
    top: 60px;
    left: 15px;
  }

  .content_menu {
    transition: all 2s ease;
    /* max-height:30000px; */
    /* overflow-y: auto; */
    /* transform: scaleY(1); */
    opacity: 1;
  }

  .close_content_menu {
    /* max-height: 0px; */
    /* transform: scaleY(0);
    transform-origin: top;
    display: none; */
    /* overflow-y: hidden; */
    opacity: 0;
  }

  .close_button {
    transition: all 500ms ease;
  }

  .close_button_menu {
    -webkit-transform: rotate(-180deg);

  }

  .map_detail:hover {
    /* box-shadow: 0 6px 6px -3px rgba(0, 0, 0, .2), 0 10px 14px 1px rgba(0, 0, 0, .14), 0 4px 18px 3px rgba(0, 0, 0, .12); */
  }

  .map_detail {
    height: 400px;
    border-radius: 5px;
    border: 1px rgb(201, 201, 201) solid;
    transition: all 1s ease;
    box-shadow: 0px;
  }

  .information_detail {
    padding-left: 5px;
  }

  .information_detail_line {
    padding-bottom: 20px;
  }
</style>