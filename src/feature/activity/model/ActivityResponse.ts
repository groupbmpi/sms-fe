import { Daerah, IActivitiesReportDTO, IActivityReportDTO } from "./Activity"

export interface IFormActResponseData {
    kategori: string[],
    kategoriMasalah: string[],
    metodePelaksanaan: string[],
    statusKegiatan: string[],
    daerah: Daerah[]
}

export interface IActivityResponseData extends IActivityReportDTO {}
export interface IActivitiesResponseData extends IActivitiesReportDTO{}