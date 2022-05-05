import React, { useEffect, useState } from "react";

const Productos = () => {
  const [articulo, setArticulo] = useState([]);

  useEffect(() => {
    obtenerDatos();
    
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch("http://localhost:3030/api/product");
    const productos = await data.json();
    console.log(productos)
    setArticulo(productos.products);
  };

  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {articulo.map((item) => (
          <li key="item.id">{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Productos;
