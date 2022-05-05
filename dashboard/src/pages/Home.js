import { Link, Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Users from "./Users";
import Products from "./Products";

function Home() {
  return (
    <>
      <h1>Dashboard</h1>
  
       <button className="boton">
         <Link to="/usuarios">Usuarios</Link>
        <Routes>
            <Route path="/usuarios" element={<Users />} />
        </Routes>
      </button>
      <button className="boton">
          <Link to="/productos">Productos</Link>
        <Routes>
          <Route path="/productos" element={<Products />} />
        </Routes>
      </button>

    </>
  );
}

export default Home;
