<template>
  <v-app
    id="inspire"
    light
    v-cloak
    v-scroll="onScroll"
  >
    <v-app-bar
      :elevation="lightToolbar ? 0 : 6"
      :class="lightToolbar ? `transparent` : theme.color + ` darken-1`"
      fixed
    >
      <v-app-bar-nav-icon>
        <img
          class="ml-10"
          :src="info.app_logo"
          alt="logo"
          height="48"
        />
      </v-app-bar-nav-icon>

      <v-toolbar-title
        :class="{ 'pl-1': device.mobile }"
        v-if="!device.mobile"
      >
        <span class="font-weight-bold pl-5 white--text">{{
          info.app_company
        }}</span><br />
        <span class="text-xs pl-5 white--text">{{ info.app_slogan }}</span>
      </v-toolbar-title>

      <v-toolbar-title
        :class="{ 'pl-2': device.mobile }"
        v-if="device.mobile"
      >
        <span class="font-weight-bold pl-5 white--text">{{
          info.app_company
        }}</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items class="pr-5">
        <v-btn
          text
          class="white--text"
          v-show="device.desktop"
        >BERANDA</v-btn>
        <v-btn
          text
          class="white--text"
          v-show="device.desktop"
          @click="$router.push({name:'register'})"
        >REGISTRASI</v-btn>

        <!--<v-btn flat>Blog</v-btn>-->

        <v-btn
          text
          @click="$router.push({ name: 'login' })"
          class="white--text"
          v-show="device.desktop"
        >LOGIN</v-btn>
      </v-toolbar-items>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-show="device.mobile"
            color="white"
            icon
            light
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title @click="$router.push({ name: 'home' })">
              Beranda
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title @click="$router.push({ name: 'login' })">
              Login/Register
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <section>
        <v-carousel
          cycle
          :height="device.desktop ? `550` : `400`"
          hide-delimiters
          show-arrows-on-hover
        >
          <v-carousel-item
            v-for="(slide, i) in sliders"
            :key="i"
            :src="slide.path"
          >
            <v-row
              class="fill-height"
              align="center"
              justify="center"
            >
              <v-layout
                column
                align-center
                justify-center
                class="white--text"
              >
                <h1
                  class="white--text mb-2 display-1 text-xs-center"
                  style="font-weight: 900; text-shadow: 3px 2px #000000"
                >
                  {{ slide.title }}
                </h1>
                <div
                  class="white--text subheading mb-3 text-xs-center"
                  style="font-weight: 900; text-shadow: 2px 2px #000000"
                >
                  {{ slide.subtitle }}
                </div>

                <div
                  class="white--text subheading mb-3 text-xs-center"
                  style="font-weight: 900; text-shadow: 2px 2px #000000"
                >
                  {{ slide.body }}
                </div>

                <v-btn
                  v-show="false"
                  :class="theme.color + ` darken-1 mt-5`"
                  dark
                  large
                  @click="$router.push({ name: 'login' })"
                >
                  DAFTAR SEKARANG
                </v-btn>
              </v-layout>
            </v-row>
          </v-carousel-item>
        </v-carousel>

      </section>
      <section class="animated bounce">
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout
                row
                wrap
                align-center
              >
                <v-flex
                  xs12
                  md4
                >
                  <v-card
                    :class="
                      `mx-auto elevation-10 box-statistik`
                    "
                    max-width="344"
                    outlined
                  >
                    <v-list-item three-line>
                      <v-list-item-content>
                        <div class="overline mb-4 white--text">BOX 1</div>
                        <v-list-item-title class="headline mb-1 white--text">
                          {{ jmllakilaki }}
                        </v-list-item-title>
                        <v-list-item-subtitle class="white--text">Unit</v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-avatar
                        size="80"
                        class="elevation-2"
                        :color="theme.color + ` darken-1`"
                      >
                        <v-img src="images/dosen1.png"></v-img>

                      </v-list-item-avatar>
                    </v-list-item>

                    <v-card-actions>
                      <v-btn
                        outlined
                        rounded
                        text
                        class="white--text"
                      >
                        Selengkapnya
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-card
                    :class="
                      `box-statistik`
                    "
                    max-width="344"
                    outlined
                  >
                    <v-list-item three-line>
                      <v-list-item-content>
                        <div class="overline mb-4 white--text">BOX 2</div>
                        <v-list-item-title class="headline mb-1 white--text">
                          {{ jmlperempuan }}
                        </v-list-item-title>
                        <v-list-item-subtitle class="white--text">Unit</v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-avatar
                        size="80"
                        class="elevation-2"
                        color="white"
                      >
                        <v-img src="images/komunitas.png"></v-img>
                      </v-list-item-avatar>
                    </v-list-item>

                    <v-card-actions>
                      <v-btn
                        outlined
                        rounded
                        text
                        class="white--text"
                      >
                        Selengkapnya
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-card
                    :class="
                      `mx-auto elevation-10 box-statistik` 
                    "
                    max-width="344"
                    outlined
                    dark
                  >
                    <v-list-item three-line>
                      <v-list-item-content>
                        <div class="overline mb-4 white--text">BOX 3</div>
                        <v-list-item-title class="headline mb-1 white--text">
                          {{ jmlpendaftar }}
                        </v-list-item-title>
                        <v-list-item-subtitle class="white--text">Unit</v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-avatar
                        size="80"
                        class="elevation-2"
                        color="white"
                      >
                        <v-img src="images/dokumen.png"></v-img>
                      </v-list-item-avatar>
                    </v-list-item>

                    <v-card-actions>
                      <v-btn
                        outlined
                        rounded
                        text
                        dark
                      > Selengkapnya </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

    </v-main>
    <section class="footer">
      <v-row class="pt-5 pl-10 pr-5">
        <v-col :cols="device.desktop ? `4` : `12`">
          <div class="title">
            Dinas Perhubungan Kabupaten Tangerang
          </div>
          <div class="address">
            Jl. Perahu Desa Parahu Kecamatan Balaraja - Kabupaten Tangerang
            <br>
            Jawa Barat TELP: 021 XXXX
          </div>

        </v-col>
        <v-col :cols="device.desktop ? `4` : `12`"></v-col>
        <v-col :cols="device.desktop ? `4` : `12`">
          <div class="title">
            IKUTI KAMI
          </div>
          <div class="social-media">
            <v-icon class="icon">mdi-facebook</v-icon> Facebook
          </div>
          <div class="social-media">
            <v-icon class="icon">mdi-instagram</v-icon> Instagram
          </div>
          <div class="social-media">
            <v-icon class="icon">mdi-whatsapp</v-icon> Whatsapp
          </div>
        </v-col>
      </v-row>
      <v-layout
        column
        wrap
      >
        <v-flex class="pb-0 my-2 white--text align-center">
          <div class="copyright pl-10">
            Dinas Perhubungan Kabupaten Tangerang &copy; 2022
          </div>
        </v-flex>
      </v-layout>
    </section>

    <v-snackbar
      v-model="snackbar.state"
      :color="snackbar.color"
      :timeout="3500"
    >
      {{ snackbar.text }}
      <v-btn
        dark
        text
        @click.stop="snackbarClose"
      >Tutup</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import "animate.css";

export default {
  name: "Login",
  data: () => ({
    uname: "",
    upass: "",
    visible: false,
    color: "purple darken-3",
    jmlpendaftar: 0,
    jmllakilaki: 0,
    jmlperempuan: 0,

    pengumuman: {
      title: null,
      body: null,
    },
    sliders: [],

    lightToolbar: true,
  }),
  mounted() {
    this.setPage({
      crud: true,
    }).then(() => {
      this.getAppInfo().then(() => {
        window.document.title = this.info.app_company;
        const favicon = window.document.getElementById("favicon");
        favicon.href = this.info.app_logo;
      });
    });
    this.fetchSliders();
    this.fetchPengumuman();
  },
  computed: {
    ...mapState(["device", "info", "snackbar", "device", "http", "theme"]),

    contentStyle: function () {
      if (!this.device.mobile && this.info.apps_background) {
        return `background: url(${this.info.apps_background});
                        background-position: center center;
                        background-repeat: no-repeat;
                        background-size: cover;`;
      }
      return ``;
    },
  },
  methods: {
    ...mapActions([
      "setPage",
      "getAppInfo",
      "signIn",
      "snackbarClose",
      "getAppInfo",
    ]),
    onScroll: function (event) {
      if (window.pageYOffset >= window.innerHeight - 350) {
        if (this.lightToolbar === true) this.lightToolbar = false;
      } else {
        if (this.lightToolbar === false) this.lightToolbar = true;
      }
    },

    postRegister: function () {
      this.$router.push({ name: "register" });
    },

    fetchPengumuman: async function () {
      let { data } = await this.http.get("pengumuman");

      this.pengumuman = data;
    },
    fetchSliders: async function () {
      let { data } = await this.http.get("sliders");

      this.sliders = data;
    },
  },
};
</script>

<style lang="sass">
@import '../../sass/card'
@import '../../sass/moui.sass'
@import '../../sass/textField.sass'
@import '../../assets/css/style.css'
@import "../../assets/css/wow.css"
</style>
