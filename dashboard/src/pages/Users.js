import Usuarios from "../components/Usuarios";
import TotalUsuarios from "../components/TotalUsuarios";

function Users() {
  return (
    <div className="paneles">
      <h1>PANEL USUARIOS</h1>
      <div className="Panel">
        <Usuarios />
      </div>
      <div className="Panel">
        <TotalUsuarios />
      </div>
    </div>
  );
}

export default Users;
