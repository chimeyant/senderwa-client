<template>

  <v-row>

    <l-map
      style="height: 500px ; z-index:0 ;"
      :zoom="zoom"
      :center="center"
    >
      <v-geosearch
        :options="geosearchOptions"
        style="width:100px; border: 1px;"
      ></v-geosearch>
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      ></l-tile-layer>
      <l-marker
        v-for="item in markers"
        :key="item.id"
        :visible="item.visible"
        :draggable="item.draggable"
        :lat-lng.sync="item.position"
      >

        <l-icon
          iconSize=32
          icon-url="/images/icon-marker-merah.png"
        />
        <l-popup :content="item.tooltip" />
        <l-tooltip :content="item.tooltip" />

      </l-marker>

    </l-map>
    <v-container>
      <v-row class="justify-center mt-5">
        <div class="title">STATISTIK PETA KESELAMATAN</div>
        <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt aliquam laudantium a dolores officiis ex et velit provident, maiores aut quam nobis nihil error, quibusdam molestias quae pariatur blanditiis hic!</div>
      </v-row>
    </v-container>
  </v-row>

</template>

<script>
import {
  LMap,
  LTileLayer,
  LMarker,
  LIcon,
  LPopup,
  LTooltip,
} from "vue2-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import VGeosearch from "vue2-leaflet-geosearch";
import "leaflet/dist/leaflet.css";

export default {
  name: "peta-keselamat-component",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    VGeosearch,
    LIcon,
    LPopup,
    LTooltip,
  },
  data: () => ({
    //property map
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    zoom: 11,
    //-6.1716001, 106.6405384
    center: [-6.1716001, 106.6405384],

    geosearchOptions: {
      // Important part Here
      provider: new OpenStreetMapProvider(),
    },

    marker: {
      id: 1,
      position: { lat: -6.1716001, lng: 106.6405384 },
      tooltip: "KOTA TANGERANG OKE",
      draggable: false,
      visible: true,
    },

    markers: [],
  }),
};
</script>

<style>
</style>