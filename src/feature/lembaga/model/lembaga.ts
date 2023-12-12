export interface ILembagaWithKategoriDTO{
    kategori: string,
    lembaga: string[]
}

export interface ILembagaDTO{
    id? : number,
    nama : string,
    kategori: string,
}

export interface ILembagasDTO{
    data: ILembagaDTO[],
    countPages: number,
}