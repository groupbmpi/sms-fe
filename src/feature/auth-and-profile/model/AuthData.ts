export enum Role {
    MITRA = "User",
    ADMIN = "Admin",
    SUPERADMIN = "SuperAdmin"
}

export interface AuthContextValue {
    user: AuthUser | null;
    setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}


export interface AuthUser {
    token : string,
    email : string,
    role: Role,
    access : string
}