import { ILembagaDTO, ILembagasDTO } from "./lembaga";

export interface IFormLembagaData {
    kategori: string[],
}

export interface ILembagaResponseData extends ILembagaDTO{}
export interface ILembagasResponseData extends ILembagasDTO{}