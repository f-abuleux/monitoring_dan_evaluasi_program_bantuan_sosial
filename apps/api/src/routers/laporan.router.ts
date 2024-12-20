import { LaporanController } from "@/controllers/laporan.controller";
import { uploader } from "@/helpers/uploader";
import { Router } from "express";

export class LaporanRouter{
    private router : Router;
    private laporanController : LaporanController;

    constructor() {
        this.laporanController = new LaporanController();
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() : void {
        this.router.get('/', this.laporanController.getLaporan)
        this.router.post('/create', uploader("bukti", "/bukti").single('bukti'), this.laporanController.createLaporan)
        this.router.patch('/update/:laporan_id', uploader("updatebukti", "/updatebukti").single('bukti'), this.laporanController.updateLaporan)
        this.router.delete('/delete/:laporan_id', this.laporanController.deleteLaporan)
    }

    getRouter() : Router {
        return this.router;
    }
}