import React, { useEffect, useState } from "react";

const TotalProductos = () => {
  const [totalProduct, setTotalProduct] = useState([]);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch("http://localhost:3030/api/product");
    const productos = await data.json();
    setTotalProduct(productos.count);
  };

  return (
    <div>
      <h1>Total de Artìculos</h1>
      <h2> {totalProduct.length} </h2>
    </div>
  );
};

export default TotalProductos;
