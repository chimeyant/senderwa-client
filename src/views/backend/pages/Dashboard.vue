<template>
  <!-- <v-container
    fluid
    class="pt-10 grid-list-xl"
  >

    <v-row>
      <div class="ml-5 mb-10 font-weight-bold black--text">
        Selamat Datang, {{ user.name }}
        <div class="font-weight-regular grey--text">
          Inilah dashboard aplikasi anda
        </div>
      </div>
    </v-row>

    <v-row class="pa-2">
      <v-col :cols="device.mobile ? `12` : `3`">
        <v-card
          class="dashboard-statistik"
          light
          height="175"
          style="overflow: hidden;"
        >
          <div class="d-flex flex-no-wrap justify-space-between mb-6">
            <div>
              <v-card-title class="text-h5 font-weight-bold">Jumlah TA & TPP</v-card-title>
              <div
                style=""
                class="dashboard-statistik-content"
              >
                <div
                  style=""
                  class="dashboard-statistik-content-number"
                >
                  21
                </div>
                <div style="font-size: 18pt;font-weight: bold;padding: 10px;">ORANG</div>
              </div>
            </div>
          </div>
          <v-divider></v-divider>
          <div
            style=""
            class="green dashboard-statistik-content-footer"
          >
            <span class="dashboard-statistik-footer-text ml-3 mr-5 mt-1 white--text font-weight-bold ">Data Tahun {{ 2023 }}</span>
          </div>
        </v-card>
      </v-col>
      <v-col :cols="device.mobile ? `12` : `3`">
        <v-card
          class="dashboard-statistik"
          light
          height="175"
          style="overflow: hidden;"
        >
          <div class="d-flex flex-no-wrap justify-space-between mb-6">
            <div>
              <v-card-title class="text-h5 font-weight-bold">Pekerjaan</v-card-title>
              <div
                style=""
                class="dashboard-statistik-content"
              >
                <div
                  style=""
                  class="dashboard-statistik-content-number"
                >
                  1K
                </div>
                <div style="font-size: 18pt;font-weight: bold;padding: 10px;">KEG</div>
              </div>
            </div>
          </div>
          <v-divider></v-divider>
          <div
            style=""
            class="green dashboard-statistik-content-footer"
          >
            <span class="dashboard-statistik-footer-text ml-3 mr-5 mt-1 white--text font-weight-bold ">Data Tahun {{ 2023 }}</span>
          </div>
        </v-card>
      </v-col>
      <v-col :cols="device.mobile ? `12` : `3`">
        <v-card
          class="dashboard-statistik"
          light
          height="175"
          style="overflow: hidden;"
        >
          <div class="d-flex flex-no-wrap justify-space-between mb-6">
            <div>
              <v-card-title class="text-h5 font-weight-bold">On Progress</v-card-title>
              <div
                style=""
                class="dashboard-statistik-content"
              >
                <div
                  style=""
                  class="dashboard-statistik-content-number"
                >
                  1K
                </div>
                <div style="font-size: 18pt;font-weight: bold;padding: 10px;">KEG</div>
              </div>
            </div>
          </div>
          <v-divider></v-divider>
          <div
            style=""
            class="green dashboard-statistik-content-footer"
          >
            <span class="dashboard-statistik-footer-text ml-3 mr-5 mt-1 white--text font-weight-bold ">Data Tahun {{ 2023 }}</span>
          </div>
        </v-card>
      </v-col>
      <v-col :cols="device.mobile ? `12` : `3`">
        <v-card
          class="dashboard-statistik"
          light
          height="175"
          style="overflow: hidden;"
        >
          <div class="d-flex flex-no-wrap justify-space-between mb-6">
            <div>
              <v-card-title class="text-h5 font-weight-bold">Selesai</v-card-title>
              <div
                style=""
                class="dashboard-statistik-content"
              >
                <div
                  style=""
                  class="dashboard-statistik-content-number"
                >
                  1K
                </div>
                <div style="font-size: 18pt;font-weight: bold;padding: 10px;">KEG</div>
              </div>
            </div>
          </div>
          <v-divider></v-divider>
          <div
            style=""
            class="green dashboard-statistik-content-footer"
          >
            <span class="dashboard-statistik-footer-text ml-3 mr-5 mt-1 white--text font-weight-bold ">Data Tahun {{ 2023 }}</span>
          </div>
        </v-card>
      </v-col>

    </v-row>

  </v-container> -->
</template>

<script>
import { mapActions, mapState } from "vuex";
import PermohonanPerbulan from "../pages/chart/BarChart.vue";
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
  name: "dashboard",

  components: {
    PermohonanPerbulan,
    LMap,
    LTileLayer,
    LMarker,
    VGeosearch,
    LIcon,
    LPopup,
    LTooltip,
  },

  data: () => ({
    num: 1,

    jmlpengajuan: 0,
    jmlterverifikasi: 0,
    jmlprosesediting: 0,
    jmlpenandatangan: 0,

    staf: {
      headers: [
        { text: "#", value: "num", width: 75 },
        { text: "STAF", value: "nama" },
        {
          text: "JML.PEKERJAAN",
          value: "jmlpekerjaan",
          width: 200,
          align: "right",
        },
        {
          text: "PROGRESS (%)",
          value: "progress",
          align: "center",
          width: 200,
        },
      ],
      records: [
        {
          id: 1,
          num: 1,
          nama: "Ujang Selamat",
          jmlpekerjaan: 20 + " Dokumen",
          progress: 25,
        },
        {
          id: 2,
          num: 2,
          nama: "Dudy Ali Fathan",
          jmlpekerjaan: 25 + " Dokumen",
          progress: 65,
        },
      ],
    },

    //un used
    datacollection: null,
    chartData: {
      Books: 24,
      Magazine: 30,
      Newspapers: 10,
    },

    jmlformasi: 0,
    jmlpelamar: 0,
    pelamars: [],
    pesans: [],

    search: null,
    jmlpegawai: 25,

    selected: [2],

    headers: [],

    headers2: [
      { text: "#", value: "num" },
      {
        text: "PROGRAM KEAHLIAN",
        align: "start",
        sortable: false,
        value: "jurusan",
      },
      { text: "BELUM TERVERIFIKASI", value: "jmlbelum" },
      { text: "SUDAH TERVERIFIKASI", value: "jmlsudah" },
    ],

    headers3: [
      { text: "#", value: "num" },
      {
        text: "PROGRAM KEAHLIAN",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "PILIHAN I", value: "jmlpil1" },
      { text: "PILIHAN II", value: "jmlpil2" },
    ],

    records: [],

    records2: [],

    records3: [],

    //property map
    //url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a style="color:brown" target="_blank" href="#">Polres Kabupaten Tangerang</a>',
    zoom: 11,
    //-6.1716001, 106.6405384
    center: [-6.1716001, 106.6405384],

    geosearchOptions: {
      // Important part Here
      provider: new OpenStreetMapProvider(),
    },

    marker: {
      id: "m1",
      position: { lat: -6.1716001, lng: 106.6405384 },
      tooltip: "<h4>Lampu Merah</h4><p>Rambu Lampu Merah </p>",
      draggable: false,
      visible: true,
    },
    marker2: {
      id: "m2",
      position: { lat: -6.2546, lng: 106.6405384 },
      tooltip:
        "<h4>Lampu Merah 2</h4><p>Rambu Lampu Merah Stopan Pemda Tigaraksa </p><p>Kondisi Baik</p>",
      draggable: false,
      visible: true,
    },

    markers: [],
    data: {},
  }),
  computed: {
    ...mapState(["theme", "http", "device", "loading", "event", "user"]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/dashboard",
      pagination: false,
      title: "Dashboard",
      subtitle: "Berikut Gambaran Semua Data Aplikasi Anda",
      showtable: false,
      breadcrumbs: [
        {
          text: "Dashboard",
          disabled: false,
          href: "",
        },
        {
          text: "Dashboard",
          disabled: false,
          href: "",
        },
      ],
    });

    this.fetchDashboard();
  },
  mounted() {},
  methods: {
    ...mapActions([
      "setPage",
      "postAddNew",
      "postEdit",
      "postUpdate",
      "postConfirmDelete",
    ]),

    fetchDashboard: async function () {
      let {
        data: { rambus, data },
      } = await this.http.get("api/dashboard");

      this.markers = rambus;
      this.data = data;
    },

    fetchPesan: async function () {
      let {
        data: { pesans },
      } = await this.http.get("api/dashboard-pesan");

      this.pesans = pesans;
    },

    fetchPerHari: async function () {
      let {
        data: { headers, records },
      } = await this.http.get("api/dashboard-perhari");

      this.headers = headers;
      this.records = records;
    },

    fethDataVerifikasi: async function () {
      let {
        data: { data },
      } = await this.http.get("api/dashboard-verifikasi");

      this.records2 = data;
    },

    fethDataPerjurusanPerPilihan: async function () {
      let {
        data: { datas },
      } = await this.http.get("api/dashboard-perjurusan-per-pilihan");

      this.records3 = datas;
    },
  },
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
.box-statistik-title {
  height: 100px;
  align-items: start;
}
.animasi {
  position: relative;
  animation: ripple 5s infinite;
  border-radius: 10%;
  border: none;
  background-color: #eff2f5;
  box-shadow: inset 10px 10px 20px #cf1313, inset -10px -10px 20px #ffffff;
  transition: 0.33s ease-in all;
  opacity: 0;
}

.dashboard-statistik {
  background: linear-gradient(#77bff3, #096cec);
  background-image: url("/images/bg-card-01.jpeg");
  background-size: cover;
}
.dashboard-statistik-footer-text {
  justify-content: end;
  font-size: 8pt;
}

.dashboard-statistik-content {
  display: flex;
  flex-direction: row;
  margin-left: 30px;
  justify-items: end;
}
.dashboard-statistik-content-number {
  background-color: orange;
  width: 60px;
  height: 60px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20pt;
  font-weight: bold;
  margin-right: 5px;
  opacity: 0.9;
}
.dashboard-statistik-content-footer {
  display: flex;
  justify-content: flex-end;
  margin-right: 12px;
  height: 40px;
  width: 100%;
  opacity: 0.8;
}

@keyframes ripple {
  0% {
    width: 20px;
    height: 20px;
    opacity: 1;
  }
  100% {
    width: 100px;
    height: 100px;
    opacity: 0;
  }
}
</style>
