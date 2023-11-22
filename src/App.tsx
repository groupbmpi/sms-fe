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
import AuthProvider from "./feature/auth/hooks/context/AuthContext";
import ProtectedRoute from "./feature/auth/components/ProtectedRoute";
import Login from "./page/Login";
import Register from "./page/Register";
import User from "./page/User";
import UserPostAdmin from "./page/UserPostAdmin";
import UserPostMitra from "./page/UserPostMitra";

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
              <ProtectedRoute redirectPath="/login" children={<Forum />} />
            }
          />
          <Route path="/problem-report" element={<Report />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute redirectPath="/login" children={<Profile />} />
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute
                redirectPath="/"
                requiredLoggedIn={false}
                children={<Login />}
              />
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute
                redirectPath="/"
                requiredLoggedIn={false}
                children={<Register />}
              />
            }
          />
          <Route path="/user">
            <Route
              index
              element={
                <ProtectedRoute redirectPath="/login" children={<User />} />
              }
            />
            <Route
              path="new-admin"
              element={
                <ProtectedRoute
                  redirectPath="/login"
                  children={<UserPostAdmin />}
                />
              }
            />
            <Route
              path="new-mitra"
              element={
                <ProtectedRoute
                  redirectPath="/login"
                  children={<UserPostMitra />}
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
