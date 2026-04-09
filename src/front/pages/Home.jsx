import React from "react";
import logoApp from "../assets/Logo Baby Zzync 1 - vers blanca.png";
export const Home = () => {
  return (
    <div className="bg-registro">
      <div className="container d-flex justify-content-center align-items-center min-vh-100">

        {/* Card principal */}
        <div className="card shadow-sm border-0" style={{ maxWidth: "450px", width: "100%", borderRadius: "20px", overflow: "hidden" }}>
          <div className="d-flex align-items-center justify-content-center p-3  position-relative"
            style={{ backgroundColor: "var(--color-primario)", minHeight: "80px" }}>

            {/* Logo */}
            <img
              src={logoApp}
              alt="Logo Baby Zzzync"
              style={{ width: "150px", height: "auto" }}
            />
            {/* Icono de menú */}
            <i className="fas fa-bars fa-lg text-muted" style={{ cursor: "pointer" }}></i>
          </div>

          {/* Menú de Botones */}
          <div className="d-flex flex-column gap-4 p-4">

            {/* Botón 1: MI FAMILIA */}
            <button className="btn w-100 p-4 text-center border shadow-sm" style={btnStyle}>
              <i className="fas fa-users mb-2" style={iconStyle}></i>
              <h5 className="m-0 fw-bold">MI FAMILIA</h5>
              <small className="text-muted text-uppercase">(Ruta para crear rutina)</small>
            </button>

            {/* Botón 2: CUIDADOR/A */}
            <button className="btn w-100 p-4 text-center border shadow-sm" style={btnStyle}>
              <i className="fas fa-user-friends mb-2" style={iconStyle}></i>
              <h5 className="m-0 fw-bold">CUIDADOR/A</h5>
              <small className="text-muted text-uppercase">(Aqui se gestiona Rutina)</small>
            </button>

            {/* Botón 3: ZZZYNC */}
            <button className="btn w-100 p-4 text-center border shadow-sm" style={btnStyle}>
              <i className="fas fa-baby mb-2" style={iconStyle}></i>
              <h5 className="m-0 fw-bold">ZZZYNC</h5>
              <small className="text-muted text-uppercase">(Visualizacion de progreso)</small>
            </button>

          </div>
        </div>
      </div>

    </div>
  );
};

// Estilos sencillos en línea, problemas hablados en la reunion del 04/04
const cardStyle = {
  backgroundColor: "white",
  borderRadius: "15px",
  transition: "all 0.2s ease",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #eee",
  cursor: "pointer"
};

const btnStyle = {
  backgroundColor: "var(--color-fondoBotones)",
  borderRadius: "15px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  transition: "all 0.2s ease"
};

const iconStyle = {
  fontSize: "1.5rem",
  color: "var(--color-primario)"
};