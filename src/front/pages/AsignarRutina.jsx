import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InfoNiño } from "../components/InfoNiño.jsx";
import { HeaderApp3 } from "../components/HeaderApp3";

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
        <div className="w-100 h-100 d-flex flex-column bg-white">
            <HeaderApp3 showBackButton={false} />

            <div className="p-4 flex-grow-1 d-flex flex-column" style={{ position: "relative" }}>
                <form className="d-flex flex-column h-100" onSubmit={(e) => e.preventDefault()}>
                    
                    <InfoNiño {...niñoData} />

                    <div className="mt-auto mb-2 position-relative">
                        {showMenu && (
                            <div className="position-absolute w-100 mb-2 shadow-lg" 
                                 style={{ 
                                    bottom: "105%", 
                                    left: 0, 
                                    backgroundColor: "white", 
                                    borderRadius: "20px", 
                                    zIndex: 10,
                                    overflow: "hidden",
                                    border: "1px solid #eee"
                                 }}>
                                <button 
                                    className="btn w-100 py-3 border-bottom text-uppercase fw-bold" 
                                    style={{ color: "var(--color-primario)", fontSize: "0.85rem", borderRadius: "0" }}
                                    onClick={() => { navigate("/rutinas"); setShowMenu(false); }}
                                >
                                    ASIGNAR RUTINA
                                </button>
                                <button 
                                    className="btn w-100 py-3 text-uppercase fw-bold" 
                                    style={{ color: "var(--color-primario)", fontSize: "0.85rem", borderRadius: "0" }}
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
                                fontSize: "1rem",
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
    );
};