import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoApp from "../assets/Logo Baby Zzync 1 - vers blanca.png";

export const CrearRutina = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-registro">
            <div className="mobile-container">
                <div className="d-flex align-items-center justify-content-between p-3" style={{ backgroundColor: "var(--color-primario)", minHeight: "80px" }}>
                    <div style={{ width: "24px" }}></div>
                    <img src={logoApp} alt="Logo Baby Zzzync" style={{ width: "150px", height: "auto" }} />
                    <i className="fas fa-bars fa-lg text-white" style={{ cursor: "pointer" }}></i>
                </div>
                <div className="p-4 flex-grow-1 d-flex flex-column">
                    <div className="mb-4 text-center">
                        <h1 className="fw-bold" style={{ color: "var(--color-primario)", fontSize: "1.7rem" }}>NUEVA RUTINA</h1>
                    </div>
                    <form className="d-flex flex-column h-100 flex-grow-1" onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control py-3 px-4 text-center"
                                placeholder="NOMBRE DE LA RUTINA"
                                style={{
                                    borderRadius: "20px",
                                    border: "none",
                                    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                                    fontSize: "0.9rem",
                                    fontWeight: "bold"
                                }}
                            />
                        </div>
                        <div className="mb-4">
                            <textarea
                                className="form-control py-3 px-4 text-center"
                                placeholder="DETALLES DE LA RUTINA"
                                rows="5"
                                style={{
                                    borderRadius: "20px",
                                    border: "none",
                                    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                                    fontSize: "0.9rem",
                                    fontWeight: "bold",
                                    resize: "none"
                                }}
                            ></textarea>
                        </div>
                        <div className="mt-auto">
                            <button
                                type="button"
                                className="btn w-100 py-3 mb-3"
                                style={{
                                    backgroundColor: "var(--color-primario)",
                                    color: "white",
                                    borderRadius: "50px",
                                    fontWeight: "bold",
                                    boxShadow: "0 4px 12px rgba(72, 12, 168, 0.3)"
                                }}
                            >
                                CREAR RUTINA
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="btn w-100 py-3"
                                style={{
                                    backgroundColor: "white",
                                    color: "var(--color-primario)",
                                    borderRadius: "50px",
                                    border: "2px solid var(--color-primario)",
                                    fontWeight: "bold"
                                }}
                            >
                                CANCELAR RUTINA
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};