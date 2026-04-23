import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoApp from "../assets/Logo Baby Zzync 1 - vers blanca.png";
import { InfoNiño } from "../components/InfoNiño.jsx";

export const AsignarRutina = () => {
    const navigate = useNavigate();

    const [niñoData, setNiñoData] = useState({
        nombre: "Mateo",
        apellidos: "García López",
        edad: "2 años",
        fotoUrl: null
    });

    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="bg-registro">
            <div className="mobile-container d-flex flex-column">
                <div className="d-flex align-items-center justify-content-between p-3" style={{ backgroundColor: "var(--color-primario)", minHeight: "80px" }}>
                    <div 
                        style={{ width: "24px", cursor: "pointer" }} 
                        onClick={() => navigate("/Menupadre")}
                    >
                        <i className="fas fa-arrow-left fa-lg text-white"></i>
                    </div>
                    <img src={logoApp} alt="Logo Baby Zzzync" style={{ width: "150px", height: "auto" }} />
                    <i className="fas fa-bars fa-lg text-white"></i>
                </div>

                <div className="p-4 flex-grow-1 d-flex flex-column">
                    <form className="d-flex flex-column h-100" onSubmit={(e) => e.preventDefault()}>
                        
                        <InfoNiño {...niñoData} />

                        <div className="mt-auto mb-2 position-relative">
                            {showMenu && (
                                <div className="position-absolute w-100 mb-2" 
                                     style={{ 
                                        bottom: "100%", 
                                        left: 0, 
                                        backgroundColor: "white", 
                                        borderRadius: "20px", 
                                        boxShadow: "0 -4px 12px rgba(0,0,0,0.1)",
                                        zIndex: 10,
                                        overflow: "hidden"
                                     }}>
                                    <button 
                                        className="btn w-100 py-3 border-bottom text-uppercase fw-bold" 
                                        style={{ color: "var(--color-primario)", fontSize: "0.9rem" }}
                                        onClick={() => { navigate("/rutinas"); setShowMenu(false); }}
                                    >
                                        ASIGNAR RUTINA
                                    </button>
                                    <button 
                                        className="btn w-100 py-3 text-uppercase fw-bold" 
                                        style={{ color: "var(--color-primario)", fontSize: "0.9rem" }}
                                        onClick={() => { navigate("/Crear-rutina"); setShowMenu(false); }}
                                    >
                                        CREAR NUEVA RUTINA
                                    </button>
                                </div>
                            )}
                            <button
                                type="button"
                                className="btn w-100 py-3 d-flex justify-content-between align-items-center px-4"
                                onClick={() => setShowMenu(!showMenu)}
                                style={{
                                    backgroundColor: "var(--color-primario)",
                                    color: "white",
                                    borderRadius: "50px",
                                    border: "none",
                                    fontWeight: "bold",
                                    fontSize: "1.1rem",
                                    boxShadow: "0 4px 12px rgba(72, 12, 168, 0.3)"
                                }} 
                            >
                                <span className="flex-grow-1 text-center">OPCIONES DE RUTINA</span>
                                <i className={`fas fa-chevron-${showMenu ? 'down' : 'up'}`}></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};