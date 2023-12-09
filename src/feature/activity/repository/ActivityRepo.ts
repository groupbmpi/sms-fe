import { HttpClient } from "../../httpClient";
import { IFormActResponseData } from "../activity";
// import {Response} from "../../response";

export class ActivityRepository extends HttpClient {
    private static repoInstance? : ActivityRepository;

    private constructor(){
        super(import.meta.env.VITE_SERVER_URL + "/api/v1/data/");
    }

    public static getInstance() {
        if (!this.repoInstance) {
            this.repoInstance = new ActivityRepository();
        }
    
        return this.repoInstance;
    }

    public getActReportCategories = async () => {
        const data = await this.instance.get<IFormActResponseData>('actreport')
        return data
    }
}
