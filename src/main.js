import "material-design-icons-iconfont/dist/material-design-icons.css";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueYoutube from "vue-youtube";
import { mapActions } from "vuex";
import tinymce from "vue-tinymce-editor";
import "./assets/font.css";
import { TiptapVuetifyPlugin } from "tiptap-vuetify";
// don't forget to import CSS styles
import "tiptap-vuetify/dist/main.css";
// Vuetify's CSS styles
import "vuetify/dist/vuetify.min.css";

Vue.component("tinymce", tinymce);
Vue.use(VueYoutube);

// use this package's plugin
Vue.use(TiptapVuetifyPlugin, {
  // the next line is important! You need to provide the Vuetify Object to this place.
  vuetify, // same as "vuetify: vuetify"
  // optional, default to 'md' (default vuetify icons before v2.0.0)
  iconsGroup: "md",
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  mounted() {
    this.deviceResize();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", this.deviceResize, {
        passive: true,
      });
    }
  },
  beforeDestroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.deviceResize, {
        passive: true,
      });
    }
  },
  data: () => ({}),
  methods: {
    ...mapActions(["deviceResize"]),
  },
  render: (h) => h(App),
}).$mount("#app");
