<template>
  <div :class="device.desktop ? `home pa-6 grey lighten-4`:`home pa-0 grey lighten-4`">

    <v-row class="pa-1">
      <v-spacer></v-spacer>
      <v-col :cols="device.desktop ? `6` : `12`">
        <v-card class="animated animate__bounceIn rounded-0">
          <v-card-title :class="`white--text ` + theme.color + ` Plighten-1`">PROFIL PENGGUNA</v-card-title>

          <v-divider></v-divider>
          <v-card-text>
            <v-row class="mt-2">
              <v-col cols="12">
                <v-row class="justify-center">
                  <v-avatar size="150">
                    <v-img
                      :class="[theme.color + ' lighten-2 with-backdrop']"
                      :aspect-ratio="3 / 4"
                      :src="foto"
                      :lazy-src="foto"
                    >
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
                        <div class="pl-14">
                          <v-btn
                            icon
                            dark
                            @click="uploadFoto"
                          >
                            <v-icon>photo_camera</v-icon>
                          </v-btn>
                        </div>
                      </div>
                    </v-img>
                  </v-avatar>
                </v-row>
              </v-col>
              <v-col cols="12">
                <v-col cols="12">
                  <v-text-field
                    label="Nama Lengkap"
                    :color="theme.color"
                    v-model="record.name"
                    dense
                    outlined
                    :hide-details="device.desktop"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="NIP|EMAIL"
                    :color="theme.color"
                    v-model="record.email"
                    dense
                    outlined
                    disabled
                    :hide-details="device.desktop"
                  ></v-text-field>
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
  name: "perusahaan-index",
  data: () => ({
    foto: "/",
  }),
  computed: {
    ...mapState([
      "theme",
      "http",
      "device",
      "records",
      "record",
      "loading",
      "event",
      "snackbar",
    ]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/",
      title: "PROFIL",
      subtitle: "Manajemen Profil Pengguna",
      breadcrumbs: [
        {
          text: "Utility",
          disabled: true,
          href: "",
        },
        {
          text: "Profil Pengguna",
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
      showtable: false,
    });

    this.fetchRecord();
  },
  mounted() {},
  methods: {
    ...mapActions([
      "setPage",
      "assignFileBrowse",
      "getUserInfo",
      "initUploadLibrary",
      "setRecord",
    ]),
    fetchRecord: async function () {
      let { data } = await this.http.get("api/user-info");

      this.setRecord(data);

      this.foto = data.avatar_path;
    },
    fetchUpdate: async function () {
      try {
        let {
          data: { status, message, data },
        } = await this.http.post("api/utility/update-profil", this.record);

        if (!status) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
        }

        this.snackbar.color = this.theme.color;
        this.snackbar.text = message;
        this.snackbar.state = true;

        this.record = data;
        this.fetchRecord();
        this.getUserInfo();
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = error.data.errors[0].message;
        this.snackbar.state = true;
      }
    },

    uploadFoto: function () {
      this.assignFileBrowse({
        fileType: [".jpg", ".jpeg", ".png"],
        query: {
          doctype: "avatars",
        },
        callback: (response) => {
          setTimeout(() => {
            this.foto = response.path;
            this.record.avatar = response.name;
          }, 1000);
        },
      });
    },
  },
};
</script>

<style></style>
