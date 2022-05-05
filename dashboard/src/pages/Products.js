import TotalProductos from "../components/TotalProductos";
import TotalCategorias from "../components/TotalCategorias";
import Productos from "../components/Productos";
import Categorias from "../components/Categorias";
import UltimoProducto from "../components/UltimoProducto";

function Products() {
  return (
    <div className="paneles">
      <h1>PANEL PRODUCTOS</h1>
      <div className="Panel">
        <Productos />
      </div>
      <div className="Panel">
        <Categorias />
      </div>
      <div className="Panel">
        <TotalProductos />
      </div>
      <div className="Panel">
        <TotalCategorias />
      </div>
      <div className="Panel">
        <UltimoProducto />
      </div>
    </div>
  );
}

export default Products;
