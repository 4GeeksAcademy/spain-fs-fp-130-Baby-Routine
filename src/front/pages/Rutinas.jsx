import React from "react";
import { useNavigate } from "react-router-dom";
import logoApp from "../assets/Logo Baby Zzync 1 - vers blanca.png";

export const Rutinas = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-registro">
            <div className="mobile-container d-flex flex-column" style={{ height: "85vh" }}>
                <div className="d-flex align-items-center justify-content-between p-3" style={{ backgroundColor: "var(--color-primario)", minHeight: "80px" }}>
                    <div
                        style={{ width: "24px", cursor: "pointer" }}
                        onClick={() => navigate(-1)}
                    >
                        <i className="fas fa-arrow-left fa-lg text-white"></i>
                    </div>

                    <img src={logoApp} alt="Logo Baby Zzzync" style={{ width: "150px", height: "auto" }} />
                    <i className="fas fa-bars fa-lg text-white"></i>
                </div>
                <div className="p-4 flex-grow-1 d-flex flex-column">
                    <div className="d-flex flex-column h-100">
                        <div className="mb-4 text-center w-100">
                            <h1 className="fw-bold m-0" style={{ color: "var(--color-primario)", fontSize: "1.7rem" }}>RUTINAS</h1>
                        </div>

                        <div className="flex-grow-1">
                        </div>

                        <div className="mt-auto mb-2">
                            <button
                                type="button"
                                onClick={() => navigate("/Crear-rutina")}
                                className="btn w-100 py-3"
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
                                CREAR RUTINA
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};