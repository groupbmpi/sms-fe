
export class RegisterForm {
    fullName: string;
    institution: string;
    category: string;
    institutionName: string;
    province: string;
    city: string;
    subDistrict: string;
    village: string;
    streetName: string;
    postalCode: string;
    email: string;
    phoneNumber: string;

    constructor() {
        this.fullName = ""
        this.institution = ""
        this.category = ""
        this.province = ""
        this.institutionName = ""
        this.city = ""
        this.subDistrict = ""
        this.village = ""
        this.streetName = ""
        this.postalCode = ""
        this.email = ""
        this.phoneNumber = ""
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
        && this.category !== ""
        && this.province !== "";
    }
}