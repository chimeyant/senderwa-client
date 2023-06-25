<template>
  <div :class="device.desktop ? `home pa-6 grey lighten-4`:`home pa-0 grey lighten-4`">

    <v-row>
      <v-col cols="12">
        <v-card class="animated animate__backInUp rounded-0">
          <v-card-title :class="`flex flex-row-reverse ` + theme.color + ` lighten-1`">
            <v-tooltip
              :color="theme.color"
              bottom
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  text
                  small
                  icon
                  v-on="on"
                  v-show="page.actions.export"
                >
                  <v-icon
                    :color="theme.mode == 'dark' ? `white` : `black`"
                    @click=""
                  >mdi-files</v-icon>
                </v-btn>
              </template>
              <span>Export Data</span>
            </v-tooltip>
            <v-tooltip
              :color="theme.color"
              bottom
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  text
                  small
                  icon
                  v-on="on"
                  v-show="page.actions.add"
                >
                  <v-icon
                    :color="theme.mode == 'dark' ? `white` : `black`"
                    @click="openForm"
                  >add_circle</v-icon>
                </v-btn>
              </template>
              <span>Tambah Data</span>
            </v-tooltip>
            <v-tooltip
              :color="theme.color"
              bottom
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  text
                  small
                  icon
                  v-on="on"
                  v-show="page.actions.refresh"
                >
                  <v-icon
                    :color="theme.mode == 'dark' ? `white` : `black`"
                    @click="fetchRecords"
                  >refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh Data</span>
            </v-tooltip>

            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Pencarian"
              single-line
              hide-details
              solo
              dense
              :color="theme.color"
              style="max-width: 350px"
            ></v-text-field>
          </v-card-title>
          <v-data-table
            v-show="device.desktop"
            :headers="headers"
            :items="records"
            :items-per-page="table.options.itemsPerPage"
            :page.sync="table.options.page"
            class="elevation-2 mb-1"
            :color="theme.color"
            :loading="loading.table"
            loading-text="Silahkan menunggu, sedang membuka data...!"
            no-data-text="Tidak adan data untuk ditampilkan"
            :search="search"
            hide-default-footer
            @page-count="table.options.pageCount = $event"
            show-select
          >
            <v-progress-linear
              slot="progress"
              :color="theme.color"
              height="1"
              indeterminate
            ></v-progress-linear>

            <template v-slot:[`item.lokasi`]="{ value }">
              <v-icon color="red">mdi-google-maps</v-icon>
            </template>

            <template v-slot:[`item.status`]="{ value }">
              <v-chip
                small
                :color="value.color"
              >{{ value.text }}</v-chip>

            </template>
            <template v-slot:[`item.aksi`]="{ value }">
              <v-menu
                bottom
                origin="center center"
                transition="scale-transition"
              >
                <template v-slot:[`activator`]="{ on, attrs }">
                  <v-icon
                    :color="theme.color"
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-dots-vertical-circle-outline
                  </v-icon>
                </template>

                <v-list>
                  <v-list-item
                    @click="setStatusTindakLanjut(value.id,2)"
                    v-show="page.actions.edit"
                  >
                    <v-list-item-title>
                      <v-icon color="red">mdi-shield-alert</v-icon> Set Status Penanganan
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    @click="setStatusTindakLanjut(value.id,3)"
                    v-show="page.actions.edit"
                  >
                    <v-list-item-title>
                      <v-icon color="green">mdi-shield-check</v-icon> Set Status Selesai
                    </v-list-item-title>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item
                    @click="editRecord(value.id)"
                    v-show="page.actions.edit"
                  >
                    <v-list-item-title>
                      <v-icon color="orange">mdi-pencil-circle</v-icon> Ubah
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    @click="postDeleteRecord(value.id)"
                    v-show="page.actions.delete"
                  >
                    <v-list-item-title>
                      <v-icon color="red">mdi-delete-circle</v-icon> Hapus
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-data-table>
          <v-list
            subheader
            v-show="device.mobile"
          >

            <v-list-item-group
              multiple
              active-class=""
            >
              <v-list-item
                v-for="item in filterItems"
                :key="item.id"
                style="border: ;1px solid"
              >
                <template v-slot:default="{ active }">
                  <v-list-item-action>
                    <v-checkbox :input-value="active"></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title> {{ item.content}}</v-list-item-title>
                    <v-list-item-subtitle>
                      <v-chip
                        small
                        :color="item.status.color"
                      >{{ item.status.text }}</v-chip>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-menu
                      bottom
                      origin="center center"
                      transition="scale-transition"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          :color="theme.color"
                          v-bind="attrs"
                          v-on="on"
                        >
                          mdi-dots-vertical-circle-outline
                        </v-icon>
                      </template>

                      <v-list>

                        <v-divider v-if="page.delete || page.edit"></v-divider>
                        <v-list-item
                          @click="editRecord(item.uuid)"
                          v-show="page.actions.edit"
                        >
                          <v-list-item-title>
                            <v-icon color="orange">mdi-pencil-circle</v-icon>
                            Ubah Data
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item
                          @click="postDeleteRecord(item.uuid)"
                          v-show="page.actions.delete"
                        >
                          <v-list-item-title>
                            <v-icon color="red">mdi-delete-circle</v-icon>
                            Hapus Data
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-list-item-action>

                </template>
              </v-list-item>

            </v-list-item-group>
          </v-list>

        </v-card>
      </v-col>
    </v-row>
    <v-col cols="12">
      <v-dialog
        transition="dialog-bottom-transition"
        v-model="form.add"
        :max-width="device.desktop ? `800px` : `100%`"
        persistent
        :fullscreen="device.mobile"
      >
        <v-card>
          <v-toolbar
            :color="theme.color"
            :dark="theme.mode"
          >
            <v-icon
              small
              class="mr-1 orange--text animate__animated animate__flash animate__infinite"
            >mdi-circle</v-icon> Formulir Laporan Laka Lantas
          </v-toolbar>
          <v-card-text class="mt-2">
            <v-col col="12">
              <v-select
                label="Jenis Laporan"
                outlined
                dense
                hide-details
                v-model="record.jenis_pengaduan_uuid"
                :items="jenispengaduans"
              ></v-select>
            </v-col>
            <v-col :cols="device.desktop ? `12`:`12`">
              <v-textarea
                label="Isi Laporan"
                outlined
                dense
                hide-details
                rows="2"
                v-model="record.content"
              ></v-textarea>
            </v-col>
            <v-col cols="12">

              <v-text-field
                label="Foto"
                append-outer-icon="attachment"
                v-model="foto"
                :color="theme.color"
                outlined
                dense
                @click:append-outer="uploadFile"
              ></v-text-field>

            </v-col>

            <v-row class="justify-center mb-5 mt-5 title">PETA LOKASI</v-row>
            <v-col>
              <v-img
                height="100%"
                width="100%"
              >

                <l-map
                  style="height: 300px;width: 100%;z-index:9999; "
                  :zoom="zoom"
                  :center="center"
                  @update:center="centerUpdated"
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
                    :key="marker.id"
                    :visible="marker.visible"
                    :draggable="marker.draggable"
                    :lat-lng.sync="marker.position"
                  >

                    <l-icon
                      iconSize=32
                      icon-url="/images/icon-marker-merah.png"
                    />
                    <l-popup :content="marker.tooltip" />
                    <l-tooltip :content="marker.tooltip" />
                  </l-marker>
                </l-map>

              </v-img>

            </v-col>

            <v-col cols="12">
              <v-row>

                <v-col :cols="device.desktop ? `6`:`12`">
                  <v-text-field
                    label="Garis Lintang"
                    outlined
                    dense
                    hide-details
                    v-model="record.lat"
                  ></v-text-field>
                </v-col>

                <v-col :cols="device.desktop ? `6`:`12`">
                  <v-text-field
                    label="Garis Bujur"
                    outlined
                    dense
                    hide-details
                    v-model="record.lng"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>

          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-end">
            <v-btn
              outlined
              :color="theme.color"
              v-show="!form.edit"
              @click="postAddNewRecord"
            >Kirim</v-btn>
            <v-btn
              outlined
              :color="theme.color"
              v-show="form.edit"
              @click="postUpdateRecord"
            >Kirim</v-btn>
            <v-btn
              outlined
              color="grey"
              @click="closeForm"
            >Batal</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </div>
</template>

<script >
import { mapActions, mapState } from "vuex";
import "animate.css";
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
  name: "laporan-perlatan-jalan-dan-laka",
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
    num: 1,
    headers: [
      {
        text: "LAPORAN/KEJADIAN",
        align: "start",
        sortable: false,
        value: "content",
      },
      {
        text: "LOKASI",
        value: "lokasi",
        width: 160,
        align: "center",
        sortable: false,
      },
      {
        text: "STATUS",
        value: "status",
        width: 160,
        align: "center",
        sortable: false,
      },
      {
        text: "AKSI",
        value: "aksi",
        width: 85,
        sortable: false,
        align: "center",
        sortable: false,
      },
    ],

    search: null,
    path: null,

    rambus: [],
    kecamatans: [],
    desas: [],

    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a target="_blank" href="http://osm.org/copyright">Dinas Perhubungan Kab. Tangerang</a>',
    zoom: 13,
    //-6.1716001, 106.6405384
    center: [-6.1716001, 106.6405384],

    geosearchOptions: {
      // Important part Here
      provider: new OpenStreetMapProvider(),
    },
    marker: {
      id: "m1",
      position: { lat: -6.1716001, lng: 106.6405384 },
      tooltip: "Pilih lokasi rambu",
      draggable: true,
      visible: true,
    },

    jenispengaduans: [],

    foto: null,

    kondisis: [
      { text: "Baik", value: "baik" },
      { text: "Rusak", value: "rusak" },
    ],
  }),
  computed: {
    ...mapState([
      "page",
      "table",
      "form",
      "theme",
      "http",
      "device",
      "record",
      "records",
      "loading",
      "event",
      "snackbar",
    ]),
    filterItems() {
      if (this.search != null) {
        return this.records.filter((item) => {
          return (
            item.content.toLowerCase().indexOf(this.search.toLowerCase()) > -1
          );
        });
      } else {
        return this.records;
      }
    },
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/keselamatan/laporan-keselamatan",
      pagination: false,
      key: "id",
      title: "LAPORAN PERL. DAN LAKA - LANTAS",
      subtitle:
        "Berikut Daftar Seluruh Lap Perl dan Laka Lantas  Yang Tersedia",

      breadcrumbs: [
        {
          text: "LAPORAN",
          disabled: false,
          href: "",
        },
        {
          text: "Peralatan Dan Laka Lantas",
          disabled: false,
          href: "rambu",
        },
      ],
      showtable: true,
      actions: {
        refresh: true,
        add: true,
        edit: true,
        delete: true,
        bulkdelete: false,
        export: false,
        print: false,
        help: false,
      },
    });
    this.fetchRecords();
    this.fetchJenisPengaduans();
  },
  mounted() {},
  methods: {
    ...mapActions([
      "setPage",
      "fetchRecords",
      "postAddNew",
      "postEdit",
      "postUpdate",
      "postConfirmDelete",
      "assignFileBrowse",
      "setLoading",
      "setRecord",
      "setForm",
    ]),
    openForm: function () {
      this.setForm({
        add: true,
        edit: false,
      });
      this.setRecord({});
      this.foto = null;
      this.getUserPosition();
      this.centerUpdated([-6.1716001, 106.6405384]);
      setTimeout(function () {
        window.dispatchEvent(new Event("resize"));
      }, 250);
    },
    closeForm: function () {
      this.setForm({
        add: false,
        edit: false,
      });
    },

    postAddNewRecord: function () {
      this.postAddNew(this.record).then(() => {
        this.closeForm();
        this.fetchRecords();
      });
    },
    editRecord: function (val) {
      this.postEdit(val).then(() => {
        this.center = [this.record.lat, this.record.lng];
        this.marker.position = {
          lat: this.record.lat,
          lng: this.record.lng,
        };
        setTimeout(function () {
          window.dispatchEvent(new Event("resize"));
        }, 250);
        this.foto = this.record.foto_awal;
      });
      this.setForm({
        add: true,
        edit: true,
      });
    },
    postUpdateRecord: function () {
      this.postUpdate(this.record).then(() => {
        this.closeForm();
      });
    },
    postDeleteRecord: function (val) {
      this.postConfirmDelete(val);
    },
    postDownload(val) {
      window.open(val, "__blank");
    },

    //fetch data combo rambu
    fetchJenisPengaduans: async function () {
      try {
        let { data } = await this.http.get("api/combo/jenis-pengaduan");
        this.jenispengaduans = data;
      } catch (error) {}
    },

    fetchKecamatan: async function () {
      try {
        let { data } = await this.http.get("api/combo/kecamatan");
        this.kecamatans = data;
      } catch (error) {}
    },

    fetchDesas: async function () {
      try {
        let { data } = await this.http.get(
          "api/combo/desa/" + this.record.district_uuid
        );
        this.desas = data;
      } catch (error) {}
    },
    getUserPosition: async function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          this.center = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          this.center = [pos.coords.latitude, pos.coords.longitude];
          this.marker.position = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
        });
      }
    },
    centerUpdated(center) {
      this.center = center;
    },
    uploadFile: function () {
      this.assignFileBrowse({
        fileType: [".png", ".jpg", ".jpeg"],
        query: {
          doctype: "laporans",
        },
        callback: (response) => {
          setTimeout(() => {
            this.foto = response.name;
            this.record.foto_awal = response.name;
            this.snackbar.color = this.theme.color;
            this.snackbar.text = "Proses upload foto berhasil";
            this.snackbar.state = true;
          }, 500);
        },
      });
    },
    setStatusTindakLanjut: async function (val, status) {
      try {
        let {
          data: { success, response },
        } = await this.http.post(
          "api/keselamatan/laporan-keselamatan-set-status",
          { id: val, status: status }
        );
        this.snackbar.color = this.theme.color;
        this.snackbar.text = response.message;
        this.snackbar.state = true;
        this.fetchRecords();
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = error;
        this.snackbar.state = true;
      }
    },
  },
  watch: {
    "marker.position": {
      handler() {
        this.record.lat = this.marker.position.lat;
        this.record.lng = this.marker.position.lng;
      },
      deep: true,
    },
    district_uuid: {
      handler() {
        this.fetchDesas();
      },
    },
  },
};
</script>