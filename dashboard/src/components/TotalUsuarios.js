import React, { useEffect, useState } from "react";

const TotalUsuarios = () => {
  const [totalUser, setTotalUser] = useState([]);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch("http://localhost:3030/api/user");
    const usuarios = await data.json();
    setTotalUser(usuarios.count);
  };

  return (
    <div>
      <h1>Total de Usuarios</h1>
      <h2> {totalUser} </h2>
    </div>
  );
};

export default TotalUsuarios;
