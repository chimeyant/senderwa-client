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
                    @click="$router.push({name:'keselamatan-permohonan-ramcheck', params:{itemsPerPage:$route.params.itemsPerPage, page:$route.params.page}})"
                  >mdi-close-circle</v-icon>
                </v-btn>
              </template>
              <span>Tutup</span>
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
                    @click="openFormAdd"
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
                  <v-list-item @click="openPemeriksaanDokumen(value)">
                    <v-list-item-title>
                      <v-icon :color="theme.color">mdi-attachment</v-icon>
                      Lampiran
                    </v-list-item-title>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item
                    @click="openFormEdit(value)"
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
                    <v-list-item-title>{{ item.hari }}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.nama_po }} </v-list-item-subtitle>
                    <v-list-item-subtitle>{{ item.sopir }} </v-list-item-subtitle>
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

                        <v-list-item @click="openPemeriksaanDokumen(item.id)">
                          <v-list-item-title>
                            <v-icon :color="theme.color">mdi-attachment</v-icon>
                            Lampiran
                          </v-list-item-title>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item
                          @click="openFormEdit(item.id)"
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
        text: "HARI/TGL",
        align: "start",
        sortable: false,
        value: "hari",
        width: 200,
      },
      { text: "NO. KENDARAAN", value: "nomor_kendaraan", align: "left" },
      {
        text: "NAMA PO",
        value: "nama_po",
        width: 200,
        align: "center",
      },
      {
        text: "SOPIR",
        value: "nama_pengemudi",
        width: 200,
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
    permohonan: {},
    form: {
      new: false,
      edit: false,
    },
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
      dataUrl:
        "api/keselamatan/pemeriksaan/" + this.$route.params.permohonan_uuid,
      pagination: false,
      title: "DAFTAR PEMERIKSAAN",
      subtitle: "Berikut Daftar Pemeriksaan Ramcheck Yang Tersedia",
      breadcrumbs: [
        {
          text: "Daftar Pemeriksaan",
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
        bulkdelete: true,
        print: false,
        export: false,
      },
    });
    this.fetchInfoPermohonan();
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
    fetchInfoPermohonan: async function () {
      try {
        let { data } = await this.http.get(
          "api/keselamatan/permohonan-ramcheck/" +
            this.$route.params.permohonan_uuid
        );
        this.setPage({
          title: "DAFTAR PEMERIKSAAN " + data.perusahaan.name.toUpperCase(),
        });
      } catch (error) {}
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
        this.fetchRecords();
        this.closeNewForm();
      });
    },
    editRecord: function (val) {
      this.postEdit(val);
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
    openFormAdd: function () {
      this.$router.push({
        name: "keselamatan-pemeriksaan-form-add",
        params: {
          permohonan_uuid: this.$route.params.permohonan_uuid,
          itemsPerPage: this.$route.params.itemsPerPage,
          page: this.$route.params.page,
        },
      });
    },
    openFormEdit: function (val) {
      this.$router.push({
        name: "keselamatan-pemeriksaan-form-edit",
        params: {
          id: val,
          permohonan_uuid: this.$route.params.permohonan_uuid,
          itemsPerPage: this.$route.params.itemsPerPage,
          page: this.$route.params.page,
        },
      });
    },
    openPemeriksaanDokumen: function (val) {
      this.$router.push({
        name: "keselamatan-pemeriksaan-dokumen",
        params: {
          pemeriksaan_uuid: val,
          permohonan_uuid: this.$route.params.permohonan_uuid,
          itemsPerPage: this.$route.params.itemsPerPage,
          page: this.$route.params.page,
        },
      });
    },
  },
};
</script>