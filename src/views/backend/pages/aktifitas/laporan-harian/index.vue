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
                  v-show="page.actions.print"
                >
                  <v-icon
                    :color="theme.mode == 'dark' ? `white` : `black`"
                    @click=""
                  >mdi-file-excel</v-icon>
                </v-btn>
              </template>
              <span>Export Data Excel</span>
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

                <strong class="body-1">{{ value }}%</strong>

              </v-progress-linear>
            </template>
            <template v-slot:item.proses="{ value }">
              <div class="pa-2">
                <v-progress-circular
                  :rotate="360"
                  :size="50"
                  :width="10"
                  :value="value.val"
                  :color="value.color"
                >
                  {{ value.val }}
                </v-progress-circular>
              </div>
            </template>

            <template v-slot:item.problem="{ value }">
              <div
                class="pa-2"
                v-html="value"
              ></div>
            </template>

            <template v-slot:item.status="{ value }">
              <v-chip
                :color="value.color"
                small
                class="white--text"
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
                    @click="postSelesai(value)"
                    v-show="page.actions.edit"
                  >
                    <v-list-item-title>
                      <v-icon
                        class="mr-1"
                        :color="theme.color"
                      >mdi-timeline-check</v-icon>Set Status Selesai
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
            >mdi-circle</v-icon> Formulir Input Laporan Harian
          </v-toolbar>
          <v-card-text class="mt-2">
            <v-col col="12">
              <v-select
                label="Jenis Kegiatan"
                outlined
                dense
                hide-details
                :color="theme.color"
                v-model="record.jenis_kegiatan_uuid"
                :items="jeniskegiatans"
              ></v-select>
            </v-col>
            <v-col col="12">
              <v-select
                label="Status"
                outlined
                dense
                hide-details
                :color="theme.color"
                v-model="record.status"
                :items="status"
              ></v-select>
            </v-col>
            <v-col col="12">
              <tiptap-vuetify
                v-model="record.problem"
                :extensions="extensions"
                placeholder="Identifikasi permasalahan atau penjelasan singkat pekerjaan..!"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Tanggal Pengerjaan"
                outlined
                dense
                hide-details
                v-model="record.job_date"
                :color="theme.color"
                type="date"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <tiptap-vuetify
                v-model="record.job_desc"
                :extensions="extensions"
                placeholder="Uraian Pekerjaan..."
              />
            </v-col>
            <v-col>
              <div class="subtitle-2 mb-5">PROSENTASE PEKERJAAN</div>
            </v-col>
            <v-col cols="12">
              <v-slider
                hint="Prosentases Pekerjaan"
                max="100"
                min="0"
                :thumb-color="proseslabel.color"
                thumb-label="always"
                :color="theme.color"
                v-model="record.proses"
              ></v-slider>
            </v-col>

            <v-col cols="12">
              <v-text-field
                label="Foto Sebelum Pengerjaan"
                append-outer-icon="attachment"
                v-model="attachment_before"
                :color="theme.color"
                outlined
                dense
                @click:append-outer="uploadFileBefore"
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Foto Sesudah Pengerjaan"
                append-outer-icon="attachment"
                v-model="attachment_after"
                :color="theme.color"
                outlined
                dense
                @click:append-outer="uploadFileAfter"
                hide-details
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
  </div>
</template>
        
  <script>
import { mapActions, mapState } from "vuex";
import "animate.css";
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from "tiptap-vuetify";

export default {
  name: "laporan-harian",
  components: {
    TiptapVuetify,
  },
  data: () => ({
    num: 1,
    headers: [
      {
        text: "TANGGAL",
        align: "center",
        sortable: false,
        value: "job_date",
        width: 130,
      },
      {
        text: "JENIS",
        align: "start",
        sortable: false,
        value: "jenis_kegiatan",
      },
      { text: "MASALAH", value: "problem" },
      {
        text: "PROGRESS (%)",
        value: "proses",
        align: "center",
        sortable: false,
        width: 130,
      },
      {
        text: "STATUS",
        value: "status",
        align: "center",
        sortable: false,
        width: 100,
      },
      {
        text: "AKSI",
        value: "id",
        width: 100,
        sortable: false,
        align: "center",
      },
    ],
    status: [
      { text: "Baru", value: "baru" },
      { text: "Lanjutan", value: "lanjutan" },
    ],
    search: null,
    path: null,
    jeniskegiatans: [],
    proseslabel: { label: "thumb-color", val: 0, color: "blue" },
    attachment_before: "",
    attachment_after: "",
    extensions: [
      History,
      Blockquote,
      Bold,
      Strike,
      Italic,
      ListItem,
      BulletList,
      OrderedList,
      [
        Heading,
        {
          options: {
            levels: [1, 2, 3],
          },
        },
      ],

      Paragraph,
    ],
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
      dataUrl: "api/aktifitas/laporan-harian",
      pagination: false,
      title: "LAPORAN HARIAN",
      subtitle: "Berikut Daftar Seluruh Laporan Harian Yang Tersedia",
      showtable: true,
      breadcrumbs: [
        {
          text: "Aktifitas",
          disabled: true,
          href: "",
        },
        {
          text: "Laporan Harian",
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
        print: true,
        export: false,
        help: false,
      },
    });
    this.fetchRecords();
  },
  mounted() {
    this.fetchJenisKegiatans();
  },
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
      this.postEdit(val).then((res) => {
        this.attachment_before = this.record.attachment_before;
        this.attachment_before = this.record.attachment_after;
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
    fetchJenisKegiatans: async function () {
      try {
        let { data } = await this.http.get("api/combo/jenis-kegiatan");
        this.jeniskegiatans = data;
      } catch (error) {}
    },
    uploadFileBefore: function () {
      this.assignFileBrowse({
        fileType: [".png", ".jpeg", ".jpg"],
        query: {
          doctype: "documents",
        },
        callback: (response) => {
          setTimeout(() => {
            this.attachment_before = response.name;
            this.record.attachment_before = response.name;
          }, 500);
        },
      });
    },
    uploadFileAfter: function () {
      this.assignFileBrowse({
        fileType: [".png", ".jpeg", ".jpg"],
        query: {
          doctype: "documents",
        },
        callback: (response) => {
          setTimeout(() => {
            this.attachment_after = response.name;
            this.record.attachment_after = response.name;
          }, 500);
        },
      });
    },
    postSelesai: async function (val) {
      try {
        let {
          data: { success, code, response, error },
        } = await this.http.post("api/aktifitas/laporan-harian-set-selesai", {
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
        this.snackbar.color = "red";
        this.snackbar.text = "Opps..., terjadi kesalahan";
        this.snackbar.state = true;
      }
    },
  },
};
</script>