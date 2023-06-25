import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import Resumable from "resumablejs";
import AuthProvider from "../providers/AuthProviders";
import { domainURL } from "../.env";
import route from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    /**
     * color theme
     */
    theme: {
      mode: null,
      color: null,
    },

    /**
     * Socket Configuration
     */
    channel: null,
    whatsapp: {
      qr: {
        id: null,
        src: null,
        show: false,
      },
      authenticated: {
        id: null,
        name: null,
        status: null,
        imgUrl: null,
        show: false,
      },
    },

    auth: AuthProvider,
    /**
     * device holder
     */
    device: {
      mobile: false,
      desktop: false,
    },

    /**
     * page property
     */
    page: {
      domainUrl: domainURL.BASE,
      dataUrl: null,
      crud: null,
      title: null,
      subtitle: null,
      icon: null,
      pagination: false,
      key: "id",
      breadcrumbs: [],
      toolbar: true,
      add: false,
      edit: false,
      actions: {
        refresh: true,
        add: true,
        edit: true,
        delete: true,
        bulkdelete: true,
        export: false,
        print: false,
        help: false,
      },
      showtable: true,
    },

    /**
     * Folder holder
     */
    form: {
      add: false,
      edit: false,
    },
    /**
     * loading holder
     */
    loading: {
      table: false,
      addnew: false,
      update: false,
      delete: false,
      dialog: false,
      text: null,
    },
    /**
     * table
     */
    table: {
      /**
       * the table option propery, this property was auto-create by datatable
       */
      options: {
        page: 1,
        currpage: 1,
        itemsPerPage: 5,
        sortBy: null,
        sortDesc: false,
        search: null,
        pageCount: 1,
      },

      /**
       * the table total property
       */
      total: 0,

      /**
       * the table current page property
       */
      page: 0,

      /**
       * the table last page property
       */
      lastPage: 0,
    },

    /**
     * event process
     */
    event: {
      addnew: false,
      update: false,
      delete: false,
    },
    /**
     * Dialog holder
     */
    dialog: {
      addnew: false,
      update: false,
      delete: false,
      bulkdelete: false,
    },
    /**
     * axios http
     */
    http: null,
    /**
     * snackbar
     */
    snackbar: {
      color: null,
      text: null,
      state: false,
    },
    /**
     * info app
     */
    info: {},
    /**
     * user app info
     */
    user: {},

    /**
     * menus
     */
    menus: [],

    /**
     * the active page record propery
     */
    record: {},

    /**
     * the active page records holders
     */
    records: [],

    /**
     * the active page record selected holders
     */
    selected: [],

    /**
     * Upload state holder
     */
    upload: {
      uploadLib: null,
      query: null,
      baseEndpoint: null,
      requestEndpoint: null,
      callback: () => {},
      progress: false,
      percent: 0,
      filename: "untitled",
      size: 0,
      maxSize: 5000000,
    },
  },
  mutations: {
    DEVICE_MUTATION: function(state, payload) {
      Object.keys(payload).forEach((key) => {
        state.device[key] = payload[key];
      });
    },
    PAGE_MUTATION: function(state, payload) {
      Object.keys(payload).forEach((key) => {
        state.page[key] = payload[key];
      });
    },
    FORM_MUTATION: function(state, payload) {
      Object.keys(payload).forEach((key) => {
        state.form[key] = payload[key];
      });
    },
    TABLE_MUTATION: function(state, payload) {
      Object.keys(payload).forEach((key) => {
        state.table[key] = payload[key];
      });
    },
    THEMEMODE_MUTATION: function({ state, payload }) {
      state.thememode = payload;
    },
    THEME_MUTATION: function(state, payload) {
      state.theme = payload;
    },
    HTTP_CLEAR_MUTATION: function(state, payload) {
      state.http = false;
    },
    HTTP_MUTATION: function(state, payload) {
      if (!state.http) {
        let headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        };

        if (state.auth && state.auth.token) {
          headers = Object.assign(
            {
              Authorization: state.auth.token,
            },
            headers
          );
        }

        state.http = Axios.create({
          baseURL: state.page.domainUrl,
          headers,
        });
      } else {
        if (!payload || !Object.keys(payload).length) return;

        Object.keys(payload).forEach((key) => {
          switch (key) {
            case "domain":
              state.auth.domainURL = payload[key];
              state.http.defaults.baseURL = payload[key];
              break;

            case "token":
              state.auth.token = payload[key];
              state.http.defaults.headers.common["Authorization"] =
                payload[key].type + " " + payload[key].token;
              break;
          }
        });
      }
    },
    SNACKBAR_MUTATION: function(state, payload) {
      Object.keys(payload).forEach((key) => {
        state.snackbar[key] = payload[key];
      });
    },
    LOADING_MUTATION: function(state, payload) {
      Object.keys(payload).forEach((key) => {
        state.loading[key] = payload[key];
      });
    },
    EVENT_MUTATION: function(state, payload) {
      Object.keys(payload).forEach((key) => {
        state.event[key] = payload[key];
      });
    },
    DIALOG_MUTATION: function(state, payload) {
      Object.keys(payload).forEach((key) => {
        state.dialog[key] = payload[key];
      });
    },
    INFO_MUTATION: function(state, payload) {
      state.info = payload;
    },
    USER_MUTATION: function(state, payload) {
      state.user = payload;
      state.auth.user = payload;
    },
    MENUS_MUTATION: function(state, payload) {
      state.menus = payload;
    },
    RECORDS_MUTATION: function(state, payload) {
      state.records = payload;
    },
    PUSH_RECORDS_MUTATION: function(state, payload) {
      state.records.push(payload);
    },
    CHANGE_RECORDS_MUTATION: function(state, payload) {
      const index = state.records.findIndex((item) => item.id === payload.id);
      Object.keys(payload).forEach((key) => {
        state.records[index][key] = payload[key];
      });
    },
    PULL_RECORDS_MUTATION: function(state, payload) {
      state.records.splice(
        state.records.findIndex((item) => item.id == payload),
        1
      );
    },
    RECORD_MUTATION: function(state, payload) {
      state.record = payload;
    },
    SELECTED_MUTATION: function(state, payload) {
      state.selected = payload;
    },
    NEW_RECORD: function(state, payload) {
      state.record = {};
    },
    UPLOAD_MUTATION: function(state, payload) {
      if (!payload) return;

      Object.keys(payload).forEach((key) => {
        state.upload[key] = payload[key];
      });
    },
    CHANNEL_MUTATION: function(state, payload) {
      state.channel = payload;
    },
    WA_QR_MUTATION: function(state, payload) {
      state.whatsapp.qr.id = payload.id;
      state.whatsapp.qr.src = payload.src;
      state.whatsapp.qr.show = payload.show;
      state.whatsapp.authenticated.id = null;
      state.whatsapp.authenticated.name = null;
      state.whatsapp.authenticated.status = null;
      state.whatsapp.authenticated.imgUrl = null;
      state.whatsapp.authenticated.show = null;
    },
    WA_AUTHENTICATED_MUTATION: function(state, payload) {
      state.whatsapp.authenticated.id = payload.id;
      state.whatsapp.authenticated.name = payload.name;
      state.whatsapp.authenticated.status = payload.status;
      state.whatsapp.authenticated.imgUrl = payload.image;
      state.whatsapp.authenticated.show = payload.show;
      state.whatsapp.qr.id = null;
      state.whatsapp.qr.src = null;
      state.whatsapp.qr.show = false;
    },
  },
  actions: {
    deviceResize: function({ commit }) {
      let isMobile = window.innerWidth < 600;
      let xpayload = {
        mobile: isMobile,
        desktop: !isMobile,
      };

      commit("DEVICE_MUTATION", xpayload);
    },

    setPage: function({ commit, dispatch }, payload) {
      if (payload.hasOwnProperty("crud")) {
        commit("PAGE_MUTATION", payload);
        commit("HTTP_MUTATION", payload);
        commit("TABLE_MUTATION", {
          options: {
            page: 1,
            itemsPerPage: 10,
          },
        });
      } else {
        commit("PAGE_MUTATION", payload);
        commit("TABLE_MUTATION", {
          options: {
            page: 1,
            itemsPerPage: 10,
          },
        });
      }
    },

    setForm: function({ commit, dispatch }, payload) {
      commit("FORM_MUTATION", payload);
    },

    setTable: function({ commit, dispatch }, payload) {
      commit("TABLE_MUTATION", payload);
    },

    getAppInfo: async function({ commit, dispatch, state }, payload) {
      try {
        let { data: info } = await this.state.http.get("api/info");
        commit("INFO_MUTATION", info);
        commit("THEME_MUTATION", info.app_theme);
      } catch (error) {}
    },

    setTheme: async function({ commit, dispatch, status }, payload) {
      commit("THEME_MUTATION", payload);
    },

    getUserInfo: async function({ commit, dispatch, state }, payload) {
      try {
        let { data: user } = await this.state.http.get("api/user-info");
        commit("USER_MUTATION", user);
        commit("CHANNEL_MUTATION", user.email);
      } catch (error) {
        dispatch("catchError", error);
      }
    },

    getMenus: async function({ commit, dispatch, state }, payload) {
      try {
        let { data: menus } = await this.state.http.get("api/menus");
        commit("MENUS_MUTATION", menus);
      } catch (error) {}
    },

    assignFileBrowse: function({ commit, state }, payload) {
      let fileBrowse = document
        .getElementById("upload-button")
        .getElementsByTagName("input");

      if (fileBrowse && fileBrowse.length) {
        if (payload.hasOwnProperty("fileType")) {
          fileBrowse[0].setAttribute("accept", payload.fileType);

          delete payload.fileType;
        } else {
          fileBrowse[0].removeAttribute("accept");
        }

        commit("UPLOAD_MUTATION", payload);

        fileBrowse[0].click();
      }
    },

    snackbarClose: function({ commit }) {
      commit("SNACKBAR_MUTATION", {
        state: false,
      });
    },

    dialogDeleteClose: function({ commit }) {
      commit("DIALOG_MUTATION", {
        delete: false,
      });
    },

    dialogBulkDeleteClose: function({ commit }) {
      commit("DIALOG_MUTATION", {
        bulkdelete: false,
      });
    },

    signUp: async function({ commit, state }, payload) {
      try {
        if (
          !payload.name ||
          !payload.email ||
          !payload.userpass ||
          !payload.email ||
          !payload.hp ||
          !payload.authent
        ) {
          commit("SNACKBAR_MUTATION", {
            color: "warning",
            text: "Opps.., data tidak lengkap",
            state: true,
          });

          return false;
        }

        if (payload.userpass != payload.repass) {
          commit("SNACKBAR_MUTATION", {
            color: "warning",
            text: "Kata Sandi dan Konfirmasi Kata Sandi tidak sama",
            state: true,
          });

          return false;
        }
        commit("LOADING_MUTATION", {
          dialog: true,
          text: "Registering, please wait...",
        });
        let {
          data: { status, message },
        } = await state.http.post("api/auth/register", {
          username: payload.name,
          email: payload.email,
          password: payload.userpass,
          hp: payload.hp,
          authent: payload.authent,
        });

        if (!status) {
          commit("SNACKBAR_MUTATION", {
            color: "red",
            text: message,
            state: true,
          });

          return;
        }

        commit("SNACKBAR_MUTATION", {
          color: state.theme.color,
          text: message,
          state: true,
        });

        return true;
      } catch (error) {
        commit("SNACKBAR_MUTATION", {
          color: "error",
          text: "Proses register tidak berhasil",
          state: true,
        });

        return false;
      } finally {
        commit("LOADING_MUTATION", {
          dialog: false,
          text: "",
        });
      }
    },
    signIn: async function({ commit, state }, payload) {
      try {
        if (!payload.username || !payload.userpass) {
          commit("SNACKBAR_MUTATION", {
            color: "warning",
            text: "User dan kata sandi tidak boleh kosong",
            state: true,
          });

          return false;
        }

        const users = {};

        commit("USER_MUTATION", {
          user: users,
        });

        const menus = [];
        commit("MENUS_MUTATION", { menus });

        let {
          data: { code, success, token, errors },
        } = await state.http.post("/api/auth/token", {
          email: payload.username,
          password: payload.userpass,
        });

        commit("HTTP_MUTATION", {
          token: token,
        });

        let { data: user } = await state.http.get("/api/user-info");

        commit("USER_MUTATION", {
          user: user,
        });

        return true;
      } catch (error) {
        commit("SNACKBAR_MUTATION", {
          color: "error",
          text: "User dan password tidak sesuai ",
          state: true,
        });
      }
    },
    signOut: function({ commit, state }) {
      const menus = [];
      commit("MENUS_MUTATION", { menus });
      commit("HTTP_MUTATION", {
        token: "",
      });
      commit("HTTP_CLEAR_MUTATION");
      state.auth.clear();
    },

    /**
     * fetchRecords
     */
    fetchRecords: async function({ state, commit, dispatch }, payload) {
      try {
        if (state.page.pagination) {
          commit("LOADING_MUTATION", {
            table: true,
          });

          commit("RECORDS_MUTATION", []);

          let {
            data: { data, meta },
          } = await state.http.get(state.page.dataUrl, {
            params: state.table.options,
          });

          commit("LOADING_MUTATION", {
            table: false,
          });

          commit("TABLE_MUTATION", {
            total: meta.total,
          });

          commit("RECORDS_MUTATION", data);

          commit("EVENT_MUTATION", {
            update: false,
          });

          commit("RECORD_MUTATION", {});
        } else {
          commit("LOADING_MUTATION", {
            table: true,
          });

          commit("RECORDS_MUTATION", []);

          let { data: data } = await state.http.get(state.page.dataUrl);

          commit("LOADING_MUTATION", {
            table: false,
          });

          commit("TABLE_MUTATION", {
            options: {
              page: 1,
              itemsPerPage: 10,
              sortBy: null,
              sortDesc: false,
              search: null,
              pageCount: 1,
            },
          });

          commit("RECORDS_MUTATION", data);

          commit("EVENT_MUTATION", {
            update: false,
          });

          commit("RECORD_MUTATION", {});
        }
      } catch (error) {
        commit("LOADING_MUTATION", {
          table: false,
        });
        commit("RECORDS_MUTATION", []);
        commit("RECORD_MUTATION", {});
      } finally {
        commit("LOADING_MUTATION", {
          table: false,
        });
      }
    },

    /** add New Record */
    postAddNew: async function({ state, commit, dispatch }, payload) {
      try {
        commit("LOADING_MUTATION", {
          addnew: true,
          dialog: true,
          text: "Store data, please wait",
        });

        commit("RECORD_MUTATION", payload);

        let {
          data: { success, code, message, data },
        } = await state.http.post(state.page.dataUrl, state.record);

        if (success === false) {
          commit("SNACKBAR_MUTATION", {
            color: "warning",
            text: "Opps...! terjadi kesalahan , " + errors,
            state: true,
          });

          return;
        }

        commit("RECORD_MUTATION", {});

        commit("PUSH_RECORDS_MUTATION", data);

        commit("SNACKBAR_MUTATION", {
          color: state.theme.color,
          text: message,
          state: true,
        });

        return true;
      } catch (error) {
        dispatch("catchError", error);
      } finally {
        commit("LOADING_MUTATION", {
          addnew: false,
          dialog: false,
          text: "",
        });
      }
    },
    postEdit: async function({ state, commit, dispatch }, payload) {
      try {
        commit("LOADING_MUTATION", {
          dialog: true,
          text: "Loading data",
        });
        let { data: record } = await state.http.get(
          state.page.dataUrl + "/" + payload,
          { params: { id: payload } }
        );

        commit("RECORD_MUTATION", record);

        commit("EVENT_MUTATION", {
          update: true,
        });
      } catch (error) {
        dispatch("catchError", error);
      } finally {
        commit("LOADING_MUTATION", {
          dialog: false,
          text: "",
        });
      }
    },
    postUpdate: async function({ state, commit, dispatch }, payload) {
      try {
        commit("LOADING_MUTATION", {
          update: true,
          dialog: true,
          text: "Update data, please wait...",
        });

        commit("RECORD_MUTATION", payload);

        let {
          data: { success, message, data, errors },
        } =
          state.page.key == "id"
            ? await state.http.put(
                state.page.dataUrl + "/" + state.record.id,
                state.record
              )
            : await state.http.put(
                state.page.dataUrl + "/" + state.record.uuid,
                state.record
              );

        if (!success) {
          commit("SNACKBAR_MUTATION", {
            color: "warning",
            text: message,
            state: true,
          });
          return;
        }

        commit("RECORD_MUTATION", {});

        commit("CHANGE_RECORDS_MUTATION", data);

        commit("EVENT_MUTATION", {
          update: false,
        });

        commit("SNACKBAR_MUTATION", {
          color: state.theme.color,
          text: message,
          state: true,
        });
      } catch (error) {
        dispatch("catchError", error);
      } finally {
        commit("LOADING_MUTATION", {
          update: false,
          dialog: false,
          text: "",
        });
      }
    },
    /**
     * Post Confirm Delete
     */
    postConfirmDelete: function({ state, commit, dispatch }, payload) {
      try {
        commit("RECORD_MUTATION", {
          id: payload,
        });

        commit("DIALOG_MUTATION", {
          delete: true,
        });
      } catch (error) {}
    },

    /**
     * delete fucntion
     */
    postDelete: async function({ state, commit, dispatch }, payload) {
      try {
        commit("LOADING_MUTATION", {
          delete: true,
          dialog: true,
          text: "Deleted data, please wait...",
        });

        let {
          data: { success, message, data },
        } = await state.http.delete(
          state.page.dataUrl + "/" + state.record.id,
          state.record
        );

        if (!success) {
          commit("SNACKBAR_MUTATION", {
            color: "warning",
            text: message,
            state: true,
          });

          return;
        }

        commit("PULL_RECORDS_MUTATION", data.id);

        commit("SNACKBAR_MUTATION", {
          color: state.theme.color,
          text: message,
          state: true,
        });

        return;
      } catch (error) {
        dispatch("catchError", error);
      } finally {
        commit("LOADING_MUTATION", {
          delete: false,
          dialog: false,
          text: "",
        });
      }
    },

    /**
     *
     * Post confirm bulk diaolog delete
     */
    postConfirmBulkDelete: function({ state, commit, dispatch }, payload) {
      try {
        commit("SELECTED_MUTATION", {
          selected: payload,
        });

        commit("DIALOG_MUTATION", { bulkdelete: true });
      } catch (error) {}
    },

    /**
     *
     * post bulkd delete
     */
    postBulkDelete: async function({ state, commit, dispatch }, payload) {
      try {
        commit("LOADING_MUTATION", {
          bulkdelete: true,
          dialog: true,
          text: "Deleted data, please wait...",
        });

        let {
          data: { status, message },
        } = await state.http.post(
          state.page.dataUrl + "-bulk-delete",
          state.selected
        );

        if (!status) {
          commit("SNACKBAR_MUTATION", {
            color: "warning",
            text: message,
            state: true,
          });

          return;
        }

        commit("SNACKBAR_MUTATION", {
          color: state.theme.color,
          text: message,
          state: true,
        });

        return;
      } catch (error) {
        dispatch("catchError", error);
      } finally {
        commit("LOADING_MUTATION", {
          bulkdelete: false,
          dialog: false,
          text: "",
        });
      }
    },

    /**
     * Post Commit Record
     * @param {*} param0
     * @param {*} payload
     */

    /**
     * Intial upload library
     */
    setNewRecord: function({ commit, state }) {
      commit("NEW_RECORD");
    },
    setRecord: function({ commit, state }, payload) {
      commit("RECORD_MUTATION", payload);
    },

    setTable: function({ commit, state }, payload) {
      commit("TABLE_MUTATION", payload);
    },

    setLoading: function({ commit, state }, payload) {
      commit("LOADING_MUTATION", payload);
    },

    clearMenu: function({ commit, state }, payload) {
      commit("MENUS_MUTATION", []);
    },

    setWaQr: function({ commit, state }, payload) {
      commit("WA_QR_MUTATION", payload);
    },

    setWaAuth: function({ commit, state }, payload) {
      commit("WA_AUTHENTICATED_MUTATION", payload);
    },

    initUploadLibrary: function({ commit, state }, payload) {
      commit("UPLOAD_MUTATION", {
        uploadLib: null,
        baseEndpoint: payload.baseEndpoint,
        requestEndpoint: payload.baseEndpoint,
      });

      let uploadLib = new Resumable({
        chunkNumberParameterName: "chunkNumb",
        totalChunksParameterName: "chunkMaxs",
        chunkSizeParameterName: "chunkSize",
        totalSizeParameterName: "totalSize",
        identifierParameterName: "uuid",
        currentChunkSizeParameterName: "currentSize",
        fileNameParameterName: "fileName",
        relativePathParameterName: "relativePath",
        typeParameterName: "mimeType",
        chunkSize: 1000000000 * 1024 * 1024,
        forceChunkSize: true,
        testChunks: false,
        simultaneousUploads: 4,

        target: function() {
          return state.upload.requestEndpoint;
        },
        query: function() {
          return state.upload.query;
        },
        headers: {
          Authorization: state.auth.token,
        },
      });

      let bytesToSize = function(bytes) {
        let sizes = ["Bytes", "KB", "MB", "GB", "TB"];
        if (bytes == 0) return "n/a";
        let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        if (i == 0) return bytes + " " + sizes[i];
        return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
      };

      uploadLib.assignBrowse(document.getElementById("upload-button"));

      uploadLib.on("fileAdded", function(file) {
        if (file.size > state.upload.maxSize) {
          commit("SNACKBAR_MUTATION", {
            color: "error",
            text: "File terlalu besar",
            state: true,
          });

          commit("UPLOAD_MUTATION", {
            progress: false,
            percent: 100,
          });

          uploadLib.removeFile(file);

          return false;
        }
        commit("UPLOAD_MUTATION", {
          filename: file.fileName,
          size: bytesToSize(file.size),
        });

        uploadLib.upload();
      });

      uploadLib.on("fileProgress", function(file) {
        commit("UPLOAD_MUTATION", {
          percent: Math.floor(file.progress() * 100),
        });
      });

      uploadLib.on("fileSuccess", function(file, message) {
        state.upload.callback(JSON.parse(message));
        uploadLib.removeFile(file);
      });

      uploadLib.on("uploadStart", function() {
        commit("UPLOAD_MUTATION", {
          progress: true,
        });
      });

      uploadLib.on("complete", function() {
        commit("UPLOAD_MUTATION", {
          progress: false,
          percent: 100,
        });
      });
      uploadLib.on("fileError", function(file, message) {
        commit("SNACKBAR_MUTATION", {
          color: "error",
          text: message,
          state: true,
        });
      });

      commit("UPLOAD_MUTATION", {
        uploadLib: uploadLib,
      });
    },

    /**
     * dispatch err handle
     */
    catchError: function({ state, commit, dispatch }, payload) {
      if (process.env.NODE_ENV === "production") {
        window.console.clear();
      }

      if (payload.hasOwnProperty("response") && payload.response) {
        let {
          data: { message, errors },
          status,
        } = payload.response;

        if (status === 404) {
          commit("SNACKBAR_MUTATION", {
            color: "error",
            text: "halaman tidak ditemukan",
            state: true,
          });
        }
        if (status === 422) {
          commit("SNACKBAR_MUTATION", {
            color: "error",
            text: errors[0].message,
            state: true,
          });
        }

        if (status === 401) {
          commit("SNACKBAR_MUTATION", {
            color: "error",
            text: "Unauthorized or Forbiden",
            state: true,
          });
          //
          const menus = [];
          commit("MENUS_MUTATION", { menus });
          commit("HTTP_MUTATION", {
            token: "",
          });
          commit("HTTP_CLEAR_MUTATION");
          state.auth.clear();

          route.push({ name: "login" });
        }

        if (status === 403) {
          commit("SNACKBAR_MUTATION", {
            color: "error",
            text: "Unauthorized or Forbiden",
            state: true,
          });
        }

        if (status === 500) {
          commit("SNACKBAR_MUTATION", {
            color: "error",
            text:
              "Opps..., Terjadi kesalahan di server, silahkan kembali beberapa saat kemudian  " +
              response,
            state: true,
          });
        }
        if (status === 501) {
          commit("SNACKBAR_MUTATION", {
            color: "error",
            text: "Opps..., " + errors[0].message,
            state: true,
          });
        }

        if (status === 502) {
          commit("SNACKBAR_MUTATION", {
            color: "error",
            text:
              "Opps..., Server sedang sibuk silahkan kembali beberapa saat lagi",
            state: true,
          });
        }

        if (status === 503) {
          commit("SNACKBAR_MUTATION", {
            color: "error",
            text:
              "Opps..., Service sedang sibuk atau mati. Silahkan coba beberapa saat lagi",
            state: true,
          });
        }
      }
    },
  },
});
