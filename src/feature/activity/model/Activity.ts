export interface SuccessIndicator {
    indicator: string;
    target: number;
}

export class ActivityForm {
    constructor(
        public id : number = 0,
        public activityName: string = "",
        public activityGoal: string = "",
        public activityField: string = "",
        public province: string = "",
        public city: string = "",
        public activityDescription: string = "",
        public activityStatus: string = "",
        public successIndicator: SuccessIndicator[] = [
            {
                indicator: "",
                target: 0
            }
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
        this.id = activityForm.id;
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
        console.log(this)
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

    public fromDto = (dto: IActivityReportDTO) : void => {
        this.id = dto.id as number,
        this.activityName = dto.namaKegiatan;
        this.activityGoal = dto.tujuan;
        this.activityDescription = dto.deskripsi;
        this.activityStatus = dto.statusKegiatan;
        this.activityField = dto.bidangKegiatan;
        this.province = dto.provinsi;
        this.city = dto.kabupatenKota;
        this.successIndicator = dto.indikatorKeberhasilan;
        this.startDate = dto.jadwalMulai;
        this.endDate = dto.jadwalSelesai;
        this.logisticsFulfilled = dto.kebutuhanLogistikTerpenuhi;
        this.logisticsNeeded = dto.kebutuhanLogistikDibutuhkan;
        this.activityMethod = dto.metodePelaksanaan;
        this.activityDocument = dto.linkDokumen;
        this.additionalInfo = dto.keteranganTambahan;
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
    keteranganTambahan: string,
    isEditable? : boolean,
}

export interface IActivitiesReportDTO{
    data : IActivityReportDTO[],
    countPages: number,
}