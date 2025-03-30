import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import AdminHeader from "./components/AdminHeader";
import Product from "./components/Product";
import ViewBook from "./pages/ViewBook";
import History from "./pages/History";
import Favorites from "./pages/Favorites";
import Logout from "./pages/Logout";
import ReadChapter from "./pages/ReadChapter";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "../src/pages/admin/AdminDashboard";
import {useUserStore} from "../src/store/UserStore";

function App() {
  const {user} = useUserStore();

  return (
    <div>
      {!user || user?.role == "ADMIN" ? <AdminHeader /> : <Header />}
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/viewbook" element={<ViewBook />} />
        <Route path="/read/:bookId/:chapterId" element={<ReadChapter />} />
        <Route path="/allbooks" element={<Product />} />
        <Route path="/mybookshelf" element={<History />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/management" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
