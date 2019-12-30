<template>
    <div id="app">
        <md-toolbar class="md-dense">
            <router-link to="/"><md-button>Home</md-button></router-link>
            <router-link to="/restaurants"><md-button>Restaurants</md-button></router-link>
        </md-toolbar>

        <router-view></router-view>
    </div>
</template>

<script>

    export default {
        name: "app",
        components: {
        },
        data: function () {
            return {
                nom: "buffa"
            };
        },
        mounted() {
            console.log("avant affichage");
        }
    };
</script>

<style>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /* text-align: center; */
        color: #2c3e50;
        /* margin-top: 60px; */
    }

    .map {
        /* position: absolute; */
        /* height: 50vh; */
        height: calc(100vh - 48px);
        /* top: 0; right: 0; bottom: 0; left: 0; */
        /* width: 50vw; */
        /* height: 100%; */
        /* width: 100%; */
        /* margin: -10px; */
    }
    .float_right{
        float: right;
    }
    .float_left{
        float: left;
    }
    .font_bold{
        font-weight: bold!important;
    }
    .full_height {
        height: calc(100vh - 48px);
        /* overflow-y: auto; */
    }
    .full_height_max{
        max-height: calc(100vh - 48px);
        overflow-y: auto;
    }
</style>