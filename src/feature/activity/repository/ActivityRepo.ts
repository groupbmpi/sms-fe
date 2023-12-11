import { HttpClient } from "../../httpClient";
import { IFormActResponseData, IActivityReportBody } from "../activity";
import {ResponseType} from "../../response";
import { IActivitiesResponseData, IActivityResponseData } from "../model/ActivityResponse";
import { IActivityReportQuery } from "../model/ActivityRequest";

export class ActivityRepository extends HttpClient {
    private static repoInstance? : ActivityRepository;

    private constructor(){
        super(import.meta.env.VITE_SERVER_URL);
    }

    public static getInstance() {
        if (!this.repoInstance) {
            this.repoInstance = new ActivityRepository();
        }
    
        return this.repoInstance;
    }

    public getActReportCategories = async () : Promise<IFormActResponseData> => {
        const data : ResponseType<IFormActResponseData> = await this.instance.get<ResponseType<IFormActResponseData>>('data/actreport')
        
        return data.data
    }

    public createActivityReport = async(body: IActivityReportBody) : Promise<IActivityResponseData> => {
        const data : ResponseType<IActivityResponseData> = await this.instance.post<ResponseType<IActivityResponseData>>('activity/', body)

        return data.data
    }

    public getAllActivityReport = async (query: IActivityReportQuery) : Promise<IActivitiesResponseData> => {
        const data : ResponseType<IActivitiesResponseData> = await this.instance.get<ResponseType<IActivitiesResponseData>>('activity/', {
            params: query,
        })

        return data.data
    }

    public updateActivityReport = async(body: IActivityReportBody, id: number) : Promise<IActivityResponseData> => {
        const data : ResponseType<IActivityResponseData> = await this.instance.put<ResponseType<IActivityResponseData>>(`activity/${id}`, body)

        return data.data
    }

    public deleteActivityReport = async(id : number) : Promise<IActivityResponseData> => {
        const data : ResponseType<IActivityResponseData> = await this.instance.delete<ResponseType<IActivityResponseData>>(`activity/${id}`)

        return data.data
    }
}
