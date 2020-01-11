<template>
    <div>
        <div class="md-layout full_height">

            <div class="md-layout-item">
                <md-card>
                    <md-card-header>
                        <div class="md-title">Modification</div>
                    </md-card-header>

                    <md-card-content>
                        <div class="md-layout md-gutter">
                            <div class="md-layout-item md-small-size-100">
                                <md-field md-clearable>
                                    <label for="restaurant_name">Name</label>
                                    <md-input name="restaurant_name" id="restaurant_name"
                                              v-model="restaurant.name" />
                                </md-field>
                            </div>

                            <div class="md-layout-item md-small-size-100">
                                <md-field md-clearable>
                                    <label for="restaurant_cuisine">Cuisine</label>
                                    <md-input name="restaurant_cuisine" id="restaurant_cuisine"
                                              v-model="restaurant.cuisine" />
                                </md-field>
                            </div>
                        </div>
                    </md-card-content>
                    <md-card-actions>
                        <md-button v-on:click="showDialog = true">Modifier</md-button>
                        <!--<md-button v-on:click="changervue()">Change vue</md-button>-->
                    </md-card-actions>
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


        <md-dialog-confirm
            :md-active.sync="showDialog"
            md-title="Update restaurant"
            md-content="Confirm the update ? "
            md-confirm-text="Yes"
            md-cancel-text="No"
            @md-cancel="showDialog = false"
            @md-confirm="modifierRestaurant($parent.idResto)" />

    </div>
</template>

<script>
    export default {
        name: "RestaurantUpdate",
        props: ['showUpdate'],
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
                showDialog: false,
                valideModif : false,
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
            this.getDataFromServer(this.$parent.idResto);
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
                } catch (err) {
                    console.log("Erreur dans les fetchs GET " + err.msg);
                }
            },
            async modifierRestaurant(id) {
                this.showDialog = false;
                let donneesFormulaire = new FormData();
                console.log("modif : " + id);
                donneesFormulaire.append("nom", this.restaurant.name);
                donneesFormulaire.append("cuisine", this.restaurant.cuisine);

                try {
                    let url = this.apiURL + "/" + id;
                    let reponseJSON = await fetch(url, {
                        method: "PUT",
                        body: donneesFormulaire
                    });
                    let reponseJS = await reponseJSON.json();
                    console.log(reponseJS.msg);

                    this.getDataFromServer(id); // on rafraichit
                } catch (err) {
                    console.log("Erreur dans le fetchs PUT " + err.msg);
                }

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
