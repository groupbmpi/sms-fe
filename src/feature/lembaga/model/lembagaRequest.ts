import { ILembagaDTO } from "./lembaga";

export interface ILembagaBody extends ILembagaDTO{}
export interface ILembagaQuery {
    id?: number,
    page?: number,
    limit?: number,
    nama?: string,
}