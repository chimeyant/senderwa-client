<template>
  <v-container>
    <v-row>
      <v-col
        class="mt-10"
        cols="6"
        v-show="device.desktop"
      >
        <v-row class="justify-content-center animated animate__fadeInLeft">
          <img
            class="mt-10"
            src="/images/register-succesed.svg"
            height="400px"
            alt=""
          >
        </v-row>
      </v-col>
      <v-col
        :cols="device.desktop ?`6`:`12`"
        class="animated animate__fadeInRight"
      >

        <div :class="device.desktop ?`register-berhasil-title`:`register-berhasil-title-mobile`">
          Selamat..!, Registrasi Berhasil
          <br>
          <div class="register-berhasil-subtitle">
            Proses Registrasi anda telah berhasil, silahkan login ke dalam Sistem SINIKMAT LANTAS untuk melengkapi data perusahaan/pribadi anda.
          </div>

        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
  
  <script>
import { mapState, mapActions } from "vuex";
import "animate.css";

export default {
  name: "registrasi-perusahaan-berhasil-component",
  data: () => ({
    name: null,
    email: null,
    phone: null,
    password: null,
    password_confirmation: null,
    province_uuid: null,
    regency_uuid: null,
    instansi: null,
    jabatan: null,
    lokasi_uuid: null,
  }),
  mounted() {
    this.setPage({
      crud: false,
    });

    window.scrollTo(0, top);
  },
  computed: {
    ...mapState(["device", "theme", "info", "http", "snackbar", "auth"]),
  },
  methods: {
    ...mapActions(["setPage", "signIn"]),
    fetchRegistrasiBerhasil: async function () {
      try {
        let { data } = await this.http.get(
          "api/registrasi-berhasil/" + this.$route.params.uuid
        );

        this.data = data;
      } catch (error) {}
    },
  },
};
</script>
  
  <style>
.register-berhasil-title {
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  padding-top: 25px;
  padding-bottom: 10px;
  color: grey;
  margin-top: 20px;
}
.register-berhasil-title-mobile {
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  padding-top: 25px;
  padding-bottom: 10px;
  color: grey;
  margin-top: 20px;
}
.login-subtitle {
  text-align: center;
  font-size: 15px;
  font-weight: 400;
  color: gray;
}
.other-sign-in-red {
  border: red solid;
  border-radius: 5px;
  margin: 5px;
}
.other-sign-in-blue {
  border: blue solid;
  border-radius: 5px;
  margin: 5px;
}

.row.forget-password {
  font-size: 12px;
  font-weight: 400;
  justify-content: end;
  margin-top: 30px;
  margin-right: 2px;
  color: grey;
}

.register-berhasil-subtitle {
  font-size: 15px;
  margin-top: 20px;
  font-weight: 500;
}
</style>