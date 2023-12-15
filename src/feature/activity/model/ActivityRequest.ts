import { IActivityReportDTO } from "./Activity";

export interface IActivityReportBody extends IActivityReportDTO {}
export interface IActivityReportQuery {
    id? : number,
    page?: number,
    limit?: number,
    lembaga?: string,
    kategori? : string,
}