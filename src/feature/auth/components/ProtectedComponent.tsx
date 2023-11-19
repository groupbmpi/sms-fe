import useAuth from "../hooks/Auth";
import { Role } from "../model/AuthData";

export const ProtectedRoleComponent = ({
  roleAllowed,
  component,
}: {
  roleAllowed: Role[];
  component: JSX.Element;
}) => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  if (roleAllowed.includes(user.role)) {
    return component;
  }
};

export default ProtectedRoleComponent;
