import { InstitutionType } from "./InstitutionEnum";
import { ProvinceEnum } from "./ProvinceEnum";

export class RegisterForm {
    fullName: string;
    institution: string;
    category: InstitutionType;
    address: string;
    province: ProvinceEnum;
    email: string;
    phoneNumber: string;

    constructor() {
        this.fullName = "";
        this.institution = "";
        this.category = InstitutionType.GOV;
        this.address = "";
        this.province = ProvinceEnum.nad;
        this.email = "";
        this.phoneNumber = "";
    }

    isValid(): boolean {
        return this.fullName !== ""
        && this.institution !== ""
        && this.address !== ""
        && this.email !== ""
        && this.phoneNumber !== "";
    }
}