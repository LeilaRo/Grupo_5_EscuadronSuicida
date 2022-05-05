import React, { useEffect, useState } from "react";

const UltimoProducto = () => {
  const [lastProduct, setLastProduct] = useState([]);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch("http://localhost:3030/api/product");
    const productos = await data.json();
    setLastProduct(productos.lastProduct);
  };

  return (
    <div>
      <h1>Ùltimo Producto Creado</h1>
      <ul>
        {lastProduct.map((item) => (
          <li key="item.id">{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UltimoProducto;
