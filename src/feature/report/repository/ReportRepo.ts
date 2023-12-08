import { HttpClient } from "../../httpClient";
import {Response} from "../../response";
import { IFormReportResponseData } from "../model/ReportModel";

export class ReportRepository extends HttpClient{
    private static repoInstance? : ReportRepository;

    private constructor(){
        console.log(import.meta.env.VITE_SERVER_URL)
        super(import.meta.env.VITE_SERVER_URL);
    }

    public static getInstance() {
        if (!this.repoInstance) {
            this.repoInstance = new ReportRepository();
        }
    
        return this.repoInstance;
    }

    public getFormData = async () => {
        const data = await this.instance.get<Response<IFormReportResponseData>>('/data/probreport')
        return data
    };
    
}