export interface ICategoriesResponseData {
    kategori: string[],
    kategoriMasalah: string[],
    metodePelaksanaan: string[],
    statusKegiatan: string[],
    daerah: Daerah[]
}

interface Daerah {
    provinsi: string,
    kabupatenKota: string[]
}

export interface UnverifiedUser {
    id : number,
    namaLengkap : string,
    email : string,
    noHandphone : string,
    linkFoto : string,
    lembagaOthers : string,
    lembaga : string,
    kabupatenKota : string,
    provinsi : string,
}

export interface IUnverifiedUserResponseData {
    user : UnverifiedUser[]
}