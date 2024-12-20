import prisma from "@/prisma";
import { createLaporanDetail, deleteLaporanDetail, updateLaporanAdmin, updateLaporanDetailById } from "@/services/laporan.service";
import { Request, Response } from "express";

export class LaporanController {
    async getLaporan(req: Request, res: Response) {
        try {
            const laporanData = await prisma.laporan.findMany()

            res.status(200).send({
                status: "Success",
                msg: "Success to accessing createLaporanAPI",
                laporanData
            })
        } catch (error) {
            res.status(400).send({
                status: "Failed",
                msg: "Failed to accessing getLaporan API",
                res: 400
            })
        }
    }

    async createLaporan(req: Request, res: Response) {
        try {
            const createLaporan = await createLaporanDetail({ ...req.body, laporan_bukti_penyaluran: req.file?.filename })

            res.status(201).send({
                status: "Succes",
                msg: "Succes create Laporan",
                createLaporan
            })
        } catch (error) {
            res.status(400).send({
                status: "Failed",
                msg: "Failed to accessing createLaporanAPI",
                res: 400
            })
        }
    }

    async deleteLaporan(req: Request, res: Response) {
        try {
            const { laporan_id } = req.params
            const deleteData = await deleteLaporanDetail(laporan_id)

            res.status(200).send({
                status: "Success",
                msg: "Succes Deleting Laporan",
                deleteData
            })
        } catch (error) {
            res.status(400).send({
                status: "Failed",
                msg: "Failed to accessing deleteLaporan API",
                res: 400
            })
        }
    }

    async updateLaporan(req: Request, res: Response) {
        try {
            const { laporan_id } = req.params


            const updateData = await updateLaporanDetailById({
                laporan_id,
                ...req.body,
                laporan_bukti_penyaluran: req.file?.filename,
            })

            res.status(200).send({
                status: "Success",
                msg: "Success updating Laporan",
                updateData,
            })
        } catch (error) {
            res.status(400).send({
                status: "Failed",
                msg: "Failed to access updateLaporan API",
                res: 400
            });
        }
    }

    async updateSetujuLaporan(req: Request, res: Response) {
        try {
            const { laporan_id } = req.params
            const { laporan_status_alasan, laporan_status} = req.body

            const updateLaporanDetuji = await updateLaporanAdmin({laporan_id, laporan_status_alasan, laporan_status})
            
            res.status(200).send({
                status: "Success",
                msg: "Success updating Laporan dan disetujui",
                updateLaporanDetuji,
            })
        } catch (error) {
            res.status(400).send({
                status: "Failed",
                msg: "Failed to access updateSetujuLaporan API",
                res: 400
            });
        }
    }
}