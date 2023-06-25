<template>
  <div class="home pa-6">
    <v-flex
      row
      class="pb-2"
    >
      <v-icon :color="theme.color">mdi-hand-heart</v-icon>
      <v-subheader class="text-h6">
        <h4>Daftar PPKm</h4>
      </v-subheader>
    </v-flex>
    <v-flex class="pb-5 pl-7">
      <div class="grey--text mb-2">
        Daftar Seluruh PPKm yang tersedia
      </div>
    </v-flex>

    <v-row>
      <v-col cols="12">
        <v-card class="animated animate__fadeInUp">
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
              v-model="table.options.search"
              append-icon="mdi-magnify"
              label="Pencarian"
              single-line
              hide-details
              dense
              solo
              placeholder="Judul dari permohonan"
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
            show-select
            v-model="selected"
          >
            <v-progress-linear
              slot="progress"
              :color="theme.color"
              height="1"
              indeterminate
            ></v-progress-linear>
            <template v-slot:item.status="{ value }">
              <v-chip
                small
                :color="value.color"
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
                  <v-list-item @click="openTindakLanjut(value)">
                    <v-list-item-title>
                      <v-icon :color="theme.color">mdi-notebook-edit-outline</v-icon>
                      Tindak Lanjiut
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="editRecord(value)">
                    <v-list-item-title>
                      <v-icon :color="theme.color">mdi-account-supervisor-circle</v-icon>
                      Lihat Komunitas
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
        v-model="form.add"
        :max-width="device.desktop ? `600px` : `100%`"
        persistent
      >
        <v-card>
          <v-toolbar
            :color="theme.color"
            :dark="theme.mode"
          >
            <v-icon class="mr-1">mdi-circle</v-icon>Formulir Permohonan PPKm
          </v-toolbar>
          <v-card-text class="mt-2">
            <v-row>
              <v-col cols="12">
                <div class="subtitle-1 text-center grey--text">PERMOHOAN PPKm</div>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Pengusul Permohonan"
                  outlined
                  dense
                  hide-details
                  v-model="record.inisial"
                  :color="theme.color"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Nama Pengusul Permohonan"
                  outlined
                  dense
                  hide-details
                  v-model="record.nama_inisial"
                  :color="theme.color"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Judul"
                  outlined
                  dense
                  hide-details
                  v-model="record.judul"
                  rows="3"
                  :color="theme.color"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Tema"
                  outlined
                  dense
                  hide-details
                  v-model="record.tema"
                  rows="3"
                  :color="theme.color"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <div class="subtitle-2">Perkiraan Waktu Permohonan Pelaksanaan</div>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col :cols="device.desktop ? `6`:`12`">
                    <v-text-field
                      label="Tanggal Mulai"
                      outlined
                      dense
                      hide-details
                      v-model="record.tanggal_permohonan_mulai"
                      :color="theme.color"
                      type="date"
                    ></v-text-field>
                  </v-col>
                  <v-col :cols="device.desktop ? `6`:`12`">
                    <v-text-field
                      label="Tanggal Selesai"
                      outlined
                      dense
                      hide-details
                      v-model="record.tanggal_permohonan_selesai"
                      :color="theme.color"
                      type="date"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12">
                <div class="subtitle-2">Hasil Verifikasi Permohonan</div>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Keterangan"
                  outlined
                  dense
                  hide-details
                  :color="theme.color"
                  rows="3"
                  v-model="record.keterangan"
                ></v-textarea>
              </v-col>

            </v-row>

          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-end">
            <v-btn
              outlined
              :color="theme.color"
              v-show="!form.edit"
              @click="postAddNewRecord"
            >Simpan</v-btn>
            <v-btn
              outlined
              :color="theme.color"
              v-show="form.edit"
              @click="postUpdateRecord"
            >Proses</v-btn>
            <v-btn
              outlined
              color="grey"
              @click="formClose()"
            >Batal</v-btn>
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
      {
        text: "DARI",
        align: "start",
        value: "inisial",
      },
      {
        text: "NAMA/KOMUNITAS",
        align: "start",
        value: "nama",
        sortable: false,
      },
      {
        text: "JUDUL",
        align: "start",
        value: "judul",
      },

      {
        text: "WAKTU",
        value: "waktu",
        width: 200,
        align: "center",
        sortable: false,
      },
      {
        text: "STATUS",
        value: "status",
        width: 200,
        align: "center",
        sortable: false,
      },

      {
        text: "AKSI",
        value: "id",
        align: "center",
        sortable: false,
        width: 100,
      },
    ],
    search: null,
    form: {
      add: false,
      edit: false,
    },

    selected: [],
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
      dataUrl: "api/data/ppkm",
      pagination: true,
    });
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
      "postConfirmBulkDelete",
      "setLoading",
    ]),

    postAddNewRecord: function () {
      this.postAddNew(this.record).then(() => {
        this.fetchRecords();
        this.form.add = false;
        this.form.edit = false;
      });
    },
    editRecord: function (val) {
      this.postEdit(val);
      this.form.add = true;
      this.form.edit = true;
    },

    postUpdateRecord: function () {
      this.postUpdate(this.record).then(() => {
        this.fetchRecords();
        this.form.add = false;
        this.form.edit = false;
      });
    },

    postDeleteRecord: function (val) {
      this.postConfirmDelete(val);
    },

    postBulkDeleteRecord: function () {
      this.postConfirmBulkDelete(this.selected);
    },
    postDownload(val) {
      window.open(val, "__blank");
    },

    postKirimPermohonan: async function (val) {
      try {
        this.setLoading({ dialog: true, text: "Proses kirim permohonan" });
        let {
          data: { status, message },
        } = await this.http.post("api/dosen/pkm-kirim-permohonan", { id: val });
        if (!status) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
          return;
        }

        this.snackbar.color = this.theme.color;
        this.snackbar.text = message;
        this.snackbar.state = true;
        this.fetchRecords();
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = "Opps..., terjadi kesalahan " + error;
        this.snackbar.state = true;
      } finally {
        this.setLoading({ dialog: false, text: "" });
      }
    },
    postBatalkanPermohonan: async function (val) {
      try {
        this.setLoading({ dialog: true, text: "Proses batalkan permohonan" });
        let {
          data: { status, message },
        } = await this.http.post("api/dosen/pkm-batalkan-permohonan", {
          id: val,
        });
        if (!status) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
          return;
        }

        this.snackbar.color = this.theme.color;
        this.snackbar.text = message;
        this.snackbar.state = true;
        this.fetchRecords();
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = "Opps..., terjadi kesalahan " + error;
        this.snackbar.state = true;
      } finally {
        this.setLoading({ dialog: false, text: "" });
      }
    },

    formOpen: function () {
      this.form.add = true;
    },

    formClose: function () {
      this.form.add = false;
      this.form.edit = false;
    },

    openTindakLanjut: function (val) {
      this.$router.push({
        name: "data-ppkm-tindak-lanjut",
        params: {
          id: val,
        },
      });
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
