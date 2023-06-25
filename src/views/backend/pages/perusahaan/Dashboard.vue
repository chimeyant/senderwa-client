<template>
  <v-container
    fluid
    class="pt-10 grid-list-xl"
    style="overflow:hidden ;"
  >

    <v-row>
      <div class="ml-5 mb-10 font-weight-bold black--text">
        Selamat Datang, {{ user.name.toUpperCase() }}
        <div class="font-weight-regular grey--text">
          Inilah dashboard aplikasi anda
        </div>
      </div>
    </v-row>

    <v-row>
      <v-col :cols="device.desktop ?3:12">
        <v-card>
          <v-img
            src="/images/bg-card.png"
            height="150"
            class="pa-3"
          >
            <div class="font-weight-light">TOTAL PERMOHONAN DRAFT</div>
            <v-row class="mt-4">
              <v-col>
                {{ data.jmllokasi }} Berkas
              </v-col>
            </v-row>
          </v-img>

        </v-card>
      </v-col>
      <v-col :cols="device.desktop ?3:12">
        <v-card>
          <v-img
            src="/images/bg-card.png"
            height="150"
            class="pa-3"
          >
            <div class="font-weight-light">TOTAL PERMOHONAN PROSES</div>
            <v-row class="mt-4">
              <v-col>
                {{ data.jmldaerah }} Berkas
              </v-col>
            </v-row>
          </v-img>

        </v-card>
      </v-col>
      <v-col :cols="device.desktop ?3:12">
        <v-card>
          <v-img
            src="/images/bg-card.png"
            height="150"
            class="pa-3"
          >
            <div class="font-weight-light">TOTAL PERMOHONAN SELESAI</div>
            <v-row class="mt-4">
              <v-col>
                {{ data.jmlpesertahadir }}/{{ data.jmlpeserta }} Berkas
              </v-col>
            </v-row>
          </v-img>

        </v-card>

      </v-col>
      <v-col :cols="device.desktop ?3:12">
        <v-card>
          <v-img
            src="/images/bg-card.png"
            height="150"
            class="pa-3"
          >
            <div class="font-weight-light">TOTAL PERMOHONAN</div>
            <v-row class="mt-4">
              <v-col>
                {{ data.jmlpeserta }} Berkas
              </v-col>
            </v-row>
          </v-img>

        </v-card>
      </v-col>

    </v-row>

  </v-container>
</template>
  
  <script>
import { mapActions, mapState } from "vuex";
import PermohonanPerbulan from "../../pages/chart/BarChart.vue";
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
    ...mapState(["theme", "http", "device", "user", "loading", "event"]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/dashboard",
      title: "DASHBOARD",
      subtitle: "Overview Data Application",
      breadcrumbs: [
        {
          text: "Dashboard",
          disabled: false,
          href: "dashboard",
        },
        {
          text: "Dashboard",
          disabled: false,
          href: "dashboard",
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
      try {
        let { data } = await this.http.get("api/dashboard");
        this.data = data;
      } catch (error) {}
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
.title-geoinfo {
  font-size: 18px;
  font-weight: 700;
}
.dashboard-main-card.v-card.v-sheet.theme--light {
  overflow-y: scroll;
  height: 100vh;
  width: 100%;
  background-color: whitesmoke;
  border-radius: 0px;
  margin-top: 0px;
}
.dashboard-main-content {
  height: 100vh;
  padding: 20px;
  overflow-x: hidden;
  overflow-y: scroll;
  margin-top: 10px;
}
</style>
  