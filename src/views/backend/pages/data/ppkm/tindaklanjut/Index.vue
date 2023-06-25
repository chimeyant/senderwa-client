<template>
  <div class="home pa-6">
    <v-flex
      row
      class="pb-2"
    >
      <v-icon :color="theme.color">mdi-hand-heart</v-icon>
      <v-subheader class="text-h6">
        <h4>TINDAK LANJUT PPKm</h4>
      </v-subheader>
    </v-flex>
    <v-flex class="pb-5 pl-7">
      <div class="grey--text mb-2">Formulir Profil Pengguna</div>
    </v-flex>

    <v-row class="pa-1">
      <v-spacer></v-spacer>
      <v-col :cols="device.desktop ? `12` : `12`">
        <v-card class="animated animate__fadeInUp">
          <v-card-title :class="`white--text ` + theme.color + ` Plighten-1`">Formulir PPKm</v-card-title>

          <v-divider></v-divider>
          <v-card-text>
            <v-col cols="12">
              <v-textarea
                label="Judul"
                outlined
                dense
                hide-details
                :color="theme.color"
                v-model="record.judul"
                rows=3
              >{{record.judul}}</v-textarea>
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="Tema"
                outlined
                dense
                hide-details
                :color="theme.color"
                v-model="record.tema"
                rows=3
              >{{record.judul}}</v-textarea>
            </v-col>

            <v-col cols="12">
              <v-row>
                <v-col cols="4">
                  <v-text-field
                    label="Pemohon"
                    :color="theme.color"
                    outlined
                    dense
                    hide-details
                    v-model="record.inisial"
                  ></v-text-field>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    label="Nama Pemohon"
                    :color="theme.color"
                    outlined
                    dense
                    hide-details
                    v-model="record.pemohon"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols=12>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    label="Tanggal Permohonan Mulai"
                    :color="theme.color"
                    outlined
                    dense
                    hide-details
                    v-model="record.tanggal_permohonan_mulai"
                    type="date"
                  >

                  </v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Tanggal Permohonan Selesai"
                    :color="theme.color"
                    outlined
                    dense
                    hide-details
                    v-model="record.tanggal_permohonan_selesai"
                    type="date"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-select
                label="Model Pelaksaan"
                outlined
                dense
                hide-details
                v-model="record.method"
                :items="methods"
                :color="theme.color"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-select
                label="Dosen Pelaksana"
                outlined
                dense
                hide-details
                v-model="record.dosen_id"
                :items="dosens"
                :color="theme.color"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    label="Tanggal Pelaksanaan Mulai"
                    :color="theme.color"
                    outlined
                    dense
                    hide-details
                    v-model="record.tanggal_mulai"
                    type="date"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Tanggal Pelaksanaan Selesai"
                    :color="theme.color"
                    outlined
                    dense
                    hide-details
                    v-model="record.tanggal_selesai"
                    type="date"
                  >
                  </v-text-field>
                </v-col>

              </v-row>
            </v-col>
            <v-col cols=12>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    label="Jam Pelaksanaan Mulai"
                    :color="theme.color"
                    outlined
                    dense
                    hide-details
                    v-model="record.jam_mulai"
                    type="time"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Jam Pelaksanaan Selesai"
                    :color="theme.color"
                    outlined
                    dense
                    hide-details
                    v-model="record.jam_selesai"
                    type="time"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="Lokasi Pelaksanaan"
                :color="theme.color"
                outlined
                dense
                hide-details
                v-model="record.lokasi"
                rows="3"
              ></v-textarea>
            </v-col>

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
  data: () => ({
    foto: "/",
    record: {},
    methods: [
      { text: "Online", value: "online" },
      { text: "Offline", value: "offline" },
      { text: "Hybrid", value: "hybrid" },
    ],
    dosens: [],
  }),
  computed: {
    ...mapState(["theme", "http", "device", "loading", "event", "snackbar"]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/data/ppkm-tindak-lanjut/" + this.$route.params.id,
    });
    this.fetchRecords();
    this.fetchDosens();
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
    fetchRecords: async function () {
      try {
        let { data } = await this.http.get(
          "api/data/ppkm-tindak-lanjut/" + this.$route.params.id
        );
        this.record = data;
      } catch (error) {}
    },
    fetchDosens: async function () {
      try {
        let { data } = await this.http.post("api/master-data/combo/dosen");
        this.dosens = data;
      } catch (error) {}
    },
  },
};
</script>

<style></style>
