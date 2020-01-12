<template>

    <div>
        <!-- <p>
            Rechercher par nom:
            <input type="text" v-model="nomRecherche" v-on:input="getDataFromServer()" />
        </p> -->
        <!-- <p>
            Nombre de restaurants par page :
            <input type="range" min="1" max="100" value="12" v-on:input="getDataFromServer()" v-model="pagesize" />
            {{pagesize}}
        </p> -->

        <!-- <H1>TABLE VUE-MATERIAL</H1> -->
        <div class="md-layout full_height">

            <div class="md-layout-item sidebar md-size-15">
                <div class="md-title">
                    Outils restaurant
                </div>

                <!-- <md-button class="md-raised">Ajouter restaurant</md-button> -->
                <md-field md-clearable>
                    <label for="search">Recherche</label>
                    <md-input name="search" id="search" v-model="nomRecherche" @input="getDataFromServer()" />
                </md-field>
                <!-- <hr> -->
                <md-field>
                    <label for="pagesize">Nombre par page</label>
                    <md-select v-on:input="getDataFromServer()" v-model="pagesize" name="pagesize" id="pagesize">
                        <md-option value="5">5</md-option>
                        <md-option value="10">10</md-option>
                        <md-option value="25">25</md-option>
                        <md-option value="50">50</md-option>
                        <md-option value="75">75</md-option>
                        <md-option value="100">100</md-option>
                    </md-select>
                </md-field>
                <p style="text-align: center;">
                    <md-button class="md-icon-button md-raised md-button_add" v-on:click="displayList()"
                        v-bind:class="{ 'md-accent': (showList == 1 || showList == 2)}">
                        <div class="button_add" v-bind:class="{ displayed_add: (showList == 1 || showList == 2)}">
                            <md-icon>add</md-icon>
                        </div>
                    </md-button>
                </p>

                <div class="to_bottom">{{nbRestaurants}} restaurants</div>

            </div>
            <div class="md-layout-item md-size-85">
                <div v-show="showList == 0">
                    <md-table class="width_table full_height" md-height="100%" v-model="restaurants" md-sort="name"
                        md-sort-order="asc" md-card md-fixed-header>
                        <md-table-toolbar
                            style="display: inline-block; margin-top: 10px; text-align: center;  margin-bottom: -20px">
                            <md-button class="md-raised" v-on:click="pagePrecedente()" v-bind:disabled="page==0">
                                <md-icon>navigate_before</md-icon>

                            </md-button>
                            <md-button v-if="page-2 >= 0" v-on:click="pageSelect(page-2)">{{page-2}}</md-button>
                            <md-button v-if="page-1 >= 0" v-on:click="pageSelect(page-1)">{{page-1}}</md-button>
                            <!-- <md-button class="color_black" disabled>{{page-1}}</md-button> -->
                            <md-button class="color_black" disabled>{{page}}</md-button>
                            <md-button v-on:click="pageSelect(page+1)">{{page+1}}</md-button>
                            <md-button v-on:click="pageSelect(page+2)">{{page+2}}</md-button>
                            <md-button v-if="0 > page-2" v-on:click="pageSelect(page+3)">{{page+3}}</md-button>
                            <md-button v-if="0 > page-1" v-on:click="pageSelect(page+4)">{{page+4}}</md-button>
                            <!-- <md-button class="color_black" disabled>{{page+1}}</md-button> -->

                            <md-button class="md-raised" v-on:click="pageSuivante()"
                                :disabled="page == nbPagesDeResultats">
                                <md-icon>navigate_next</md-icon>
                            </md-button>

                        </md-table-toolbar>

                        <md-table-empty-state md-label="No users found"
                            :md-description="`No user found for this '${nomRecherche}' query. Try a different search term or create a new user.`">
                            <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
                        </md-table-empty-state>



                        <md-table-row slot="md-table-row" slot-scope="{ item }">
                            <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
                            <md-table-cell md-label="Cuisine" md-sort-by="cuisine">{{ item.cuisine }}</md-table-cell>
                            <md-table-cell >
                                <router-link :to="'restaurants/'+item._id">
                                    <md-button class="md-icon-button md-raised md-secondary">
                                        <md-icon md-label="Details">menu</md-icon>
                                    </md-button>
                                </router-link>
                            </md-table-cell>
                            <md-table-cell >
                                <!-- <router-link :to="'restaurants/'+item._id">Modifier</router-link> -->

                                <md-button class="md-icon-button md-raised md-secondary" v-on:click="modif(item._id)">
                                    <md-icon md-label="Edit">edit</md-icon>
                                </md-button>
                            </md-table-cell>
                            <md-table-cell >
                                <md-button class="md-icon-button md-raised md-accent"
                                    v-on:click="supprimerRestaurant(item._id)">
                                    <md-icon md-label="Suppression">delete</md-icon>
                                </md-button>
                            </md-table-cell>
                        </md-table-row>
                    </md-table>
                </div>
                <div v-if="showList == 1">
                    <RestaurantAdd class="open_restauAdd" showList=showList></RestaurantAdd>
                </div>
                <div v-if="showList == 2">
                    <RestaurantUpdate class="open_restauUpdate" showUpdate=showUpdate></RestaurantUpdate>
                </div>
            </div>
        </div>


        <!-- Nombre de restaurants par page :
        <input type="range" min="1" max="100" value="12" v-on:input="getDataFromServer()" v-model="pagesize" />
        {{pagesize}} -->
    </div>
</template>

<script>
    import RestaurantAdd from './RestaurantAdd.vue'
    import RestaurantUpdate from './RestaurantUpdate.vue'

    export default {
        name: "Restaurants",
        components: {
            RestaurantAdd,
            RestaurantUpdate
        },
        props: {
            isUpdate: Boolean,
            idResto: String
        },
        data: function () {
            return {
                restaurants: [],
                nbRestaurants: 0,
                nom: "",
                cuisine: "",
                page: 0,
                pagesize: 50,
                nomRecherche: "",
                nbPagesDeResultats: 0,
                apiURL: "http://localhost:8081/api/restaurants",
                showList: 0,
                showUpdate: true
            };
        },
        mounted() {
            console.log("AVANT AFFICHAGE !");
            this.getDataFromServer();
        },
        methods: {
            modif(id) {
                this.idResto = id;
                this.showList = 2;
                //this.showUpdate = !this.showUpdate;
            },
            displayList() {
                if (this.showList == 0) {
                    this.showList = 1;
                }
                else if (this.showList == 1 || this.showList == 2) {
                    this.showList = 0;
                }

            },
            async getDataFromServer() {
                // ici on fait un fetch pour récupérer des
                // restaurants sur le serveur.
                let url =
                    this.apiURL +
                    "?page=" + this.page +
                    "&pagesize=" + this.pagesize +
                    "&name=" + this.nomRecherche;

                try {
                    let reponseJSON = await fetch(url);
                    let reponseJS = await reponseJSON.json();
                    this.restaurants = reponseJS.data;
                    this.nbRestaurants = reponseJS.count;
                    this.nbPagesDeResultats = Math.floor(
                        this.nbRestaurants / this.pagesize
                    );
                } catch (err) {
                    console.log("Erreur dans les fetchs GET " + err.msg);
                }
            },
            async supprimerRestaurant(id) {
                //this.restaurants.splice(index, 1);
                try {
                    let url = this.apiURL + "/" + id;
                    let reponseJSON = await fetch(url, {
                        method: "DELETE"
                    });
                    let reponseJS = await reponseJSON.json();
                    console.log("Restaurant supprime : " + reponseJS.msg);
                    this.getDataFromServer(); // on rafraichit l'affichage
                } catch (err) {
                    console.log("Erreur dans le fetchs DELETE " + err.msg);
                }
            },
            ajouterRestaurant(event) {
                // eviter le comportement par defaut
                event.preventDefault();

                this.restaurants.push({
                    nom: this.nom,
                    cuisine: this.cuisine
                });
                this.nom = "";
                this.cuisine = "";
            },
            getColor(index) {
                return index % 2 ? "lightBlue" : "pink";
            },
            pageSuivante() {
                console.log("Page suivante");
                this.page++;
                this.getDataFromServer();
            },
            pagePrecedente() {
                console.log("Page precedente");
                this.page--;
                this.getDataFromServer();
            },
            pageSelect(page) {
                console.log("Page " + page);
                this.page = page;
                this.getDataFromServer();
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .color_black {
        color: black !important;
        font-weight: bold;
        background: whitesmoke;
    }




    .width_table {
        /* border-radius: 15px; */
        /* margin: 0 auto; */
        /* margin-top: 25px; */
        /* text-align: center; */

        /* width: 70vw; */
    }



    .height_table {
        height: unset;
        max-height: unset;
    }

    .sidebar {
        /* max-width: 15vw; */
        padding: 10px;
    }

    .to_bottom {
        padding: 8px;
        font-size: 15px;
        /* text-align: center; */
        position: absolute;
        bottom: 0;
    }

    .button_add {
        /* transform-origin: 50% 50%; */
        transition: all 200ms ease;
    }

    .displayed_add {
        /* -webkit-animation: rotating 0.1s ease 1 ; */
        /* transition: all 200ms ease; */
        -webkit-transform: rotate(45deg);
        /* background-color: red; */
    }

    .md-button_add {
        transition: all 200ms ease;
    }

    .open_restauAdd {
        /* animation-duration: 500ms;
        animation-name: transition; */
        /* opacity: 0; */
        /* animation: transition 1s ease-in-out 2s forwards; */
    }

    @keyframes transition {
        from {
            /* margin-left: -700px; */
            opacity: 0;
        }

        to {
            /* margin-left: 0; */
            opacity: 1;
        }
    }

    @-webkit-keyframes open {
        from {
            width: 0%
        }

        to {
            width: 100%
        }
    }
</style>