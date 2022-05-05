import React, { useEffect, useState } from "react";

const Usuarios = () => {
  const [usuario, setUsuario] = useState([]);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch("http://localhost:3030/api/user");
    const usuarios = await data.json();
    console.log(usuarios)
    setUsuario(usuarios.users);
  };

  return (
    <div>
      <h1>Usuarios</h1>
      <ul>
        {usuario.map((item) => (
          <li key="item.id">{item.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Usuarios;
