import { Route, Routes } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Activity from "./page/Activity";
import News from "./page/News";
import Forum from "./page/Forum";
import Report from "./page/Report";
import Profile from "./page/Profile";
import NewsDetail from "./page/NewsDetail";
import NewsPost from "./page/NewsPost";
import ActivityPost from "./page/ActivityPost";

function App() {
  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route path="/" element={<Activity />} />
        <Route path="/activity">
          <Route index element={<Activity />} />
          <Route path="new" element={<ActivityPost />} />
        </Route>
        <Route path="/news">
          <Route index element={<News />} />
          <Route path=":id" element={<NewsDetail />} />
          <Route path="new" element={<NewsPost />} />
        </Route>
        <Route path="/forum" element={<Forum />} />
        <Route path="/problem-report" element={<Report />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default App;
