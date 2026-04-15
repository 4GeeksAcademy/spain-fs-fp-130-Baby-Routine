import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer"; 

export const Cardhijo = ({ hijo }) => {
  const { dispatch } = useGlobalReducer();

  const handleDelete = (e) => {    
    e.stopPropagation();

    // Confirmación para eliminar 
    if (window.confirm(`¿Seguro que quieres eliminar el perfil de ${hijo.nombre}?`)) {
      dispatch({
        type: "delete_hijo",
        payload: hijo.id 
      });
    }
  };

  return (
    <div className="col-6">
      <div 
        className="card h-100 text-center border-0 shadow-sm position-relative" 
        style={{ borderRadius: "20px", backgroundColor: "#fcfcfc" }}
      >
        {/* BOTÓN INFO */}
        <button 
          className="btn btn-sm position-absolute" 
          data-bs-toggle="modal" 
          data-bs-target={`#modalInfo-${hijo.id}`}
          style={{ 
            top: "5px", 
            left: "5px", 
            color: "#4CC9F0", 
            background: "white",
            borderRadius: "50%",
            width: "28px",
            height: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            border: "none",
            zIndex: 10
          }}
        >
          <i className="fas fa-info-circle" style={{ fontSize: "0.9rem" }}></i>
        </button>

        {/* BOTÓN ELIMINAR */}
        <button 
          onClick={handleDelete}
          className="btn btn-sm position-absolute" 
          style={{ 
            top: "5px", 
            right: "5px", 
            color: "#c2c2c2", 
            background: "white",
            borderRadius: "50%",
            width: "28px",
            height: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            border: "none",
            zIndex: 10
          }}
        >
          <i className="fas fa-times" style={{ fontSize: "0.8rem" }}></i>
        </button>

        <div className="card-body p-3 d-flex flex-column align-items-center">
          <img 
            src={hijo.fotoUrl} 
            alt={hijo.nombre} 
            className="shadow-sm"
            style={{ 
              width: "75px", 
              height: "75px", 
              borderRadius: "50%", 
              objectFit: "cover", 
              border: "3px solid white" 
            }}
          />
          <p 
            className="fw-bold mt-2 mb-0" 
            style={{ 
              fontSize: "0.85rem", 
              color: "#555", 
              textTransform: "capitalize" 
            }}
          >
            {hijo.nombre}
          </p>
        </div>

        {/* MODAL DE INFORMACIÓN */}
        <div className="modal fade" id={`modalInfo-${hijo.id}`} tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ borderRadius: "25px", border: "none" }}>
              
                           
              <div className="modal-body text-center pt-5">
                <img 
                  src={hijo.fotoUrl} 
                  alt={hijo.nombre} 
                  className="shadow-sm mb-3"
                  style={{ width: "110px", height: "110px", borderRadius: "50%", objectFit: "cover", border: "4px solid #f8f9fa" }}
                />
                <h3 className="fw-bold mb-1" style={{ color: "#333" }}>{hijo.nombre}</h3>
                <p className="text-muted mb-3" style={{ fontSize: "1.1rem" }}>{hijo.apellidos}</p>
                
                <div className="d-flex justify-content-center mb-3">
                    <span className="badge rounded-pill px-3 py-2" style={{ backgroundColor: "#e9ecef", color: "#495057" }}>
                        {hijo.edad} años
                    </span>
                </div>

                <div className="px-4 py-3 bg-light mx-3" style={{ borderRadius: "15px" }}>
                  <p className="small text-uppercase fw-bold text-muted mb-2">Notas adicionales</p>
                  <p className="mb-0" style={{ color: "#555" }}>
                    {hijo.info || "Sin información adicional."}
                  </p>
                </div>
              </div>

              <div className="modal-footer border-0 justify-content-center pb-4">
                <button 
                    type="button" 
                    className="btn px-5 py-2 text-white shadow-sm" 
                    data-bs-dismiss="modal" 
                    style={{ backgroundColor: "var(--color-primario)", borderRadius: "12px", border: "none" }}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* hasta aqui el MODAL*/}

      </div>
    </div>
  );
};