import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Product from "./components/Product";
import Viewbook from "./pages/viewbook";
import MyBookshelf from "./pages/MyBookshelf";
import Favorites from "./pages/Favorites";
import Logout from "./pages/Logout";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/viewbook/" element={<Viewbook />} />
        <Route path="/allbooks" element={<Product />} />
        <Route path="/mybookshelf" element={<MyBookshelf />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

export default App;
