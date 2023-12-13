import {useNavigate } from "react-router-dom";
import { Role } from "../model/AuthData";
import { useAuth } from "../auth-and-profile";
import { useEffect } from "react";

/// [Protected Route]
/// This function is used to protect a route from unauthorized user
export const RequiredLoggedInRoute = ({
  children,
  redirectPath,
}: {
  children: JSX.Element;
  redirectPath: string;
}): JSX.Element => {
  const { user, isLoadComplete } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    console.log('useEffect',isLoadComplete,user)
    if(!isLoadComplete) return;
    if (!user) {
      navigate(redirectPath);
    }
  }, [user, isLoadComplete]);

  return children;
};

/// [Protected Route]
/// This function is used to protect a route from logged in user that tried to access a route that only allowed for not logged in user
export const RequiredNotLoggedInRoute = ({
  children,
  redirectPath,
}: {
  children: JSX.Element;
  redirectPath: string;
}): JSX.Element => {

  const { user, isLoadComplete } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if(!isLoadComplete) return;
    if (user) {
      navigate(redirectPath);
    }
  }, [user, isLoadComplete]);

  return children;
};

/// [Protected Route]
/// This function is used to protect a route from logged in user that tried to access a route that only allowed for some roles
export const RoleBasedProtectedRoute = ({
  rolesAllowed,
  children,
  redirectPath,
}: {
  rolesAllowed: Role[];
  children: JSX.Element;
  redirectPath: string;
}): JSX.Element => {
  const { user, isLoadComplete } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if(!isLoadComplete) return;
    if (user) {
      if (!rolesAllowed.includes(user!.role)) {
        navigate(redirectPath);
      }
    }
  }, [user, isLoadComplete]);

  return children;
};
