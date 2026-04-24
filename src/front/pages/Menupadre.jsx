import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Cardhijo } from "../components/Cardhijo.jsx";
import { Carduser } from "../components/Carduser.jsx";
import { Cardautorizado } from "../components/Cardautorizado.jsx";
import logoApp from "../assets/Logo Baby Zzync 1 - vers blanca.png";

export const Menupadre = () => {
  const { store, actions } = useGlobalReducer();
  const [activeTab, setActiveTab] = useState("hijos");

  // EFECTO DE CARGA ROBUSTO
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (user && user.id) {
      // Si el store está vacío (típico tras un refresh), pedimos datos.
      // Comprobamos ambas listas para asegurar persistencia total.
      if (store.hijos.length === 0 && store.autorizados.length === 0) {
        actions.loadParentData(user.id);
      }
    }
  }, [store.hijos.length, store.autorizados.length]); // Escuchamos cambios en las longitudes

  return (
    <div className="bg-registro min-vh-100 d-flex align-items-center justify-content-center p-2">
      <div className="card shadow-sm border-0" style={{ maxWidth: "450px", width: "100%", borderRadius: "20px", minHeight: "600px" }}>
        
        {/* Header */}
        <div className="d-flex align-items-center justify-content-center p-3 position-relative" style={{ backgroundColor: "var(--color-primario)", borderRadius: "20px 20px 0 0" }}>
          <img src={logoApp} alt="Logo" style={{ width: "120px" }} />
          <i className="fas fa-bars fa-lg text-white position-absolute" style={{ right: "20px", cursor: "pointer" }}></i>
        </div>

        <div className="card-body p-3 d-flex flex-column">
          {/* Información del perfil */}
          <Carduser />
          
          {/* Navegación por Tabs */}
          <ul className="nav nav-pills nav-fill gap-2 p-1 bg-light rounded-pill my-3 shadow-sm" style={{ border: "1px solid #eee" }}>
            <li className="nav-item">
              <button 
                className={`nav-link rounded-pill fw-bold ${activeTab === "hijos" ? "active text-white" : "text-muted"}`}
                onClick={() => setActiveTab("hijos")}
                style={{ 
                    fontSize: "0.85rem", 
                    backgroundColor: activeTab === "hijos" ? "var(--color-primario)" : "transparent",
                    transition: "0.3s"
                }}
              >
                <i className="fas fa-baby me-2"></i>Mis Hijos
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link rounded-pill fw-bold ${activeTab === "autorizados" ? "active text-white" : "text-muted"}`}
                onClick={() => setActiveTab("autorizados")}
                style={{ 
                    fontSize: "0.85rem", 
                    backgroundColor: activeTab === "autorizados" ? "var(--color-primario)" : "transparent",
                    transition: "0.3s"
                }}
              >
                <i className="fas fa-user-shield me-2"></i>Autorizados
              </button>
            </li>
          </ul>

          {/* Contenido Dinámico */}
          <div className="flex-grow-1 overflow-auto px-1" style={{ maxHeight: "350px" }}>
            
            {/* VISTA: HIJOS */}
            {activeTab === "hijos" && (
              <div className="row g-3">
                {store.hijos && store.hijos.length > 0 ? (
                  store.hijos.map(hijo => (
                    <Cardhijo key={hijo.id} hijo={hijo} />
                  ))
                ) : (
                  <div className="text-center mt-5 text-muted">
                    <i className="fas fa-child fa-3x opacity-25 mb-3"></i>
                    <p className="small">No hay hijos registrados.</p>
                  </div>
                )}
              </div>
            )}

            {/* VISTA: AUTORIZADOS */}
            {activeTab === "autorizados" && (
              <div className="row g-3">
                {store.autorizados && store.autorizados.length > 0 ? (
                  store.autorizados.map(auth => (
                    <Cardautorizado key={auth.id} autorizado={auth} />
                  ))
                ) : (
                  <div className="text-center mt-5 text-muted">
                    <i className="fas fa-user-lock fa-3x opacity-25 mb-3"></i>
                    <p className="small">No hay personas autorizadas.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Botón de Acción Principal */}
          <div className="text-center mt-auto pt-3">
            {activeTab === "hijos" ? (
                <Link to="/addhijo">
                    <button className="btn px-5 text-white fw-bold shadow-sm w-100" style={{ backgroundColor: "var(--color-descanso)", borderRadius: "12px", padding: "12px" }}>
                        <i className="fas fa-plus me-2"></i>Añadir Hijo
                    </button>
                </Link>
            ) : (
                <Link to="/add-autorizado">
                    <button className="btn px-5 text-white fw-bold shadow-sm w-100" style={{ backgroundColor: "var(--color-descanso)", borderRadius: "12px", padding: "12px" }}>
                        <i className="fas fa-user-plus me-2"></i>Añadir Autorizado
                    </button>
                </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};