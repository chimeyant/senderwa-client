<template>
  <div>
    <div
      v-show="device.desktop"
      style="display: flex;justify-content: center;align-items: center; flex-direction: column;"
    >

      <div
        v-if="device.desktop"
        style=" width:120%; margin-left: 0%; background-color: blue;  height: 1000px;border-radius: 50%;top: 10px; margin-top: -700px  ; position: absolute; overflow: hidden; border-style: solid; border-width: 10px; border-color: green;"
      >
        <img
          src="images/ta.jpeg"
          alt=""
          srcset=""
          width="100%"
          style="margin-top:350px; opacity: 0.5;height: 100%;"
        >
      </div>
      <div style="text-align: center; justify-content: center; margin-top: 10%; ">
        <v-card
          width="400"
          height="400"
        >
          <v-card-text>
            <v-col cols="12">
              <div class="title font-weight-bold">{{ info.app_name }}</div>
              <div class="body-2">{{ info.app_desc }}</div>
            </v-col>
            <div class="mt-10"></div>
            <v-col>
              <v-text-field
                label="Email"
                outlined
                dense
                hide-details
                :color="theme.color"
                v-model="uname"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="Kata Sandi"
                outlined
                dense
                hide-details
                type="password"
                :color="theme.color"
                v-model="upass"
              ></v-text-field>
            </v-col>
            <v-col class="mt-5">
              <v-btn
                block
                large
                :color="theme.color"
                class="white--text"
                @click="postAuthent"
              >Masuk</v-btn>
            </v-col>
            <v-col class="mt-16">
              <div class="body-2">Copyright &COPY; 2023 {{ info.app_company }}</div>
            </v-col>
          </v-card-text>
        </v-card>

      </div>
    </div>
    <div
      v-show="device.mobile"
      style="background-color: darkblue;"
    >
      <div style="height: 100px; display: flex;justify-content: center;align-items: center; flex-direction: column; ">
        <div class="white--text text-center font-weight-bold">SIMPHATI</div>
        <div class="white--text text-center font-weight-thin body-2">Sistem Informasi Manajemen Pelaporan Tenaga Ahli</div>
      </div>
      <div style="background-color: white; height: 100vh; border-top-left-radius: 15px; border-top-right-radius: 15px; padding-top: 100px;">
        <v-col>
          <v-text-field
            label="Email"
            outlined
            dense
            hide-details
            :color="theme.color"
            v-model="uname"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="Kata Sandi"
            outlined
            dense
            hide-details
            type="password"
            :color="theme.color"
            v-model="upass"
          ></v-text-field>
        </v-col>
        <v-col class="mt-5">
          <v-btn
            block
            large
            :color="theme.color"
            class="white--text"
            @click="postAuthent"
          >Masuk</v-btn>
        </v-col>
        <v-col class="mt-10">
          <div class="body-2 font-weight-thin text-center">Copyright &COPY; Dinas Komunikasi Informatika Persandian dan Statistik</div>
        </v-col>
      </div>
    </div>
  </div>
</template>
  
<script>
import { mapState, mapActions } from "vuex";
import "animate.css";
export default {
  name: "LoginComponent",
  data: () => ({
    uname: "",
    upass: "",
  }),
  mounted() {
    this.setPage({
      crud: false,
    });
  },
  computed: {
    ...mapState(["device", "theme", "info", "http", "snackbar", "auth"]),
  },
  methods: {
    ...mapActions(["setPage", "signIn"]),
    postAuthent: function () {
      this.signIn({
        username: this.uname.replace(/ /g, ""),
        userpass: this.upass,
      }).then((pass) => {
        if (!pass) {
          console.clear();
          return;
        }
        try {
          if (this.auth.user.user.authent == "superadmin") {
            this.$router.push({ name: "dashboard" });
          }
          if (this.auth.user.user.authent == "administrator") {
            this.$router.push({ name: "dashboard" });
          }
          if (this.auth.user.user.authent == "pm") {
            this.$router.push({ name: "dashboard" });
          }
          if (this.auth.user.user.authent == "ta") {
            this.$router.push({ name: "dashboard" });
          }
          if (this.auth.user.user.authent == "tpp") {
            this.$router.push({ name: "dashboard" });
          }
        } catch (error) {
          this.snackbar.color = "red";
          this.snackbar.text = error;
          this.snackbar.state = true;
        }
      });
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