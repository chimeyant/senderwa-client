<template>
  <div :class="device.desktop ? `home pa-6 grey lighten-4`:`home pa-0 grey lighten-4`">
    <v-row>
      <v-spacer v-if="device.desktop"></v-spacer>
      <v-col cols="device.desktop ? 6 : 12">
        <v-card
          class="mx-auto animated animate__bounceIn"
          max-width="400"
        >
          <v-toolbar
            :color="theme.color"
            :dark="theme.mode"
          >
            <v-icon
              small
              class="mr-1 orange--text animate__animated animate__flash animate__infinite"
            >mdi-circle</v-icon>Ganti Kata Sandi
          </v-toolbar>

          <v-card-text class="text--primary">
            <v-text-field
              label="Kata Sandi Baru"
              :color="theme.color"
              v-model="record.password"
              type="password"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              label="Ulang Kata Sandi Baru"
              :color="theme.color"
              v-model="record.repassword"
              outlined
              type="password"
              dense
            ></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-btn
              :color="theme.color"
              text
              @click="postChangePassword"
            >
              Simpan
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-spacer v-if="device.desktop"></v-spacer>
    </v-row>
  </div>
</template>

<script>
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
  }),
  computed: {
    ...mapState(["theme", "http", "device", "record", "snackbar", "info"]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/master-tingkat",
      title: "GANTI KATA SANDI",
      subtitle: "Ganti Kata Sandi Pengguna",
      breadcrumbs: [
        {
          text: "Pengguna",
          disabled: false,
          href: "",
        },
        {
          text: "Ganti Kata Sandi",
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
  },
  mounted() {},
  methods: {
    ...mapActions(["setPage"]),
    postChangePassword: async function () {
      try {
        if (this.record.password != this.record.repassword) {
          this.snackbar.color = "red";
          this.snackbar.text = "Opps kata sandi tidak sama";
          this.snackbar.state = true;
          return;
        }
        let {
          data: { status, message },
        } = await this.http.post("api/utility/change-pwd", this.record);

        if (!status) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
          return;
        }

        this.snackbar.color = this.theme.color;
        this.snackbar.text = message;
        this.snackbar.state = true;
        this.record.password = null;
        this.record.repassword = null;
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = error.data.errors[0].message;
        this.snackbar.state = true;
      }
    },
  },
};
</script>
