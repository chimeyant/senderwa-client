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
            src="/images/register.png"
            height="400px"
            alt=""
          >
        </v-row>
      </v-col>
      <v-col
        :cols="device.desktop ?`6`:`12`"
        class="animated animate__fadeInRight"
      >

        <div class="login-title">
          FORMULIR REGISTRASI
          <br>
          (MASYARAKAT)
        </div>
        <div class="login-subtitle">
          Silahkan isi formulir pendaftaran akun dibawah ini dengan benar...!
        </div>

        <v-col cols="12">
          <v-text-field
            label="Nama"
            outlined
            placeholder="Nama Lengkap Anda"
            dense
            hide-details
            v-model="name"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="Email"
            outlined
            placeholder="Email"
            dense
            hide-details
            v-model="email"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="Nomor Telpon (HP/WA)"
            outlined
            placeholder="Contoh: 081280008XXX"
            dense
            hide-details
            v-model="phone"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="Kata Sandi"
            outlined
            placeholder="kata sandi anda"
            dense
            hide-details
            type="password"
            v-model="password"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="Konfirmasi Kata Sandi"
            outlined
            placeholder="kata konfirmasi sandi anda"
            dense
            hide-details
            type="password"
            v-model="password_confirm"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-row class="pr-4 pt-5 pb-5">
            <v-spacer></v-spacer>
            <v-btn
              outlined
              dense
              :color="theme.color"
              @click="postRegister"
            >Kirim</v-btn>
          </v-row>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>
    
    <script>
import { mapState, mapActions } from "vuex";
import "animate.css";
export default {
  name: "LoginComponent",
  data: () => ({
    name: null,
    email: null,
    phone: null,
    password: null,
    password_confirm: null,

    //data bind
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
    ...mapActions(["setPage", "signIn", "setLoading"]),

    postRegister: async function () {
      try {
        this.setLoading({
          dialog: true,
          text: "Sedang mengirim data registrasi",
        });
        if (this.password != this.password_confirm) {
          this.snackbar.color = "red";
          this.snackbar.text = "Kata sandi tidak sama";
          this.snackbar.state = true;
        }
        let {
          data: { code, success, message, errors },
        } = await this.http.post("api/auth/registrasi-user", {
          name: this.name,
          email: this.email,
          phone: this.phone,
          password: this.password,
        });
        if (!success) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
          return;
        }
        this.snackbar.color = "green";
        this.snackbar.text = message;
        this.snackbar.state = true;
        this.$router.push({
          name: "registrasi-berhasil",
        });
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = error.response.data.errors[0].message;
        this.snackbar.state = true;
      } finally {
        this.setLoading({ dialog: false, text: "" });
      }
    },
  },
};
</script>
    
    <style>
.login-title {
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  padding-top: 25px;
  padding-bottom: 10px;
  color: grey;
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
</style>