import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logoApp from "../assets/Logo Baby Zzync 1 - vers blanca.png";

export const Rutinas = () => {
    const navigate = useNavigate();
    const [rutinas, setRutinas] = useState([]);
    const [activeRutinaId, setActiveRutinaId] = useState(null);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("user"));
        
        if (currentUser && currentUser.id) {
            const storageKey = `rutinas_user_${currentUser.id}`;
            const rutinasGuardadas = JSON.parse(localStorage.getItem(storageKey)) || [];
            setRutinas(rutinasGuardadas);
        } else {
            navigate("/");
        }
    }, [navigate]);

    const toggleMenu = (id) => {
        if (activeRutinaId === id) {
            setActiveRutinaId(null);
        } else {
            setActiveRutinaId(id);
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "¿DESEAS ELIMINAR ESTA CARD?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "SÍ",
            cancelButtonText: "NO",
            borderRadius: "20px"
        }).then((result) => {
            if (result.isConfirmed) {
                const currentUser = JSON.parse(localStorage.getItem("user"));
                const storageKey = `rutinas_user_${currentUser.id}`;
                
                const nuevasRutinas = rutinas.filter(rutina => rutina.id !== id);
                
                setRutinas(nuevasRutinas);
                localStorage.setItem(storageKey, JSON.stringify(nuevasRutinas));

                Swal.fire({
                    title: "¡Eliminado!",
                    text: "La rutina ha sido borrada correctamente.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    };

    return (
        <div className="bg-registro">
            <div className="mobile-container d-flex flex-column" style={{ height: "85vh" }}>
                <div className="d-flex align-items-center justify-content-between p-3" style={{ backgroundColor: "var(--color-primario)", minHeight: "80px" }}>
                    <div
                        style={{ width: "24px", cursor: "pointer" }}
                        onClick={() => navigate("/Asignar-Rutina")}
                    >
                        <i className="fas fa-arrow-left fa-lg text-white"></i>
                    </div>

                    <img src={logoApp} alt="Logo Baby Zzzync" style={{ width: "150px", height: "auto" }} />
                    <i className="fas fa-bars fa-lg text-white"></i>
                </div>

                <div className="p-4 flex-grow-1 d-flex flex-column" style={{ overflow: "hidden" }}>
                    <div className="d-flex flex-column h-100">
                        <div className="mb-4 text-center w-100">
                            <h1 className="fw-bold m-0" style={{ color: "var(--color-primario)", fontSize: "1.7rem" }}>RUTINAS</h1>
                        </div>

                        <div className="flex-grow-1 mb-3" style={{ overflowY: "auto", paddingRight: "5px" }}>
                            {rutinas.length === 0 ? (
                                <p className="text-center text-muted mt-4">No tienes rutinas creadas.</p>
                            ) : (
                                rutinas.map((rutina) => (
                                    <div key={rutina.id} className="mb-3">
                                        <div 
                                            className="card shadow-sm border-0" 
                                            style={{ borderRadius: "20px", cursor: "pointer", backgroundColor: "white" }}
                                            onClick={() => toggleMenu(rutina.id)}
                                        >
                                            <div className="card-body text-center">
                                                <h5 className="card-title fw-bold mb-1" style={{ color: "var(--color-primario)" }}>
                                                    {rutina.nombre}
                                                </h5>
                                                <p className="card-text text-muted mb-0 small">
                                                    {rutina.detalles}
                                                </p>
                                            </div>
                                        </div>

                                        {activeRutinaId === rutina.id && (
                                            <div className="mt-2 d-flex flex-wrap gap-2 animate__animated animate__fadeIn">
                                                <button 
                                                    className="btn flex-grow-1 py-2 fw-bold small"
                                                    style={{ backgroundColor: "#e9ecef", color: "var(--color-primario)", borderRadius: "15px", fontSize: "0.8rem" }}
                                                    onClick={() => console.log("Asignar:", rutina.id)}
                                                >
                                                    ASIGNAR
                                                </button>
                                                <button 
                                                    className="btn flex-grow-1 py-2 fw-bold text-white small"
                                                    style={{ backgroundColor: "var(--color-primario)", borderRadius: "15px", fontSize: "0.8rem" }}
                                                    onClick={() => navigate("/Familia-Rutina")}
                                                >
                                                    EDITAR
                                                </button>
                                                <button 
                                                    className="btn flex-grow-1 py-2 fw-bold text-white small"
                                                    style={{ backgroundColor: "#dc3545", borderRadius: "15px", fontSize: "0.8rem" }}
                                                    onClick={() => handleDelete(rutina.id)}
                                                >
                                                    ELIMINAR
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
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