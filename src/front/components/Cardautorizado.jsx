import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Swal from 'sweetalert2';

export const Cardautorizado = ({ autorizado }) => {
  const { dispatch } = useGlobalReducer();

const handleDelete = (e) => {
  e.stopPropagation();

  // Alerta de confirmacion, con el estilo actualizado
  Swal.fire({
    title: '¿Eliminar?',
    text: `Se borrará la autorización de ${autorizado.nombre}.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: 'var(--color-descanso)', 
    cancelButtonColor: '#c2c2c2',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    width: '400px', 
    customClass: {
      popup: 'my-custom-popup', 
      confirmButton: 'rounded-pill px-3 shadow-sm',
      cancelButton: 'rounded-pill px-3'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch({
        type: "delete_autorizado",
        payload: autorizado.id
      });

      
      Swal.fire({
        title: 'Eliminado',
        icon: 'success',
        timer: 1000,
        showConfirmButton: false,
        width: '280px',
        customClass: {
          popup: 'my-custom-popup'
        }
      });
    }
  });
};

  return (
    <div className="col-12 mb-2">
      <div 
        className="card border-0 shadow-sm position-relative" 
        style={{ borderRadius: "15px", backgroundColor: "#fff", border: "1px solid #f0f0f0" }}
      >
        {/* BOTÓN ELIMINAR */}
        <button 
          onClick={handleDelete}
          className="btn btn-sm position-absolute" 
          style={{ top: "5px", right: "5px", color: "#c2c2c2", background: "transparent", border: "none", zIndex: 10 }}
        >
          <i className="fas fa-times" style={{ fontSize: "0.8rem" }}></i>
        </button>

        <div className="card-body d-flex align-items-center p-3">
          {/* Avatar */}
          <div className="me-3 shadow-sm" style={{ width: "50px", height: "50px", borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "2px solid white" }}>
            <img 
              src={autorizado.fotoUrl || "https://via.placeholder.com/150"} 
              alt={autorizado.nombre} 
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          
          {/* Info Principal */}
          <div className="flex-grow-1">
            <h6 className="mb-0 fw-bold" style={{ fontSize: "0.9rem", color: "#333" }}>
                {autorizado.nombre} {autorizado.apellidos}
            </h6>
            <p className="mb-1 text-muted" style={{ fontSize: "0.75rem" }}>
              {autorizado.parentesco || "Autorizado"}
            </p>
            
            {/* BOTÓN INFO */}
            <button 
              className="btn btn-sm p-0 d-flex align-items-center" 
              data-bs-toggle="modal" 
              data-bs-target={`#modalAuth-${autorizado.id}`}
              style={{ color: "var(--color-primario)", fontSize: "0.7rem", fontWeight: "600", border: "none", background: "transparent" }}
            >
              <i className="fas fa-info-circle me-1"></i> Ver detalles
            </button>
          </div>
        </div>

        {/* MODAL DE INFORMACIÓN */}
        <div className="modal fade" id={`modalAuth-${autorizado.id}`} tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content" style={{ borderRadius: "20px", border: "none" }}>
              <div className="modal-body text-center pt-4 pb-4 px-4">
                
                {/* Foto en el Modal */}
                <img 
                  src={autorizado.fotoUrl || "https://via.placeholder.com/150"} 
                  alt={autorizado.nombre} 
                  className="shadow-sm mb-3"
                  style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", border: "4px solid #f8f9fa" }}
                />
                
                <h5 className="fw-bold mb-0">{autorizado.nombre}</h5>
                <p className="text-muted small mb-3">{autorizado.apellidos}</p>
                
                <div className="text-start">
                    {/* DNI */}
                    <div className="mb-2 border-bottom pb-1">
                        <label className="text-muted d-block mb-0" style={{ fontSize: "0.65rem", fontWeight: "bold" }}>DNI / NIE</label>
                        <span style={{ color: "#444", fontSize: "0.85rem" }}>{autorizado.dni}</span>
                    </div>

                    {/* DIRECCIÓN */}
                    <div className="mb-2 border-bottom pb-1">
                        <label className="text-muted d-block mb-0" style={{ fontSize: "0.65rem", fontWeight: "bold" }}>DIRECCIÓN</label>
                        <span style={{ color: "#444", fontSize: "0.85rem" }}>{autorizado.direccion || "No especificada"}</span>
                    </div>

                    {/* TELÉFONO */}
                    <div className="mb-2 border-bottom pb-1">
                        <label className="text-muted d-block mb-0" style={{ fontSize: "0.65rem", fontWeight: "bold" }}>TELÉFONO</label>
                        <span style={{ color: "#444", fontSize: "0.85rem" }}>{autorizado.telefono}</span>
                    </div>

                    {/* PARENTESCO */}
                    <div className="mb-2 border-bottom pb-1">
                        <label className="text-muted d-block mb-0" style={{ fontSize: "0.65rem", fontWeight: "bold" }}>PARENTESCO</label>
                        <span style={{ color: "#444", fontSize: "0.85rem" }}>{autorizado.parentesco || "Autorizado"}</span>
                    </div>

                    {/* RANGO DE FECHAS */}
                    <div className="bg-light p-2 rounded-3 mt-3 shadow-sm border">
                        <label className="text-muted d-block text-center mb-1" style={{ fontSize: "0.6rem", fontWeight: "bold", textTransform: "uppercase" }}>Validez del Permiso</label>
                        <div className="d-flex justify-content-between px-2">
                            <div className="text-center">
                                <small className="d-block text-muted" style={{fontSize: "0.55rem"}}>Desde</small>
                                <small className="fw-bold text-success" style={{ fontSize: "0.75rem" }}>{autorizado.validoDesde}</small>
                            </div>
                            <div className="text-center border-start ps-2">
                                <small className="d-block text-muted" style={{fontSize: "0.55rem"}}>Hasta</small>
                                <small className="fw-bold text-danger" style={{ fontSize: "0.75rem" }}>{autorizado.validoHasta}</small>
                            </div>
                        </div>
                    </div>
                </div>

                <button 
                    type="button" 
                    className="btn mt-4 w-100 text-white fw-bold shadow-sm" 
                    data-bs-dismiss="modal" 
                    style={{ backgroundColor: "var(--color-primario)", borderRadius: "12px", fontSize: "0.9rem" }}>
                  Cerrar Detalles
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* FIN MODAL */}
        
      </div>
    </div>
  );
};