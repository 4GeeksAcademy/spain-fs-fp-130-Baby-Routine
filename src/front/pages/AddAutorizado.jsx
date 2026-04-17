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
  const [esPermanente, setEsPermanente] = useState(false); 

  const handleTelefonoChange = (e) => {
    const value = e.target.value;
    const onlyNums = value.replace(/[^0-9]/g, '');
    setTelefono(onlyNums);
  };

  const handleSave = () => {
    // Validacion: si es permanente las fechas no son necesarias
    const fechasValidas = esPermanente ? true : (fechaInicio && fechaFin);

    if (!nombre || !apellidos || !telefono || !dni || !parentesco || !fechasValidas) {
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
            esPermanente, 
            validoDesde: esPermanente ? "Permanente" : fechaInicio,
            validoHasta: esPermanente ? "Indefinido" : fechaFin
        }
    });

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
            value={telefono} 
            onChange={handleTelefonoChange} 
            maxLength="9" 
            style={{ fontSize: "0.9rem" }}
          />

          <select 
            className="form-select rounded-pill border-0 bg-light p-3 shadow-inner" 
            value={parentesco} 
            onChange={(e) => setParentesco(e.target.value)}
            style={{ 
                fontSize: "0.9rem", 
                color: parentesco === "" ? "#6c757d" : "#212529",
                backgroundImage: "url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 16%22%3E%3Cpath fill=%22none%22 stroke=%22%23666%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%222%22 d=%22M2 5l6 6 6-6%22/%3E%3C/svg%3E')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 1.25rem center",
                backgroundSize: "16px 12px"
            }}
          >
            <option value="" disabled>Selecciona el parentesco</option>
            <option value="Progenitor">Progenitor</option>
            <option value="Abuelo/a">Abuelo/a</option>
            <option value="Hermano/a">Hermano/a</option>
            <option value="Primo/a">Primo/a</option>
            <option value="Tío/a">Tío/a</option>
            <option value="Amigo/a">Amigo/a</option>
          </select>

          {/* OPCION PERMANENTE */}
          <div className="d-flex justify-content-between align-items-center px-3 mt-2">
            <label className="small fw-bold text-muted">¿Autorización permanente?</label>
            <div className="form-check form-switch">
              <input 
                className="form-check-input" 
                type="checkbox" 
                role="switch" 
                checked={esPermanente}
                onChange={(e) => setEsPermanente(e.target.checked)}
                style={{ cursor: "pointer", transform: "scale(1.2)" }}
              />
            </div>
          </div>

          {/* FECHAS (Se deshabilitan si es permanente) */}
          <div className={`row g-2 ${esPermanente ? "opacity-50" : ""}`} style={{ transition: "0.3s" }}>
            <div className="col-12 text-center">
              <p className="small text-muted mb-1 fw-bold">Periodo de validez:</p>
            </div>
            <div className="col-6 text-center">
              <label className="small text-muted" style={{ fontSize: "0.75rem" }}>Desde:</label>
              <input 
                type="date" 
                className="form-control rounded-pill border-0 bg-light p-2 shadow-inner" 
                disabled={esPermanente}
                onChange={(e) => setFechaInicio(e.target.value)}
                style={{ fontSize: "0.85rem" }}
              />
            </div>
            <div className="col-6 text-center">
              <label className="small text-muted" style={{ fontSize: "0.75rem" }}>Hasta:</label>
              <input 
                type="date" 
                className="form-control rounded-pill border-0 bg-light p-2 shadow-inner" 
                disabled={esPermanente}
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