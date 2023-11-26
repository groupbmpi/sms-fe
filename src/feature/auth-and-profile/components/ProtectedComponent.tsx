import useAuth from "../hooks/Auth";
import { Role } from "../model/AuthData";

/// [Protected Component]
/// This function is used to protect a component
const ProtectedRoleComponent = ({
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

  if (roleAllowed.includes(user!.role)) {
    return component;
  } else {
    return null;
  }
};

export default ProtectedRoleComponent;
