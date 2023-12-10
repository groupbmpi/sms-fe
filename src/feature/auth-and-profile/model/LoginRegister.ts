
export class RegisterForm {
    constructor(
        public fullName: string = "",
        public institution: string = "",
        public category: string = "",
        public institutionName?: string,
        public province: string = "",
        public city: string = "",
        public subDistrict: string = "",
        public village: string = "",
        public streetName: string = "",
        public postalCode: string = "",
        public email: string = "",
        public phoneNumber: string = "",
    ) {}

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