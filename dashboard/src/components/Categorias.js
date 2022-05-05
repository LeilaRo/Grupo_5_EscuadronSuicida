import React, { useEffect, useState } from "react";

const Categorias = () => {
  const [categoria, setCategoria] = useState([]);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch("http://localhost:3030/api/product");
    const productos = await data.json();
    setCategoria(productos.countByCategory);
  };

  return (
    <div>
      <h1>Cantidad de Artículos por Categoría</h1>
      <ul>
        {categoria.map((item) => (
          <li key="item.id">
            {item.name}: {item.count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categorias;
