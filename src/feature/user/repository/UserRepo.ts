import { HttpClient } from "../../httpClient";
import { IFormUserResponseData } from "../model/UserModel";
// import {Response} from "../../response";

export class UserRepository extends HttpClient {
    private static repoInstance? : UserRepository;

    private constructor(){
        super(import.meta.env.VITE_SERVER_URL + "/api/v1/data/");
    }

    public static getInstance() {
        if (!this.repoInstance) {
            this.repoInstance = new UserRepository();
        }
    
        return this.repoInstance;
    }

    public getUserFormCategories = async () => {
        const data = await this.instance.get<IFormUserResponseData>('user')
        return data
    }
}
