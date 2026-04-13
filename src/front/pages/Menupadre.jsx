import React from "react";
import logoApp from "../assets/Logo Baby Zzync 1 - vers blanca.png";
import { Carduser } from "../components/Carduser.jsx";
import { Link } from "react-router-dom";

export const Menupadre = () => {
  return (
    <div className="bg-registro">
      <div className="container d-flex justify-content-center align-items-center min-vh-100">

        {/* Card principal */}
        <div className="card shadow-sm border-0" style={{ maxWidth: "450px", width: "100%", borderRadius: "20px", overflow: "hidden" }}>
          
          {/* Header */}
          <div className="d-flex align-items-center justify-content-center p-3 position-relative"
            style={{ backgroundColor: "var(--color-primario)", minHeight: "80px" }}>
            <img src={logoApp} alt="Logo Baby Zzzync" style={{ width: "150px", height: "auto" }} />
            <i className="fas fa-bars fa-lg text-white position-absolute" style={{ right: "20px", cursor: "pointer" }}></i>
          </div>

          {/* Card Body */}
          <div className="card-body p-4 d-flex flex-column justify-content-between" 
               style={{ minHeight: "450px" }}> 
            
            <div>
              <Carduser />
              
              <div className="text-center text-muted mt-5">
                <p>No hay hijos registrados todavía.</p>
              </div>
            </div>

   <div className="text-center mt-auto"> 
  <Link to="/addhijo" style={{ textDecoration: "none" }}>
    <button 
      className="btn shadow-sm" 
      style={{ 
        backgroundColor: "var(--color-descanso)", 
        color: "white", 
        borderRadius: "12px", 
        fontWeight: "600",
        border: "none",
        padding: "8px 25px",
        fontSize: "0.9rem"
      }}
    >
      Añadir hijo
    </button>
  </Link>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};