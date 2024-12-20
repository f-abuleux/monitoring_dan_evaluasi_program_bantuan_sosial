-- CreateEnum
CREATE TYPE "StatusLaporan" AS ENUM ('PENDING', 'DISETUJI', 'DITOLAK');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "JenisLaporan" (
    "jenisLaporan_id" TEXT NOT NULL,
    "jenisLaporan_name" TEXT NOT NULL,

    CONSTRAINT "JenisLaporan_pkey" PRIMARY KEY ("jenisLaporan_id")
);

-- CreateTable
CREATE TABLE "Laporan" (
    "laporan_id" TEXT NOT NULL,
    "laporan_nama" TEXT NOT NULL,
    "laporan_jumlah_penerima" INTEGER NOT NULL DEFAULT 0,
    "laporan_wilayah" TEXT NOT NULL,
    "laporan_tanggal_penyaluran" TIMESTAMP(3) NOT NULL,
    "laporan_bukti_penyaluran" TEXT NOT NULL,
    "laporan_catatan" TEXT NOT NULL,
    "laporan_status" "StatusLaporan" NOT NULL,
    "laporan_status_alasan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userUser_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "user_role" "UserRole" NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "JenisLaporan_jenisLaporan_id_key" ON "JenisLaporan"("jenisLaporan_id");

-- CreateIndex
CREATE UNIQUE INDEX "JenisLaporan_jenisLaporan_name_key" ON "JenisLaporan"("jenisLaporan_name");

-- CreateIndex
CREATE UNIQUE INDEX "Laporan_laporan_id_key" ON "Laporan"("laporan_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_id_key" ON "User"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_email_key" ON "User"("user_email");

-- AddForeignKey
ALTER TABLE "Laporan" ADD CONSTRAINT "Laporan_userUser_id_fkey" FOREIGN KEY ("userUser_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
