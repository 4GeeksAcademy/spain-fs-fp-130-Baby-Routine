import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Cardhijo } from "../components/Cardhijo.jsx";
import { Carduser } from "../components/Carduser.jsx";
import logoApp from "../assets/Logo Baby Zzync 1 - vers blanca.png";

export const Menupadre = () => {
  const { store } = useGlobalReducer();

  return (
    <div className="bg-registro min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-sm border-0" style={{ maxWidth: "450px", width: "95%", borderRadius: "20px", minHeight: "550px" }}>
        
        {/* Header */}
        <div className="d-flex align-items-center justify-content-center p-3 position-relative" style={{ backgroundColor: "var(--color-primario)", borderRadius: "20px 20px 0 0" }}>
          <img src={logoApp} alt="Logo" style={{ width: "150px" }} />
          <i className="fas fa-bars fa-lg text-white position-absolute" style={{ right: "20px", cursor: "pointer" }}></i>
        </div>

        <div className="card-body p-4 d-flex flex-column">
          <Carduser />
          
          <Link to="/add-autorizado" style={{ textDecoration: 'none' }}>
  <button 
    className="btn text-white fw-bold shadow-sm" 
    style={{ 
      backgroundColor: "var(--color-fondoBotones)", 
      borderRadius: "20px", 
      padding: "5px 15px",  
      fontSize: "0.8rem",   
      border: "none"
    }}
  >
    Añadir Autorizado
  </button>
</Link>

          {/* Grilla de los Hijos */}
          <div className="row g-3 mt-2 overflow-auto" style={{ maxHeight: "300px" }}>
            {store.hijos && store.hijos.length > 0 ? (
              store.hijos.map(hijo => (
                <Cardhijo key={hijo.id} hijo={hijo} />
              ))
            ) : (
              <div className="text-center mt-5 text-muted">
                <p className="small italic">No hay hijos registrados. Pulsa el botón de abajo para empezar.</p>
              </div>
            )}
          </div>

          {/* Botón Inferior */}
          <div className="text-center mt-auto pt-3">
            <Link to="/addhijo">
              <button className="btn px-5 text-white fw-bold shadow-sm" style={{ backgroundColor: "var(--color-descanso)", borderRadius: "12px", padding: "10px" }}>
                Añadir hijo
              </button>
              
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};