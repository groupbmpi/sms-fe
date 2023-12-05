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
import Login from "./page/Login";
import Register from "./page/Register";
import User from "./page/User";
import UserPostAdmin from "./page/UserPostAdmin";
import UserPostMitra from "./page/UserPostMitra";
import AccountActivation from "./page/Activation";
import ReportList from "./page/ReportList";
import UserEdit from "./page/UserEdit";
import NewsEdit from "./page/NewsEdit";

import {
  AuthProvider,
  Role,
  RequiredLoggedInRoute,
  RequiredNotLoggedInRoute,
  RoleBasedProtectedRoute,
} from "./feature/auth-and-profile/auth-and-profile";

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
            <Route path=":id">
              <Route index element={<NewsDetail />} />
              <Route path="edit" element={<NewsEdit />} />
            </Route>
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
          <Route path="/problem-report">
            <Route index element={<Report />} />
            <Route path="list" element={<ReportList />} />
          </Route>
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
            path="/activation"
            element={
              <RequiredNotLoggedInRoute
                redirectPath="/"
                children={<AccountActivation />}
              />
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
            <Route
              path=":id/edit"
              element={
                <RequiredLoggedInRoute
                  redirectPath="/login"
                  children={
                    <RoleBasedProtectedRoute
                      rolesAllowed={[Role.ADMIN, Role.SUPERADMIN]}
                      redirectPath="/user"
                      children={<UserEdit />}
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
