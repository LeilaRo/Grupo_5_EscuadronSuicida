import React, { useEffect, useState } from "react";

const TotalCategorias = () => {
  const [TotalCategorias, setTotalCategorias] = useState([]);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch("http://localhost:3030/api/product");
    const productos = await data.json();
    setTotalCategorias(productos.countByCategory);
  };

  return (
    <div>
      <h1>Total de Artículos</h1>
      <h2> {TotalCategorias.length} </h2>
    </div>
  );
};

export default TotalCategorias;
