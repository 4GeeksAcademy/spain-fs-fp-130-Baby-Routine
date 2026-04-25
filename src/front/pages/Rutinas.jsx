import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { HeaderApp4 } from "../components/HeaderApp4";

export const Rutinas = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [rutinas, setRutinas] = useState([]);
    const [activeRutinaId, setActiveRutinaId] = useState(null);
    
    const apiUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

    const handleBack = () => {
        if (location.state && location.state.from) {
            navigate(location.state.from);
        } else {
            navigate("/Asignar-Rutina");
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            return;
        }

        fetch(`${apiUrl}/api/rutinas`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(res => {
            if (res.status === 401) {
                localStorage.removeItem("token");
                navigate("/");
                return;
            }
            return res.json();
        })
        .then(data => { if (data) setRutinas(data); })
        .catch(err => console.error(err));
    }, [navigate, apiUrl]);

    const toggleMenu = (id) => {
        setActiveRutinaId(activeRutinaId === id ? null : id);
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
            customClass: {
                popup: 'my-custom-popup'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem("token");
                fetch(`${apiUrl}/api/rutinas/${id}`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${token}` }
                })
                .then(res => {
                    if(res.ok) {
                        setRutinas(rutinas.filter(rutina => rutina.id !== id));
                        Swal.fire({ title: "¡Eliminado!", icon: "success", timer: 1500, showConfirmButton: false });
                    }
                })
                .catch(err => console.error("Error borrando:", err));
            }
        });
    };

    return (
        <div className="w-100 h-100 d-flex flex-column bg-white">
            <HeaderApp4 
                showBackButton={true} 
                onBackClick={handleBack} 
            />

            <div className="p-4 flex-grow-1 d-flex flex-column overflow-hidden">
                <div className="mb-4 text-center w-100">
                    <h1 className="fw-bold m-0" style={{ color: "var(--color-primario)", fontSize: "1.5rem" }}>RUTINAS</h1>
                </div>

                <div className="flex-grow-1 mb-3 overflow-auto" style={{ paddingRight: "5px" }}>
                    {rutinas.length === 0 ? (
                        <p className="text-center text-muted mt-4">No tienes rutinas creadas.</p>
                    ) : (
                        rutinas.map((rutina) => (
                            <div key={rutina.id} className="mb-3">
                                <div 
                                    className="card shadow-sm border-0" 
                                    style={{ borderRadius: "20px", cursor: "pointer", backgroundColor: "#f8f9fa" }}
                                    onClick={() => toggleMenu(rutina.id)}
                                >
                                    <div className="card-body text-center p-3">
                                        <h6 className="fw-bold mb-1" style={{ color: "var(--color-primario)" }}>{rutina.nombre}</h6>
                                        <p className="mb-0 text-muted small">{rutina.detalles}</p>
                                    </div>
                                </div>

                                {activeRutinaId === rutina.id && (
                                    <div className="mt-2 d-flex gap-2 justify-content-center animate__animated animate__fadeIn">
                                        <button className="btn btn-sm py-2 fw-bold" style={{ backgroundColor: "#e9ecef", color: "var(--color-primario)", borderRadius: "12px", flex: 1, fontSize: "0.75rem" }}>ASIGNAR</button>
                                        <button className="btn btn-sm py-2 fw-bold text-white" style={{ backgroundColor: "var(--color-primario)", borderRadius: "12px", flex: 1, fontSize: "0.75rem" }} onClick={() => navigate(`/familia-rutina/${rutina.id}`)}>EDITAR</button>
                                        <button className="btn btn-sm py-2 fw-bold text-white" style={{ backgroundColor: "#dc3545", borderRadius: "12px", flex: 1, fontSize: "0.75rem" }} onClick={() => handleDelete(rutina.id)}>BORRAR</button>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-auto">
                    <button
                        type="button"
                        onClick={() => navigate("/Crear-rutina", { state: location.state })}
                        className="btn w-100 py-3"
                        style={{
                            backgroundColor: "var(--color-primario)",
                            color: "white",
                            borderRadius: "50px",
                            fontWeight: "bold",
                            fontSize: "1rem",
                            boxShadow: "0 4px 12px rgba(72, 12, 168, 0.3)"
                        }}
                    >
                        CREAR NUEVA RUTINA
                    </button>
                </div>
            </div>
        </div>
    );
};