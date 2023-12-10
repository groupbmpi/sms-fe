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