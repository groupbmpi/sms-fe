import { IActivityReportDTO } from "./Activity";

export interface IActivityReportBody extends IActivityReportDTO {}
export interface IActivityReportQuery {
    page?: number,
    limit?: number,
    lembaga?: string,
}