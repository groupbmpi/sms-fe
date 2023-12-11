import { createContext, useEffect, useState } from "react";
import { AuthContextValue, AuthUser} from "../../model/AuthData";
import { UserRepository } from "../../../user/user";

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  // TODO: uncomment this code when backend is ready
  useEffect(() => {
    console.log("HERE");
    if (!user) {
      UserRepository.getInstance()
        .getAuthProfile()
        .then((res) => {
          console.log(res);
          setUser({
            email: res.data.email,
            token: res.data.token,
            role: res.data.role,
            access: res.data.akses,
          });
        })
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
