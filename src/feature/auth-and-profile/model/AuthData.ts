export enum Role {
    MITRA = "User",
    ADMIN = "Admin",
    SUPERADMIN = "SuperAdmin"
}

export interface AuthContextValue {
    user: AuthUser | null;
    setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
    isLoadComplete : boolean;
    setIsLoadComplete : React.Dispatch<React.SetStateAction<boolean>>;
}


export interface AuthUser {
    token : string,
    email : string,
    role: Role,
    access : string
}