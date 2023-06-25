<template>
  <div :class="device.desktop ? `home pa-6 grey lighten-4`:`home pa-0 grey lighten-4`">

    <v-row class="pa-1">

      <v-spacer></v-spacer>
      <v-col :cols="device.desktop ? `12` : `12`">
        <v-card class="animated animate__fadeInUp">
          <v-card-title :class="`white--text ` + theme.color + ` Plighten-1`">FORMULIR TINDAK LANJUT
            <v-spacer></v-spacer>
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
                    @click="$router.push({name:'keselamatan-permohonan-ramcheck', params:{itemsPerPage: $route.params.itemsPerPage, page: $route.params.page}})"
                  >mdi-close-circle</v-icon>
                </v-btn>
              </template>
              <span>Tutup</span>
            </v-tooltip>
          </v-card-title>
          <v-tabs
            v-model="tab"
            class="mt-5"
          >
            <v-tabs-slider></v-tabs-slider>

            <v-tab href="#tab-1">
              Data Permohonan
            </v-tab>

            <v-tab href="#tab-2">
              Tindak Lanjut
            </v-tab>

          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item value="tab-1">
              <v-card flat>
                <v-card-text>
                  <v-col cols="12">
                    <v-row class="justify-end mr-5">
                      <div class="mr-2">
                        No. Register :
                      </div>
                      <div class="font-weight-bold">
                        {{ record.noreg }}
                      </div>

                    </v-row>
                    <v-row class="justify-end mr-5 mt-5">
                      <div class="mr-2">
                        <v-chip :color="record.status_view.color">{{ record.status_view.text }}</v-chip>
                      </div>

                    </v-row>
                    <v-row class="justify-center mt-10 flex-column">
                      <div class="font-weight-bold text-center text-uppercase">
                        {{ record.perusahaan.name }}
                      </div>
                      <div class="text-center">
                        {{ record.perusahaan.alamat }}
                      </div>

                    </v-row>
                    <v-row class="mt-10">
                      <v-col cols="12">
                        <v-row>
                          <v-col :cols="device.desktop ? 4 :12">
                            <v-text-field
                              outlined
                              dense
                              hide-details
                              v-model="record.nomor_surat"
                              disabled
                              :filled="record.nomor_surat?true:false"
                              label="Nomor Surat"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col :cols="device.desktop ? 12 :12">
                            <v-textarea
                              label="Perihal"
                              outlined
                              dense
                              hide-details
                              v-model="record.perihal"
                              rows="2"
                              :filled="record.perihal ? true:false"
                              disabled
                            ></v-textarea>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col :cols="device.desktop ? 6 :12">
                            <v-text-field
                              label="Nama Kontak"
                              outlined
                              dense
                              hide-details
                              v-model="record.kontak_person"
                              :filled="record.kontak_person ? true:false"
                              disabled
                            ></v-text-field>
                          </v-col>
                          <v-col :cols="device.desktop ? 6 :12">
                            <v-text-field
                              label="Nomor Telepon"
                              outlined
                              dense
                              hide-details
                              v-model="record.nomor_telpon"
                              :filled="record.nomor_telpon ? true:false"
                              disabled
                            ></v-text-field>
                          </v-col>
                          <v-col :cols="device.desktop ? 6 :12">
                            <v-text-field
                              label="Tanggal Pengajuan Waktu"
                              type="date"
                              outlined
                              dense
                              hide-details
                              v-model="record.tanggal_permohonan"
                              :filled="record.tanggal_permohonan ? true:false"
                              disabled
                            ></v-text-field>
                          </v-col>
                          <v-col :cols="device.desktop ? 6 :12">
                            <v-text-field
                              label="Jam Pengajuan Waktu"
                              type="time"
                              outlined
                              dense
                              hide-details
                              v-model="record.jam_permohonan"
                              :filled="record.jam_permohonan ? true:false"
                              disabled
                            ></v-text-field>
                          </v-col>
                          <v-col :cols="device.desktop ? 6 :12">
                            <v-text-field
                              label="Tanggal Pemeriksaan"
                              type="date"
                              outlined
                              dense
                              hide-details
                              v-model="record.tanggal_pelaksanaan"
                              :filled="record.tanggal_pelaksanaan ? true:false"
                              disabled
                            ></v-text-field>
                          </v-col>
                          <v-col :cols="device.desktop ? 6 :12">
                            <v-text-field
                              label="Jam Pemeriksaan"
                              type="time"
                              outlined
                              dense
                              hide-details
                              v-model="record.jam_pelaksanaan"
                              :filled="record.jam_pelaksanaan ? true:false"
                              disabled
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              label="Lokasi"
                              outlined
                              dense
                              hide-details
                              v-model="record.lokasi"
                              :filled="record.lokasi ? true:false"
                              disabled
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-textarea
                              label="Alamat Pemeriksaan"
                              outlined
                              dense
                              hide-details
                              v-model="record.alamat_pemeriksaan"
                              rows="2"
                              disabled
                              :filled="record.alamat_pemeriksaan ? true:false"
                            >{{ record.alamat_pemeriksaan }}</v-textarea>
                          </v-col>
                          <v-col cols="12">
                            <v-btn
                              :color="theme.color"
                              block
                              dark
                              @click="downloadSurat(record.id)"
                            >UNDUH SURAT PERMOHONAN</v-btn>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>

                  </v-col>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item value="tab-2">
              <v-card flat>
                <v-card-text>
                  <v-col cols="12">
                    <v-row class="justify-end mr-5">
                      <div class="mr-2">
                        No. Register :
                      </div>
                      <div class="font-weight-bold">
                        {{ record.noreg }}
                      </div>
                    </v-row>
                    <v-row class="justify-end mr-5 mt-5">
                      <div class="mr-2">
                        <v-chip :color="record.status_view.color">{{ record.status_view.text }}</v-chip>
                      </div>
                    </v-row>
                    <v-row class="mt-5 justify-center">
                      <div class="font-weight-bold">FORMULIR TINDAK LANJUT</div>
                    </v-row>
                    <v-row class="mt-10">
                      <v-col :cols="device.desktop ? 6:12">
                        <v-text-field
                          label="Tanggal Pemeriksaan"
                          outlined
                          dense
                          hide-details
                          type="date"
                          v-model="record.tanggal_pelaksanaan"
                          :filled="record.tanggal_pelaksanaan ? true:false"
                        ></v-text-field>
                      </v-col>
                      <v-col :cols="device.desktop ? 6:12">
                        <v-text-field
                          label="Jam Pemeriksaan"
                          outlined
                          dense
                          hide-details
                          type="time"
                          v-model="record.jam_pelaksanaan"
                          :filled="record.jam_pelaksanaan ? true:false"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-select
                          label="Lokasi"
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
                          outlined
                          dense
                          hide-details
                          v-model="record.alamat_pemeriksaan"
                          :color="theme.color"
                          rows="2"
                        >{{ record.alamat_pemeriksaan }}</v-textarea>
                      </v-col>
                      <v-col cols="12">
                        <v-select
                          label="Status Tindak Lanjut"
                          outlined
                          dense
                          hide-details
                          :color="theme.color"
                          v-model="record.status"
                          :items="status"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    class="mr-1"
                    outlined
                    dense
                    color="grey"
                    @click="$router.push({name:'keselamatan-permohonan-ramcheck', params:{itemsPerPage:$route.params.itemsPerPage, page:$route.params.page}})"
                  >KEMBALI</v-btn>
                  <v-btn
                    class="mr-5"
                    outlined
                    dense
                    :color="theme.color"
                    @click="postUpdateRecord"
                  >PROSES</v-btn>

                </v-card-actions>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
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
    tab: null,
    foto: "/",
    lokasis: [
      { text: "KANTOR DISHUB", value: "dishub" },
      { text: "PERUSAHAAN", value: "perusahaan" },
    ],
    status: [
      { text: "PENGAJUAN", value: "1" },
      { text: "PEMERIKSAAN", value: "2" },
    ],
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
      title: "TINDAK LANJUT",
      subtitle: "Formulir Tindak Lanjut",
      breadcrumbs: [
        {
          text: "Permohonan",
          disabled: false,
          href: "/backend/keselamatan-permohonan-ramcheck",
        },
        {
          text: "Tindak Lanjut",
          disabled: true,
          href: "master-jenis-pengaduan",
        },
      ],
      showtable: false,
      actions: {
        refresh: false,
        add: false,
        edit: false,
        delete: false,
      },
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
      "setLoading",
    ]),
    fetchRecord: async function () {
      let { data } = await this.http.get(
        "api/keselamatan/permohonan-tindak-lanjut/" + this.$route.params.uuid
      );
      this.setRecord(data);
    },
    postUpdateRecord: async function () {
      try {
        let {
          data: { success, code, message },
        } = await this.http.put(
          "api/keselamatan/permohonan-tindak-lanjut/" +
            this.record.uuid +
            "/" +
            this.record.id,
          this.record
        );
        if (!success) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
          return;
        }

        this.snackbar.color = this.theme.color;
        this.snackbar.text = message;
        this.snackbar.state = true;
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = "Opps..., terjadi kesalahan " + error;
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
    downloadSurat: async function (val) {
      try {
        let {
          data: { success, code, response, errors },
        } = await this.http.post("api/keselamatan/download-permohonan", {
          id: val,
        });

        window.open(response.url, "__blank");
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = error;
        this.snackbar.state = true;
      }
    },
  },
};
</script>
  
<style>
.label {
  height: 100%;
  padding-top: inherit;
}
</style>
  