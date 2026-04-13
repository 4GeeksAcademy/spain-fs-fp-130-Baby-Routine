import React from "react";
import { Link } from "react-router-dom";
import logoApp from "../assets/Logo Baby Zzync 1 - vers blanca.png";

export const Addhijo = () => {
  return (
    <div className="bg-registro">
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        
        {/* Container */}
        <div className="card shadow-sm border-0" style={{ maxWidth: "450px", width: "100%", borderRadius: "20px", overflow: "hidden" }}>
          
          {/* Header */}
          <div className="d-flex align-items-center justify-content-center p-3 position-relative"
            style={{ backgroundColor: "var(--color-primario)", minHeight: "80px" }}>
            
            <Link to="/menupadre" className="position-absolute" style={{ left: "20px", color: "white" }}>
               <i className="fas fa-arrow-left fa-lg"></i>
            </Link>

            <img
              src={logoApp}
              alt="Logo Baby Zzzync"
              style={{ width: "150px", height: "auto" }}
            />
          </div>

          {/* body */}
          <div className="card-body p-4 text-center">
            
            {/* seccion de foto */}
            <div className="d-flex align-items-center justify-content-center border mx-auto mb-4" 
                 style={photoContainerStyle}>
              <i className="fas fa-plus text-muted" style={{ fontSize: "0.8rem" }}></i>
              <span className="text-muted fw-bold" style={{ fontSize: "0.7rem" }}>FOTO</span>
            </div>

            {/* inputs */}
            <div className="d-flex flex-column gap-2 mb-4">
              <input type="text" className="form-control text-center shadow-sm" placeholder="nombre" style={inputStyle} />
              <input type="text" className="form-control text-center shadow-sm" placeholder="apellidos" style={inputStyle} />
              
              <input 
                type="number" 
                className="form-control text-center shadow-sm" 
                placeholder="EDAD" 
                min="0"
                style={inputStyle} 
              />
              
              <textarea 
                className="form-control text-center shadow-sm" 
                placeholder="Informacion" 
                style={{ ...inputStyle, borderRadius: "15px", height: "100px" }} 
              />
            </div>

            {/* Botón de añadr */}
            <div className="text-center mt-2">
              <button className="btn shadow-sm" style={btnSubmitStyle}>
                AÑADIR HIJO
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// Estilos
const inputStyle = {
  borderRadius: "20px",
  border: "1px solid #ced4da",
  fontSize: "0.95rem",
  padding: "10px",
  backgroundColor: "#f9f9f9"
};

const photoContainerStyle = {
  width: "85px", 
  height: "85px", 
  borderRadius: "50%", 
  backgroundColor: "#e4e4e4", 
  flexDirection: "column", 
  display: "flex",
  cursor: "pointer",
  border: "2px dashed #ccc"
};

const btnSubmitStyle = {
  backgroundColor: "var(--color-descanso)",
  color: "white",
  borderRadius: "12px",
  fontWeight: "bold",
  padding: "12px 30px",
  border: "none",
  fontSize: "0.9rem"
};