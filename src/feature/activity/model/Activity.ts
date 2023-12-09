export interface SuccessIndicator {
    indicator: string;
    target: number;
}

export class ActivityForm {
    activityName: string;
    activityGoal: string;
    activityField: string;
    province: string;
    city: string;
    activityDescription: string;
    activityStatus: string;
    successIndicator: SuccessIndicator[];
    outputTarget: string;
    startDate: string;
    endDate: string;
    logisticsFulfilled: string;
    logisticsNeeded: string;
    activityMethod: string;
    activityDocument: string;
    additionalInfo: string;

    constructor() {
        this.activityName = "";
        this.activityGoal = "";
        this.activityField = "";
        this.province = "";
        this.city = "";
        this.activityDescription = "";
        this.activityStatus = "";
        this.successIndicator = [
            {
                indicator: "",
                target: 0,
            }, 
        ];
        this.outputTarget = "";
        this.startDate = "";
        this.endDate = "";
        this.logisticsFulfilled = "";
        this.logisticsNeeded = "";
        this.activityMethod = "";
        this.activityDocument = "";
        this.additionalInfo = "";
    }

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