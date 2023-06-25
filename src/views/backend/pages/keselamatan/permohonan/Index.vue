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
                  v-show="page.actions.add"
                >
                  <v-icon
                    :color="theme.mode == 'dark' ? `white` : `black`"
                    @click="openNewForm"
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

            <template v-slot:item.status="{ value }">
              <v-chip
                :color="value.color"
                small
              >{{ value.text }}</v-chip>
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
                  >
                    mdi-dots-vertical-circle-outline
                  </v-icon>
                </template>

                <v-list>

                  <v-list-item @click="openTindakLanjut(value.id)">
                    <v-list-item-title>
                      <v-icon :color="theme.color">mdi-hail</v-icon>
                      Tindak Lanjut
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="openPemeriksaan(value.id)">
                    <v-list-item-title>
                      <v-icon :color="theme.color">mdi-book-search</v-icon>
                      Laporan Pemeriksaan
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="printQr(value)">
                    <v-list-item-title>
                      <v-icon :color="theme.color">mdi-printer</v-icon>
                      Cetak Stiker
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="postSetSelesai(value.id)">
                    <v-list-item-title>
                      <v-icon :color="theme.color">mdi-water-check</v-icon>
                      Set Selesai
                    </v-list-item-title>
                  </v-list-item>
                  <v-divider v-if="page.actions.delete || page.actions.edit"></v-divider>
                  <v-list-item
                    @click="editRecord(item.uuid)"
                    v-show="page.actions.edit"
                    disabled
                  >
                    <v-list-item-title>
                      <v-icon color="orange">mdi-pencil-circle</v-icon>
                      Ubah Data
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    @click="postDeleteRecord(value)"
                    v-show="page.actions.delete"
                    disabled
                  >
                    <v-list-item-title>
                      <v-icon color="red">mdi-delete-circle</v-icon>
                      Hapus Data
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
                    <v-list-item-title>{{ item.noreg }}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.perusahaan }} </v-list-item-subtitle>
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
                        <v-list-item @click="openTindakLanjut(item.aksi.id)">
                          <v-list-item-title>
                            <v-icon :color="theme.color">mdi-memory</v-icon>
                            Tindak Lanjut
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="openPemeriksaan(item.aksi.id)">
                          <v-list-item-title>
                            <v-icon :color="theme.color">mdi-book-search</v-icon>
                            Laporan Pemeriksaan
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="printQr(item.aksi)">
                          <v-list-item-title>
                            <v-icon :color="theme.color">mdi-printer</v-icon>
                            Cetak Stiker
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="postSetSelesai(item.aksi.id)">
                          <v-list-item-title>
                            <v-icon :color="theme.color">mdi-water-check</v-icon>
                            Set Selesai
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
        v-model="page.add"
        :max-width="device.desktop ? `600px` : `100%`"
        persistent
      >
        <v-card>
          <v-toolbar
            :color="theme.color"
            :dark="theme.mode"
          >
            <v-icon class="mr-1">mdi-circle</v-icon> Formulir Permohonan
          </v-toolbar>
          <v-card-text class="mt-2">
            <v-col col="12">
              <v-text-field
                outlined
                :color="theme.color"
                :hide-details="device.desktop"
                label="Nomor Surat"
                v-model="record.nomor_surat"
                :filled="record.nomor_surat"
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea
                label="Perihal"
                :color="theme.color"
                dense
                outlined
                v-model="record.perihal"
                :filled="record.perihal"
                hide-details
                rows="2"
              >
                {{ record.perihal }}
              </v-textarea>
            </v-col>

            <v-col col="12">
              <v-text-field
                outlined
                :color="theme.color"
                :hide-details="device.desktop"
                label="Nama Kontak"
                placeholder="Nama Kontak Yang Bisa Dihubungi"
                v-model="record.kontak_person"
                :filled="record.kontak_person"
                dense
              ></v-text-field>
            </v-col>

            <v-col col="12">
              <v-text-field
                outlined
                :color="theme.color"
                :hide-details="device.desktop"
                label="Nomor Telpon / WA Kontak"
                placeholder="Nomor  Kontak Yang Bisa Dihubungi"
                v-model="record.nomor_telpon"
                :filled="record.nomor_telpon"
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-row>
                <v-col :col="device.desktop ? 8:12">
                  <v-text-field
                    outlined
                    :color="theme.color"
                    :hide-details="device.desktop"
                    label="Tanggal Permohonan Pemeriksaan"
                    placeholder="Tanggal Permohona Pemeriksaan "
                    v-model="record.tanggal_permohonan"
                    :filled="record.tanggal_permohonan"
                    type="date"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col :cols="device.desktop ?4:12">
                  <v-text-field
                    outlined
                    :color="theme.color"
                    :hide-details="device.desktop"
                    label="Jam Permohonan"
                    placeholder="Jam Permohonan"
                    v-model="record.jam_permohonan"
                    :filled="record.jam_permohonan"
                    type="time"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col :col="device.desktop ? 8:12">
                  <v-text-field
                    outlined
                    :color="theme.color"
                    :hide-details="device.desktop"
                    label="Tanggal Pemeriksaan"
                    placeholder="Tanggal Pemeriksaan "
                    v-model="record.tanggal_pelaksanaan"
                    :filled="record.tanggal_pelaksanaan"
                    type="date"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col :cols="device.desktop ?4:12">
                  <v-text-field
                    outlined
                    :color="theme.color"
                    :hide-details="device.desktop"
                    label="Jam Pemeriksaan"
                    placeholder="Jam Pemeriksaan"
                    v-model="record.jam_pelaksanaan"
                    :filled="record.jam_pelaksanaan"
                    type="time"
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12">
              <v-select
                label="Permohonan Tempat Pemeriksaan"
                outlined
                dense
                hide-details
                v-model="record.lokasi"
                :items="lokasis"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="Alamat Pemeriksaan"
                rows="2"
                outlined
                dense
                hide-details
                v-model="record.alamat_pemeriksaan"
                :filled="record.alamat_pemeriksaan"
              ></v-textarea>
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
    
    <script>
import { mapActions, mapState } from "vuex";
import "animate.css";
import jsPDF from "jspdf";
import Qr from "qrious";

export default {
  name: "page-permohonan-ramcheck",
  data: () => ({
    num: 1,
    headers: [
      {
        text: "REGISTER",
        align: "start",
        sortable: false,
        value: "noreg",
        width: 200,
      },
      { text: "PERUSAHAAN", value: "perusahaan", align: "left" },
      {
        text: "WAKTU PEMERIKSAAN",
        value: "tanggal",
        width: 200,
        align: "center",
      },
      { text: "STATUS", value: "status", width: 160, align: "center" },
      {
        text: "AKSI",
        value: "aksi",
        width: 50,
        sortable: false,
        align: "center",
      },
    ],
    search: null,
    path: null,
    lokasis: [
      { text: "KANTOR DISHUB", value: "dishub" },
      { text: "PERUSAHAAN", value: "perusahaan" },
    ],
    dokumen: null,
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
            item.perusahaan.toLowerCase().indexOf(this.search.toLowerCase()) >
              -1 ||
            item.noreg.toLowerCase().indexOf(this.search.toLowerCase()) > -1
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
      dataUrl: "api/keselamatan/permohonan-ramcheck",
      pagination: false,
      title: "DAFTAR PERMOHONAN",
      subtitle: "Berikut Daftar Permohonan Ramcheck Yang Tersedia",
      showtable: true,
      breadcrumbs: [
        {
          text: "Daftar Permohonan",
          disabled: false,
          href: "",
        },
      ],
      actions: {
        refresh: true,
        add: false,
        edit: false,
        delete: true,
      },
    });

    this.fetchRecords().then(() => {
      setTimeout(() => {
        this.table.options.itemsPerPage =
          this.$route.params.itemsPerPage || this.table.options.itemsPerPage;
        this.table.options.page =
          this.$route.params.page || this.table.options.page;
      }, 100);
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
      "assignFileBrowse",
      "setLoading",
      "setRecord",
      "setForm",
      "setTable",
    ]),
    openForm: function () {
      this.setForm({
        add: true,
        edit: false,
      });
      this.setRecord({});
    },
    closeForm: function () {
      this.setForm({
        add: false,
        edit: false,
      });
    },
    openNewForm: function () {
      this.setRecord({});
      this.page.add = true;
      this.page.edit = false;
    },
    closeNewForm: function () {
      this.page.add = false;
      this.page.edit = false;
    },
    openEditForm: function () {
      this.form.new = true;
      this.form.edit = true;
    },
    postAddNewRecord: function () {
      this.postAddNew(this.record).then(() => {
        this.closeForm();
      });
    },
    editRecord: function (val) {
      this.postEdit(val);
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
    uploadFile: function () {
      this.assignFileBrowse({
        fileType: [".pdf"],
        query: {
          doctype: "documents",
        },
        callback: (response) => {
          setTimeout(() => {
            this.dokumen = response.name;
            this.record.file_surat = response.name;
          }, 500);
        },
      });
    },
    openTindakLanjut: function (val) {
      this.$router.push({
        name: "keselamatan-permohonan-tindak-lanjut",
        params: {
          uuid: val,
          itemsPerPage: this.table.options.itemsPerPage,
          page: this.table.options.page,
        },
      });
    },
    openPemeriksaan: function (val) {
      this.$router.push({
        name: "keselamatan-pemeriksaan",
        params: {
          permohonan_uuid: val,
          itemsPerPage: this.table.options.itemsPerPage,
          page: this.table.options.page,
        },
      });
    },
    printQr: function (val) {
      var qr = new Qr({
        value: val.qr,
      });
      qr;

      var doc = new jsPDF("p", "mm", [20, 20]);
      doc.addImage(qr.toDataURL(), 5, 5, 10, 10);
      doc.save(val.id + ".pdf");
    },
    postSetSelesai: async function (val) {
      try {
        let {
          data: { success, response, errors },
        } = await this.http.post(
          "api/keselamatan/permohonan-set-status/" + val,
          {
            status: 3,
          }
        );

        if (!success) {
          this.snackbar.color = "red";
          this.snackbar.text = response.message;
          this.snackbar.state = true;
          return;
        }

        this.snackbar.color = this.theme.color;
        this.snackbar.text = response.message;
        this.snackbar.state = true;
        this.fetchRecords();
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = "Opps.., terjadi kesalahan ..." + error;
        this.snackbar.state = true;
      }
    },
  },
  watch: {},
};
</script>