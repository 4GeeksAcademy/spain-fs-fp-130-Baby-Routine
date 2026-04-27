import React from "react";
import { useNavigate } from "react-router-dom";
import { HeaderApp } from "../components/HeaderApp";

export const VistaCuidador = () => {
  const navigate = useNavigate();

  return (
    <div className="w-100 min-vh-100 d-flex flex-column bg-light">
      
      
      <HeaderApp 
        showBackButton={true} 
        onBackClick={() => navigate("/home")} 
      />

      <div className="flex-grow-1 p-4">
        <div className="text-center mt-5">
          <i className="fas fa-user-friends mb-3" style={{ fontSize: "3rem", color: "var(--color-primario)" }}></i>
          <h2 className="fw-bold">Área del Cuidador</h2>
          <p className="text-muted">Gestión de rutinas.</p>
        </div>
        
        {/* Aquí puedes empezar a construir la nueva interfaz del cuidador */}
      </div>

    </div>
  );
};