import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import logoApp from "../assets/Logo Baby Zzync 1 - vers blanca.png"; 
import Cloudinary from "../components/Cloudinary.jsx";
import Swal from 'sweetalert2';

export const AddAutorizado = () => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  // Estados para capturar información
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState(""); 
  const [telefono, setTelefono] = useState("");
  const [dni, setDni] = useState(""); 
  const [direccion, setDireccion] = useState(""); 
  const [parentesco, setParentesco] = useState("");
  const [foto, setFoto] = useState(null);
  
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

const handleSave = () => {
    if (!nombre || !apellidos || !telefono || !dni || !fechaInicio || !fechaFin) {
        Swal.fire({
            title: '¡Faltan datos!',
            text: 'Rellena los campos obligatorios.',
            icon: 'warning',
            confirmButtonText: 'Entendido',
            confirmButtonColor: 'var(--color-primario)',
            width: '400px', 
            padding: '1.5rem',
            customClass: {
                popup: 'my-custom-popup', 
                title: 'fw-bold fs-5',
                confirmButton: 'rounded-pill px-4 shadow-sm'
            }
        });
        return;
    }

    
    dispatch({
        type: "add_autorizado",
        payload: { 
            id: Date.now(), 
            nombre, apellidos, telefono, dni, direccion, parentesco,
            fotoUrl: foto,
            validoDesde: fechaInicio,
            validoHasta: fechaFin
        }
    });

    // Exito
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: '¡Autorizado!',
        showConfirmButton: false,
        timer: 1500,
        width: '400px', 
        customClass: {
            popup: 'my-custom-popup'
        }
    }).then(() => {
        navigate("/menupadre");
    });
};

  return (
    <div className="bg-registro min-vh-100 d-flex align-items-center justify-content-center p-3">
      <div className="card shadow-sm border-0" style={{ maxWidth: "450px", width: "100%", borderRadius: "20px" }}>
        
        <div className="d-flex align-items-center justify-content-center p-3 position-relative" 
             style={{ backgroundColor: "var(--color-primario)", borderRadius: "20px 20px 0 0" }}>
          <img src={logoApp} alt="Logo Baby Zzync" style={{ width: "150px" }} />
          <Link to="/menupadre" className="position-absolute" style={{ left: "20px", color: "white", textDecoration: "none" }}>
            <i className="fas fa-arrow-left fa-lg"></i>
          </Link>
        </div>

        <div className="card-body p-4 d-flex flex-column gap-3">
          
          <Cloudinary onImageUploaded={(url) => setFoto(url)} />

          <div className="text-center mb-1">
            <p className="text-muted small m-0">Persona delegada para recoger a tu hijo/a</p>
          </div>

          <input 
            type="text" 
            className="form-control rounded-pill border-0 bg-light p-3 shadow-inner" 
            placeholder="Nombre" 
            onChange={(e) => setNombre(e.target.value)} 
            style={{ fontSize: "0.9rem" }}
          />
          <input 
            type="text" 
            className="form-control rounded-pill border-0 bg-light p-3 shadow-inner" 
            placeholder="Apellidos" 
            onChange={(e) => setApellidos(e.target.value)} 
            style={{ fontSize: "0.9rem" }}
          />
          <input 
            type="text" 
            className="form-control rounded-pill border-0 bg-light p-3 shadow-inner" 
            placeholder="DNI / NIE" 
            onChange={(e) => setDni(e.target.value)} 
            style={{ fontSize: "0.9rem" }}
          />
          {/* INPUT DE DIRECCIÓN */}
          <input 
            type="text" 
            className="form-control rounded-pill border-0 bg-light p-3 shadow-inner" 
            placeholder="Dirección completa" 
            onChange={(e) => setDireccion(e.target.value)} 
            style={{ fontSize: "0.9rem" }}
          />
          <input 
            type="tel" 
            className="form-control rounded-pill border-0 bg-light p-3 shadow-inner" 
            placeholder="Teléfono de contacto" 
            onChange={(e) => setTelefono(e.target.value)} 
            style={{ fontSize: "0.9rem" }}
          />
          <input 
            type="text" 
            className="form-control rounded-pill border-0 bg-light p-3 shadow-inner" 
            placeholder="Parentesco (ej: Abuelo)" 
            onChange={(e) => setParentesco(e.target.value)} 
            style={{ fontSize: "0.9rem" }}
          />

          <div className="row g-2">
            <div className="col-12 mt-2 text-center">
              <p className="small text-muted mb-1 fw-bold">Periodo de validez de autorización:</p>
            </div>
            <div className="col-6 text-center">
              <label className="small text-muted" style={{ fontSize: "0.75rem" }}>Desde:</label>
              <input 
                type="date" 
                className="form-control rounded-pill border-0 bg-light p-2 shadow-inner" 
                onChange={(e) => setFechaInicio(e.target.value)}
                style={{ fontSize: "0.85rem" }}
              />
            </div>
            <div className="col-6 text-center">
              <label className="small text-muted" style={{ fontSize: "0.75rem" }}>Hasta:</label>
              <input 
                type="date" 
                className="form-control rounded-pill border-0 bg-light p-2 shadow-inner" 
                onChange={(e) => setFechaFin(e.target.value)}
                style={{ fontSize: "0.85rem" }}
              />
            </div>
          </div>

          <div className="d-flex gap-2 mt-3">
            <Link to="/menupadre" className="btn btn-light rounded-pill flex-grow-1 p-3 shadow-sm" style={{ fontSize: "0.9rem", color: "#666" }}>
              Cancelar
            </Link>
            <button 
              onClick={handleSave} 
              className="btn text-white rounded-pill flex-grow-1 p-3 fw-bold shadow-sm" 
              style={{ backgroundColor: "var(--color-descanso)", border: "none", fontSize: "0.9rem" }}
            >
              Guardar Autorizado
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};