<template>
  <div :class="device.desktop ? `home pa-6 grey lighten-4`:`home pa-0 grey lighten-4`">

    <v-row class="pa-1">
      <v-spacer></v-spacer>
      <v-col :cols="device.desktop ? `12` : `12`">
        <v-card class="animated animate__fadeInUp">
          <v-card-title :class="`white--text ` + theme.color + ` Plighten-1`">Formulir Inpeksi Keselamatan
            <v-spacer></v-spacer>
            <v-tooltip
              :color="theme.color"
              bottom
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  text
                  small
                  icon
                  v-on="on"
                >
                  <v-icon
                    :color="theme.mode == 'dark' ? `white` : `black`"
                    @click="postStoreRecord"
                  >mdi-content-save</v-icon>
                </v-btn>
              </template>
              <span>Simpan</span>
            </v-tooltip>
            <v-tooltip
              :color="theme.color"
              bottom
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  text
                  small
                  icon
                  v-on="on"
                >
                  <v-icon
                    :color="theme.mode == 'dark' ? `white` : `black`"
                    @click="$router.push({name:'keselamatan-pemeriksaan', params:{permohonan_uuid: $route.params.permohonan_uuid, itemsPerPage: $route.params.itemsPerPage, page: $route.params.page}})"
                  >mdi-close-circle</v-icon>
                </v-btn>
              </template>
              <span>Tutup</span>
            </v-tooltip>
          </v-card-title>
          <v-row class="pa-5">
            <v-col cols="12">
              <div class="subtitle-1 blue--text">
                DATA PEMERIKSAAN
              </div>
              <div class="box-data-pemeriksaan">
                <v-row>
                  <v-col :cols="device.desktop ?6 :12">
                    <v-row>
                      <v-col :cols="device.desktop ? 8:12">
                        <v-text-field
                          label="Tanggal"
                          outlined
                          dense
                          hide-details
                          type="date"
                          :color="theme.color"
                          v-model="record.tanggal"
                          :filled="record.tanggal"
                        ></v-text-field>
                      </v-col>
                      <v-col :cols="device.desktop ? 4:12">
                        <v-select
                          label="Hari"
                          outlined
                          dense
                          hide-details
                          v-model="record.hari"
                          :filled="record.hari"
                          :color="theme.color"
                          :items="days"
                        ></v-select>
                      </v-col>
                      <v-col cols="12">
                        <v-select
                          label="Lokasi"
                          outlined
                          dense
                          :color="theme.color"
                          hide-details
                          v-model="record.lokasi"
                          :filled="record.lokasi"
                          :items="lokasis"
                        ></v-select>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Nama Lokasi"
                          :color="theme.color"
                          outlined
                          dense
                          hide-details
                          v-model="record.nama_lokasi"
                          :filled="record.nama_lokasi"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Nama Pengemudi"
                          :color="theme.color"
                          outlined
                          dense
                          hide-details
                          v-model="record.nama_pengemudi"
                          :filled="record.nama_pengemudi"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Umur"
                          :color="theme.color"
                          outlined
                          dense
                          hide-details
                          v-model="record.umur"
                          :filled="record.umur"
                          type="number"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col :cols="device.desktop ?6 :12">
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="Nama PO"
                          outlined
                          dense
                          hide-details
                          :color="theme.color"
                          v-model="record.nama_po"
                          :filled="record.nama_po"
                        ></v-text-field>
                      </v-col>
                      <v-col :cols="device.desktop ?6:12">
                        <v-text-field
                          label="Nomor Kendaraan"
                          outlined
                          dense
                          hide-details
                          v-model="record.nomor_kendaraan"
                          :filled="record.nomor_kendaraan"
                        ></v-text-field>
                      </v-col>
                      <v-col :cols="device.desktop ? 6:12">
                        <v-select
                          label="Jenis Angkutan"
                          outlined
                          dense
                          hide-details
                          :color="theme.color"
                          v-model="record.jenis_kendaraan"
                          :filled="record.jenis_kendaraan"
                          :items="jeniskendaraans"
                        ></v-select>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Nomor STUK"
                          outlined
                          dense
                          hide-details
                          :color="theme.color"
                          v-model="record.nomor_stuk"
                          :filled="record.nomor_stuk"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-select
                          label="Jenis Angkutan"
                          outlined
                          dense
                          hide-details
                          :color="theme.color"
                          v-model="record.jenis_angkutan"
                          :filled="record.jenis_angkutan"
                          :items="jenisangkutans"
                        ></v-select>
                      </v-col>
                      <v-col cols="12">
                        <v-autocomplete
                          label="Trayek"
                          :color="theme.color"
                          outlined
                          dense
                          hide-detail
                          v-model="record.trayek_uuid"
                          :filled="record.trayek_uuid"
                          :items="trayeks"
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </div>
            </v-col>
            <v-col>

              <v-tabs
                v-model="tab"
                class="mt-2 "
                centered
                :color="theme.color"
                block
              >
                <v-tabs-slider></v-tabs-slider>

                <v-tab href="#tab-1">
                  I. UNSUR ADMINISTRASI
                </v-tab>

                <v-tab href="#tab-2">
                  II. UNSUR TEKNIS UTAMA
                </v-tab>
                <v-tab href="#tab-3">
                  III. UNSUR TEKNIS PENUNJANG
                </v-tab>
                <v-tab href="#tab-4">
                  IV. KESIMPULAN
                </v-tab>
              </v-tabs>

              <v-tabs-items v-model="tab">
                <v-tab-item value="tab-1">
                  <v-card flat>
                    <v-card-text>
                      <v-col cols="12">
                        <v-row>
                          <v-col
                            class="pt-6"
                            :col="device.desktop ? 4:12"
                          >
                            1. Kartu Uji/STUK
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Diijinkan Operasional"
                              outlined
                              dense
                              hide-details
                              v-model="record.kartu_uji_stuk_ijin"
                              :filled="record.kartu_uji_stuk_ijin"
                              :items="stukop"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Tilang & Dilarang"
                              outlined
                              dense
                              hide-details
                              v-model="record.kartu_uji_stuk_tilang"
                              :filled="record.kartu_uji_stuk_tilang"
                              :items="stuktl"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                            class="pt-6"
                            :col="device.desktop ? 4:12"
                          >
                            2. KP. Reguler
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Diijikan Operasional"
                              outlined
                              dense
                              hide-details
                              v-model="record.kp_reguler_ijin"
                              :filled="record.kp_reguler_ijin"
                              :items="kpregop"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Tilang & Dilarang"
                              outlined
                              dense
                              hide-details
                              v-model="record.kp_reguler_tilang"
                              :filled="record.kp_reguler_tilang"
                              :items="kpregtl"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                            class="pt-6"
                            :col="device.desktop ? 4:12"
                          >
                            3. KP. Cadangan (Untuk Kendaraan Cadangan)
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Diijikan Operasional"
                              outlined
                              dense
                              hide-details
                              v-model="record.kp_cadangan_ijin"
                              :filled="record.kp_cadangan_ijin"
                              :items="cadanganop"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Tilang & Dilarang"
                              outlined
                              dense
                              hide-details
                              v-model="record.kp_cadangan_tilang"
                              :filled="record.kp_cadangan_tilang"
                              :items="cadangantl"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col
                            class="pt-6"
                            :col="device.desktop ? 4:12"
                          >
                            4. SIM Pengemudi
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Diijikan Operasional"
                              outlined
                              dense
                              hide-details
                              v-model="record.sim_pengemudi_ijin"
                              :filled="record.sim_pengemudi_ijin"
                              :items="simop"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Tilang & Dilarang"
                              outlined
                              dense
                              hide-details
                              v-model="record.sim_pengemudi_tilang"
                              :filled="record.sim_pengemudi_tilang"
                              :items="simtl"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item value="tab-2">
                  <v-card flat>
                    <v-card-text>
                      <v-col cols=12>
                        <v-row>
                          <v-col
                            class="pt-6"
                            cols="12"
                          >
                            <span class="font-weight-bold">A. SISTEM PENERANGAN</span>
                          </v-col>
                          <v-col cols="12">
                            <span class="pl-2">1. Lampu Utama Kendaraan</span>
                          </v-col>
                          <v-col
                            :cols="device.desktop ? 4 : 12"
                            class="pt-5"
                          >
                            <span class="pl-4">a. Dekat</span>
                          </v-col>

                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Diijinkan Operasional"
                              outlined
                              dense
                              hide-details
                              v-model="record.lampu_utama_dekat_ijin"
                              :filled="record.lampu_utama_dekat_ijin"
                              :items="sistempenerangan.lampu_op"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Tilang & Dilarang"
                              outlined
                              dense
                              hide-details
                              v-model="record.lampu_utama_dekat_tilang"
                              :filled="record.lampu_utama_dekat_tilang"
                              :items="sistempenerangan.lampu_tl"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                            :cols="device.desktop ? 4 : 12"
                            class="pt-5"
                          >
                            <span class="pl-4">b. Jauh</span>
                          </v-col>

                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Diijinkan Operasional"
                              outlined
                              dense
                              hide-details
                              v-model="record.lampu_utama_jauh_ijin"
                              :filled="record.lampu_utama_jauh_ijin"
                              :items="sistempenerangan.lampu_op"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Tilang & Dilarang"
                              outlined
                              dense
                              hide-details
                              v-model="record.lampu_utama_jauh_tilang"
                              :filled="record.lampu_utama_jauh_tilang"
                              :items="sistempenerangan.lampu_tl"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12">
                            <span class="pl-2">2. Lampu Penunjuk Arah (SIEN)</span>
                          </v-col>
                          <v-col
                            :cols="device.desktop ? 4 : 12"
                            class="pt-5"
                          >
                            <span class="pl-4">a. Depan</span>
                          </v-col>

                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Diijinkan Operasional"
                              outlined
                              dense
                              hide-details
                              v-model="record.lampu_sien_depan_ijin"
                              :filled="record.lampu_sien_depan_ijin"
                              :items="sistempenerangan.lampu_op"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Tilang & Dilarang"
                              outlined
                              dense
                              hide-details
                              v-model="record.lampu_sien_depan_tilang"
                              :filled="record.lampu_sien_depan_tilang"
                              :items="sistempenerangan.lampu_tl"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col
                            :cols="device.desktop ? 4 : 12"
                            class="pt-5"
                          >
                            <span class="pl-4">b. Belakang</span>
                          </v-col>

                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Diijinkan Operasional"
                              outlined
                              dense
                              hide-details
                              v-model="record.lampu_sien_belakang_ijin"
                              :filled="record.lampu_sien_belakang_ijin"
                              :items="sistempenerangan.lampu_op"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Tilang & Dilarang"
                              outlined
                              dense
                              hide-details
                              v-model="record.lampu_sien_belakang_tilang"
                              :filled="record.lampu_sien_belakang_tilang"
                              :items="sistempenerangan.lampu_tl"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                            class="pt-5"
                            :cols="device.desktop ?4: 12"
                          >
                            <span class="pl-2">3. Lampu REM</span>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Diijinkan Operasional"
                              outlined
                              dense
                              hide-details
                              v-model="record.lampu_rem_ijin"
                              :filled="record.lampu_rem_ijin"
                              :items="sistempenerangan.lampu_op"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Tilang & Dilarang"
                              outlined
                              dense
                              hide-details
                              v-model="record.lampu_rem_tilang"
                              :filled="record.lampu_rem_tilang"
                              :items="sistempenerangan.lampu_tl"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>

                        </v-row>
                        <v-row>
                          <v-col
                            class="pt-5"
                            :cols="device.desktop ?4: 12"
                          >
                            <span class="pl-2">4. Lampu Mundur</span>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Diijinkan Operasional"
                              outlined
                              dense
                              hide-details
                              v-model="record.lampu_mundur_ijin"
                              :filled="record.lampu_mundur_ijin"
                              :items="sistempenerangan.lampu_op"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Tilang & Dilarang"
                              outlined
                              dense
                              hide-details
                              v-model="record.lampu_mundur_tilang"
                              :filled="record.lampu_mundur_tilang"
                              :items="sistempenerangan.lampu_tl"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                            class="pt-6"
                            cols="12"
                          >
                            <span class="font-weight-bold">B. SISTEM PENGEREMAN</span>
                          </v-col>
                          <v-col
                            class="pt-5"
                            :cols="device.desktop ?4: 12"
                          >
                            <span class="pl-2">5. Kondisi Rem Utama</span>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Diijinkan Operasional"
                              outlined
                              dense
                              hide-details
                              v-model="record.kondisi_rem_utama_ijin"
                              :filled="record.kondisi_rem_utama_ijin"
                              :items="sistempengereman.sistempeneranganop"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Tilang & Dilarang"
                              outlined
                              dense
                              hide-details
                              v-model="record.kondisi_rem_utama_tilang"
                              :filled="record.kondisi_rem_utama_tilang"
                              :items="sistempengereman.sistempenerangantl"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>

                          <v-col
                            class="pt-5"
                            :cols="device.desktop ?4: 12"
                          >
                            <span class="pl-2">6. Kondisi Rem Parkir</span>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Diijinkan Operasional"
                              outlined
                              dense
                              hide-details
                              v-model="record.kondisi_rem_parkir_ijin"
                              :filled="record.kondisi_rem_parkir_ijin"
                              :items="sistempengereman.sistempeneranganop"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Tilang & Dilarang"
                              outlined
                              dense
                              hide-details
                              v-model="record.kondisi_rem_parkir_tilang"
                              :filled="record.kondisi_rem_parkir_tilang"
                              :items="sistempengereman.sistempenerangantl"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                            class="pt-6"
                            cols="12"
                          >
                            <span class="font-weight-bold">C. BADAN KENDARAAN</span>
                          </v-col>
                          <v-col
                            class="pt-5"
                            :cols="device.desktop ?4: 12"
                          >
                            <span class="pl-2">7. Kondisi Kaca Depan</span>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Diijinkan Operasional"
                              outlined
                              dense
                              hide-details
                              v-model="record.kondisi_kaca_depan_ijin"
                              :filled="record.kondisi_kaca_depan_ijin"
                              :items="badankendaraan.kondisikacaop"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Tilang & Dilarang"
                              outlined
                              dense
                              hide-details
                              v-model="record.kondisi_kaca_depan_tilang"
                              :filled="record.kondisi_kaca_depan_tilang"
                              :items="badankendaraan.kondisikacatl"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col
                            class="pt-5"
                            :cols="device.desktop ?4: 12"
                          >
                            <span class="pl-2">8. Pintu Utama</span>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Diijinkan Operasional"
                              outlined
                              dense
                              hide-details
                              v-model="record.pintu_utama_ijin"
                              :filled="record.pintu_utama_ijin"
                              :items="badankendaraan.pintuutamaop"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Tilang & Dilarang"
                              outlined
                              dense
                              hide-details
                              v-model="record.pintu_utama_tilang"
                              :filled="record.pintu_utama_tilang"
                              :items="badankendaraan.pintuutamatl"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>

                        </v-row>

                        <v-row>
                          <v-col
                            class="pt-6"
                            cols="12"
                          >
                            <span class="font-weight-bold">D. BAN</span>
                          </v-col>
                          <v-col
                            class="pt-6"
                            cols="12"
                          >
                            <span class=" pl-2">9. Kondisi Ban</span>
                          </v-col>
                          <v-col
                            class="pt-5"
                            :cols="device.desktop ?4: 12"
                          >
                            <span class="pl-4">a. Depan</span>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Diijinkan Operasional"
                              outlined
                              dense
                              hide-details
                              v-model="record.kondisi_ban_depan_ijin"
                              :filled="record.kondisi_ban_depan_ijin"
                              :items="ban.banop"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Tilang & Dilarang"
                              outlined
                              dense
                              hide-details
                              v-model="record.kondisi_ban_depan_tilang"
                              :filled="record.kondisi_ban_depan_tilang"
                              :items="ban.bantl"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>

                          <v-col
                            class="pt-5"
                            :cols="device.desktop ?4: 12"
                          >
                            <span class="pl-4">b. Belakang</span>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Diijinkan Operasional"
                              outlined
                              dense
                              hide-details
                              v-model="record.kondisi_ban_belakang_ijin"
                              :filled="record.kondisi_ban_belakang_ijin"
                              :items="ban.banop"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Tilang & Dilarang"
                              outlined
                              dense
                              hide-details
                              v-model="record.kondisi_ban_belakang_tilang"
                              :filled="record.kondisi_ban_belakang_tilang"
                              :items="ban.bantl"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col
                            class="pt-6"
                            cols="12"
                          >
                            <span class="font-weight-bold">E. PERLENGKAPAN</span>
                          </v-col>
                          <v-col
                            class="pt-6"
                            :cols="device.desktop ? 4:12"
                          >
                            <span class=" pl-2">10. Sabuk Keselamatan Pengemudi</span>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Diijinkan Operasional"
                              outlined
                              dense
                              hide-details
                              v-model="record.sabuk_pengaman_ijin"
                              :filled="record.sabuk_pengaman_ijin"
                              :items="perlengkapan.sabukpengamanop"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Tilang & Dilarang"
                              outlined
                              dense
                              hide-details
                              v-model="record.sabuk_pengaman_tilang"
                              :filled="record.sabuk_pengaman_tilang"
                              :items="perlengkapan.sabukpengamantl"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                            class="pt-6"
                            cols="12"
                          >
                            <span class="font-weight-bold">F. PENGUKUR KECEPATAN</span>
                          </v-col>
                          <v-col
                            class="pt-6"
                            :cols="device.desktop ? 4:12"
                          >
                            <span class=" pl-2">11. Pengukur Kecepatan</span>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Diijinkan Operasional"
                              outlined
                              dense
                              hide-details
                              v-model="record.pengukur_kecepatan_ijin"
                              :filled="record.pengukur_kecepatan_ijin"
                              :items="pengukurkecepatan.pengukurkecepatanop"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Tilang & Dilarang"
                              outlined
                              dense
                              hide-details
                              v-model="record.pengukur_kecepatan_tilang"
                              :filled="record.pengukur_kecepatan_tilang"
                              :items="pengukurkecepatan.pengukurkecepatantl"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                            class="pt-6"
                            cols="12"
                          >
                            <span class="font-weight-bold">G. PENGHAPUS KACA (WIPER)</span>
                          </v-col>
                          <v-col
                            class="pt-6"
                            :cols="device.desktop ? 4:12"
                          >
                            <span class=" pl-2">12. Penghapus Kaca</span>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Diijinkan Operasional"
                              outlined
                              dense
                              hide-details
                              v-model="record.penghapus_kaca_ijin"
                              :filled="record.penghapus_kaca_ijin"
                              :items="penghapuskaca.penghapuskacaop"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Tilang & Dilarang"
                              outlined
                              dense
                              hide-details
                              v-model="record.penghapus_kaca_tilang"
                              :filled="record.penghapus_kaca_tilang"
                              :items="penghapuskaca.penghapuskacatl"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col
                            class="pt-6"
                            cols="12"
                          >
                            <span class="font-weight-bold">H. TANGGAP DARURAT</span>
                          </v-col>

                          <v-col
                            class="pt-6"
                            :cols="device.desktop ? 4:12"
                          >
                            <span class=" pl-2">13. Pintu Darurat</span>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Diijinkan Operasional"
                              outlined
                              dense
                              hide-details
                              v-model="record.pintu_darurat_ijin"
                              :filled="record.pintu_darurat_ijin"
                              :items="darurat.daruratop"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Tilang & Dilarang"
                              outlined
                              dense
                              hide-details
                              v-model="record.pintu_darurat_tilang"
                              :filled="record.pintu_darurat_tilang"
                              :items="darurat.darurattl"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col
                            class="pt-6"
                            :cols="device.desktop ? 4:12"
                          >
                            <span class=" pl-2">14. Jendela Darurat</span>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Diijinkan Operasional"
                              outlined
                              dense
                              hide-details
                              v-model="record.jendela_darurat_ijin"
                              :filled="record.jendela_darurat_ijin"
                              :items="darurat.daruratop"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Tilang & Dilarang"
                              outlined
                              dense
                              hide-details
                              v-model="record.jendela_darurat_tilang"
                              :filled="record.jendela_darurat_tilang"
                              :items="darurat.darurattl"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col
                            class="pt-6"
                            :cols="device.desktop ? 4:12"
                          >
                            <span class=" pl-2">15. Alat Pemukul/Pemecah Kaca</span>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Diijinkan Operasional"
                              outlined
                              dense
                              hide-details
                              v-model="record.alat_pemecah_kaca_ijin"
                              :filled="record.alat_pemecah_kaca_ijin"
                              :items="darurat.daruratop"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Tilang & Dilarang"
                              outlined
                              dense
                              hide-details
                              v-model="record.alat_pemecah_kaca_tilang"
                              :filled="record.alat_pemecah_kaca_tilang"
                              :items="darurat.darurattl"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item value="tab-3">
                  <v-card flat>
                    <v-card-text>
                      <v-col cols="12">
                        <v-row>
                          <v-col
                            class="pt-6"
                            cols="12"
                          >
                            <span class="font-weight-bold">A. SISTEM PENERANGAN</span>
                          </v-col>
                          <v-col cols="12">
                            <span class="pl-2">16. Lampu Posisi</span>
                          </v-col>
                          <v-col
                            :cols="device.desktop ? 4 : 12"
                            class="pt-5"
                          >
                            <span class="pl-4">a. Depan</span>
                          </v-col>

                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Diijinkan Operasional"
                              outlined
                              dense
                              hide-details
                              v-model="record.lampu_posisi_depan_ijin"
                              :filled="record.lampu_posisi_depan_ijin"
                              :items="sistempenerangan.lampu_op"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Tilang & Dilarang"
                              outlined
                              dense
                              hide-details
                              v-model="record.lampu_posisi_depan_tilang"
                              :filled="record.lampu_posisi_depan_tilang"
                              :items="sistempenerangan.lampu_tl"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col
                            :cols="device.desktop ? 4 : 12"
                            class="pt-5"
                          >
                            <span class="pl-4">b. Belakang</span>
                          </v-col>

                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Diijinkan Operasional"
                              outlined
                              dense
                              hide-details
                              v-model="record.lampu_posisi_belakang_ijin"
                              :filled="record.lampu_posisi_belakang_ijin"
                              :items="sistempenerangan.lampu_op"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Tilang & Dilarang"
                              outlined
                              dense
                              hide-details
                              v-model="record.lampu_posisi_belakang_tilang"
                              :filled="record.lampu_posisi_belakang_tilang"
                              :items="sistempenerangan.lampu_tl"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                            class="pt-6"
                            cols="12"
                          >
                            <span class="font-weight-bold">B. BADAN KENDARAAN</span>
                          </v-col>
                          <v-col
                            class="pt-5"
                            :cols="device.desktop ?4: 12"
                          >
                            <span class="pl-2">17. Kaca Spion</span>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Diijinkan Operasional"
                              outlined
                              dense
                              hide-details
                              v-model="record.kaca_spion_ijin"
                              :filled="record.kaca_spion_ijin"
                              :items="badankendaraan.kacaspionop"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Tilang & Dilarang"
                              outlined
                              dense
                              hide-details
                              v-model="record.kaca_spion_tilang"
                              :filled="record.kaca_spion_tilang"
                              :items="badankendaraan.kacaspiontl"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col
                            class="pt-5"
                            :cols="device.desktop ?4: 12"
                          >
                            <span class="pl-2">18. Klakson</span>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Diijinkan Operasional"
                              outlined
                              dense
                              hide-details
                              v-model="record.klakson_ijin"
                              :filled="record.klakson_ijin"
                              :items="badankendaraan.klaksonop"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Tilang & Dilarang"
                              outlined
                              dense
                              hide-details
                              v-model="record.klakson_tilang"
                              :filled="record.klakson_tilang"
                              :items="badankendaraan.klaksontl"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>

                          <v-col
                            class="pt-5"
                            :cols="device.desktop ?4: 12"
                          >
                            <span class="pl-2">19. Lantai dan Tangga</span>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Diijinkan Operasional"
                              outlined
                              dense
                              hide-details
                              v-model="record.lantai_tangga_ijin"
                              :filled="record.lantai_tangga_ijin"
                              :items="badankendaraan.lantaitanggaop"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Tilang & Dilarang"
                              outlined
                              dense
                              hide-details
                              v-model="record.lantai_tangga_tilang"
                              :filled="record.lantai_tangga_tilang"
                              :items="badankendaraan.lantaitanggatl"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                            class="pt-6"
                            cols="12"
                          >
                            <span class="font-weight-bold">C. KAPASITAS TEMPAT DUDUK</span>
                          </v-col>
                          <v-col
                            class="pt-5"
                            :cols="device.desktop ?4: 12"
                          >
                            <span class="pl-2">20. Jlh Tempat Duduk Penumpang</span>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Diijinkan Operasional"
                              outlined
                              dense
                              hide-details
                              v-model="record.jlh_tempat_duduk_ijin"
                              :filled="record.jlh_tempat_duduk_ijin"
                              :items="kapasitastempatduduk.kapasitasop"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Tilang & Dilarang"
                              outlined
                              dense
                              hide-details
                              v-model="record.jlh_tempat_duduk_tilang"
                              :filled="record.jlh_tempat_duduk_tilang"
                              :items="kapasitastempatduduk.kapasitastl"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                            class="pt-6"
                            cols="12"
                          >
                            <span class="font-weight-bold">D. PERLENGKAPAN KENDARAAN</span>
                          </v-col>
                          <v-col
                            class="pt-5"
                            :cols="device.desktop ?4: 12"
                          >
                            <span class="pl-2">21. Ban Cadangan</span>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Diijinkan Operasional"
                              outlined
                              dense
                              hide-details
                              v-model="record.ban_cadangan_ijin"
                              :filled="record.ban_cadangan_ijin"
                              :items="penunjangperlengkapan.bancadanganop"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Tilang & Dilarang"
                              outlined
                              dense
                              hide-details
                              v-model="record.ban_cadangan_tilang"
                              :filled="record.ban_cadangan_tilang"
                              :items="penunjangperlengkapan.bancadangantl"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col
                            class="pt-5"
                            :cols="device.desktop ?4: 12"
                          >
                            <span class="pl-2">22. Segitiga Pengaman</span>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Diijinkan Operasional"
                              outlined
                              dense
                              hide-details
                              v-model="record.segitiga_pengaman_ijin"
                              :filled="record.segitiga_pengaman_ijin"
                              :items="penunjangperlengkapan.defaultop"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Tilang & Dilarang"
                              outlined
                              dense
                              hide-details
                              v-model="record.segitiga_pengaman_tilang"
                              :filled="record.segitiga_pengaman_tilang"
                              :items="penunjangperlengkapan.defaulttl"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col
                            class="pt-5"
                            :cols="device.desktop ?4: 12"
                          >
                            <span class="pl-2">23. Dongkrak</span>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Diijinkan Operasional"
                              outlined
                              dense
                              hide-details
                              v-model="record.dongkrak_ijin"
                              :filled="record.dongkrak_ijin"
                              :items="penunjangperlengkapan.defaultop"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Tilang & Dilarang"
                              outlined
                              dense
                              hide-details
                              v-model="record.dongkrak_tilang"
                              :filled="record.dongkrak_tilang"
                              :items="penunjangperlengkapan.defaulttl"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col
                            class="pt-5"
                            :cols="device.desktop ?4: 12"
                          >
                            <span class="pl-2">24. Pembuka Roda</span>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Diijinkan Operasional"
                              outlined
                              dense
                              hide-details
                              v-model="record.pembuka_roda_ijin"
                              :filled="record.pembuka_roda_ijin"
                              :items="penunjangperlengkapan.defaultop"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Tilang & Dilarang"
                              outlined
                              dense
                              hide-details
                              v-model="record.pembuka_roda_tilang"
                              :filled="record.pembuka_roda_tilang"
                              :items="penunjangperlengkapan.defaulttl"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col
                            class="pt-5"
                            :cols="device.desktop ?4: 12"
                          >
                            <span class="pl-2">25. Lampu Senter</span>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Diijinkan Operasional"
                              outlined
                              dense
                              hide-details
                              v-model="record.lampu_senter_ijin"
                              :filled="record.lampu_senter_ijin"
                              :items="penunjangperlengkapan.lampusenterop"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 4:12">
                            <v-select
                              label="Tilang & Dilarang"
                              outlined
                              dense
                              hide-details
                              v-model="record.lampu_senter_tilang"
                              :filled="record.lampu_senter_tilang"
                              :items="penunjangperlengkapan.lampusentertl"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                        </v-row>

                      </v-col>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item value="tab-4">
                  <v-card flat>
                    <v-card-text>
                      <v-col cols=12>
                        <span class="font-weight-bold">BERDASARKAN HASIL PEMERIKSAAN, MAKA KENDARAAN TERSEBUT DINYATAKAN : </span>
                        <v-row>
                          <v-col :cols="device.desktop ? 6:12">
                            <v-select
                              label="Laik Jalan"
                              outlined
                              dense
                              hide-details
                              v-model="record.laik_jalan"
                              :filled="record.laik_jalan"
                              :items="kesimpulan.laik"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col :cols="device.desktop ? 6:12">
                            <v-select
                              label="Tidak Laik Jalan"
                              outlined
                              dense
                              hide-details
                              v-model="record.tidak_laik_jalan"
                              :filled="record.tidak_laik_jalan"
                              :items="kesimpulan.tidaklaik"
                              :color="theme.color"
                              multiple
                            ></v-select>
                          </v-col>
                          <v-col cols="12">
                            <v-textarea
                              label="Catatan"
                              :color="theme.color"
                              outlined
                              dense
                              hide-details
                              v-model="record.catatan"
                              :filled="record.catatan"
                            ></v-textarea>
                          </v-col>
                        </v-row>
                      </v-col>

                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </div>
</template>
    
    <script>
import { mapActions, mapState } from "vuex";
export default {
  name: "form-pemeriksaan",
  data: () => ({
    tab: null,
    days: [
      { text: "Senin", value: "senin" },
      { text: "Selasa", value: "selasa" },
      { text: "Rabu", value: "rabu" },
      { text: "Kamis", value: "kamis" },
      { text: "Jumat", value: "jumat" },
      { text: "Sabtu", value: "sabtu" },
      { text: "Minggu", value: "minggu" },
    ],
    lokasis: [
      { text: "Terminal", value: "Terminal" },
      { text: "Pool", value: "Pool" },
      { text: "Lainnya", value: "Lainnya" },
    ],
    jeniskendaraans: [
      { text: "Reguler", value: "reguler" },
      { text: "Cadangan", value: "cadangan" },
    ],
    jenisangkutans: [
      { text: "AKAP", value: "AKAP" },
      { text: "AKDP", value: "AKDP" },
      { text: "Pariwisata", value: "Pariwisata" },
      { text: "Lainnya", value: "lainnya" },
    ],
    //unsur administrasi
    stukop: [{ text: "Ada, berlaku", value: 1 }],
    stuktl: [
      { text: "Tidak Berlaku", value: 1 },
      { text: "Tidak Ada", value: 2 },
      { text: "Tidak Sesuai Fisik", value: 3 },
    ],
    kpregop: [{ text: "Ada, berlaku", value: 1 }],
    kpregtl: [
      { text: "Tidak Berlaku", value: 1 },
      { text: "Tidak Ada", value: 2 },
      { text: "Tidak Sesuai Fisik", value: 3 },
    ],
    cadanganop: [{ text: "Ada, berlaku", value: 1 }],
    cadangantl: [
      { text: "Tidak Berlaku", value: 1 },
      { text: "Tidak Ada", value: 2 },
      { text: "Tidak Sesuai Fisik", value: 3 },
    ],
    simop: [
      { text: "A UMUM", value: 1 },
      { text: "B1 UMUM", value: 2 },
      { text: "B2 UMUM", value: 3 },
    ],
    simtl: [{ text: "SIM tidak sesuai", value: 1 }],

    //page 2
    sistempenerangan: {
      lampu_op: [{ text: "Semua Menyala", value: "semua-meyala" }],
      lampu_tl: [
        { text: "Tidak menyala kanan", value: "tidak-menyala-kanan" },
        { text: "Tidak menyala kiri", value: "tidak-menyala-kiri" },
      ],
    },

    sistempengereman: {
      sistempeneranganop: [{ text: "Berfungsi", value: "berfungsi" }],
      sistempenerangantl: [
        { text: "Tidak Berfungsi", value: "tidak-berfungsi" },
      ],
    },
    badankendaraan: {
      kondisikacaop: [{ text: "Baik", value: "baik" }],
      kondisikacatl: [{ text: "Buruk", value: "buruk" }],
      pintuutamaop: [{ text: "Semua Berfungsi", value: "semua-berfungsi" }],
      pintuutamatl: [{ text: "Buruk", value: "buruk" }],
      kacaspionop: [{ text: "Sesuai", text: "sesuai" }],
      kacaspiontl: [{ text: "Tidak Sesuai", value: "Tidak Sesuai" }],
      klaksonop: [{ text: "Ada", value: "ada" }],
      klaksontl: [
        { text: "Tidak Berfungsi", value: "tidak-berfungsi" },
        { text: "Tidak Ada", value: "tidak-ada" },
      ],
      lantaitanggaop: [
        {
          text: "Baik",
          value: "baik",
        },
      ],
      lantaitanggatl: [
        { text: "Keropos/Berlubang", value: "keropos/berlubang" },
      ],
    },
    ban: {
      banop: [{ text: "Semua Laik", value: "semua-laik" }],
      bantl: [
        { text: "Tidak Laik Kanan", value: "tidak-laik-kanan" },
        { text: "Tidak Laik Kiri", value: "tidak-laik-kiri" },
      ],
    },
    perlengkapan: {
      sabukpengamanop: [
        { text: "Ada dan Berfungsi", value: "ada-dan-berfungsi" },
      ],
      sabukpengamantl: [
        { text: "Tidak Berfungsi", value: "tidak-berfungsi" },
        { text: "Tidak Ada", value: "tidak-ada" },
      ],
    },
    pengukurkecepatan: {
      pengukurkecepatanop: [
        { text: "Ada dan Berfungsi", value: "ada-dan-berfungsi" },
      ],
      pengukurkecepatantl: [
        { text: "Tidak Berfungsi", value: "tidak-berfungsi" },
        { text: "Tidak Ada", value: "tidak-ada" },
      ],
    },
    penghapuskaca: {
      penghapuskacaop: [
        { text: "Ada dan Berfungsi", value: "ada-dan-berfungsi" },
      ],
      penghapuskacatl: [
        { text: "Tidak Berfungsi", value: "tidak-berfungsi" },
        { text: "Tidak Ada", value: "tidak-ada" },
      ],
    },

    darurat: {
      daruratop: [{ text: "Ada", value: "ada" }],
      darurattl: [{ text: "Tidak Ada", value: "tidak-ada" }],
    },
    kapasitastempatduduk: {
      kapasitasop: [{ text: "Sesuai", value: "sesuai" }],
      kapasitastl: [{ text: "Tidak Sesuai", value: "tidak-sesuai" }],
    },
    penunjangperlengkapan: {
      bancadanganop: [{ text: "Ada dan Laik", value: "ada-dan-laik" }],
      bancadangantl: [
        { text: "Tidak Laik", value: "tidak-laik" },
        { text: "Tidak Ada", value: "tidak-ada" },
      ],
      defaultop: [{ text: "Ada", value: "ada" }],
      defaulttl: [{ text: "Tidak Ada", value: "tidak-ada" }],
      lampusenterop: [{ text: "Ada", value: "ada" }],
      lampusentertl: [
        {
          text: "Tidak Berfungsi",
          value: "tidak-berfungsi",
        },
        {
          text: "Tidak Ada",
          value: "tidak-ada",
        },
      ],
    },

    kesimpulan: {
      laik: [
        { text: "Dijinkan Operasional", value: "diijinkan-operasional" },
        { text: "Peringatan Perbaikan", value: "peringatan-perbaikan" },
      ],
      tidaklaik: [
        {
          text: "Tilang dan Dilarang Operasional",
          value: "tilang-dan-dilarang-operasional",
        },
        { text: "Dilarang Operasional", value: "dilarang-operasional" },
      ],
    },

    trayeks: [],
  }),
  computed: {
    ...mapState([
      "theme",
      "http",
      "device",
      "records",
      "record",
      "loading",
      "event",
      "snackbar",
    ]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/",
      title: "LAPORAN PEMERIKSAAN",
      subtitle: "Formulir Pemeriksaan",
      breadcrumbs: [
        {
          text: "Laporan Pemeriksaan",
          disabled: false,
          href: "/backend/keselamatan-permohonan-ramcheck",
        },
        {
          text: "Formulir",
          disabled: true,
          href: "master-jenis-pengaduan",
        },
      ],
      showtable: false,
      actions: {
        refresh: true,
        add: true,
        edit: true,
        delete: true,
      },
    });
  },
  mounted() {
    this.fetchTrayeks();
  },
  methods: {
    ...mapActions([
      "setPage",
      "assignFileBrowse",
      "getUserInfo",
      "initUploadLibrary",
      "setRecord",
      "setLoading",
    ]),

    fetchTrayeks: async function () {
      try {
        let { data } = await this.http.get("api/combo/trayek");
        this.trayeks = data;
      } catch (error) {}
    },

    postStoreRecord: async function () {
      try {
        let {
          data: { success, code, response, errors },
        } = await this.http.post(
          "api/keselamatan/pemeriksaan/" + this.$route.params.permohonan_uuid,
          this.record
        );
        if (!success) {
          this.snackbar.color = "red";
          this.snackbar.text = response.message;
          this.snackbar.state = true;
          return;
        }

        this.snackbar.color = this.theme.color;
        this.snackbar.text = response.message;
        this.snackbar.state = true;
      } catch (error) {
        this.snackbar.color = "red";

        this.snackbar.text =
          "Opps..., terjadi kesalahan " + error.response.data.errors[0].message;
        this.snackbar.state = true;
      }
    },

    uploadFoto: function () {
      this.assignFileBrowse({
        fileType: [".jpg", ".jpeg", ".png"],
        query: {
          doctype: "avatars",
        },
        callback: (response) => {
          setTimeout(() => {
            this.foto = response.path;
            this.record.avatar = response.name;
          }, 1000);
        },
      });
    },
    downloadSurat: async function (val) {
      try {
        let {
          data: { success, code, response, errors },
        } = await this.http.post("api/keselamatan/download-permohonan", {
          id: val,
        });

        window.open(response.url, "__blank");
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = error;
        this.snackbar.state = true;
      }
    },
  },
};
</script>
    
  <style>
.label {
  height: 100%;
  padding-top: inherit;
}
.box-data-pemeriksaan {
  border: 2px grey solid;
  padding: 20px;
  border-radius: 5px;
  margin-top: 5px;
}
</style>
    