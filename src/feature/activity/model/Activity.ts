export interface SuccessIndicator {
    indicator: string;
    target: number;
}

export class ActivityForm {
    constructor(
        public activityName: string = "",
        public activityGoal: string = "",
        public activityField: string = "",
        public province: string = "",
        public city: string = "",
        public activityDescription: string = "",
        public activityStatus: string = "",
        public successIndicator: SuccessIndicator[] = [
        ],
        public outputTarget: string = "",
        public startDate: string = "",
        public endDate: string = "",
        public logisticsFulfilled: string = "",
        public logisticsNeeded: string = "",
        public activityMethod: string = "",
        public activityDocument: string = "",
        public additionalInfo: string = "",
        
    ){}

    public setActivityForm = (activityForm: ActivityForm) : void => {
        this.activityName = activityForm.activityName;
        this.activityGoal = activityForm.activityGoal;
        this.activityField = activityForm.activityField;
        this.province = activityForm.province;
        this.city = activityForm.city;
        this.activityDescription = activityForm.activityDescription;
        this.activityStatus = activityForm.activityStatus;
        this.successIndicator = activityForm.successIndicator;
        this.outputTarget = activityForm.outputTarget;
        this.startDate = activityForm.startDate;
        this.endDate = activityForm.endDate;
        this.logisticsFulfilled = activityForm.logisticsFulfilled;
        this.logisticsNeeded = activityForm.logisticsNeeded;
        this.activityMethod = activityForm.activityMethod;
        this.activityDocument = activityForm.activityDocument;
        this.additionalInfo = activityForm.additionalInfo;
    }

    public toDto = () : IActivityReportDTO => {
        return {
            namaKegiatan: this.activityName,
            tujuan: this.activityGoal,
            deskripsi: this.activityDescription,
            statusKegiatan: this.activityStatus,
            bidangKegiatan: this.activityField,
            provinsi: this.province,
            kabupatenKota: this.city,
            indikatorKeberhasilan: this.successIndicator,
            jadwalMulai: this.startDate,
            jadwalSelesai: this.endDate,
            kebutuhanLogistikTerpenuhi: this.logisticsFulfilled,
            kebutuhanLogistikDibutuhkan: this.logisticsNeeded,
            metodePelaksanaan: this.activityMethod,
            linkDokumen: this.activityDocument,
            keteranganTambahan: this.additionalInfo
        }
    }
}

export interface Daerah {
    provinsi: string,
    kabupatenKota: string[]
}

export interface IActivityReportDTO {
    id?: number,
    namaKegiatan: string,
    tujuan: string,
    deskripsi: string,
    statusKegiatan: string,
    bidangKegiatan: string,
    indikatorKeberhasilan: SuccessIndicator[],
    jadwalMulai: string,
    jadwalSelesai: string,
    kebutuhanLogistikTerpenuhi: string,
    kebutuhanLogistikDibutuhkan: string,
    provinsi: string,
    kabupatenKota: string,
    metodePelaksanaan: string,
    linkDokumen: string,
    keteranganTambahan: string
}