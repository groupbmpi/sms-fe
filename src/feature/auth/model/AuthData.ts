export enum Role {
    mitra = "mitra",
    admin = "admin",
    superAdmin = "superAdmin"
}

export interface AuthContextValue {
    user: AuthUser | null;
    setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}


export interface AuthUser {
    token : string,
    email : string,
    role: Role,
}