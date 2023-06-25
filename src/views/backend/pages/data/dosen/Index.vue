<template>
  <div class="home pa-6">
    <v-flex
      row
      class="pb-2"
    >
      <v-icon :color="theme.color">engineering</v-icon>
      <v-subheader class="text-h6">
        <h4>DATA DOSEN/PENGAJAR</h4>
      </v-subheader>
    </v-flex>
    <v-flex class="pb-5 pl-7">
      <div class="grey--text mb-2">
        Daftar Seluruh Data Dosen Yang Tersedia
      </div>
    </v-flex>

    <v-row>
      <v-col cols="12">
        <v-card class="animated animate__fadeInUp">
          <v-card-title :class="`flex flex-row-reverse ` + theme.color + ` lighten-1`">
            <v-btn
              icon
              @click="fetchRecords"
            >
              <v-icon color="white">autorenew</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="table.options.search"
              append-icon="mdi-magnify"
              label="Pencarian"
              single-line
              hide-details
              dense
              solo
              :color="theme.color"
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="records"
            :options.sync="table.options"
            :server-items-length="table.total"
            class="elevation-2"
            :color="theme.color"
            :loading="loading.table"
            :search="table.options.search"
            loading-text="Loading... Please wait"
          >
            <v-progress-linear
              slot="progress"
              :color="theme.color"
              height="1"
              indeterminate
            ></v-progress-linear>
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
                  <v-list-item @click="editRecord(value)">
                    <v-list-item-title>
                      <v-icon color="green">mdi-account-tie</v-icon>
                      Lihat Identitas Dosen
                    </v-list-item-title>
                  </v-list-item>

                </v-list>
              </v-menu>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-col cols="12">
      <v-dialog
        transition="dialog-bottom-transition"
        v-model="form.verifikasi"
        :max-width="device.desktop ? `800px` : `100%`"
        persistent
      >
        <v-card>
          <v-toolbar
            :color="theme.color"
            :dark="theme.mode"
          >
            <v-icon class="mr-1">mdi-circle</v-icon>Data Identitas Dosen
          </v-toolbar>
          <v-card-text class="mt-2">
            <v-row>
              <v-col cols="12">
                <div class="text-h6 text-center mt-2">Identitas Dosen Pengajar </div>
              </v-col>
              <v-col :cols="device.desktop ? `10` : `12`">
                <v-col cols="12">
                  <v-text-field
                    label="Nomor Register"
                    outlined
                    dense
                    hide-details
                    v-model="record.nomor_register"
                    :color="theme.color"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Nama Lengkan"
                    outlined
                    dense
                    hide-details
                    v-model="record.name"
                    :color="theme.color"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-row>
                    <v-col :cols="device.desktop ? `6`:`12`">
                      <v-select
                        label="Jenis Kelamin"
                        outlined
                        dense
                        hide-details
                        :color="theme.color"
                        v-model="record.jenis_kelamin"
                        :items="jeniskelamins"
                      ></v-select>
                    </v-col>
                    <v-col :cols="device.desktop ? `3`:`12`">
                      <v-text-field
                        label="Gelar Depan"
                        outlined
                        dense
                        hide-details
                        :color="theme.color"
                        v-model="record.gelar_depan"
                      ></v-text-field>
                    </v-col>
                    <v-col :cols="device.desktop ? `3`:`12`">
                      <v-text-field
                        label="Gelar Depan"
                        outlined
                        dense
                        hide-details
                        :color="theme.color"
                        v-model="record.gelar_belakang"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="NIK (Nomor Induk Kependudukan"
                    outlined
                    dense
                    hide-details
                    v-model="record.nik"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="NIDN (Nomor Induk Dosen Nasional)"
                    outlined
                    dense
                    hide-details
                    v-model="record.nidn"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-row>
                    <v-col :cols="device.desktop ? `9`: `12`">
                      <v-text-field
                        label="Tempat Lahir"
                        outlined
                        dense
                        hide-details
                        v-model="record.tempat_lahir"
                        :color="theme.color"
                      ></v-text-field>
                    </v-col>
                    <v-col :cols="device.desktop ? `3`: `12`">
                      <v-text-field
                        label="Tanggal Lahir"
                        outlined
                        dense
                        hide-details
                        v-model="record.tanggal_lahir"
                        :color="theme.color"
                        type="date"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Email"
                    outlined
                    dense
                    hide-details
                    v-model="record.email"
                    :color="theme.color"
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                    label="Pendidikan"
                    outlined
                    dense
                    hide-details
                    :color="theme.color"
                    v-model="record.pendidikan_id"
                    :items="pendidikans"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-select
                    label="Instansi"
                    outlined
                    dense
                    hide-details
                    :color="theme.color"
                    v-model="record.instansi_id"
                    :items="instansis"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Mata Kuliah"
                    outlined
                    dense
                    hide-details
                    :color="theme.color"
                    v-model="record.mata_kuliah"
                    rows="3"
                  >{{record.mata_kuliah}}</v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Ketertarikan Materi"
                    outlined
                    dense
                    hide-details
                    :color="theme.color"
                    v-model="record.interest"
                    rows="3"
                  >{{record.interest}}</v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Telpoi"
                    outlined
                    dense
                    hide-details
                    v-model="record.telpon"
                    :color="theme.color"
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Alamat"
                    outlined
                    dense
                    hide-details
                    :color="theme.color"
                    v-model="record.alamat"
                    rows="3"
                  >{{record.alamat}}</v-textarea>
                </v-col>
                <v-col cols="12">
                  <div class="subtitle-1 grey--text">DOKUMEN PERSYARATAN</div>
                </v-col>
                <v-col cols="12">

                  <v-data-table
                    :headers="documents.headers"
                    :items="documents.records"
                    :items-per-page="10"
                    class="elevation-2"
                    :color="theme.color"
                    :loading="loading.table"
                    loading-text="Loading... Please wait"
                    :search="search"
                  >
                    <v-progress-linear
                      slot="progress"
                      :color="theme.color"
                      height="1"
                      indeterminate
                    ></v-progress-linear>
                    <template v-slot:item.name="{ value }">
                      <v-badge
                        v-if="value.wajib"
                        color="red"
                        content="Wajib"
                      >
                        {{ value.name }}
                      </v-badge>
                      <span v-else>
                        {{ value.name }}
                      </span>
                    </template>
                    <template v-slot:item.status="{ value }">
                      <v-chip
                        small
                        :color="value.color"
                      >{{value.text}}</v-chip>
                    </template>
                    <template v-slot:item.aksi="{ value }">
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
                          >mdi-dots-vertical-circle-outline</v-icon>
                        </template>

                        <v-list>
                          <v-list-item @click="postDownload(value.path)">
                            <v-list-item-title>
                              <v-icon color="green">mdi-cloud-download</v-icon> Download Dokumen
                            </v-list-item-title>
                          </v-list-item>

                        </v-list>
                      </v-menu>
                    </template>
                  </v-data-table>
                </v-col>

              </v-col>
              <v-col :cols="device.desktop ? `2` : `12`">
                <v-col cols="12">
                  <v-img
                    :class="[theme + ' lighten-2 with-backdrop']"
                    :aspect-ratio="3 / 4"
                    :src="record.foto_path"
                    :lazy-src="record.foto_path"
                  >

                  </v-img>

                </v-col>
              </v-col>
            </v-row>

          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-end">
            <v-btn
              outlined
              color="grey"
              @click="form.verifikasi= false"
            >Kembali</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Home",
  data: () => ({
    num: 1,
    headers: [
      { text: "#", value: "num", width: "50" },
      {
        text: "NOMOR REGISTER",
        align: "start",
        sortable: false,
        value: "nomor_register",
        width: 200,
      },
      {
        text: "NIDN",
        value: "nidn",
        width: 200,
        align: "center",
        sortable: false,
      },
      { text: "NAMA", value: "name" },
      { text: "INSTANSI", value: "instansi" },
      { text: "AKSI", value: "id", align: "center", sortable: false },
    ],
    search: null,
    form: {
      verifikasi: false,
    },
    jeniskelamins: [
      { text: "Laki-laki", value: "L" },
      { text: "Perempuan", value: "P" },
    ],
    pendidikans: [],
    instansis: [],

    documents: {
      headers: [
        { text: "#", value: "num", width: 75 },

        { text: "DOKUMEN", value: "name", align: "left", sortable: false },

        {
          text: "STATUS",
          value: "status",
          align: "center",
          sortable: false,
          width: 100,
        },
        {
          text: "AKSI",
          value: "aksi",
          width: 100,
          sortable: false,
          align: "center",
        },
      ],

      records: [],
    },
    statuses: [
      { text: "Perbaikan", value: 4 },
      { text: "Diterima", value: 5 },
    ],
  }),
  computed: {
    ...mapState([
      "theme",
      "http",
      "device",
      "record",
      "records",
      "loading",
      "event",
      "table",
      "snackbar",
    ]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/data/dosen",
      pagination: true,
    });

    this.fetchPendidikans();
    this.fetchInstansis();
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
    ]),

    postAddNewRecord: function () {
      this.postAddNew(this.record).then(() => {
        this.fetchRecords();
      });
    },
    editRecord: function (val) {
      this.postEdit(val).then(() => {
        this.fetchDocuments();
      });
      this.form.verifikasi = true;
    },

    postUpdateRecord: function () {
      this.postUpdate(this.record).then(() => {
        this.fetchRecords();
        this.form.verifikasi = false;
      });
    },

    postDeleteRecord: function (val) {
      this.postConfirmDelete(val);
    },

    fetchPendidikans: async function () {
      try {
        let { data } = await this.http.post("api/master-data/combo/pendidikan");
        this.pendidikans = data;
      } catch (error) {}
    },

    fetchInstansis: async function () {
      try {
        let { data } = await this.http.post("api/master-data/combo/instansi");
        this.instansis = data;
      } catch (error) {}
    },
    fetchDocuments: async function () {
      try {
        let { data } = await this.http.post(
          "api/supervisor/verifikasi/dosen-dokumen-persyaratan",
          { dosen_id: this.record.id }
        );

        this.documents.records = data;
      } catch (error) {}
    },

    postDownload(val) {
      window.open(val, "__blank");
    },
  },
  watch: {
    "table.options": {
      handler() {
        this.fetchRecords();
      },
      deep: true,
    },
  },
};
</script>
