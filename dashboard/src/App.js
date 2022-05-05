import './App.css';
import { Link, Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Users from "./pages/Users";

function App() {
  return (
    <>
    
        <h1>DASHBOARD</h1>
        <Router>
        <nav>
          <button className="boton">
            <Link to="/">Inicio</Link>
          </button>
          <button className="boton">
            <Link to="/usuarios">Usuarios</Link>
          </button>
          <button className="boton">
            <Link to="/productos">Productos</Link>
          </button>
        </nav>
        <main>
          <Routes>
            <Route path="/usuarios" element={<Users />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/" element={<Home />} />
          </Routes>
          </main>
        </Router>
      
    </>
  );
}

export default App;
