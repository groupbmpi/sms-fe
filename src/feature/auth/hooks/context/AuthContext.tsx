import { createContext, useState } from "react";
import { AuthContextValue, AuthUser } from "../../model/AuthData";

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  // TODO: uncomment this code when backend is ready
  // useEffect(() => {
  //   if (!user) {
  //     axios
  //       .get("/auth/profile")
  //       .then((res) => {
  //         setUser(res.data);
  //       })
  //       .catch(() => {
  //         setUser(null);
  //       });
  //   }
  // }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
