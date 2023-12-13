export interface IFormReportResponseData {
    kategoriMasalah : string[],
    daerah : Daerah[],
}

interface Daerah {
    provinsi : string,
    kabupatenKota : string[],
}

export interface IReportData {
    id : number,
    masalah : string,
    kategoriMasalah : string,
    provinsi : string,
    kabupatenKota : string,
    namaUser : string,
    createdAt : Date,
    updatedAt : Date
}

export interface IReportsResponse {
    data : IReportData[],
    countPages : number,
}

type PropsReportFormOmitted = "id" | "namaUser" | "createdAt" | "updatedAt"
export interface IReportForm extends Omit<IReportData, PropsReportFormOmitted> {}
