import { HttpClient } from "../../httpClient";
import { IFormLembagaData } from "../lembaga";
import {ResponseType} from "../../response";
import { ILembagaBody, ILembagaQuery } from "../model/lembagaRequest";
import { ILembagasResponseData } from "../model/lembagaResponse";

export class LembagaRepository extends HttpClient{
    private static repoInstance? : LembagaRepository;

    private constructor(){
        super(import.meta.env.VITE_SERVER_URL);
    }

    public static getInstance() {
        if (!this.repoInstance) {
            this.repoInstance = new LembagaRepository();
        }
    
        return this.repoInstance;
    }

    public getLembagaCategories = async() : Promise<IFormLembagaData> => {
        const data : ResponseType<IFormLembagaData> = await this.instance.get<ResponseType<IFormLembagaData>>('data/lembaga')
    
        return data.data
    }

    public getAllLembaga = async(query: ILembagaQuery) : Promise<ILembagasResponseData> => {
        const data : ResponseType<ILembagasResponseData> = await this.instance.get("lembaga", {
            params: query
        })

        return data.data
    }

    public createLembaga = async(body: ILembagaBody) : Promise<ILembagasResponseData> => {
        const data : ResponseType<ILembagasResponseData> = await this.instance.post<ResponseType<ILembagasResponseData>>("lembaga", body)

        return data.data
    }

    public updateLembaga = async(body: ILembagaBody, id: number) : Promise<ILembagasResponseData> => {
        const data : ResponseType<ILembagasResponseData> = await this.instance.put<ResponseType<ILembagasResponseData>>(`lembaga${id}`, body)

        return data.data
    }


}