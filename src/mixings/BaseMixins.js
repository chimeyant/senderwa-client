import { mapActions, mapState } from "vuex";
import { domainURL } from "../.env.js";

export const baseMixins = {
  computed: {
    ...mapState(["upload"]),
  },

  methods: {
    ...mapActions(["initUploadLibrary"]),
  },

  mounted() {
    this.initUploadLibrary({
      baseEndpoint: domainURL.BASE + "api/media",
    });
  },
};
