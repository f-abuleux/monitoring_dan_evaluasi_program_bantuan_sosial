export interface ICreateLaporanDetail {
    laporan_nama : string
    laporan_jumlah_penerima : number
    laporan_wilayah : string
    laporan_tanggal_penyaluran : Date
    laporan_bukti_penyaluran : string
    laporan_catatan : string
    // laporan_status : string
    userUser_id : string
}

export interface IUpdateLaporanDetail  {
    laporan_id : string
    laporan_nama : string
    laporan_jumlah_penerima : number
    laporan_wilayah : string
    laporan_tanggal_penyaluran : Date
    laporan_bukti_penyaluran : string
    laporan_catatan : string
    laporan_status : string
    userUser_id : string
    laporan_status_alasan : string
}