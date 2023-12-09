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
}

export interface IFormActResponseData {
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