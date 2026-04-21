import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer"; 
import Swal from 'sweetalert2';

export const Cardhijo = ({ hijo }) => {
  const { dispatch } = useGlobalReducer();

  const handleDelete = (e) => {
    e.stopPropagation(); 

    Swal.fire({
      title: '¿Eliminar a ' + hijo.nombre + '?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--color-descanso)', 
      cancelButtonColor: '#c2c2c2',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      width: '400px', 
      padding: '1.5rem',
      customClass: {
        popup: 'my-custom-popup', 
        confirmButton: 'rounded-pill px-3 shadow-sm',
        cancelButton: 'rounded-pill px-3'
      }
    }).then((result) => {
      if (result.isConfirmed) {      
        dispatch({
          type: "delete_hijo",
          payload: hijo.id
        });

        Swal.fire({
          title: '¡Eliminado!',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false,
          width: '400px',
          customClass: {
            popup: 'my-custom-popup'
          }
        });
      }
    });
  };

  // LOGICA DE ICONOS DINAMICOS EN CARD
  const tieneIntolerancia = hijo.datosMedicos?.intolerancia && hijo.datosMedicos.intolerancia !== "Ninguna";
  const tieneAlergia = hijo.datosMedicos?.alergia && hijo.datosMedicos.alergia !== "Ninguna";
  const tieneAsma = hijo.datosMedicos?.asma && hijo.datosMedicos.asma !== "No";

  return (
    <div className="col-6 mb-3">
      <div 
        className="card h-100 text-center border-0 shadow-sm position-relative" 
        style={{ borderRadius: "20px", backgroundColor: "#fcfcfc" }}
      >
        {/* BOTON INFO */}
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

        {/* BOTON DE ELIMINAR */}
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
            src={hijo.fotoUrl || "https://via.placeholder.com/150"} 
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
            className="fw-bold mt-2 mb-1" 
            style={{ 
              fontSize: "0.85rem", 
              color: "#555", 
              textTransform: "capitalize" 
            }}
          >
            {hijo.nombre}
          </p>

          {/*FILA DE ICONOS DE INFO MEDICA*/}
          <div className="d-flex gap-2 justify-content-center" style={{ minHeight: "18px" }}>
            {tieneIntolerancia && (
              <i className="fas fa-utensils text-warning" title="Intolerancia" style={{ fontSize: "0.75rem" }}></i>
            )}
            {tieneAlergia && (
              <i className="fas fa-pills text-danger" title="Alergia" style={{ fontSize: "0.75rem" }}></i>
            )}
            {tieneAsma && (
              <i className="fas fa-lungs text-info" title="Asma" style={{ fontSize: "0.75rem" }}></i>
            )}
          </div>
        </div>

        {/* MODAL DE INFORMACION */}
        <div className="modal fade" id={`modalInfo-${hijo.id}`} tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ borderRadius: "25px", border: "none" }}>
              
              <div className="modal-body text-center pt-5">
                <img 
                  src={hijo.fotoUrl || "https://via.placeholder.com/150"} 
                  alt={hijo.nombre} 
                  className="shadow-sm mb-3"
                  style={{ width: "110px", height: "110px", borderRadius: "50%", objectFit: "cover", border: "4px solid #f8f9fa" }}
                />
                <h3 className="fw-bold mb-1" style={{ color: "#333" }}>{hijo.nombre}</h3>
                <p className="text-muted mb-2">{hijo.apellido}</p>
                
                <div className="d-flex justify-content-center mb-3">
                  <span className="badge rounded-pill px-3 py-2" style={{ backgroundColor: "#e9ecef", color: "#495057" }}>
                    {hijo.edad} años
                  </span>
                </div>

                {/* DATOS DE DESARROLLO */}
                <div className="px-3 py-2 mb-2 mx-2 border" style={{ borderRadius: "15px", backgroundColor: "#fff" }}>
                  <p className="small text-uppercase fw-bold text-muted mb-2" style={{ fontSize: "0.7rem", letterSpacing: "0.5px" }}>Hitos de Desarrollo</p>
                  <div className="d-flex justify-content-around small">
                    <div><i className="fas fa-baby me-1 text-primary"></i> Gatea: <strong>{hijo.desarrollo?.gatea || "No"}</strong></div>
                    <div><i className="fas fa-toilet me-1 text-success"></i> Baño: <strong>{hijo.desarrollo?.autonomiaBano || "No"}</strong></div>
                  </div>
                </div>

                {/* DATOS MEDICOS */}
                <div className="px-3 py-3 bg-light mx-2 mb-2 text-start" style={{ borderRadius: "15px" }}>
                  <p className="small text-uppercase fw-bold text-muted mb-2 text-center" style={{ fontSize: "0.7rem" }}>Ficha Médica</p>
                  <div style={{ fontSize: "0.85rem", color: "#555" }}>
                    <p className="mb-1"><strong><i className="fas fa-utensils me-2"></i>Intolerancias:</strong> {hijo.datosMedicos?.intolerancia || "Ninguna"}</p>
                    <p className="mb-1"><strong><i className="fas fa-pills me-2"></i>Alergias:</strong> {hijo.datosMedicos?.alergia || "Ninguna"}</p>
                    <p className="mb-1"><strong><i className="fas fa-lungs me-2"></i>Asma:</strong> {hijo.datosMedicos?.asma || "No"}</p>
                    <p className="mb-0"><strong><i className="fas fa-tint me-2 text-danger"></i>Sangre:</strong> {hijo.datosMedicos?.tipoSangre || "No informado"}</p>
                  </div>
                </div>

                {/* NOTAS ADICIONALES */}
                <div className="px-4 py-3 mx-2" style={{ borderRadius: "15px", border: "1px dashed #ccc" }}>
                  <p className="small text-uppercase fw-bold text-muted mb-1" style={{ fontSize: "0.7rem" }}>Notas del padre/madre</p>
                  <p className="mb-0 italic" style={{ color: "#777", fontSize: "0.85rem", fontStyle: "italic" }}>
                    "{hijo.info || "Sin información adicional."}"
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
      </div>
    </div>
  );
};