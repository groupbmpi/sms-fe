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
    successIndicator: Map<string, number>;
    // successIndicatorList: SuccessIndicator[];
    outputTarget: string;
    startDate: string;
    endDate: string;
    logistics: string;
    activityMethod: string;
    activityDocument: string;

    constructor() {
        this.activityName = "";
        this.activityGoal = "";
        this.activityField = "";
        this.province = "";
        this.city = "";
        this.activityDescription = "";
        this.activityStatus = "";
        this.successIndicator = new Map<string, number>(
            [
                ["", 0],
            ],
        );
        // this.successIndicatorList = [
        //     {
        //         indicator: "",
        //         target: 0,
        //     }, 
        // ];
        this.outputTarget = "";
        this.startDate = "";
        this.endDate = "";
        this.logistics = "";
        this.activityMethod = "";
        this.activityDocument = "";
    }
}