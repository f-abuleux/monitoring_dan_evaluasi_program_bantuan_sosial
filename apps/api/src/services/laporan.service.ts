import prisma from "@/prisma";
import { ICreateLaporanDetail, IUpdateLaporanDetail } from "@/types/laporan.type";

const baseUrl = process.env.BASE_URL

export const createLaporanDetail = async ({ laporan_nama, laporan_jumlah_penerima, laporan_wilayah, laporan_tanggal_penyaluran, laporan_bukti_penyaluran, laporan_catatan, userUser_id }: ICreateLaporanDetail) => {
    try {
        const findUser = await prisma.user.findFirst({
            where: {
                user_id: userUser_id
            }
        })

        if (!findUser) throw "User not found"

        const bukti = `${baseUrl}/public/bukti/${laporan_bukti_penyaluran}`


        const createLaporan = await prisma.laporan.create({
            data: {
                userUser_id: findUser.user_id,
                laporan_nama,
                laporan_jumlah_penerima: +laporan_jumlah_penerima,
                laporan_wilayah,
                laporan_tanggal_penyaluran,
                laporan_bukti_penyaluran: bukti,
                laporan_catatan,
                laporan_status: "PENDING",
                laporan_status_alasan: "",
                createdAt: new Date,
                updatedAt: new Date
            }
        })

        return createLaporan
    } catch (error) {
        throw (error)
    }
}

export const deleteLaporanDetail = async (laporan_id: string) => {
    try {
        const laporan = await prisma.laporan.findUnique({
            where: { laporan_id }
        });

        if (!laporan) throw "Laporan not found"
        if (laporan.laporan_status == "DISETUJI" || laporan.laporan_status == "DITOLAK") throw "Cannot delete approved laporan"

        const deleteLaporanData = await prisma.$transaction(async (prisma) => {
            return await prisma.laporan.delete({
                where: { laporan_id }
            })
        })

        return deleteLaporanData;
    } catch (error) {
        throw error
    }
}

export const updateLaporanDetailById = async (data: IUpdateLaporanDetail) => {
    try {
        const laporan = await prisma.laporan.findUnique({
            where: { laporan_id: data.laporan_id },
        })

        if (!laporan) throw "Laporan not found"
        if (laporan.laporan_status === "DISETUJI" || laporan.laporan_status === "DITOLAK") throw "Laporan tidak bisa diupdate"


        const updatedLaporan = await prisma.laporan.update({
            where: { laporan_id: data.laporan_id },
            data: {
                laporan_nama: data.laporan_nama ?? laporan.laporan_nama,
                laporan_jumlah_penerima: Number(data.laporan_jumlah_penerima) ?? laporan.laporan_jumlah_penerima,
                laporan_wilayah: data.laporan_wilayah ?? laporan.laporan_wilayah,
                laporan_tanggal_penyaluran: data.laporan_tanggal_penyaluran ?? laporan.laporan_tanggal_penyaluran,
                laporan_bukti_penyaluran: data.laporan_bukti_penyaluran
                    ? `${baseUrl}/public/update/${data.laporan_bukti_penyaluran}`
                    : laporan.laporan_bukti_penyaluran,
                laporan_catatan: data.laporan_catatan ?? laporan.laporan_catatan,
                laporan_status_alasan: data.laporan_status_alasan ?? laporan.laporan_status_alasan,
                updatedAt: new Date(),
            },
        })


        return updatedLaporan;
    } catch (error) {
        throw error
    }
}

export const updateLaporanAdmin = async ({ laporan_id, laporan_status_alasan, laporan_status }: { laporan_id: string, laporan_status_alasan: string, laporan_status: string }) => {
    try {
        let updateLaporan
        if (laporan_status == "DISETUJUI") {
            updateLaporan = await prisma.laporan.update({
                where: {
                    laporan_id
                },
                data: {
                    laporan_status: "DISETUJI"
                }
            })
        } else {
            updateLaporan = await prisma.laporan.update({
                where: {
                    laporan_id
                },
                data: {
                    laporan_status_alasan,
                    laporan_status: "DITOLAK"
                }
            })
        }

        if (!updateLaporan) throw "Laporan not found"

        return updateLaporan
    } catch (error) {
        throw error
    }
}
