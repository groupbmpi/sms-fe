export enum Role {
    MITRA = "mitra",
    ADMIN = "admin",
    SUPERADMIN = "superAdmin"
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