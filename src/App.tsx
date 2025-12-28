import Home from "./components/home/home";
import Navbar from "./components/navbar/navbar";
import Profil from "./components/profil/profil";
import Buyurtmalar from "./components/buyurtmalar/buyurtmalar";
import Create from "./components/create/create";
import Mutahasislar from "./components/mutaxassislar/mutaxassislar";
import Login from "./components/login/login";
import Haqimizda from "./components/haqimizda/haqimizda";
import Resumes from "./components/local-actions/resumes/resume";
import Orders from "./components/local-actions/orders/orders";

import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="main">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buyurtmalar" element={<Buyurtmalar />} />
        <Route path="/mutaxassislar" element={<Mutahasislar />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/create" element={<Create />} />
        <Route path="/haqimizda" element={<Haqimizda />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resume/:id" element={<Resumes />} />
        <Route path="/order/:id" element={<Orders />} />
      </Routes>
    </div>
  );
}

export default App;
