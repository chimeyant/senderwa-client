<template>
  <div :class="device.desktop ? `home pa-6 grey lighten-4`:`home pa-0 grey lighten-4`">

    <v-row>
      <v-col cols="12">
        <v-card class="animated animate__bounceIn rounded-0">
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
              color="orange dark-3"
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
                    @click="openScanBarcode(value)"
                    v-show="page.actions.edit"
                  >
                    <v-list-item-title>
                      <v-icon
                        class="mr-1"
                        :color="theme.color"
                      >mdi-qrcode</v-icon>Pindai Barcode
                    </v-list-item-title>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item
                    @click="editRecord(value)"
                    v-show="page.actions.edit"
                  >
                    <v-list-item-title>
                      <v-icon
                        class="mr-1"
                        color="orange"
                      >mdi-pencil-circle</v-icon>Ubah Data
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    @click="postDeleteRecord(value)"
                    v-show="page.actions.delete"
                  >
                    <v-list-item-title>
                      <v-icon
                        color="red"
                        class="mr-1"
                      >mdi-delete-circle</v-icon>Hapus Data
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
                    <v-list-item-subtitle>{{ item.nip }} </v-list-item-subtitle>
                    <v-list-item-subtitle>{{ item.gol }} </v-list-item-subtitle>
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
                        <v-list-item
                          @click="editRecord(item.uuid)"
                          v-show="page.actions.edit"
                        >
                          <v-list-item-title>
                            <v-icon :color="theme.color">mdi-qr</v-icon>
                            Scan Barcode
                          </v-list-item-title>
                        </v-list-item>
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
            >mdi-circle</v-icon> Formulir Pengaturan Whatssapp
          </v-toolbar>
          <v-card-text class="mt-2">
            <v-col col="12">
              <v-text-field
                outlined
                :color="theme.color"
                :hide-details="device.desktop"
                label="Nama Service"
                placeholder="Masukan nama service "
                v-model="record.name"
                :filled="record.name"
                dense
              ></v-text-field>
            </v-col>
            <v-col col="12">
              <v-text-field
                outlined
                :color="theme.color"
                :hide-details="device.desktop"
                label="Nomor Telpon (WA)"
                placeholder="0812xxx"
                v-model="record.phone_number"
                :filled="record.phone_number"
                dense
              ></v-text-field>
            </v-col>
            <v-col col="12">
              <v-text-field
                outlined
                :color="theme.color"
                :hide-details="device.desktop"
                label="Jarak Pengiriman Per Pesan"
                placeholder="Min : 5 (Detaik)"
                type="number"
                v-model="record.queue"
                :filled="record.queue"
                dense
              ></v-text-field>
            </v-col>
            <v-col col="12">
              <v-text-field
                outlined
                :color="theme.color"
                :hide-details="device.desktop"
                label="API KEY (OTOMATIS)"
                placeholder=""
                v-model="record.api_key"
                :filled="record.api_key"
                disabled
                dense
              ></v-text-field>
            </v-col>
            <v-col col="12">
              <v-text-field
                outlined
                :color="theme.color"
                :hide-details="device.desktop"
                label="Callback URL"
                placeholder="Optional Jikan anda memerlukan informasi balik"
                v-model="record.callback_url"
                :filled="record.callback_url"
                dense
              ></v-text-field>
            </v-col>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-end">
            <v-btn
              outlined
              :color="theme.color"
              v-show="!form.edit"
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
    <v-col col="12">
      <v-dialog
        transition="dialog-bottom-transition"
        v-model="barcode.form.show"
        :max-width="device.desktop ? `600px` : `100%`"
        persistent
      >
        <v-card>
          <v-toolbar
            :color="theme.color"
            dark
          >QR Code Scan</v-toolbar>
          <v-card-text>
            <v-row class="mt-2">
              <v-col cols="5">
                <v-col cols=12>
                  <center>
                    <img
                      :src="whatsapp.qr.show ? whatsapp.qr.src : whatsapp.authenticated.imgUrl "
                      alt="QR Code"
                      :width="whatsapp.qr.show ? `200px`:`100px`"
                      :height="whatsapp.qr.show ? `200px`:`100px`"
                    >
                  </center>
                </v-col>
                <v-col cols=12>
                  <center>
                    {{ whatsapp.qr.message }}
                  </center>
                </v-col>
              </v-col>

              <v-col
                cols="7"
                class="mt-5"
              >
                <table>
                  <tr>
                    <td>ID</td>
                    <td class="mr-2">:</td>
                    <td class="font-weight-bold">{{ whatsapp.authenticated.id }}</td>
                  </tr>
                  <tr>
                    <td>PENGGUNA</td>
                    <td class="mr-2">:</td>
                    <td class="font-weight-bold">{{ whatsapp.authenticated.name }}</td>
                  </tr>
                  <td>STATUS</td>
                  <td class="mr-2">:</td>
                  <td class="font-weight-bold">{{ whatsapp.authenticated.status}}</td>
                </table>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-end">
            <v-btn
              outlined
              color="red"
              @click="logout(record.id)"
            >LOGOUT</v-btn>
            <v-btn
              outlined
              color="grey"
              @click="closeScanBarcode"
            >OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </div>
</template>
      
<script>
import { mapActions, mapState } from "vuex";
import "animate.css";
import { io } from "socket.io-client";

export default {
  name: "Home",
  data: () => ({
    num: 1,
    headers: [
      {
        text: "SERVICE",
        align: "start",
        sortable: false,
        value: "name",
      },
      {
        text: "NOMOR",
        align: "start",
        sortable: false,
        value: "phone_number",
      },
      {
        text: "STATUS",
        align: "start",
        sortable: false,
        value: "status",
        width: 150,
      },
      {
        text: "AKSI",
        value: "id",
        width: 100,
        sortable: false,
        align: "center",
      },
    ],
    search: null,
    path: null,
    socket: null,
    barcode: {
      form: {
        show: false,
      },
      qr: {
        id: null,
        src: null,
        show: true,
      },
    },

    ws: null,
    chat: null,
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
      "whatsapp",
    ]),
    filterItems() {
      if (this.search != null) {
        return this.records.filter((item) => {
          return (
            item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
            item.nip.toLowerCase().indexOf(this.search.toLowerCase()) > -1
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
      dataUrl: "api/superadmin/master-data/pengaturan",
      pagination: false,
      title: "MASTER PENGATURAN",
      subtitle: "Berikut Daftar Seluruh Pengaturan Yang Tersedia",
      showtable: true,
      breadcrumbs: [
        {
          text: "Data Master",
          disabled: true,
          href: "",
        },
        {
          text: "Pengaturan",
          disabled: false,
          href: "",
        },
      ],
      actions: {
        refresh: true,
        add: true,
        edit: true,
        delete: true,
        bulkdelete: true,
        print: false,
        export: false,
        help: false,
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
      "setForm",
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
    openScanBarcode: function (val) {
      this.postEdit(val)
        .then(async () => {
          let { data } = await this.http.post(
            "api/superadmin/master-data/pengaturan-register",
            this.record
          );
        })
        .then(() => {
          this.barcode.form.show = true;
        });
    },
    closeScanBarcode: function () {
      this.barcode.form.show = false;
    },
  },
};
</script>