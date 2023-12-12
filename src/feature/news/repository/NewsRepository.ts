import { HttpClient } from "../../httpClient";

export class NewsRepository extends HttpClient {
    private static repoInstance? : NewsRepository;

    private constructor(){
        super(import.meta.env.VITE_SERVER_URL);
    }

    public static getInstance() {
        if (!this.repoInstance) {
            this.repoInstance = new NewsRepository();
        }
    
        return this.repoInstance;
    }

    public getAllNews = async (page: number = 1, limit: number = 10) => {
        // TODO set news response type
        const data = await this.instance.get('news', {
            params: {
                page: page,
                limit: limit
            }
        })
        return data.data
    }

    public getNewsbyId = async (id: string) => {
        // TODO set news response type
        const data = await this.instance.get(`news/${id}`)
        return data.data
    }
}