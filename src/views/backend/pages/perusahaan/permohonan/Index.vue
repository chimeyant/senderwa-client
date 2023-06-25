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
            :items-per-page="10"
            class="elevation-2"
            :color="theme.color"
            :loading="loading.table"
            loading-text="Loading... Please wait"
            :search="search"
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
                  <v-list-item @click="kirimPermohonan(value)">
                    <v-list-item-title>
                      <v-icon :color="theme.color">mdi-send-circle</v-icon>
                      Kirim Permohonan
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="kirimPembatalan(value)">
                    <v-list-item-title>
                      <v-icon color="red">mdi-email-off</v-icon>
                      Batalkan Permohonan
                    </v-list-item-title>
                  </v-list-item>
                  <v-divider v-if="page.actions.delete || page.actions.edit"></v-divider>
                  <v-list-item
                    @click="editRecord(value)"
                    v-show="page.actions.edit"
                  >
                    <v-list-item-title>
                      <v-icon color="orange">mdi-pencil-circle</v-icon>
                      Ubah Data
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    @click="postDeleteRecord(value)"
                    v-show="page.actions.delete"
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
                    <v-list-item-subtitle>Nomor :{{ item.nomor_surat }} </v-list-item-subtitle>
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
                        <v-list-item @click="kirimPermohonan(value)">
                          <v-list-item-title>
                            <v-icon :color="theme.color">mdi-send-circle</v-icon>
                            Kirim Permohonan
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="kirimPembatalan(value)">
                          <v-list-item-title>
                            <v-icon color="red">mdi-email-off</v-icon>
                            Batalkan Permohonan
                          </v-list-item-title>
                        </v-list-item>
                        <v-divider v-if="page.actions.delete || page.actions.edit"></v-divider>
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
              </v-row>
            </v-col>

            <v-col cols="12">
              <v-select
                disabled
                label="Permohonan Tempat Pemeriksaan"
                outlined
                dense
                hide-details
                v-model="record.lokasi"
                :filled="record.lokasi"
                :items="lokasis"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea
                disabled
                label="Alamat Pemeriksaan"
                rows="2"
                outlined
                dense
                hide-details
                v-model="record.alamat_pemeriksaan"
                :filled="record.alamat_pemeriksaan"
              >{{ record.alamat_pemeriksaan }}</v-textarea>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="File PDF (Max: 2 MB)"
                append-outer-icon="attachment"
                v-model="dokumen"
                :color="theme.color"
                placeholder="Unggah File Surat Permohonan"
                outlined
                dense
                @click:append-outer="uploadFile"
              ></v-text-field>
            </v-col>

          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-end">
            <v-btn
              outlined
              :color="theme.color"
              v-show="!page.edit"
              @click="postAddNewRecord"
            >Simpan</v-btn>
            <v-btn
              outlined
              :color="theme.color"
              v-show="page.edit"
              @click="postUpdateRecord"
            >Ubah</v-btn>
            <v-btn
              outlined
              color="grey"
              @click="closeNewForm"
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
  name: "Home",
  data: () => ({
    num: 1,
    headers: [
      {
        text: "REGISTER",
        align: "start",
        sortable: false,
        value: "noreg",
        width: 50,
      },
      { text: "NO. SURAT", value: "nomor_surat", width: 160, align: "left" },
      {
        text: "WAKTU PEMERIKSAAN",
        value: "tanggal",
        width: 160,
        align: "center",
      },
      { text: "STATUS", value: "status", width: 160, align: "center" },
      {
        text: "AKSI",
        value: "id",
        width: 50,
        sortable: false,
        align: "center",
      },
    ],
    form: {
      new: false,
      edit: false,
    },
    search: null,
    path: null,
    lokasis: [{ text: "KANTOR DISHUB", value: "dishub" }],
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
    ]),
    filterItems() {
      if (this.search != null) {
        return this.records.filter((item) => {
          return (
            item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
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
      dataUrl: "api/perusahaan/permohonan",
      pagination: false,
      title: "DAFTAR PERMOHONAN",
      subtitle: "Berikut Daftar Permohonan Yang Tersedia",
      breadcrumbs: [
        {
          text: "Daftar Permohonan",
          disabled: false,
          href: "",
        },
      ],
      add: false,
      edit: false,
      actions: {
        refresh: true,
        add: true,
        edit: true,
        delete: true,
      },
    });

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
    ]),
    openNewForm: function () {
      this.setRecord({});
      this.page.add = true;
      this.page.edit = false;
      this.dokumen = null;
      this.record.lokasi = "dishub";
      this.record.alamat_pemeriksaan =
        "Kantor Dinas Perhubungan Kab. Tangerang";
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
        this.fetchRecords();
        this.closeNewForm();
      });
    },
    editRecord: function (val) {
      this.postEdit(val).then(() => {
        this.dokumen = this.record.file_surat;
      });

      this.page.add = true;
      this.page.edit = true;
    },
    postUpdateRecord: function () {
      this.postUpdate(this.record).then(() => {
        this.fetchRecords();
        this.page.add = false;
        this.page.edit = false;
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
    kirimPermohonan: async function (val) {
      try {
        let {
          data: { success, code, response, errors },
        } = await this.http.post("api/perusahaan/kirim-permohonan", {
          id: val,
        });
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
        this.snackbar.color = red;
        this.snackbar.text = error;
        this.snackbar.state = true;
      }
    },
    kirimPembatalan: async function (val) {
      try {
        this.setLoading({ dialog: true, text: "Proses pembatalan..." });
        let {
          data: { success, code, response, errors },
        } = await this.http.post("api/perusahaan/kirim-pembatalan", {
          id: val,
        });

        if (!success) {
          this.snackbar.color = "red";
          this.snackbar.text = response.message;
          this.snackbar.state = true;
          return;
        }

        this.snackbar.color = this.theme.color;
        this.snackbar.text = message;
        this.snackbar.state = true;
        this.fetchRecords();
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = error.errors[0].message;
        this.snackbar.state = true;
      } finally {
        this.setLoading({ dialog: false, text: false });
      }
    },
  },
};
</script>