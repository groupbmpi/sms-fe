import { HttpClient } from "../../httpClient";
import { IFormActResponseData } from "../activity";
import {ResponseType} from "../../response";

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
}
