import { Daerah } from "../../activity/activity"
import { ILembagaWithKategoriDTO } from "../../lembaga/lembaga"

export interface ICategoriesResponseData {
    kategori: string[],
    daerah: Daerah[],
    lembaga: ILembagaWithKategoriDTO[]
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

export interface IVerifUserDTO extends IUserData{
    is_verified : boolean
}

export interface IUserResponseData {
    listUser : IVerifUserDTO[]
    countPages : number
}
type PropsFormUserRegisterOmitted = "id" | "linkFoto"
export interface IFormUserRegister extends Omit<IUserData, PropsFormUserRegisterOmitted>{}

export interface IUserForm {
    namaLengkap : string,
    noHandphone : string,
    avatar : string
}

type PropsFormUserUpdateOmitted = "id" | "linkFoto"
export interface IUpdateUserData extends Omit<IUserData, PropsFormUserUpdateOmitted>{}
export interface IFormUserUpdate extends IUpdateUserData{}

export interface IFormRegisterAdmin{
    email : string
}