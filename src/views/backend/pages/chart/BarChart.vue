<script>
import { Bar } from "vue-chartjs";
import { mapActions, mapState } from "vuex";

export default {
  name: "permohonan-bulan",
  extends: Bar,

  data: () => ({
    color: "#3F51B5",
  }),

  computed: {
    ...mapState(["http", "theme"]),
  },

  mounted() {
    this.fetchData();
    //this.color = this.theme.color;
  },
  methods: {
    fetchData: async function () {
      //let { data } = await this.http.get(
      "api/supervisor/dashboard-pengajuan-per-bulan";
      //);
      this.renderChart(
        {
          labels: [
            "Januari",
            "Pebruari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "July",
            "Augustus",
            "September",
            "Oktober",
            "Nopember",
            "Desember",
          ],
          datasets: [
            {
              label: "Statistik Pengaduan Per Bulan Tahun 2022",
              backgroundColor: "#3F51B5",
              data: [40, 20, 12, 39, 20, 40, 39, 80, 40, 20, 12, 11],
            },
          ],
        },
        { responsive: true, maintainAspectRatio: false }
      );
    },
  },
};
</script>
