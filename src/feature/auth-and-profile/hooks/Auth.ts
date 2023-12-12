import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

export const useAuth = () => {
  const { user, setUser, isLoadComplete } = useContext(AuthContext);

  return { user, setUser, isLoadComplete };
};
