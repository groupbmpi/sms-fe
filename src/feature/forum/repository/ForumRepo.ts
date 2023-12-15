import { AxiosResponse } from "axios";
import { HttpClient } from "../../httpClient";
import { ResponseType } from "../../response";
import { IChatQuery, IChatResponseData, IFormChat } from "../model/Forum";

export class ForumRepository extends HttpClient {
    private static repoInstance? : ForumRepository;

    private constructor(){
        super(import.meta.env.VITE_SERVER_URL);
    }

    public static getInstance() {
        if (!this.repoInstance) {
            this.repoInstance = new ForumRepository();
        }
    
        return this.repoInstance;
    }

    public getChat = async (query: IChatQuery) : Promise<ResponseType<IChatResponseData[]>> => {
        const data : ResponseType<IChatResponseData[]> = await this.instance.get<ResponseType<IChatResponseData[]>>('chat',{
            params: query,
        })
        
        return data;
    }

    public postChat = async (body: IFormChat) : Promise<AxiosResponse> => {
        const data : AxiosResponse = await this.instance.post<AxiosResponse>('chat', body)

        return data;
    }
}