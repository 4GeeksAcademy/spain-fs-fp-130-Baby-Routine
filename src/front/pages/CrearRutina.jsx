import React, { useState } from "react";
import logoApp from "../assets/Logo Baby Zzync 1 - vers blanca.png";

export const CrearRutina = () => {
    return (
        <div className="bg-registro">
            <div className="mobile-container d-flex flex-column" style={{ height: "85vh" }}>
                <div className="d-flex align-items-center justify-content-between p-3" style={{ backgroundColor: "var(--color-primario)", minHeight: "80px" }}>
                    <div style={{ width: "24px" }}></div>
                    <img src={logoApp} alt="Logo Baby Zzzync" style={{ width: "150px", height: "auto" }} />
                    <i className="fas fa-bars fa-lg text-white" style={{ cursor: "pointer" }}></i>
                </div>

                <div className="p-4 flex-grow-1 d-flex flex-column">
                    <form className="d-flex flex-column h-100">

                        <div className="d-flex align-items-center gap-3 mb-4">
                            <div className="flex-grow-1">
                                <div className="mb-3 d-flex align-items-end pb-1">
                                    <h4 className="fw-bold m-0" style={{ color: "var(--color-primario)", fontSize: "0.9rem" }}>NOMBRE: </h4>
                                    <h4 className="m-0 ms-2 fw-normal" style={{ fontSize: "1.1rem", color: "#000000" }}> NOMBRE_BACKEND</h4>
                                </div>

                                <div className="mb-3 d-flex align-items-end pb-1">
                                    <h4 className="fw-bold m-0" style={{ color: "var(--color-primario)", fontSize: "0.9rem" }}>APELLIDOS: </h4>
                                    <h4 className="m-0 ms-2 fw-normal" style={{ fontSize: "1.1rem", color: "#000000" }}> APELLIDOS_BACKEND</h4>
                                </div>

                                <div className="d-flex align-items-end pb-1">
                                    <h4 className="fw-bold m-0" style={{ color: "var(--color-primario)", fontSize: "0.9rem" }}>EDAD: </h4>
                                    <h4 className="m-0 ms-2 fw-normal" style={{ fontSize: "1.1rem", color: "#000000" }}> EDAD_BACKEND</h4>
                                </div>
                            </div>

                            <div className="text-center">
                                <div className="profile-circle" style={{ width: "95px", height: "95px", borderStyle: "dashed" }}>
                                    <span style={{ fontSize: "11px", fontWeight: "bold", textAlign: "center", lineHeight: "1" }}>
                                        FOTO <br /> NIÑO
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto mb-2">
                            <button
                                type="submit"
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
                    </form>
                </div>
            </div>
        </div>
    );
};