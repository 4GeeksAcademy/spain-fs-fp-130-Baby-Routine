import React from "react";

export const Carduser = () => {  
  const userData = {
    nombre: "Usuario Padre",
    fotoUrl: null // Aqui iria la url de la imagen
  };

  return (
    <div className="d-flex align-items-center p-2 mb-4 shadow-sm" 
         style={{ borderRadius: "50px", backgroundColor: "#fbfbfb", border: "1px solid #eee" }}>
      
      {/* Avatar del Usuario */}
      <div className="d-flex align-items-center justify-content-center shadow-sm" 
           style={avatarStyle}>
        {userData.fotoUrl ? (
          <img src={userData.fotoUrl} alt="User" style={imgStyle} />
        ) : (
          <i className="fas fa-user text-white" style={{ fontSize: "1.1rem" }}></i>
        )}
      </div>

      {/* Nombre del Usuario */}
      <div className="ms-3">
        <p className="m-0 fw-bold" style={{ color: "#555", fontSize: "1rem" }}>
          {userData.nombre}
        </p>
        <p className="m-0 text-muted" style={{ fontSize: "0.75rem", marginTop: "-3px" }}>
          @UsuarioPadre
        </p>
      </div>

    </div>
  );
};

// Estilos del contenedor del avatar
const avatarStyle = {
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  backgroundColor: "var(--color-primario)", 
  overflow: "hidden",
  flexShrink: 0
};

