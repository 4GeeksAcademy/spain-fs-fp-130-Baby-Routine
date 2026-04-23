import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoApp from "../assets/Logo Baby Zzync 1 - vers blanca.png";

export const CrearRutina = () => {
    const navigate = useNavigate();
    
    const [nombre, setNombre] = useState("");
    const [detalles, setDetalles] = useState("");
    const [errores, setErrores] = useState({ nombre: false, detalles: false });

    const handleCrearRutina = () => {
        const currentUser = JSON.parse(localStorage.getItem("user"));
        
        if (!currentUser || !currentUser.id) {
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
            const storageKey = `rutinas_user_${currentUser.id}`;
            const rutinasGuardadas = JSON.parse(localStorage.getItem(storageKey)) || [];
            
            const nuevaRutina = {
                id: Date.now(),
                userId: currentUser.id,
                nombre: nombre,
                detalles: detalles
            };

            localStorage.setItem(storageKey, JSON.stringify([...rutinasGuardadas, nuevaRutina]));
            
            navigate("/rutinas", { replace: true }); 
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