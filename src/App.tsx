import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Activity from "./page/Activity";
import News from "./page/News";
import Forum from "./page/Forum";
import Report from "./page/Report";
import Profile from "./page/Profile";
import NewsDetail from "./page/NewsDetail";
import NewsPost from "./page/NewsPost";
import ActivityPost from "./page/ActivityPost";
import AuthProvider from "./feature/auth-and-profile/hooks/context/AuthContext";
import {
  RequiredLoggedInRoute,
  RequiredNotLoggedInRoute,
  RoleBasedProtectedRoute,
} from "./feature/auth-and-profile/components/ProtectedRoute";
import Login from "./page/Login";
import Register from "./page/Register";
import User from "./page/User";
import UserPostAdmin from "./page/UserPostAdmin";
import UserPostMitra from "./page/UserPostMitra";
import { Role } from "./feature/auth-and-profile/model/AuthData";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<Navigate to={"/activity"} />} />
          <Route path="/activity">
            <Route index element={<Activity />} />
            <Route path="new" element={<ActivityPost />} />
          </Route>
          <Route path="/news">
            <Route index element={<News />} />
            <Route path=":id" element={<NewsDetail />} />
            <Route path="new" element={<NewsPost />} />
          </Route>
          <Route
            path="/forum"
            element={
              <RequiredLoggedInRoute
                redirectPath="/login"
                children={<Forum />}
              />
            }
          />
          <Route path="/problem-report" element={<Report />} />
          <Route
            path="/profile"
            element={
              <RequiredLoggedInRoute
                redirectPath="/login"
                children={<Profile />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <RequiredNotLoggedInRoute redirectPath="/" children={<Login />} />
            }
          />
          <Route
            path="/register"
            element={
              <RequiredNotLoggedInRoute
                redirectPath="/"
                children={<Register />}
              />
            }
          />
          <Route path="/user">
            <Route
              index
              element={
                <RequiredLoggedInRoute
                  redirectPath="/login"
                  children={
                    <RoleBasedProtectedRoute
                      rolesAllowed={[Role.ADMIN, Role.SUPERADMIN]}
                      redirectPath="/"
                      children={<User />}
                    />
                  }
                />
              }
            />
            <Route
              path="new-admin"
              element={
                <RequiredLoggedInRoute
                  redirectPath="/login"
                  children={
                    <RoleBasedProtectedRoute
                      rolesAllowed={[Role.SUPERADMIN]}
                      redirectPath="/user"
                      children={<UserPostAdmin />}
                    />
                  }
                />
              }
            />
            <Route
              path="new-mitra"
              element={
                <RequiredLoggedInRoute
                  redirectPath="/login"
                  children={
                    <RoleBasedProtectedRoute
                      rolesAllowed={[Role.ADMIN, Role.SUPERADMIN]}
                      redirectPath="/user"
                      children={<UserPostMitra />}
                    />
                  }
                />
              }
            />
          </Route>
        </Route>
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
