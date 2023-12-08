export enum ReportEnum {
    advokasi = 'Advokasi',
    education = 'Edukasi',
    empowerment = 'Pemberdayaan Masyarakat',
}

export interface IFormReportResponseData {
    kategoriMasalah : string[],
    provinsi : string[],
}