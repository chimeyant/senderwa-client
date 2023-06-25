<template>
  <div :class="device.desktop ? `home pa-6 grey lighten-4`:`home pa-0 grey lighten-4`">
    <v-row class="pa-1">
      <v-spacer></v-spacer>
      <v-col :cols="device.desktop ? `6` : `12`">
        <v-card class="animated animate__bounceIn rounded-0">
          <v-card-title :class="`white--text ` + theme.color + ` lighten-1`">
            <v-icon
              small
              class="mr-1 orange--text animate__animated animate__flash animate__infinite"
            >mdi-circle</v-icon> Konfirgurasi Informasi Aplikasi
          </v-card-title>

          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-img
                  :class="[theme.color + ' lighten-2 with-backdrop']"
                  :aspect-ratio="16 / 9"
                  :src="bg"
                >
                  <v-row
                    class="justify-center"
                    style="height: 100%"
                  >
                    <v-col
                      cols="3"
                      class="pa-0 mt-5"
                    >
                      <div
                        class="
                          d-flex
                          flex-column
                          align-left
                          justify-center
                          user-select-none
                        "
                        style="height: 100%"
                      >
                        <div style="height: 100%">
                          <v-img
                            :src="bg_nav"
                            style="height: 100%"
                          >
                            <v-fade-transition>
                              <v-overlay
                                opacity="0.01"
                                absolute
                              >
                                <v-btn
                                  icon
                                  @click="editSidebar"
                                >
                                  <v-icon>photo_camera</v-icon>
                                </v-btn>
                              </v-overlay>
                            </v-fade-transition>
                          </v-img>
                        </div>
                      </div>
                    </v-col>

                    <v-col cols="8">
                      <div
                        class="
                          d-flex
                          flex-column
                          align-center
                          justify-center
                          user-select-none
                        "
                        style="height: 100%"
                      >
                        <div style="max-width: 128px; max-height: 128px">
                          <v-hover>
                            <template v-slot:default="{ hover }">
                              <v-img
                                :src="foto"
                                style="max-width: 128px"
                              >
                                <v-fade-transition>
                                  <v-overlay
                                    opacity="0.01"
                                    absolute
                                  >
                                    <v-btn
                                      icon
                                      @click="uploadFoto"
                                    >
                                      <v-icon>photo_camera</v-icon>
                                    </v-btn>
                                  </v-overlay>
                                </v-fade-transition>
                              </v-img>
                            </template>
                          </v-hover>
                        </div>
                        <div style="
                            position: absolute;
                            right: 8px;
                            bottom: 8px;
                            height: 36px;
                            width: 36px;
                          ">
                          <v-btn
                            icon
                            dark
                            @click="editBackground"
                          >
                            <v-icon>edit</v-icon>
                          </v-btn>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-img>
              </v-col>
              <v-col cols="12">
                <v-col cols="12">
                  <v-text-field
                    label="Nama Aplikasi"
                    :color="theme.color"
                    v-model="record.app_name"
                    dense
                    outlined
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Versi"
                    :color="theme.color"
                    v-model="record.app_ver"
                    dense
                    outlined
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Keterangan "
                    :color="theme.color"
                    v-model="record.app_desc"
                    dense
                    outlined
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                    label="Tema"
                    :color="theme.color"
                    v-model="record.app_theme"
                    dense
                    outlined
                    hide-details
                    :items="themes"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-select
                    label="Warna"
                    :color="theme.color"
                    v-model="record.app_color"
                    dense
                    outlined
                    hide-details
                    :items="colors"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Url"
                    :color="theme.color"
                    v-model="record.app_url"
                    dense
                    outlined
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Nama Instansi "
                    :color="theme.color"
                    v-model="record.app_company"
                    dense
                    outlined
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Slogan"
                    :color="theme.color"
                    v-model="record.app_slogan"
                    dense
                    outlined
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Telpon/Whatapps"
                    :color="theme.color"
                    v-model="record.app_wa"
                    dense
                    outlined
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Alamat"
                    v-model="record.app_address"
                    :color="theme.color"
                    dense
                    outlined
                    hide-details
                    rows="3"
                  ></v-textarea>
                </v-col>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="mt-5">
            <v-col class="text-right">
              <v-btn
                outlined
                :color="theme.color"
                @click="fetchUpdate"
              >SIMPAN</v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "app-info",
  data: () => ({
    dialog: false,
    foto: "/",
    bg: "/",
    bg_nav: "/image/bg-nav.jpep",
    provinsis: [],
    kabupatens: [],
    kecamatans: [],
    desas: [],
    record: {
      tanggal_mulai: null,
      tanggal_selesai: null,
    },
    colors: [
      { value: "red", text: "Red" },
      { value: "pink", text: "Pink" },
      { value: "purple", text: "Purple" },
      { value: "deep purple", text: "Deep Pruple" },
      { value: "indigo", text: "Indigo" },
      { value: "light blue", text: "Light Blue" },
      { value: "cyan", text: "Cyan" },
      { value: "teal", text: "Teal" },
      { value: "green", text: "Green" },
      { value: "light green", text: "Light Green" },
      { value: "lemon", text: "Lemon" },
      { value: "yellow", text: "Yellow" },
      { value: "amber", text: "Amber" },
      { value: "orange", text: "Orange" },
      { value: "deep orange", text: "Deep Orange" },
      { value: "brown", text: "Brown" },
      { value: "blue grey", text: "Blue Grey" },
      { value: "grey", text: "Grey" },
    ],
    themes: [
      { value: "light", text: "Light" },
      { value: "dark", text: "Dark" },
    ],
    pesertas: [
      { value: 4, text: "Berkas Diterima" },
      { value: 2, text: "Berkas Diperbaiki" },
      { value: 3, text: "Berkas Pengajuan Diperbaiki" },
      { value: 5, text: "Berkas Ditolak" },
      { value: 6, text: "Berkas Dicabut" },
    ],
  }),

  computed: {
    ...mapState([
      "theme",
      "http",
      "device",
      "records",
      "loading",
      "event",
      "snackbar",
    ]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/profil-sekolah",
      pagination: false,
      title: "INFORMASI APLIKASI",
      subtitle: "Berikut Data Infromasi Aplikasi Anda",
      breadcrumbs: [
        {
          text: "Master Data",
          disabled: false,
          href: "",
        },
        {
          text: "Informasi Aplikasi",
          disabled: false,
          href: "",
        },
      ],
    });
    this.fetchRecord();
  },
  mounted() {},
  methods: {
    ...mapActions([
      "setPage",
      "assignFileBrowse",
      "getUserInfo",
      "fetchRecords",
      "setTheme",
      "getAppInfo",
    ]),

    fetchRecord: async function () {
      let { data } = await this.http.get("api/superadmin/master-data/app-info");

      this.record = data;
      this.foto = data.app_logo_path;
      this.bg = data.app_background_path;
      this.bg_nav = data.app_nav_path;
      this.getAppInfo();
    },
    fetchUpdate: async function () {
      try {
        let {
          data: { status, message, data },
        } = await this.http.put(
          "api/superadmin/master-data/app-info/" + this.record.id,
          this.record
        );

        if (!status) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
          return;
        }

        this.snackbar.color = this.theme.color;
        this.snackbar.text = message;
        this.snackbar.state = true;

        this.record = data;
        this.fetchRecord();
        this.getUserInfo();
      } catch (error) {
        let messages = error.response.data.errors[0].message;
        this.snackbar.color = "red";
        this.snackbar.text = messages;
        this.snackbar.state = true;
      }
    },

    editBackground: function () {
      this.assignFileBrowse({
        fileType: [".jpg", ".jpeg", ".png"],
        query: {
          doctype: "apps",
        },
        callback: (response) => {
          this.bg = response.path;
          this.record.app_background = response.name;
        },
      });
    },

    editSidebar: function () {
      this.assignFileBrowse({
        fileType: [".jpg", ".jpeg", ".png"],
        query: {
          doctype: "apps",
        },
        callback: (response) => {
          this.bg_nav = response.path;
          this.record.app_nav = response.name;
        },
      });
    },

    uploadFoto: function () {
      this.assignFileBrowse({
        fileType: [".jpg", ".jpeg", ".png", ".svg"],
        query: {
          doctype: "apps",
        },
        callback: (response) => {
          setTimeout(() => {
            this.foto = response.path;
            this.record.app_logo = response.name;
          }, 1000);
        },
      });
    },
  },
};
</script>

<style></style>
