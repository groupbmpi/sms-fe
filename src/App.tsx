import { Route, Routes } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Activity from "./page/Activity";
import News from "./page/News";
import Forum from "./page/Forum";
import Report from "./page/Report";
import Profile from "./page/Profile";

function App() {
  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route path="/" element={<Activity />} />
        <Route path="/news" element={<News />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/problem-report" element={<Report />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default App;
