import { HttpClient } from "../../httpClient";
import { IReportData, IReportForm, IFormReportResponseData, IReportsResponse } from "../model/Report";
// import {Response} from "../../response";    
import { ResponseType } from "../../response";

export class ReportRepository extends HttpClient {
    private static repoInstance? : ReportRepository;

    private constructor(){
        super(import.meta.env.VITE_SERVER_URL + "/api/v1/");
    }

    public static getInstance() {
        if (!this.repoInstance) {
            this.repoInstance = new ReportRepository();
        }
    
        return this.repoInstance;
    }

    public getProbReportCategories = async () => {
        const data:ResponseType<IFormReportResponseData> = await this.instance.get<ResponseType<IFormReportResponseData>>('data/probreport')
        return data.data
    };

    public getAllReport = async (userId?: string) => {
        const data: ResponseType<IReportsResponse> = await this.instance.get<ResponseType<IReportsResponse>>('problems', {
            params: {
                user_id: userId
            }
        })
        return data.data
    }

    public createReport = async (body: IReportForm) => {
        const data: ResponseType<IReportData> = await this.instance.post<ResponseType<IReportData>>('problems', body)
        return data.data
    }
}
