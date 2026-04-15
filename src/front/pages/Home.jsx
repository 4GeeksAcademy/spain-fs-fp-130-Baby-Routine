import React from "react";
import { Link } from "react-router-dom";
import logoApp from "../assets/Logo Baby Zzync 1 - vers blanca.png";

export const Home = () => {
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

  const iconStyle = { fontSize: "1.5rem", color: "var(--color-primario)" };

  return (
    <div className="bg-registro">
      <div className="mobile-container">
        <div className="d-flex align-items-center justify-content-between p-3" style={{ backgroundColor: "var(--color-primario)", minHeight: "80px" }}>
          <div style={{ width: "24px" }}></div>
          <img src={logoApp} alt="Logo Baby Zzzync" style={{ width: "150px", height: "auto" }} />
          <i className="fas fa-bars fa-lg text-white" style={{ cursor: "pointer" }}></i>
        </div>

        <div className="d-flex flex-column gap-4 p-4">
          <Link to="/familia" style={{ textDecoration: "none" }}> 
            <button className="btn w-100 p-4 shadow-sm" style={btnStyle}>
              <i className="fas fa-users mb-2" style={iconStyle}></i>
              <h5 className="m-0 fw-bold text-dark">MI FAMILIA</h5>
              <small className="text-muted text-uppercase">(Ruta para crear rutina)</small>
            </button>
          </Link>

          <button className="btn w-100 p-4 shadow-sm" style={btnStyle}>
            <i className="fas fa-user-friends mb-2" style={iconStyle}></i>
            <h5 className="m-0 fw-bold text-dark">CUIDADOR/A</h5>
            <small className="text-muted text-uppercase">(Aqui se gestiona Rutina)</small>
          </button>

          <button className="btn w-100 p-4 shadow-sm" style={btnStyle}>
            <i className="fas fa-baby mb-2" style={iconStyle}></i>
            <h5 className="m-0 fw-bold text-dark">ZZZYNC</h5>
            <small className="text-muted text-uppercase">(Visualizacion de progreso)</small>
          </button>
        </div>
      </div>
    </div>
  );
};