<template>
    <div>
        <div class="md-layout full_height">

            <div class="md-layout-item">
                <md-card>
                    <md-card-header>
                        <div class="md-title">Recherche par adresse</div>
                    </md-card-header>

                    <md-card-content>
                        <form>
                            <md-field md-clearable>
                                <label for="adresse_search">Adresse</label>
                                <md-input name="adresse_search" id="adresse_search" v-model="adresse_search"
                                    v-on:keyup="delaySearchAddress()" v-on:keyup.enter="chercherInstant()"/>
                                <span class="md-helper-text">Tout les éléments sont séparés par des espaces</span>
                            </md-field>

                        </form>
                        <!-- lat : {{latAdd}}, lon : {{lonAdd}} -->
                    </md-card-content>
                    <!-- <md-card-actions>
                        <md-button type="submit" class="md-primary">Chercher</md-button>
                    </md-card-actions> -->
                </md-card>
                <md-card>
                    <md-card-header>
                        <div class="md-title">Informations</div>
                    </md-card-header>

                    <md-card-content>
                        <!-- <form> -->
                            <div class="md-layout md-gutter">
                                <div class="md-layout-item md-small-size-100">
                                    <md-field md-clearable>
                                        <label for="restaurant_name">Name</label>
                                        <md-input name="restaurant_name" id="restaurant_name"
                                            v-model="restaurantAdd.name" />
                                    </md-field>
                                </div>

                                <div class="md-layout-item md-small-size-100">
                                    <md-field md-clearable>
                                        <label for="restaurant_cuisine">Cuisine</label>
                                        <md-input name="restaurant_cuisine" id="restaurant_cuisine"
                                            v-model="restaurantAdd.cuisine" />
                                    </md-field>
                                </div>
                            </div>
                            <div class="md-layout md-gutter">
                                <div class="md-layout-item md-small-size-100">
                                    <md-field md-clearable>
                                        <label for="restaurant_building">Numero</label>
                                        <md-input name="restaurant_building" id="restaurant_building"
                                            v-model="restaurantAdd.address.building" />
                                    </md-field>
                                </div>

                                <div class="md-layout-item md-small-size-100">
                                    <md-field md-clearable>
                                        <label for="restaurant_street">Adresse</label>
                                        <md-input name="restaurant_street" id="restaurant_street"
                                            v-model="restaurantAdd.address.street" />
                                    </md-field>
                                </div>
                                <div class="md-layout-item md-small-size-100">
                                    <md-field md-clearable>
                                        <label for="restaurant_zipcode">Code postale</label>
                                        <md-input name="restaurant_zipcode" id="restaurant_zipcode"
                                            v-model="restaurantAdd.address.zipcode" />
                                    </md-field>
                                </div>
                                <div class="md-layout-item md-small-size-100">
                                    <md-field md-clearable>
                                        <label for="restaurant_borough">Ville</label>
                                        <md-input name="restaurant_borough" id="restaurant_borough"
                                            v-model="restaurantAdd.borough" v-on:keyup="delaySearch()" />
                                    </md-field>
                                </div>
                            </div>
                            <div class="md-layout md-gutter">
                                <div class="md-layout-item md-small-size-100">
                                    <md-field>
                                        <label for="restaurant_latitude">Latitude</label>
                                        <md-input disabled name="restaurant_latitude" id="restaurant_latitude"
                                            v-model="restaurantAdd.address.lat" />
                                    </md-field>
                                </div>

                                <div class="md-layout-item md-small-size-100">
                                    <md-field>
                                        <label for="restaurant_longitudee">Longitude</label>
                                        <md-input disabled name="restaurant_longitudee" id="restaurant_longitudee"
                                            v-model="restaurantAdd.address.lon" />
                                    </md-field>
                                </div>
                            </div>
                        <!-- </form> -->
                        <!-- lat : {{latAdd}}, lon : {{lonAdd}} -->
                    </md-card-content>
                    <md-card-actions>
                        <md-button v-on:click="ajouterRestaurant()">Ajouter</md-button>
                        <md-button v-on:click="changervue()">Change vue</md-button>
                    </md-card-actions>
                </md-card>
            </div>
            <div class="md-layout-item">
                <!-- Maps -->
                <md-card>

                    <md-card-content class="custom_card">
                        <div id="mapAdd" class="mapAdd"></div>
                    </md-card-content>
                </md-card>
            </div>
        </div>
        <md-snackbar :md-duration="2000" :md-active.sync="showSnackbar" md-persistent>
            <span>Aucune réponse</span>
            <md-button class="md-accent" @click="showSnackbar = false">Fermer</md-button>
        </md-snackbar>
        <!-- <md-snackbar :md-duration="2000" :md-active.sync="showSnackbarChamps" md-persistent>
            <span>Veuillez remplir touts les champs</span>
            <md-button class="md-accent" @click="showSnackbar = false">Fermer</md-button>
        </md-snackbar> -->
    </div>
</template>

<script>
    export default {
        name: "RestaurantAdd",
        props: ['showList'],
        computed: { // computed data, permet de définir des data "calculées"
            //   id() {
            //     // on y accèdera par {{id}} dans le template, et par this.id
            //     // dans le code
            //     return this.$route.params.id
            //   }
        },
        data: function () {
            return {
                showSnackbar: false,

                L: null,
                adresse_search: null,
                restaurantAdd: {
                    name: null,
                    cuisine: null,
                    borough: null,
                    address: {
                        building: null,
                        street: null,
                        zipcode: null,
                        lat: null,
                        lon: null
                    }
                },
                apiURLNominatimSearch: "https://nominatim.openstreetmap.org/search?q=",
                apiURLNominatim: "https://nominatim.openstreetmap.org/reverse?format=jsonv2&",
                apiURL: "http://localhost:8081/api/restaurants",
                timerSearch: null,
                timerSearchAddress: null,
                mapAdd: null,
                markerClick: null,
                tileLayer: null,
                layers: [],
                form: {
                    name: null,
                    cuisine: null
                }
            };
        },
        mounted() {
            console.log("AVANT AFFICHAGE Restoadd!");
            this.L = window.L;
            //   //console.log("On va chercher les détails du restaurant id = " + this.$route.params.id);
            //   this.getDataFromServer(this.$route.params.id);
            this.initMap();
            console.log("showList: " +this.$parent.showList);
            console.log("idResto: " +this.$parent.idResto);
        },
        methods: {
            initMap() {

                console.log("Initialisation");
                this.mapAdd = this.L.map('mapAdd', {
                    zoom: 3,
                    center: [48.05684251746642, 10.755572501960595]
                });
                // .setView([43.62663234302636, 7.064208984375001], 12);

                this.tileLayer = this.L.tileLayer(
                    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    {
                        maxZoom: 18,
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
                    }
                );
                this.tileLayer.addTo(this.mapAdd);
                this.mapAdd.on('click', (e) => {
                    var pos = e.latlng;
                    this.displayMarker(e.latlng);
                    this.getAdressefromLatLng(e.latlng);
                    console.log(pos);
                });
            },
            displayMarker(latlng) {
                if (this.mapAdd != null) {
                    if (this.markerClick != null) {
                        this.mapAdd.removeLayer(this.markerClick);
                    }
                    // this.map.setView([this.restaurant.address.coord[1], this.restaurant.address.coord[0]], 4);
                    this.markerClick = this.L.marker(latlng);
                    this.markerClick.addTo(this.mapAdd);
                    this.mapAdd.panTo(latlng);
                    this.restaurantAdd.address.lat = latlng.lat;
                    this.restaurantAdd.address.lon = latlng.lng;
                }
            },
            flyto() {
                this.mapAdd.flyTo([this.restaurant.address.coord[1], this.restaurant.address.coord[0]], 17, { duration: 2, easeLinearity: 0.05 });
            },
            async getAdressefromLatLng(latlng) {
                //this.restaurants.splice(index, 1);
                try {
                    let url = this.apiURLNominatim + "lat=" + latlng.lat + "&lon=" + latlng.lng;
                    let reponseJSON = await fetch(url, {
                        method: "GET"
                    });
                    let reponseJS = await reponseJSON.json();
                    this.restaurantAdd.address.zipcode = reponseJS.address.postcode;

                    this.restaurantAdd.address.building = reponseJS.address.house_number;

                    if (reponseJS.address.city != null)
                        this.restaurantAdd.borough = reponseJS.address.city;
                    else if (reponseJS.address.town != null)
                        this.restaurantAdd.borough = reponseJS.address.town;

                    if (reponseJS.address.road != null)
                        this.restaurantAdd.address.street = reponseJS.address.road;
                    else if (reponseJS.address.pedestrian != null)
                        this.restaurantAdd.address.street = reponseJS.address.pedestrian;

                    if (reponseJS.address.restaurant != null)
                        this.restaurantAdd.name = reponseJS.address.restaurant;
                    console.log(reponseJS);
                } catch (err) {
                    console.log("Erreur dans le fetchs get Nominatim " + err.msg);
                }
            },
            delaySearch() {
                clearTimeout(this.timerSearch);
                this.timerSearch = setTimeout(this.searchVille, 1000);
            },
            delaySearchAddress() {
                clearTimeout(this.timerSearchAddress);
                this.timerSearchAddress = setTimeout(this.searchInfoAddress, 1000);
            },
            chercherInstant(){
                clearTimeout(this.timerSearchAddress);
                this.searchInfoAddress();
            },
            async searchVille() {
                console.log("recherche en cours");
                // &format=json
                try {
                    let url = this.apiURLNominatimSearch + this.restaurantAdd.borough + "&format=json";
                    let reponseJSON = await fetch(url, {
                        method: "GET"
                    });
                    let reponseJS = await reponseJSON.json();
                    if (reponseJS.length > 0) {
                        console.log(reponseJS[0].boundingbox);
                        var corner1 = this.L.latLng(reponseJS[0].boundingbox[0], reponseJS[0].boundingbox[2]),
                            corner2 = this.L.latLng(reponseJS[0].boundingbox[1], reponseJS[0].boundingbox[3]);
                        this.mapAdd.fitBounds([corner1, corner2]);
                    }
                    console.log(reponseJS);
                } catch (err) {
                    console.log("Erreur dans le fetchs get Nominatim " + err.msg);
                }
                console.log("Ville recherché");
            },
            async searchInfoAddress() {
                console.log("recherche en cours");
                // &format=json
                try {
                    var elements = this.adresse_search.split(' ');
                    let url = this.apiURLNominatimSearch;
                    console.log(elements);
                    for (var i = 0; i < elements.length; i++) {
                        url += elements[i];
                        if (i < elements.length - 1)
                            url += "+"
                    }
                    url += "&format=json&addressdetails=1";
                    // console.log(url);
                    let reponseJSON = await fetch(url, {
                        method: "GET"
                    });
                    let reponseJS = await reponseJSON.json();
                    if (reponseJS.length > 0) {
                        // console.log(reponseJS[0].boundingbox);
                        var corner1 = this.L.latLng(reponseJS[0].boundingbox[0], reponseJS[0].boundingbox[2]),
                            corner2 = this.L.latLng(reponseJS[0].boundingbox[1], reponseJS[0].boundingbox[3]);
                        this.mapAdd.fitBounds([corner1, corner2]);
                        if (reponseJS[0].address.house_number != null) {
                            this.displayMarker([reponseJS[0].lat, reponseJS[0].lon]);

                            this.restaurantAdd.address.lat = reponseJS[0].lat;
                            this.restaurantAdd.address.lon = reponseJS[0].lon;
                            console.log(reponseJS[0].lat + ", " + reponseJS[0].lon);

                            this.restaurantAdd.address.zipcode = reponseJS[0].address.postcode;

                            this.restaurantAdd.address.building = reponseJS[0].address.house_number;

                            if (reponseJS[0].address.city != null)
                                this.restaurantAdd.borough = reponseJS[0].address.city;
                            else if (reponseJS[0].address.town != null)
                                this.restaurantAdd.borough = reponseJS[0].address.town;

                            if (reponseJS[0].address.road != null)
                                this.restaurantAdd.address.street = reponseJS[0].address.road;
                            else if (reponseJS[0].address.pedestrian != null)
                                this.restaurantAdd.address.street = reponseJS[0].address.pedestrian;

                        }
                    }
                    else {
                        this.showSnackbar = true;
                    }
                    // if (reponseJS.length > 0) {
                    //     console.log(reponseJS[0].boundingbox);
                    //     var corner1 = this.L.latLng(reponseJS[0].boundingbox[0], reponseJS[0].boundingbox[2]),
                    //         corner2 = this.L.latLng(reponseJS[0].boundingbox[1], reponseJS[0].boundingbox[3]);
                    //     this.mapAdd.fitBounds([corner1, corner2]);
                    // }
                    console.log(reponseJS);
                } catch (err) {
                    console.log("Erreur dans le fetchs get Nominatim " + err.msg);
                }
                console.log("Ville recherché");
            },
            async ajouterRestaurant() {
                let _create = {};

                _create.name = this.restaurantAdd.name;
                _create.cuisine = this.restaurantAdd.cuisine;
                _create.borough = this.restaurantAdd.borough;
                _create.address = {};
                _create.address.building = this.restaurantAdd.address.building;
                _create.address.street = this.restaurantAdd.address.street;
                _create.address.zipcode = this.restaurantAdd.address.zipcode;
                _create.address.coord = [];
                _create.address.coord.push(this.restaurantAdd.address.lon);
                _create.address.coord.push(this.restaurantAdd.address.lat);
                _create.address.grades = [];

                console.log(_create);

                let reponseJSON = await fetch(this.apiURL, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(_create)
                })
                let reponseJS = await reponseJSON.json();
                console.log(reponseJS.msg);
                this.$parent.showList = true;

                // this.getDataFromServer(); // on rafraichit
            },
            changervue(){
                this.$parent.showList = true;
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .mapAdd {
        /* position: absolute; */
        /* height: 50vh; */
        height: calc(100vh - 48px - 30px);
        cursor: default;
        /* top: 0; right: 0; bottom: 0; left: 0; */
        /* width: 50vw; */
        /* height: 100%; */
        /* width: 100%; */
        /* margin: -10px; */
    }

    .md-card {
        /* width: 85%; */
        margin: 15px;
        /* display: inline-block; */
        /* vertical-align: top; */
    }

    .custom_card {
        padding: 0px;
    }
</style>
