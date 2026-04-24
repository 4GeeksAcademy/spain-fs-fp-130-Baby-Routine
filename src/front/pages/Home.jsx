import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoApp from "../assets/Logo Baby Zzync 1 - vers blanca.png";

export const Home = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
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

  const iconStyle = { fontSize: "1.5rem", color: "var(--color-primario)" };

  const dropdownStyle = {
    position: "absolute",
    top: "70px",
    right: "15px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
    zIndex: 1000,
    display: showMenu ? "block" : "none",
    overflow: "hidden"
  };

  const dropdownItemStyle = {
    padding: "12px 20px",
    width: "100%",
    border: "none",
    backgroundColor: "transparent",
    textAlign: "left",
    fontSize: "0.9rem",
    fontWeight: "bold",
    cursor: "pointer",
    borderBottom: "1px solid #f0f0f0"
  };

  return (
    <div className="bg-registro">
      <div className="mobile-container" style={{ position: "relative" }}>
        
        <div className="d-flex align-items-center justify-content-between p-3" style={{ backgroundColor: "var(--color-primario)", minHeight: "80px" }}>
          <div style={{ width: "24px" }}></div>
          <img src={logoApp} alt="Logo Baby Zzzync" style={{ width: "150px", height: "auto" }} />
          <i 
            className="fas fa-bars fa-lg text-white" 
            style={{ cursor: "pointer" }}
            onClick={() => setShowMenu(!showMenu)}
          ></i>
        </div>

        <div style={dropdownStyle}>
          <button style={dropdownItemStyle} onClick={() => navigate("/rutinas", { state: { from: "/home" } })}>
            <i className="fas fa-calendar-alt me-2"></i> RUTINAS
          </button>
          
          <button style={{...dropdownItemStyle, borderBottom: "none", color: "red"}} onClick={handleLogout}>
            <i className="fas fa-sign-out-alt me-2"></i> CERRAR SESIÓN
          </button>
        </div>

        <div className="d-flex flex-column gap-4 p-4">
          <Link to="/Menupadre" style={{ textDecoration: "none" }}> 
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