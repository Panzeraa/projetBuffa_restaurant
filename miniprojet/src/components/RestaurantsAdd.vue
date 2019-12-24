<template>
    <div>
        <form novalidate class="md-layout" @submit.prevent="validateUser">
            <md-card class="md-layout-item md-size-50 md-small-size-100">
                <md-card-header>
                    <div class="md-title">Users</div>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                            <md-field :class="getValidationClass('Name')">
                                <label for="name">Nom</label>
                                <md-input name="name" id="name" autocomplete="given-name" v-model="nom"
                                    :disabled="sending" />
                                <span class="md-error" v-if="!$v.form.firstName.required">The first name is
                                    required</span>
                                <span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first
                                    name</span>
                            </md-field>
                        </div>

                        <div class="md-layout-item md-small-size-100">
                            <md-field :class="getValidationClass('cuisine')">
                                <label for="cuisine">Cuisine</label>
                                <md-input name="cuisine" id="cuisine" autocomplete="cuisine" v-model="cuisine"
                                    :disabled="sending" />
                                <span class="md-error" v-if="!$v.form.lastName.required">The last name is
                                    required</span>
                                <span class="md-error" v-else-if="!$v.form.lastName.minlength">Invalid last name</span>
                            </md-field>
                        </div>
                    </div>

                    <!-- <md-field :class="getValidationClass('email')">
                  <label for="email">Email</label>
                  <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                  <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
                </md-field> -->
                </md-card-content>

                <md-progress-bar md-mode="indeterminate" v-if="sending" />

                <md-card-actions>
                    <md-button type="submit" class="md-primary" :disabled="sending">Ajouter restaurant</md-button>
                </md-card-actions>
            </md-card>

            <!-- <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar> -->
        </form>

        <form v-on:submit="ajouterRestaurant">
            <label>
                Nom : <input type="text" required v-model="nom">
            </label>
            <label>
                Cuisine : <input type="text" required v-model="cuisine">
            </label>

            <button>Ajouter</button>
        </form>
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
                // restaurants: [],
                // nbRestaurants: 0,
                apiBaseURL: "http://localhost:8081/api/restaurants",
                // page: 0,
                // pagesize: 10,
                // nomRecherche: ""
            }

        },
        methods: {
            async ajouterRestaurant(event) {
                // eviter le comportement par defaut
                event.preventDefault();

                let donneesFormulaire = new FormData();
                donneesFormulaire.append("nom", this.nom);
                donneesFormulaire.append("cuisine", this.cuisine);

                let reponseJSON = await fetch(this.apiBaseURL, {
                    method: "POST",
                    body: donneesFormulaire
                })
                let reponseJS = await reponseJSON.json();
                console.log(reponseJS.msg);

                this.nom = "";
                this.cuisine = "";

                this.getDataFromServer(); // on rafraichit
            }
        },
        mounted() {
            console.log("AVANT AFFICHAGE");
            // this.getDataFromServer();
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>