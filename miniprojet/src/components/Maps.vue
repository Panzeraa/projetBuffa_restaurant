<template>
  <div>
    <!-- <h1 class="align_center">Maps</h1> -->
    <div id="map" class="map"></div>
  </div>
</template>

<script>
  export default {
    name: 'Maps',
    props: {
      msg: String
    },
    data() {
      return {
        map: null,
        tileLayer: null,
        layers: [],
      }

    },
    methods: {
      initMap() {
        let L = window.L;
        console.log("Initialisation");
        this.map = L.map('map').setView([43.62663234302636, 7.064208984375001], 12);

        this.tileLayer = L.tileLayer(
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

    },
    mounted() { this.initMap() }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .align_center{
    text-align: center;
  }
  h1{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>