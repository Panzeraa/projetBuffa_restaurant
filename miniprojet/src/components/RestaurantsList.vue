<template>
    <div>
        <div class="md-layout">
            <div class="md-layout-item height_listconfig">
                <md-card class="md-layout-item md-size-100 md-small-size-100">
                    <md-card-header>
                        <div class="md-title">Restaurant</div>
                    </md-card-header>

                    <md-card-content>
                        <h1>Nombre de restaurants : {{nbRestaurants}}</h1>
                        <p>Page courante : {{page}}</p>
                        <!-- <div class="md-layout md-gutter">
                            <div class="md-layout-item md-small-size-100">
                                    <label for="name">Nom</label>
                                    <md-input name="name" id="name" autocomplete="given-name" v-model="restaurantAdd.nom"
                                        :disabled="sending" />
                            </div> -->
                        <div class="md-layout-item md-small-size-100">
                            <label for="nbRestau">Nb de restaurants par page :</label>
                            <input type="range" min=5 max=100 step=1 v-model="pagesize"
                                v-on:input="getDataFromServer()">
                            {{pagesize}}

                        </div>

                    </md-card-content>

                    <md-card-actions>
                        <md-button class="md-primary" @click="pagePrecedente()">Précédent</md-button>
                        <md-button class="md-primary" @click="pageSuivante()">Suivant</md-button>
                    </md-card-actions>
                </md-card>
            </div>
            <div class="md-layout-item">
                <form novalidate class="md-layout" v-on:submit="ajouterRestaurant">
                    <md-card class="md-layout-item md-size-100 md-small-size-100">
                        <md-card-header>
                            <div class="md-title">Ajouter restaurant</div>
                        </md-card-header>

                        <md-card-content>
                            <div class="md-layout md-gutter">
                                <div class="md-layout-item md-small-size-100">
                                    <!-- <md-field :class="getValidationClass('Name')"> -->
                                    <label for="name">Nom</label>
                                    <md-input name="name" id="name" autocomplete="given-name"
                                        v-model="restaurantAdd.nom" :disabled="sending" />
                                    <!-- <span class="md-error" v-if="!$v.form.firstName.required">The first name is
                                            required</span>
                                        <span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first
                                            name</span> -->
                                    <!-- </md-field> -->
                                </div>

                                <div class="md-layout-item md-small-size-100">
                                    <!-- <md-field :class="getValidationClass('cuisine')"> -->
                                    <label for="cuisine">Cuisine</label>
                                    <md-input name="cuisine" id="cuisine" autocomplete="cuisine"
                                        v-model="restaurantAdd.cuisine" :disabled="sending" />
                                    <!-- <span class="md-error" v-if="!$v.form.lastName.required">The last name is
                                            required</span>
                                        <span class="md-error" v-else-if="!$v.form.lastName.minlength">Invalid last name</span> -->
                                    <!-- </md-field> -->
                                </div>
                            </div>
                        </md-card-content>

                        <md-progress-bar md-mode="indeterminate" v-if="sending" />

                        <md-card-actions>
                            <md-button type="submit" class="md-primary" :disabled="sending">Ajouter restaurant
                            </md-button>
                        </md-card-actions>
                    </md-card>

                    <!-- <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar> -->
                </form>
            </div>
        </div>


        <!-- <form v-on:submit="ajouterRestaurant">
            <label>
                Nom : <input type="text" required v-model="nom">
            </label>
            <label>
                Cuisine : <input type="text" required v-model="cuisine">
            </label>

            <button>Ajouter</button>
        </form> -->

        <!-- <h2>
                    <label>Recherche par nom:
                        <input type="text" v-model="nomRecherche" @input="getDataFromServer()">
                    </label>
                </h2> -->

        <!-- <table>
                    <tr>
                        <th>Nom</th>
                        <th>Cuisine </th>
                    </tr>
                    <tbody>
                        <tr v-for="(r,index) in restaurants" v-on:click="supprimerRestaurant(r._id)"
                            v-bind:style="{backgroundColor:getColor(index)}" v-bind:class="{bordureRouge:(index === 2)}"
                            v-bind:key="r._id">
                            <td>{{r.name}}</td>
                            <td> {{r.cuisine}}</td>
                        </tr>
                    </tbody>
                </table> -->

        <md-table v-model="restaurants" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
            <md-table-toolbar>
                <div class="md-toolbar-section-start">
                    <h1 class="md-title">Nom cherche</h1>
                </div>

                <md-field md-clearable class="md-toolbar-section-end">
                    <md-input placeholder="Search by name..." v-model="nomRecherche" @input="getDataFromServer()" />
                </md-field>
            </md-table-toolbar>

            <md-table-empty-state md-label="No users found"
                :md-description="`No user found for this '${nomRecherche}' query. Try a different search term or create a new user.`">
                <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
                <!-- <md-table-empty-state> -->

            </md-table-empty-state>



            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Cuisine" md-sort-by="cuisine">{{ item.cuisine }}</md-table-cell>
                <!-- <md-table-cell md-label="Details"><router-link :to="'restaurant/'+item._id">Details</router-link></md-table-cell> -->
            </md-table-row>
        </md-table>

        <!-- <h1>Table vue material</h1>
        <md-table v-model="restaurants" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
            <md-table-toolbar>
                <h1 class="md-title">Liste restaurants</h1>
            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Cuisine" md-sort-by="cuisine">{{ item.cuisine }}</md-table-cell>
            </md-table-row>
        </md-table> -->
        <!-- Bonjour list retaurant -->
    </div>
</template>

<script>
    export default {
        name: 'RestaurantsList',
        props: {
        },
        data() {
            return {
                restaurantAdd: {
                    nom: null,
                    cuisine: null
                },
                restaurants: [],
                nbRestaurants: 0,
                apiBaseURL: "http://localhost:8081/api/restaurants",
                page: 0,
                pagesize: 10,
                nomRecherche: ""
            }

        },
        methods: {
            // async obligatoire si utilisation de await, pas la peine sinon
            async getDataFromServer() {
                // On va chercher les données sur le serveur
                /*
                fetch(this.apiBaseURL)
                .then(responseEnJson => {
                    console.log("J'ai eu une réponse JSON du serveur ");
                    return responseEnJson.json();
                }).then(reponseJS => {
                    //console.log(reponseJS.data[0].name);
                    // on initialise le modele des restaurants
                    // avec les data reçues
                    this.restaurants = reponseJS.data;
                }).catch(err => {
                    console.log(err.msg);
                });
                */

                // Avec await
                let url = this.apiBaseURL
                    + "?page=" + this.page
                    + "&pagesize=" + this.pagesize
                    + "&name=" + this.nomRecherche;

                try {
                    let reponseJSON = await fetch(url);
                    let reponseJS = await reponseJSON.json();
                    this.restaurants = reponseJS.data;
                    this.nbRestaurants = reponseJS.count;
                } catch (err) {
                    console.log("Erreur dans les fetchs GET " + err.msg);
                }
            },
            async supprimerRestaurant(id) {
                try {
                    let reponseJSON = await fetch(this.apiBaseURL + "/" + id, {
                        method: "DELETE"
                    });
                    let reponseJS = await reponseJSON.json();
                    console.log("Restaurant supprime : " + reponseJS.msg);
                    this.getDataFromServer(); // on rafraichit l'affichage
                } catch (err) {
                    console.log("Erreur dans le fetchs DELETE " + err.msg);
                }
            },
            async ajouterRestaurant(event) {
                // eviter le comportement par defaut
                event.preventDefault();

                let donneesFormulaire = new FormData();
                donneesFormulaire.append("nom", this.restaurantAdd.nom);
                donneesFormulaire.append("cuisine", this.restaurantAdd.cuisine);

                let reponseJSON = await fetch(this.apiBaseURL, {
                    method: "POST",
                    body: donneesFormulaire
                })
                let reponseJS = await reponseJSON.json();
                console.log(reponseJS.msg);

                this.nom = "";
                this.cuisine = "";

                this.getDataFromServer(); // on rafraichit
            },
            getColor(index) {
                return (index % 2) ? 'lightBlue' : 'pink';
            },
            pageSuivante() {
                console.log("page suivante");
                this.page++;
                this.getDataFromServer();
            },
            pagePrecedente() {
                console.log("page precedente");
                this.page--;
                this.getDataFromServer();
            },

            getValidationClass(fieldName) {
                const field = this.$v.form[fieldName]

                if (field) {
                    return {
                        'md-invalid': field.$invalid && field.$dirty
                    }
                }
            },
            clearForm() {
                this.$v.$reset()
                this.form.firstName = null
                this.form.lastName = null
                this.form.age = null
                this.form.gender = null
                this.form.email = null
            },
            saveUser() {
                this.sending = true

                // Instead of this timeout, here you can call your API
                window.setTimeout(() => {
                    this.lastUser = `${this.form.firstName} ${this.form.lastName}`
                    this.userSaved = true
                    this.sending = false
                    this.clearForm()
                }, 1500)
            },
            validateUser() {
                this.$v.$touch()

                if (!this.$v.$invalid) {
                    this.saveUser()
                }
            }
        },
        mounted() {
            console.log("AVANT AFFICHAGE");
            this.getDataFromServer();
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .md-progress-bar {
        margin: 24px;
    }

    .height_listconfig {
        height: 100%;
    }
</style>