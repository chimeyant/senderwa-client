<template>
  <div :class="device.desktop ? `home pa-6 grey lighten-4`:`home pa-0 grey lighten-4`">
    <v-row>
      <v-col cols="12">
        <v-card class="animated animate__fadeInUp rounded-0">
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
            loading-text="Loading... Please wait"
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
            <template v-slot:item.progress="{ value }">
              <v-progress-linear
                :color="theme.color"
                v-model="value"
                height="25"
              >
                <strong>{{ value }}%</strong>
              </v-progress-linear>
            </template>

            <template v-slot:item.persentasi="{ value }">
              <v-chip
                :color="value.color"
                small
              >{{ value.text }}</v-chip>
            </template>
            <template v-slot:item.id="{ value }">
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

                  <v-list-item
                    @click="editRecord(value)"
                    v-show="page.actions.edit"
                  >
                    <v-list-item-title>
                      <v-icon color="orange">mdi-pencil-circle</v-icon>Ubah Data
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    @click="postDeleteRecord(value)"
                    v-show="page.actions.delete"
                  >
                    <v-list-item-title>
                      <v-icon color="red">mdi-delete-circle</v-icon>Hapus Data
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-data-table>
          <v-list
            subheader
            three-line
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
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.description }} </v-list-item-subtitle>
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
                          @click="editRecord(item.id)"
                          v-show="page.actions.edit"
                        >
                          <v-list-item-title>
                            <v-icon color="orange">mdi-pencil-circle</v-icon>
                            Ubah Data
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item
                          @click="postDeleteRecord(item.id)"
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
        :max-width="device.desktop ? `600px` : `100%`"
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
            >mdi-circle</v-icon> Formulir Realisasi Renaksi
          </v-toolbar>
          <v-card-text class="mt-2">
            <v-col col="12">
              <v-select
                label="Periode"
                :color="theme.color"
                outlined
                dense
                hide-details
                v-model="record.periode_uuid"
                :filled="record.periode_uuid"
                :items="periodes"
              ></v-select>
            </v-col>
            <v-col col="12">
              <v-select
                label="Pilar"
                :color="theme.color"
                outlined
                dense
                hide-details
                v-model="record.pilar_uuid"
                :filled="record.pilar_uuid"
                :items="pilars"
                @change="fetchPrograms"
              ></v-select>
            </v-col>
            <v-col col="12">
              <v-select
                label="Program"
                :color="theme.color"
                outlined
                dense
                hide-details
                v-model="record.program_uuid"
                :filled="record.program_uuid"
                :items="programs"
                @change="fetchKegiatans"
              ></v-select>
            </v-col>
            <v-col col="12">
              <v-select
                label="Kegiatan"
                :color="theme.color"
                outlined
                dense
                hide-details
                v-model="record.kegiatan_uuid"
                :filled="record.kegiatan_uuid"
                :items="kegiatans"
              ></v-select>
            </v-col>

            <v-col cols="12">
              <v-text-field
                label="Indikator Kinerja"
                :color="theme.color"
                outlined
                dense
                hide-details
                v-model="record.indikator"
                :filled="record.indikator"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Satuan"
                :color="theme.color"
                outlined
                dense
                hide-details
                v-model="record.satuan"
                :filled="record.satuan"
              ></v-text-field>
            </v-col>
            <v-col col="12">
              <v-select
                label="Target Per Tahun"
                :color="theme.color"
                outlined
                dense
                hide-details
                v-model="record.target"
                :filled="record.target"
                :items="targets"
              ></v-select>
            </v-col>

            <v-col cols="12">
              <v-text-field
                label="Nilai Anggaran"
                :color="theme.color"
                outlined
                dense
                hide-details
                v-model="record.anggaran"
                :filled="record.anngaran"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                label="Realisasi"
                :color="theme.color"
                outlined
                dense
                hide-details
                v-model="record.realisasi"
                :filled="record.realisasi"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Sumber Anggaran"
                :color="theme.color"
                outlined
                dense
                hide-details
                v-model="record.sumber"
                :filled="record.sumber"
              ></v-text-field>
            </v-col>

          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-end">
            <v-btn
              outlined
              :color="theme.color"
              v-show=" !form.edit"
              @click="postAddNewRecord"
            >Tambah</v-btn>
            <v-btn
              outlined
              :color="theme.color"
              v-show="form.edit"
              @click="postUpdateRecord"
            >Ubah</v-btn>
            <v-btn
              outlined
              color="grey"
              @click="closeForm"
            >Batal</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
    <v-col cols="12">
      <v-dialog
        transition="dialog-bottom-transition"
        v-model="formrealisasi.show"
        :max-width="device.desktop ? `600px` : `100%`"
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
            >mdi-circle</v-icon> Formulir Realisasi & Progres Renaksi
          </v-toolbar>
          <v-card-text class="mt-2">

            <v-col cols="12">
              <v-text-field
                label="Indikator Kinerja"
                :color="theme.color"
                outlined
                dense
                hide-details
                v-model="record.indikator"
                :filled="record.indikator"
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Satuan"
                :color="theme.color"
                outlined
                dense
                hide-details
                v-model="record.satuan"
                :filled="record.satuan"
                disabled
              ></v-text-field>
            </v-col>
            <v-col col="12">
              <v-select
                label="Target Per Tahun"
                :color="theme.color"
                outlined
                dense
                hide-details
                v-model="record.target"
                :filled="record.target"
                :items="targets"
                disabled
              ></v-select>
            </v-col>
            <v-col>
              <span>Realsisasi dan Capaian</span>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Capaian (%)"
                :color="theme.color"
                outlined
                dense
                hide-details
                v-model="record.persentasi"
                :filled="record.persentasi"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                label="Nilai Anggaran"
                :color="theme.color"
                outlined
                dense
                hide-details
                v-model="record.anggaran"
                :filled="record.anngaran"
                disabled
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                label="Realisasi"
                :color="theme.color"
                outlined
                dense
                hide-details
                v-model="record.realisasi"
                :filled="record.realisasi"
              ></v-text-field>
            </v-col>

          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-end">
            <v-btn
              outlined
              :color="theme.color"
              @click="postUpdateRecord"
            >Kirim</v-btn>
            <v-btn
              outlined
              color="grey"
              @click="closeFormRealisasi"
            >Batal</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </div>
</template>
          
          <script>
import { mapActions, mapState } from "vuex";
import "animate.css";

export default {
  name: "pilar",
  data: () => ({
    num: 1,
    headers: [
      {
        text: "OPD|INSTANSI",
        align: "start",
        sortable: false,
        value: "opd",
      },
      {
        text: "PERIODE",
        align: "start",
        sortable: false,
        value: "periode",
      },
      {
        text: "PILAR",
        align: "start",
        sortable: false,
        value: "pilar",
      },
      {
        text: "PROGRAM",
        align: "start",
        sortable: false,
        value: "program",
      },
      {
        text: "KEGIATAN",
        align: "start",
        sortable: false,
        value: "kegiatan",
      },
      {
        text: "TAHUN KE-",
        align: "center",
        sortable: false,
        value: "target",
      },
      {
        text: "Capaian (%)",
        align: "center",
        sortable: false,
        value: "persentasi",
      },

      {
        text: "AKSI",
        value: "id",
        width: 100,
        sortable: false,
        align: "center",
        show: false,
      },
    ],
    search: null,
    path: null,
    filename: null,
    pilars: [],
    programs: [],
    kegiatans: [],
    targets: [
      { text: "Tahun Ke 1", value: 1 },
      { text: "Tahun Ke 2", value: 2 },
      { text: "Tahun Ke 3", value: 3 },
      { text: "Tahun Ke 4", value: 4 },
      { text: "Tahun Ke 5", value: 5 },
    ],
    periodes: [],
    formrealisasi: {
      show: false,
      record: {},
    },
  }),
  computed: {
    ...mapState([
      "page",
      "theme",
      "http",
      "device",
      "record",
      "records",
      "loading",
      "event",
      "snackbar",
      "form",
      "table",
    ]),
    filterItems() {
      if (this.search != null) {
        return this.records.filter((item) => {
          return (
            item.opd.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
            item.pilar.toLowerCase().indexOf(this.search.toLowerCase()) > -1
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
      dataUrl: "api/keselamatan/monitoring-renaksi",
      pagination: false,
      title: "MONITORING RENAKSI",
      subtitle: "Berikut Daftar Seluruh Rencana Aksi Yang Tersedia",
      showtable: true,
      breadcrumbs: [
        {
          text: "Monitoring Renaksi",
          disabled: true,
          href: "",
        },
      ],
      actions: {
        refresh: true,
        add: false,
        edit: false,
        delete: true,
        bulkdelete: false,
        print: false,
        export: false,
        help: false,
      },
    });
    this.fetchPilars();
    this.fetchPeriodes();
    this.fetchRecords();
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
      this.filename = null;
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
      });
    },
    editRecord: function (val) {
      this.postEdit(val).then(() => {
        this.filename = this.record.filename;
      });
      this.setForm({
        add: true,
        edit: true,
      });
    },
    postUpdateRecord: function () {
      this.postUpdate(this.record).then(() => {
        this.closeForm();
        this.closeFormRealisasi();
      });
    },
    postDeleteRecord: function (val) {
      this.postConfirmDelete(val);
    },
    postDownload(val) {
      window.open(val, "__blank");
    },
    uploadFile: function () {
      this.assignFileBrowse({
        fileType: [".pdf"],
        query: {
          doctype: "documents",
        },
        callback: (response) => {
          setTimeout(() => {
            this.filename = response.name;
            this.record.filename = response.name;
          }, 500);
        },
      });
    },
    fetchPilars: async function () {
      try {
        let { data } = await this.http.get("api/combo/pilar");
        this.pilars = data;
      } catch (error) {}
    },
    fetchPrograms: async function () {
      try {
        let { data } = await this.http.get(
          "api/combo/program/" + this.record.pilar_uuid
        );
        this.programs = data;
      } catch (error) {}
    },
    fetchKegiatans: async function () {
      try {
        let { data } = await this.http.get(
          "api/combo/kegiatan/" + this.record.program_uuid
        );
        this.kegiatans = data;
      } catch (error) {}
    },
    fetchPeriodes: async function () {
      try {
        let { data } = await this.http.get("api/combo/periode");
        this.periodes = data;
      } catch (error) {}
    },
    openFormRealisasi: function (val) {
      this.postEdit(val).then(() => {
        this.filename = this.record.filename;
      });
      this.formrealisasi.show = true;
    },
    closeFormRealisasi: function () {
      this.formrealisasi.show = false;
    },
  },
  watch: {
    "record.pilar_uuid": {
      handler() {
        this.fetchPrograms();
      },
    },
    "record.program_uuid": {
      handler() {
        this.fetchKegiatans();
      },
    },
  },
};
</script>