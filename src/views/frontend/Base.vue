 <template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>

    <v-snackbar
      v-model="snackbar.state"
      :color="snackbar.color"
      :timeout="3500"
      multi-line
    >
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          :color="theme.color"
          text
          v-bind="attrs"
          @click="snackbarClose"
        >
          Tutup
        </v-btn>
      </template>
    </v-snackbar>
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
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import HeaderComponentVue from "./components/HeaderComponent.vue";
import FooterComponentVue from "./components/FooterComponent.vue";

export default {
  name: "BaseFrontend",
  components: {
    HeaderComponentVue,
    FooterComponentVue,
  },
  data: () => ({}),
  mounted() {
    this.setPage({
      crud: true,
    }).then(() => {
      this.getAppInfo().then(() => {
        this.getAppInfo().then(() => {
          window.document.title = this.info.app_company;
        });
      });
    });
  },
  computed: {
    ...mapState(["device", "theme", "info", "snackbar", "loading"]),
  },
  methods: {
    ...mapActions(["setPage", "getAppInfo", "snackbarClose"]),
  },
  watch: {},
};
</script>

<style lang="sass">
@import "../../assets/css/wow.css"
</style>