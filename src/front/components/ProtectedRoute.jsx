import React from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const user = localStorage.getItem("user");

    if (!user) {
        return (
            <>
                <div style={{ filter: "blur(5px)", pointerEvents: "none" }}>
                    {children}
                </div>

                <div style={{
                    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
                    backgroundColor: "rgba(0,0,0,0.7)", display: "flex", justifyContent: "center",
                    alignItems: "center", zIndex: 9999, padding: "20px"
                }}>
                    <div style={{
                        backgroundColor: "white", padding: "40px", borderRadius: "25px",
                        textAlign: "center", maxWidth: "400px", width: "100%", boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
                    }}>
                        <i className="fas fa-exclamation-circle mb-3" style={{ fontSize: "60px", color: "var(--color-primario)" }}></i>
                        <h3 className="fw-bold mb-4">Debes iniciar sesión</h3>
                        
                        <button 
                            onClick={() => navigate("/")}
                            className="btn w-100 py-3 fw-bold" 
                            style={{ backgroundColor: "#007bff", color: "white", borderRadius: "50px", border: "none", fontSize: "1.1rem" }}
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return children;
};

export default ProtectedRoute;