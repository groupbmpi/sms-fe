import { generateQueryString } from "../../../helper/Parser";
import { HttpClient } from "../../httpClient";
import { Response } from "../../response";
import { 
    INewsIdArgDto, 
    ICreateNewsArgDto, 
    IUpdateNewsArgDto,
    INewsOptionsArgDto,
    IFormAllNewsResponseData,
    IFormNewsByIdResponseData, 
} from "../model/News";

export class NewsRepo extends HttpClient {
    private static repoInstance?: NewsRepo;

    private constructor() {
        super(`http://localhost:3002/api/v1/news`);
    }

    public static getInstance() {
        if (! this.repoInstance) {
            this.repoInstance = new NewsRepo();
        }
    
        return this.repoInstance;
    }

    public getAllNews = async (dto: INewsOptionsArgDto): Promise<Response<IFormAllNewsResponseData>> => {
        const data = await this.instance.get(`/${generateQueryString(dto)}`) as Response<IFormAllNewsResponseData>;

        return data;
    }

    public getNewsById = async (dto: INewsIdArgDto): Promise<Response<IFormNewsByIdResponseData>> => {
        const data = await this.instance.get(`/${dto.id}`) as Response<IFormNewsByIdResponseData>;

        return data;
    }

    public createNews = async (dto: ICreateNewsArgDto) => {
        const data = await this.instance.post(`/`, dto);

        return data;
    }

    public updateNews = async (dto: IUpdateNewsArgDto) => {
        const data: Response<null> = await this.instance.put(`/${dto.id}`, dto.data);

        return data;
    }

    public deleteNews = async (dto: INewsIdArgDto) => {
        const data: Response<null> = await this.instance.delete(`/${dto.id}`);

        return data;
    }
}
