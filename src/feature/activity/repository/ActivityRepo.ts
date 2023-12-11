import { HttpClient } from "../../httpClient";
import { IFormActResponseData, IActivityReportBody } from "../activity";
import {ResponseType} from "../../response";
import { IActivitiesResponseData, IActivityResponseData } from "../model/ActivityResponse";

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

    public getAllActivityReport = async (page?: number, limit?:number) : Promise<IActivitiesResponseData> => {
        const data : ResponseType<IActivitiesResponseData> = await this.instance.get<ResponseType<IActivitiesResponseData>>('activity/', {
            params: {
                page: page,
                limit: limit
            }
        })

        return data.data
    }
}
