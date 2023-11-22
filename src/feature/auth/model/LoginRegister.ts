import { InstitutionType, InstitutionTypeMap } from "./InstitutionEnum";
import { ProvinceEnum } from "./ProvinceEnum";

export class RegisterForm {
    fullName: string;
    institution: string;
    category: InstitutionType;
    institutionName: string;
    province: ProvinceEnum;
    city: string;
    subDistrict: string;
    village: string;
    streetName: string;
    postalCode: string;
    email: string;
    phoneNumber: string;

    constructor() {
        this.fullName = "";
        this.institution = InstitutionTypeMap[InstitutionType.MINISTRY][0];
        this.category = InstitutionType.MINISTRY;
        this.province = ProvinceEnum.nad;
        this.institutionName = "";
        this.city = "";
        this.subDistrict = "";
        this.village = "";
        this.streetName = "";
        this.postalCode = "";
        this.email = "";
        this.phoneNumber = "";
    }

    isValid(): boolean {
        return this.fullName !== ""
        && this.institution !== ""
        && this.email !== ""
        && this.phoneNumber !== ""
        && this.streetName !== ""
        && this.city !== ""
        && this.subDistrict !== ""
        && this.village !== ""
        && this.postalCode !== ""
        && this.category !== null
        && this.province !== null;
    }
}