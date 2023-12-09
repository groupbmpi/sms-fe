export interface IFormUserResponseData {
    daerah: Daerah[]
    lembaga: string[]
}

interface Daerah {
    provinsi: string,
    kabupatenKota: string[]
}