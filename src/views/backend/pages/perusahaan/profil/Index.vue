<template>
  <div :class="device.desktop ? `home pa-6 grey lighten-4`:`home pa-0 grey lighten-4`">
    <v-row>
      <v-col :cols="device.desktop ? 12 : 12">
        <v-card class=" animated animate__fadeInUp rounded-0">
          <v-card-title :class="`white--text ` + theme.color + ` lighten-1 mb-5` ">PROFIL PERUSAHAAN</v-card-title>
          <v-card-text>

            <v-col cols="12">
              <v-text-field
                label="Nama Perusahaan"
                outlined
                dense
                hide-details
                v-model="record.name"
                placeholder="Antsoft Media Computindo, PT"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Direktur / Pimpinan"
                outlined
                dense
                hide-details
                v-model="record.direktur"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="NPWP"
                outlined
                dense
                hide-details
                v-model="record.npwp"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="NIB"
                outlined
                dense
                hide-details
                v-model="record.nib"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                label="Kecamatan"
                outlined
                dense
                hide-details
                v-model="record.district_uuid"
                :items="districts"
                @change="fetchVillages"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-select
                label="Desa"
                outlined
                dense
                hide-details
                v-model="record.village_uuid"
                :items="villages"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Nomor Telpon"
                outlined
                dense
                hide-details
                v-model="record.phone"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="Alamat"
                outlined
                dense
                hide-details
                v-model="record.alamat"
                rows="2"
              ></v-textarea>
            </v-col>
          </v-card-text>
          <v-divider>
          </v-divider>
          <v-card-actions class="mt-3 mb-3 ml-3 mr-3">
            <v-spacer></v-spacer>
            <v-btn
              :color="theme.color"
              class="white--text "
              @click="postUpdate"
            >SIMPAN</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-spacer v-if="device.desktop"></v-spacer>
    </v-row>
  </div>
</template>
  
  <script>
import { stat } from "fs";
import { mapActions, mapState } from "vuex";

export default {
  name: "Home",
  data: () => ({
    num: 1,
    headers: [
      { text: "#", value: "num" },
      {
        text: "TINGKAT",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "KETERANGAN", value: "description" },
      { text: "OPSI", value: "id" },
    ],

    search: null,
    districts: [],
    villages: [],
    record: {},
  }),
  computed: {
    ...mapState(["theme", "http", "device", "record", "snackbar", "info"]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "",
      title: "Profil Perusahaan",
      subtitle: "Pengaturan Data Profil Perusahaan",
      breadcrumbs: [
        {
          text: "Perusahaan",
          disabled: false,
          href: "",
        },
        {
          text: "Profil",
          disabled: false,
          href: "master-jenis-pengaduan",
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
    this.fetchDistricts();
    this.fetchDataProfil();
  },
  mounted() {},
  methods: {
    ...mapActions(["setPage", "setLoading"]),
    fetchDataProfil: async function () {
      try {
        let { data } = await this.http.get("api/perusahaan/profil");
        this.record = data;
      } catch (error) {}
    },
    fetchDistricts: async function () {
      try {
        let { data } = await this.http.get("api/combo/kecamatan");
        this.districts = data;
      } catch (error) {}
    },
    fetchVillages: async function () {
      try {
        let { data } = await this.http.get(
          "api/combo/desa/" + this.record.district_uuid
        );
        this.villages = data;
      } catch (error) {}
    },
    postUpdate: async function () {
      try {
        this.setLoading({
          dialog: true,
          text: "Proses update profil perusahaan..!",
        });
        let {
          data: { status, message, error },
        } = await this.http.post("api/perusahaan/profil", this.record);
        if (!status) {
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
        this.snackbar.text = error.errors;
        this.snackbar.state = true;
      } finally {
        this.setLoading({ dialog: false, text: "" });
      }
    },
  },
  watch: {
    "record.district_uuid": {
      handler() {
        this.fetchVillages();
      },
      deep: true,
    },
  },
};
</script>
  