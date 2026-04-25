import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { HeaderApp4 } from "../components/HeaderApp4";

const getCategoryIcon = (category) => {
    switch (category) {
        case 'milk': return <i className="fas fa-tint"></i>;
        case 'sleep': return <i className="fas fa-moon"></i>;
        case 'diaper': return <i className="fas fa-baby"></i>;
        case 'medicine': return <i className="fas fa-capsules"></i>;
        case 'exercise': return <i className="fas fa-running"></i>;
        default: return <i className="fas fa-star"></i>;
    }
};

const getCategoryColor = (category) => {
    switch (category) {
        case 'milk': return '#4FC3F7';
        case 'sleep': return '#7986CB';
        case 'diaper': return '#FFB74D';
        case 'medicine': return '#E57373';
        case 'exercise': return '#81C784';
        default: return 'var(--color-primario)';
    }
};

export const DetalleRutinaHijo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [actividades, setActividades] = useState([]);
    const { rutina, hijo } = location.state || {};
    const apiUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch(`${apiUrl}/api/rutinas/${id}/actividades`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data)) {
                setActividades(data.sort((a, b) => a.time.localeCompare(b.time)));
            }
        });
    }, [id, apiUrl]);

    return (
        <div className="w-100 h-100 d-flex flex-column bg-white">
            <HeaderApp4 
                showBackButton={true} 
                onBackClick={() => navigate("/menupadre", { replace: true })} 
            />
            
            <div className="p-4 flex-grow-1 overflow-auto">
                <div className="text-center mb-4">
                    <h2 className="fw-bold" style={{ color: "var(--color-primario)" }}>{rutina?.nombre}</h2>
                    <span className="badge rounded-pill bg-light text-dark border p-2">
                        Seguimiento para: {hijo?.nombre}
                    </span>
                </div>

                <div className="d-flex flex-column gap-2">
                    {actividades.length === 0 ? (
                        <p className="text-center text-muted mt-4">No hay tareas en esta rutina.</p>
                    ) : (
                        actividades.map((item) => (
                            <div key={item.id} className="card border-0 shadow-sm rounded-4 overflow-hidden" style={{ borderLeft: `5px solid ${getCategoryColor(item.category)}`, backgroundColor: "#fdfdfd" }}>
                                <div className="d-flex align-items-center p-3">
                                    <div className="me-3 fs-4" style={{ color: getCategoryColor(item.category) }}>
                                        {getCategoryIcon(item.category)}
                                    </div>
                                    <div className="flex-grow-1">
                                        <h6 className="m-0 fw-bold">{item.text}</h6>
                                        <small className="text-muted">{item.time} hs - {item.category.toUpperCase()}</small>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};