import { generateQueryString } from "../../../helper/Parser";
import { HttpClient } from "../../httpClient";
import { ResponseType } from "../../response";
import { ICreateNewsArgDto, IFormAllNewsResponseData, IFormNewsByIdResponseData, INewsIdArgDto, INewsOptionsArgDto, IUpdateNewsArgDto } from "../model/News";

export class NewsRepo extends HttpClient {
    private static repoInstance? : NewsRepo;

    private constructor(){
        super(`${import.meta.env.VITE_SERVER_URL}/news`);
    }

    public static getInstance() {
        if (!this.repoInstance) {
            this.repoInstance = new NewsRepo();
        }
    
        return this.repoInstance;
    }

    public getAllNews = async (dto: INewsOptionsArgDto): Promise<ResponseType<IFormAllNewsResponseData>> => {
        const data = await this.instance.get<ResponseType<IFormAllNewsResponseData>>(`/${generateQueryString(dto)}`);

        return data;
    }

    public getNewsById = async (dto: INewsIdArgDto): Promise<ResponseType<IFormNewsByIdResponseData>> => {
        const data = await this.instance.get<ResponseType<IFormNewsByIdResponseData>>(`/${dto.id}`);

        return data;
    }

    public createNews = async (dto: ICreateNewsArgDto): Promise<ResponseType<null>> => {
        const data = await this.instance.post<ResponseType<null>>(`/`, dto);

        return data;
    }

    public updateNews = async (dto: IUpdateNewsArgDto): Promise<ResponseType<null>> => {
        const data = await this.instance.put<ResponseType<null>>(`/${dto.id}`, dto.data);

        return data;
    }

    public deleteNews = async (dto: INewsIdArgDto): Promise<ResponseType<null>> => {
        const data = await this.instance.delete<ResponseType<null>>(`/${dto.id}`);

        return data;
    }
}