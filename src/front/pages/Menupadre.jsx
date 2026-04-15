import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Cardhijo } from "../components/Cardhijo.jsx";
import { Carduser } from "../components/Carduser.jsx";
import { Cardautorizado } from "../components/Cardautorizado.jsx";
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
          {/* Información general del perfil */}
          <Carduser />
          
          {/* Seccion de autorizados */}
          <div className="d-flex justify-content-between align-items-center mt-2">
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
          </div>

          {/* Listado de Autorizados */}
          <div className="mt-2 overflow-auto" style={{ maxHeight: "150px" }}>
            {store.autorizados && store.autorizados.length > 0 ? (
              store.autorizados.map(autorizado => (
                <Cardautorizado key={autorizado.id} autorizado={autorizado} />
              ))
            ) : (
              <p className="text-muted small ps-2 mt-1" style={{ fontSize: "0.75rem" }}>No hay autorizados registrados.</p>
            )}
          </div>

          <hr className="my-3 opacity-25" />

          {/* Sección de los Hijos */}
          <div className="row g-3 overflow-auto" style={{ maxHeight: "250px" }}>
            {store.hijos && store.hijos.length > 0 ? (
              store.hijos.map(hijo => (
                <Cardhijo key={hijo.id} hijo={hijo} />
              ))
            ) : (
              <div className="text-center mt-4 text-muted">
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