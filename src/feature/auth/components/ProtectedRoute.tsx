import { Navigate } from "react-router-dom";
import useAuth from "../hooks/Auth";

const ProtectedRoute = ({
  children,
  redirectPath,
  requiredLoggedIn = true,
}: {
  children: JSX.Element;
  redirectPath: string;
  requiredLoggedIn?: boolean;
}) => {
  const { user } = useAuth();

  if (!user && requiredLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  if (user && !requiredLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
