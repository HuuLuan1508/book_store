import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Product from "./components/Product";
import Viewbook from "./pages/Viewbook";
import MyBookshelf from "./pages/MyBookshelf";
import Favorites from "./pages/Favorites";
import Logout from "./pages/Logout";
import ReadChapter from "./pages/ReadChapter";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/viewbook" element={<Viewbook />} />
        <Route path="/read/:bookId/:chapterId" element={<ReadChapter />} />
        <Route path="/allbooks" element={<Product />} />
        <Route path="/mybookshelf" element={<MyBookshelf />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
