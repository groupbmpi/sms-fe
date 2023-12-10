export interface ICategoriesResponseData {
    kategori: string[],
    daerah: Daerah[],
    lembaga: string[]
}

interface Daerah {
    provinsi: string,
    kabupatenKota: string[]
}

export interface IUserData{
    id : number,
    namaLengkap : string,
    email : string,
    noHandphone : string,
    linkFoto : string,
    lembagaOthers? : string,
    lembaga : string,
    kabupatenKota : string,
    provinsi : string,
    alamat : string,
    kategori : string,
    kecamatan : string,
    kelurahan : string,
    kodePos : string,
}

export interface UnverifiedUser extends IUserData{}

export interface IUnverifiedUserResponseData {
    user : UnverifiedUser[]
}
type PropsFormUserRegisterOmitted = "id" | "linkFoto"
export interface IFormUserRegister extends Omit<IUserData, PropsFormUserRegisterOmitted>{}
