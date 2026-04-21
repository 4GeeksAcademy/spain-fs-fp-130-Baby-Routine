import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import logoApp from "../assets/Logo Baby Zzync 1 - vers blanca.png"; 
import Cloudinary from "../components/Cloudinary.jsx";
import Swal from 'sweetalert2';

export const AddAutorizado = () => {
  const { store, dispatch } = useGlobalReducer(); // Aqui se extrae el store para obtener los hijos
  const navigate = useNavigate();

  // Estados para capturar información
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState(""); 
  const [telefono, setTelefono] = useState("");
  const [dni, setDni] = useState(""); 
  const [direccion, setDireccion] = useState(""); 
  const [parentesco, setParentesco] = useState("");
  const [hijoId, setHijoId] = useState(""); // Nuevo estado para el ID del hijo
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
    // Validación: ahora incluimos que haya un hijo seleccionado
    const fechasValidas = esPermanente ? true : (fechaInicio && fechaFin);

    if (!nombre || !apellidos || !telefono || !dni || !parentesco || !hijoId || !fechasValidas) {
        Swal.fire({
            title: '¡Faltan datos!',
            text: 'Rellena todos los campos, incluyendo a quién autorizas recoger.',
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
            hijoId: parseInt(hijoId), 
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

          {/* Dropdown con los hijos disponbles */}
          <select 
            className="form-select rounded-pill border-0 bg-light p-3 shadow-inner" 
            value={hijoId}
            onChange={(e) => setHijoId(e.target.value)}
            style={{ 
                fontSize: "0.9rem", 
                color: hijoId === "" ? "#6c757d" : "#212529"
            }}
          >
            <option value="" disabled>¿A quién puede recoger?</option>
            {store.hijos && store.hijos.length > 0 ? (
              store.hijos.map((hijo) => (
                <option key={hijo.id} value={hijo.id}>
                  {hijo.nombre} {hijo.apellido}
                </option>
              ))
            ) : (
              <option disabled>No hay hijos registrados</option>
            )}
          </select>

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
            onChange={(e) => {
              const val = e.target.value;
              setParentesco(val);
              if(val === "Progenitor") setEsPermanente(true);
              else setEsPermanente(false);
            }}
            style={{ 
                fontSize: "0.9rem", 
                color: parentesco === "" ? "#6c757d" : "#212529"
            }}
          >
            <option value="" disabled>Selecciona el parentesco</option>
            <option value="Progenitor">Progenitor</option>
            <option value="Abuelo/a">Abuelo/a</option>
            <option value="Hermano/a">Hermano/a</option>
            <option value="Primo/a">Primo/a</option>
            <option value="Tío/a">Tío/a</option>
            <option value="Amigo/a">Amigo/a</option>
            <option value="Tutor/a">Tutor/a Legal</option>
          </select>

          {parentesco !== "Progenitor" && (
            <>
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

              {!esPermanente && (
                <div className="row g-2" style={{ transition: "0.3s" }}>
                  <div className="col-12 text-center">
                    <p className="small text-muted mb-1 fw-bold">Periodo de validez:</p>
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
              )}
            </>
          )}

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