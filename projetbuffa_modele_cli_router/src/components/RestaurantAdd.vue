<template>
    <div>
        <div class="md-layout full_height">

            <div class="md-layout-item">
                <md-card>
                    <md-card-header>
                        <div class="md-title">Ajouter un restaurant</div>
                    </md-card-header>

                    <md-card-content>
                        <form>
                            <div class="md-layout md-gutter">
                                <div class="md-layout-item md-small-size-100">
                                    <md-field>
                                        <label for="restaurant_name">Name</label>
                                        <md-input name="restaurant_name" id="restaurant_name" v-model="form.name" />
                                    </md-field>
                                </div>

                                <div class="md-layout-item md-small-size-100">
                                    <md-field>
                                        <label for="restaurant_cuisine">Cuisine</label>
                                        <md-input name="restaurant_cuisine" id="restaurant_cuisine"
                                            v-model="form.cuisine" />
                                    </md-field>
                                </div>
                            </div>
                            <div class="md-layout md-gutter">
                                <div class="md-layout-item md-small-size-100">
                                    <md-field>
                                        <label for="restaurant_latitude">Latitude</label>
                                        <md-input name="restaurant_latitude" id="restaurant_latitude" v-model="latAdd" />
                                    </md-field>
                                </div>

                                <div class="md-layout-item md-small-size-100">
                                    <md-field>
                                        <label for="restaurant_longitudee">Longitude</label>
                                        <md-input name="restaurant_longitudee" id="restaurant_longitudee"
                                            v-model="lonAdd" />
                                    </md-field>
                                </div>
                            </div>
                        </form>
                        <!-- lat : {{latAdd}}, lon : {{lonAdd}} -->
                    </md-card-content>
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
    </div>
</template>

<script>
    export default {
        name: "RestaurantAdd",
        props: {},
        computed: { // computed data, permet de définir des data "calculées"
            //   id() {
            //     // on y accèdera par {{id}} dans le template, et par this.id
            //     // dans le code
            //     return this.$route.params.id
            //   }
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
                latAdd: null,
                lonAdd: null,
                apiURL: "http://localhost:8081/api/restaurants",
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
                    console.log(pos);
                });
            },
            displayMarker(latlng) {
                if (this.mapAdd != null) {
                    if(this.markerClick != null){
                        this.mapAdd.removeLayer(this.markerClick);
                    }
                    // this.map.setView([this.restaurant.address.coord[1], this.restaurant.address.coord[0]], 4);
                    this.markerClick = this.L.marker(latlng);
                    this.markerClick.addTo(this.mapAdd);
                    this.mapAdd.panTo(latlng);
                    this.latAdd = latlng.lat;
                    this.lonAdd = latlng.lng;
                }
            },
            flyto() {
                this.map.flyTo([this.restaurant.address.coord[1], this.restaurant.address.coord[0]], 17, { duration: 2, easeLinearity: 0.05 });
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