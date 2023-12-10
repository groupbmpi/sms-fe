import { HttpClient } from "../../httpClient";
import { ICategoriesResponseData,IFormUserRegister,IUnverifiedUserResponseData, IUserData } from "../model/User";
import {ResponseType} from "../../response";

export class UserRepository extends HttpClient {
    private static repoInstance? : UserRepository;

    private constructor(){
        super(import.meta.env.VITE_SERVER_URL);
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
        const data = await this.instance.get<ResponseType<IUnverifiedUserResponseData>>('user/verify');
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

    public getAuthProfile = async () => {
        const res = await this.instance.get('user/auth/profile');
        return res;
    }

    public getProfile = async () => {
        const data: ResponseType<IUserData> = await this.instance.get<ResponseType<IUserData>>('user')
        return data.data
    }

}
