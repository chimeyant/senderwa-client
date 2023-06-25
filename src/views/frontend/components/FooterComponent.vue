<template>
  <div class="section-footer indigo">
    <v-container>
      <v-row>
        <v-col :cols="device.desktop ? `5`:`12`">
          <div class="footer-title">{{info.app_company}}</div>
          <div class="address">{{ info.app_address }}</div>
        </v-col>
        <v-col :cols="device.desktop ? `4`:`12`">
          <div class="konten-kontak">
            <div class="kontak">Kontak</div>
            <div class="kontak-item">
              <v-icon color="blue">mdi-phone</v-icon>&nbsp; {{ info.app_wa }}
            </div>
          </div>
        </v-col>
        <v-col :cols="device.desktop ? `3`:`12`">
          <div class="sosial-media">Sosial Media</div>
          <div class="sosial-media-item">
            <v-icon color="blue">mdi-facebook</v-icon>&nbsp;Facebook
          </div>
          <div class="sosial-media-item">
            <v-icon color="pink">mdi-instagram</v-icon>&nbsp;Instagram
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-row class="justify-center blue darken-4 mt-5">
      <div class="copyright white--text p-5">
        <center>
          Copyright &copy; 2022 - 2023
        </center>
      </div>
    </v-row>
  </div>

</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "FooterComponent",
  data: () => ({}),
  mounted() {},
  computed: {
    ...mapState(["device", "theme", "info"]),
  },
  methods: {},
  watch: {},
};
</script>

<style>
.section-footer {
  background-color: darkorange;
  padding-top: 15px;
}
.footer-title {
  font-size: 20px;
  font-weight: 600;
  color: white;
  font-family: people;
}
.copyright {
  font-size: 8pt;
  color: white;
  padding: 10px;
}
.address {
  font-size: 10pt;
  font-family: none;
  font-weight: 200;
  color: white;
}
.kontak {
  margin-bottom: 5px;
  color: white;
}
.kontak-item {
  font-size: 14px;
  color: white;
  padding: 2px;
}
.sosial-media {
  margin-bottom: 5px;
  color: white;
}
.sosial-media-item {
  font-size: 14px;
  color: white;
  padding: 2px;
}
</style>