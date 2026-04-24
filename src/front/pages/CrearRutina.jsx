import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoApp from "../assets/Logo Baby Zzync 1 - vers blanca.png";

export const CrearRutina = () => {
    const navigate = useNavigate();
    
    const [nombre, setNombre] = useState("");
    const [detalles, setDetalles] = useState("");
    const [errores, setErrores] = useState({ nombre: false, detalles: false });

    const apiUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

    const handleCrearRutina = async () => {
        const token = localStorage.getItem("token");
        
        if (!token) {
            alert("Sesión no válida. Por favor, inicia sesión de nuevo.");
            navigate("/");
            return;
        }

        const nuevosErrores = {
            nombre: nombre.trim() === "",
            detalles: detalles.trim() === ""
        };
        setErrores(nuevosErrores);

        if (!nuevosErrores.nombre && !nuevosErrores.detalles) {
            try {
                const response = await fetch(`${apiUrl}/api/rutinas`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        nombre: nombre,
                        detalles: detalles
                    })
                });

                if (response.ok) {
                    navigate("/rutinas", { replace: true }); 
                } else {
                    const errorData = await response.json();
                    alert("Error al guardar: " + (errorData.msg || "Error del servidor"));
                }
            } catch (error) {
                console.error("Error en la petición:", error);
                alert("No se pudo conectar con el servidor.");
            }
        }
    };

    return (
        <div className="bg-registro">
            <div className="mobile-container">
                <div className="d-flex align-items-center justify-content-between p-3" style={{ backgroundColor: "var(--color-primario)", minHeight: "80px" }}>
                    <div 
                        style={{ width: "24px", cursor: "pointer" }}
                        onClick={() => navigate("/rutinas")}
                    >
                        <i className="fas fa-arrow-left fa-lg text-white"></i>
                    </div>
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
                                value={nombre}
                                onChange={(e) => {
                                    setNombre(e.target.value);
                                    setErrores({ ...errores, nombre: false });
                                }}
                                style={{
                                    borderRadius: "20px",
                                    border: errores.nombre ? "2px solid red" : "none",
                                    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                                    fontSize: "0.9rem",
                                    fontWeight: "bold"
                                }}
                            />
                            {errores.nombre && (
                                <span className="text-danger small mt-2 d-block text-center fw-bold">CAMPO OBLIGATORIO</span>
                            )}
                        </div>

                        <div className="mb-4">
                            <textarea
                                className="form-control py-3 px-4 text-center"
                                placeholder="DETALLES DE LA RUTINA"
                                rows="5"
                                value={detalles}
                                onChange={(e) => {
                                    setDetalles(e.target.value);
                                    setErrores({ ...errores, detalles: false });
                                }}
                                style={{
                                    borderRadius: "20px",
                                    border: errores.detalles ? "2px solid red" : "none",
                                    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                                    fontSize: "0.9rem",
                                    fontWeight: "bold",
                                    resize: "none"
                                }}
                            ></textarea>
                            {errores.detalles && (
                                <span className="text-danger small mt-2 d-block text-center fw-bold">CAMPO OBLIGATORIO</span>
                            )}
                        </div>

                        <div className="mt-auto">
                            <button
                                type="button"
                                onClick={handleCrearRutina}
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
                                onClick={() => navigate("/rutinas")}
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