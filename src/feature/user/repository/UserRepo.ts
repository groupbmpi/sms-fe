import { HttpClient } from "../../httpClient";
import { ICategoriesResponseData,IFormUserRegister,IUnverifiedUserResponseData } from "../model/User";
// import {Response} from "../../response";

export class UserRepository extends HttpClient {
    private static repoInstance? : UserRepository;

    private constructor(){
        super(import.meta.env.VITE_SERVER_URL + "/api/v1/");
    }

    public static getInstance() {
        if (!this.repoInstance) {
            this.repoInstance = new UserRepository();
        }
    
        return this.repoInstance;
    }

    public getAllCategories = async () => {
        const data = await this.instance.get<ICategoriesResponseData>('data/user');
        return data;
    }

    public getAllUnverifiedUsers = async () => {
        const data = await this.instance.get<IUnverifiedUserResponseData>('user/verify');
        return data;
    }

    public verifyUser = async (id : number,statusAcc: boolean) => {
        const data = await this.instance.put('user/verify/',{
            userID: id,
            statusAcc: statusAcc
        });
        return data;
    }

    public registerUser = async (data : IFormUserRegister) => {
        const res = await this.instance.post('user/register',data);
        return res;
    }

    public loginUser = async (email : string,password : string) => {
        const res = await this.instance.post('user/login',{
            email:email,
            password:password
        });
        return res;
    }

    public activateUser = async (email:string, password:string, token : string) => {
        const res = await this.instance.put('user/activate',{
            email:email,
            password:password,
            otp:token
        });
        return res;
    }

}
