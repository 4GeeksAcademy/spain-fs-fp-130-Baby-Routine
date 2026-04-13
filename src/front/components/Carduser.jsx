import React from "react";

export const Carduser = () => {
  return (
    <div className="d-flex align-items-center justify-content-between p-3 mb-4 border" 
         style={{ borderRadius: "20px", backgroundColor: "#fbfbfb" }}>
      
      {/* Información del Usuario */}
      <div className="flex-grow-1">
        <p className="m-0 text-muted">Nombre:</p>
        <p className="m-0 text-muted">Apellidos:</p>
        <p className="m-0 text-muted">Edad:</p>
      </div>

      {/* Placeholder de Foto */}
      <div className="d-flex align-items-center justify-content-center border" 
           style={photoPlaceholderStyle}>
        <i className="fas fa-user text-muted" style={{ fontSize: "1.2rem" }}></i>
        <span className="text-center text-muted mt-1" style={{ fontSize: "0.65rem", lineHeight: "1" }}>
          FOTO<br/>USER
        </span>
      </div>
    </div>
  );
};

// Dibujo input foto
const photoPlaceholderStyle = {
  width: "65px",
  height: "65px",
  borderRadius: "50%",
  backgroundColor: "var(--color-fondoBotones)",
  flexDirection: "column",
  display: "flex"
};