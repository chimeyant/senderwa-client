<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      color="green darken-1"
      :src="info.app_nav"
      app
      :dark="theme.mode"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ info.app_name }}
          </v-list-item-title>
          <v-list-item-subtitle>Ver. {{ info.app_ver }} </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="px-2">
        <v-list-item-avatar class="white elevation-10 animate__animated animate__tada animate__delay-1s">
          <v-img :src="user.avatar_path"></v-img>
        </v-list-item-avatar>
        <!--<v-list-item-title>{{ user.username }} </v-list-item-title>-->
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ user.name }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ user.authent }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list
        dense
        nav
        color="indigo darken-1"
        class="rounded-tl-xl pt-10 mt-5 animate__animated animate__fadeInUp"
        style="min-height: 100vH;"
        shaped
      >
        <template v-for="(menu, index) in menus">
          <v-list-item
            active-class="blue darken-3"
            :to="menu.route"
            :key="index"
            v-if="menu.type === 'item'"
          >
            <v-list-item-action>
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="font-weight-thin">{{ menu.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-subheader
            :class="menu.class"
            :key="index"
            class="overline mt-3  mb-3 font-weight-bold black--text"
            style="height: 50px; border:white 1px solid; border-radius:5px; margin-bottom: 5px; background-color: white; "
            v-else-if="menu.type === 'divisi'"
          >
            <v-icon class="mr-1 green--text">{{ menu.icon }}</v-icon> {{ menu.title }}
          </v-subheader>

          <v-subheader
            :class="menu.class"
            :key="index"
            class="overline mt-3 border-3 orange--text border-danger"
            style="height: 24px"
            v-else-if="menu.type === 'subheader'"
          >{{ menu.title }}</v-subheader>

          <v-list-group
            v-if="menu.type == 'subMenu'"
            dark
            color="white"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ menu.title }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(subItem,idx) in menu.submenus"
              active-class="blue darken-3"
              :to="subItem.route"
              :key="idx"
              v-if="subItem.type === 'item'"
              class="animate__animated animate__flipInY"
            >
              <v-list-item-action>
                <v-icon class="">{{ subItem.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="font-weight-thin">{{ subItem.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>

    </v-navigation-drawer>
    <v-app-bar
      app
      color="white"
      dark
      class="elevation-1  "
    >
      <v-app-bar-nav-icon
        color="grey darken-2"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <img
        src="/images/ok.png"
        width="32px"
        height="32px"
        alt=""
        :class="device.desktop ? `mt-1 ml-2 mr-2 `:`ml-2 mr-2 `"
      >

      <v-toolbar-title
        v-show="device.desktop"
        :class="theme.mode ? `indigo--text`: `indigo--text ` "
      >{{
        info.app_company
      }}</v-toolbar-title>

      <v-toolbar-title
        v-show="device.mobile"
        :class="theme.mode ? `white--text`: `black--text` "
      >{{
        info.app_name
      }}</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon color="grey darken-1">mdi-widgets</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon color="grey darken-1">mdi-bell-outline</v-icon>
      </v-btn>

      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            class="mr-2"
          >
            <v-avatar
              size="26"
              class="border-2  border-gray-light indigo elevation-10"
            >
              <v-img :src="user.avatar_path"></v-img>
            </v-avatar>
          </v-btn>
        </template>

        <v-card color="">
          <v-list :color="theme.color + ` lighten-2`">
            <v-list-item>
              <v-list-item-avatar class="white elevation-10">
                <v-img :src="user.avatar_path
            "></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="white--text">{{user.name}}</v-list-item-title>
                <v-list-item-subtitle class="white--text">{{user.authent}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item @click="$router.push({name:'profil-akun'})">
              <v-list-item-action>
                <v-icon :color="theme.color">mdi-account-edit-outline</v-icon>
              </v-list-item-action>
              <v-list-item-title>Profil Akun</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.push({name:'chngpwd'})">
              <v-list-item-action>
                <v-icon :color="theme.color">mdi-account-key</v-icon>
              </v-list-item-action>
              <v-list-item-title>Ganti Kata Sandi</v-list-item-title>
            </v-list-item>

          </v-list>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red"
              text
              @click="signout"
              class="animate__animated animate__headShake animate__infinite"
            >
              <v-icon>mdi-logout</v-icon> Keluar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-main class="grey lighten-4">
      <v-card
        color="white"
        flat
        tile
        class="elevation-0"
        v-show="page.title ? true:false"
      >
        <v-toolbar
          flat
          class="elevation-1 "
          height="48px"
        >
          <div class="flex flex-column">
            <div class="toolbar-title">
              {{ page.title }}
            </div>
            <div class="toolbar-sub-title">
              {{ page.subtitle }}
            </div>

          </div>

          <v-spacer></v-spacer>

          <v-breadcrumbs
            v-show="device.desktop"
            :items="page.breadcrumbs"
          >
            <template v-slot:divider>
              <v-icon
                color="green darken-3"
                class="animate__animated animate__heartBeat animate__infinite"
              >mdi-arrow-right-bold-circle</v-icon>
            </template>
          </v-breadcrumbs>
        </v-toolbar>
      </v-card>
      <!--  -->
      <div class="main-content">
        <router-view></router-view>
      </div>
    </v-main>
    <v-snackbar
      v-model="snackbar.state"
      :color="snackbar.color"
      :timeout="2000"
      bottom
      multi-line
    >
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarClose"
        >
          Tutup
        </v-btn>
      </template>
    </v-snackbar>
    <v-dialog
      v-model="dialog.delete"
      persistent
      max-width="400px"
    >
      <v-card>
        <v-card-title
          class="red white--text"
          light
        >
          <v-icon
            color="white"
            class="pr-2"
            large
          >mdi-delete-circle</v-icon>
          <span class="animate__animated animate__flash animate__infinite">Konfirmasi Penghapusan</span>
        </v-card-title>
        <v-card-text>
          <p class="pt-5">Apakah anda yakin akan menghapus data tersebut...?, data akan di hapus secara permanen dan tidak dapat dibatalkan</p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :color="theme.color"
            text
            @click="dialogDeleteClose"
          >Tidak</v-btn>
          <v-btn
            color="red"
            text
            @click="deleteRecord"
          >Ya, Saya Yakin</v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialog.bulkdelete"
      persistent
      max-width="400px"
    >
      <v-card>
        <v-card-title
          class="red white--text "
          light
        >
          <v-icon
            color="white"
            class="pr-2"
            large
          >mdi-delete-circle</v-icon>
          <span class="title">Konfirmasi Penghapusan</span>
        </v-card-title>
        <v-card-text>
          <p class="pt-5">Apakah anda yakin akan menghapus data tersebut...?</p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :color="theme.color"
            text
            @click="dialogBulkDeleteClose"
          >Tidak</v-btn>
          <v-btn
            color="red"
            text
            @click="bulkDeleteRecord"
          >Ya, Saya Yakin</v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="text-center">
      <v-dialog
        v-model="loading.dialog"
        persistent
        width="300"
      >
        <v-card
          :color="theme.color"
          dark
        >
          <v-card-text class="pa-2">
            {{ loading.text }}
            <br />
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
    <div class="text-center">
      <v-dialog
        v-model="upload.progress"
        persistent
        width="300"
      >
        <v-card>
          <v-card-title :class="theme.color + ` darken-1 pa-1 white--text subtitle-1`">UPLOAD PROGRESS</v-card-title>
          <br />

          <v-card-text class="pa-2">
            <v-progress-linear
              v-model="upload.percent"
              :color="theme.color + ` darken-1`"
              height="20"
              reactive
              dark
            >
            </v-progress-linear>
            <div class="text-center">{{ upload.percent }} %</div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
    <div class="upload-wrapper">
      <div id="upload-button"></div>
    </div>
    <div class="text-center">
      <v-dialog
        v-model="update.status"
        persistent
        width="500"
      >
        <v-card>

          <v-card-title :class="theme.color + ` darken-1 pa-2 white--text subtitle-1`">
            <v-icon
              color="white"
              class="mr-2"
            >mdi-information-outline</v-icon> UPDATE INFORMATION
          </v-card-title>
          <v-card-title>{{update.title}}</v-card-title>
          <v-card-text>
            <div class="subtitle-1">Versi : {{ update.version}}</div>
          </v-card-text>
          <v-card-text class="">
            <p>{{update.description}}</p>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-">

            <v-row class="justify-end pa-5">
              <v-btn
                color="purple"
                dark
                @click="update.status= false"
                class="right"
              >OK</v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-footer padless>
      <v-card
        flat
        tile
        width="100%"
        class=""
        height="50"
        :color="theme.color + ` lighten-5`"
      >
        <v-divider></v-divider>

        <v-card-text :class="theme.color +`--text   `">
          <v-row class="ml-5 mr-5 justify-content-around">
            <span :class="drawer ? `footer-status`:`footer-status-mobile`">Status : <b> {{ dialog.delete ? "Hapus Data" :  form.add ? (form.edit ?  "Ubah data":"Tambah data") :'Ready' }} </b>
              <span v-show="page.showtable"> | Records : <b> {{ records.length  }} </b> Rows | &nbsp;</span></span>

            <div
              style="width:100px;height: 40px;"
              v-show="device.desktop && page.showtable"
            >
              <v-select
                label=""
                dense
                hide-details
                outlined
                :color="theme.color"
                :items="perpages"
                v-model="table.options.itemsPerPage"
              ></v-select>
            </div>
            <div
              style=""
              v-show="device.desktop && page.showtable"
            >
              <v-pagination
                :color="theme.color"
                v-model="table.options.page"
                :length="table.options.pageCount"
                :total-visible="6"
                circle
              ></v-pagination>
            </div>

            <v-spacer></v-spacer>
            <span
              class="footer-copyright"
              v-show="device.desktop"
            >
              Copyright &copy; {{ new Date().getFullYear() }} —
              <strong>{{info.app_company}}</strong>
            </span>
          </v-row>
        </v-card-text>

      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import { baseMixins } from "../../mixings/BaseMixins";
import { mapActions, mapState } from "vuex";
import "animate.css";
import { io } from "socket.io-client";
export default {
  data: () => ({
    drawer: null,
    vertical: true,
    bg: "",
    update: {
      status: false,
      title: null,
      description: null,
      version: null,
    },
    menu: false,
    perpages: [
      { text: 10, value: 10 },
      { text: 15, value: 15 },
      { text: 25, value: 25 },
      { text: 50, value: 50 },
    ],
    socket: null,
  }),

  mixins: [baseMixins],

  computed: {
    ...mapState([
      "snackbar",
      "theme",
      "thememode",
      "dialog",
      "user",
      "menus",
      "page",
      "form",
      "device",
      "loading",
      "upload",
      "info",
      "http",
      "table",
      "records",
      "channel",
    ]),
  },
  created() {
    this.bg = this.page.domainUrl + "images/bg-nav-purple-3.jpg";
  },
  mounted() {
    this.getAppInfo().then(() => {
      window.document.title = this.info.app_company;
      const favicon = window.document.getElementById("favicon");
      favicon.href = this.info.app_logo;
    });
    this.getMenus();
    this.getUserInfo().then(() => {
      this.openSocket();
    });
    this.sleep(500).then(() => {
      this.setPage({
        drawer: this.device.desktop,
      });
    });
  },
  methods: {
    ...mapActions([
      "signOut",
      "snackbarClose",
      "postDelete",
      "postBulkDelete",
      "dialogDeleteClose",
      "dialogBulkDeleteClose",
      "fetchRecords",
      "initUploadLibrary",
      "getUserInfo",
      "getMenus",
      "clearMenu",
      "getAppInfo",
      "setLoading",
      "setPage",
      "setTable",
      "setWaQr",
      "setWaAuth",
    ]),

    signout: function () {
      this.clearMenu();
      this.signOut();
      this.$router.push({ name: "login" });
    },
    deleteRecord: function () {
      this.postDelete().then(() => {
        this.dialogDeleteClose();
      });
    },
    bulkDeleteRecord: function () {
      this.postBulkDelete().then(() => {
        this.dialogBulkDeleteClose();
      });
    },
    checkUpdate: async function () {
      try {
        let {
          data: { status, message, data },
        } = await this.http.get("api/utility/check-update");
        this.update.title = data.title;
        this.update.description = data.description;
        this.update.status = status;
        this.update.version = data.version;
      } catch (error) {
        console.error;
      }
    },
    sleep: function (time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    },
    openSocket: async function () {
      const url_loc = "http://localhost:3333";
      const url_prod = "https://api.senderwa.com";
      this.socket = new io(url_prod, {
        autoConnect: true,
      });

      this.socket.on(this.channel + ":sended", (data) => {
        this.snackbar.color = this.theme.color;
        this.snackbar.text = data.message;
        this.snackbar.state = true;
      });

      this.socket.on(this.channel + ":qr", (data) => {
        const payload = {
          id: data.id,
          src: data.src,
          show: data.show,
        };
        this.setWaQr(payload);
      });

      this.socket.on(this.channel + ":authenticated", (data) => {
        const payload = {
          id: data.id,
          name: data.name,
          status: data.status,
          image: data.image,
        };

        this.setWaAuth(payload);
      });
    },
  },
};
</script>

<style lang="sass">
@import "../../assets/css/wow.css"
</style>

<style>
.main-content {
  height: 80vh;
  overflow-y: scroll;
}
.toolbar-title {
  font-size: 15px;
  font-weight: 600;
  color: darkslategrey;
  font-stretch: condensed;
}
.people-title {
  font-family: people;
  font-size: 18px;
}
.toolbar-sub-title {
  font-size: 8pt;
  color: grey;
  font-weight: 500;
}
::before {
  border-radius: 0px;
}
.footer-status {
  margin-top: 10px;
  margin-left: 250px;
  font-size: 9pt;
  color: grey;
}
.footer-status-mobile {
  margin-left: 0px;
  font-size: 9pt;
  color: grey;
}
.footer-copyright {
  margin-top: 10px;
  font-size: 9pt;
}
</style>




