import { HttpClient } from "../../httpClient";
// import {Response} from "../../response";
import { IFormReportResponseData } from "../report";

export class ReportRepository extends HttpClient {
    private static repoInstance? : ReportRepository;

    private constructor(){
        super(import.meta.env.VITE_SERVER_URL + "/api/v1/data/");
    }

    public static getInstance() {
        if (!this.repoInstance) {
            this.repoInstance = new ReportRepository();
        }
    
        return this.repoInstance;
    }

    public getProbReportCategories = async () => {
        const data = await this.instance.get<IFormReportResponseData>('probreport')
        return data
    };
}
