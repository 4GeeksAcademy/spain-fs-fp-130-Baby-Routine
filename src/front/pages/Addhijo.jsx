import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Cloudinary from "../components/Cloudinary.jsx";
import logoApp from "../assets/Logo Baby Zzync 1 - vers blanca.png";
import Swal from 'sweetalert2';

export const Addhijo = () => {  
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [edad, setEdad] = useState(0);
  const [info, setInfo] = useState("");
  const [foto, setFoto] = useState("");

  // ESTADOS PARA SWITCHES 
  const [hasIntolerancia, setHasIntolerancia] = useState(false);
  const [hasAlergia, setHasAlergia] = useState(false);
  const [hasAsma, setHasAsma] = useState(false);
  const [hasSangre, setHasSangre] = useState(false);

  // ESTADOS VALORES MEDICOS
  const [intolerancia, setIntolerancia] = useState("");
  const [alergia, setAlergia] = useState("");
  const [nivelAsma, setNivelAsma] = useState("");
  const [tipoSangre, setTipoSangre] = useState("");

  // ESTADOS DESARROLLO
  const [gatea, setGatea] = useState(false);
  const [vaAlBano, setVaAlBano] = useState(false);

  const handleSave = () => {
    if (!nombre || !apellidos || edad === 0) {
        Swal.fire({
            title: '¡Ups!',
            text: 'Por favor, rellena el nombre, apellidos y selecciona una edad.',
            icon: 'warning',
            confirmButtonText: 'Corregir',
            confirmButtonColor: 'var(--color-primario)',
            width: '400px',
            padding: '1.2rem',
            customClass: {
                popup: 'my-custom-popup',
                confirmButton: 'rounded-pill px-4 shadow-sm'
            }
        });
        return;
    }

    dispatch({
        type: "add_hijo",
        payload: { 
            id: Date.now(), 
            nombre, 
            apellido: apellidos, 
            edad,
            info,
            fotoUrl: foto,
            // Datos de desarrollo
            desarrollo: {
                gatea: gatea ? "Sí" : "No",
                autonomiaBano: vaAlBano ? "Sí" : "No"
            },
            // Datos medicos adicionales
            datosMedicos: {
                intolerancia: hasIntolerancia ? intolerancia : "Ninguna",
                alergia: hasAlergia ? alergia : "Ninguna",
                asma: hasAsma ? nivelAsma : "No",
                tipoSangre: hasSangre ? tipoSangre : "No informado"
            }
        }
    });

    Swal.fire({
        icon: 'success',
        title: '¡Niño registrado!',
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

  // Estilo común para selects
  const selectStyle = { fontSize: "0.85rem", backgroundColor: "#f8f9fa" };

  return (
    <div className="bg-registro min-vh-100 d-flex align-items-center justify-content-center py-4">
      <div className="card shadow border-0" style={{ maxWidth: "420px", width: "90%", borderRadius: "25px" }}>
        
        {/* Header */}
        <div className="p-3 text-center position-relative" style={{ backgroundColor: "var(--color-primario)", borderRadius: "25px 25px 0 0" }}>
          <Link to="/menupadre" className="position-absolute text-white" style={{ left: "20px", top: "25px" }}>
            <i className="fas fa-arrow-left fa-lg"></i>
          </Link>
          <img src={logoApp} style={{ width: "130px" }} alt="logo" />
        </div>

        <div className="card-body p-4 text-center">
          <Cloudinary onImageUploaded={(url) => setFoto(url)} />
          
          <div className="mt-4 d-flex flex-column gap-2">
            <input 
              type="text" 
              className="form-control text-center rounded-pill shadow-sm" 
              placeholder="Nombre" 
              value={nombre}
              onChange={e => setNombre(e.target.value)} 
            />
            <input 
              type="text" 
              className="form-control text-center rounded-pill shadow-sm" 
              placeholder="Apellidos" 
              value={apellidos}
              onChange={e => setApellidos(e.target.value)} 
            />
            
            {/* Selector de Edad */}
            <label className="small text-muted mt-2">Edad de tu peque</label>
            <div className="input-group rounded-pill overflow-hidden border shadow-sm">
              <button className="btn btn-light border-0" onClick={() => setEdad(Math.max(0, edad - 1))}>
                <i className="fas fa-minus small text-muted"></i>
              </button>
              <input 
                type="number" 
                className="form-control text-center border-0 bg-light no-spinners" 
                value={edad} 
                readOnly 
              />
              <button className="btn btn-light border-0" onClick={() => setEdad(edad + 1)}>
                <i className="fas fa-plus small text-muted"></i>
              </button>
            </div>

            {/* Apartado de informacion medica (switches) */}
            <div className="text-start mt-3 p-2 bg-light rounded-4">
              <p className="small fw-bold text-muted mb-3 text-center">Información Médica Especial</p>

              {/* Intolerancias */}
              <div className="mb-2">
                <div className="d-flex justify-content-between align-items-center px-2">
                  <span className="small text-muted">Intolerancias</span>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" checked={hasIntolerancia} onChange={e => setHasIntolerancia(e.target.checked)} />
                  </div>
                </div>
                {hasIntolerancia && (
                  <select className="form-select form-select-sm rounded-pill mt-1" style={selectStyle} value={intolerancia} onChange={e => setIntolerancia(e.target.value)}>
                    <option value="">¿Cuál?</option>
                    <option value="Lactosa">Lactosa</option>
                    <option value="Gluten">Gluten</option>
                    <option value="Fructosa">Fructosa</option>
                    <option value="Otra">Otra</option>
                  </select>
                )}
              </div>

              {/* Alergias */}
              <div className="mb-2">
                <div className="d-flex justify-content-between align-items-center px-2">
                  <span className="small text-muted">Alergias</span>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" checked={hasAlergia} onChange={e => setHasAlergia(e.target.checked)} />
                  </div>
                </div>
                {hasAlergia && (
                  <select className="form-select form-select-sm rounded-pill mt-1" style={selectStyle} value={alergia} onChange={e => setAlergia(e.target.value)}>
                    <option value="">¿A qué?</option>
                    <option value="Frutos Secos">Frutos Secos</option>
                    <option value="Pescado">Pescado</option>
                    <option value="Huevo">Huevo</option>
                    <option value="Polen">Polen</option>
                    <option value="Medicamentos">Medicamentos</option>
                  </select>
                )}
              </div>

              {/* Asma */}
              <div className="mb-2">
                <div className="d-flex justify-content-between align-items-center px-2">
                  <span className="small text-muted">¿Asmático/a?</span>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" checked={hasAsma} onChange={e => setHasAsma(e.target.checked)} />
                  </div>
                </div>
                {hasAsma && (
                  <select className="form-select form-select-sm rounded-pill mt-1" style={selectStyle} value={nivelAsma} onChange={e => setNivelAsma(e.target.value)}>
                    <option value="">Frecuencia/Nivel</option>
                    <option value="Ocasional">Ocasional</option>
                    <option value="Moderado">Moderado</option>
                    <option value="Crónico">Crónico</option>
                  </select>
                )}
              </div>

              {/* Tipo de Sangre */}
              <div className="mb-2">
                <div className="d-flex justify-content-between align-items-center px-2">
                  <span className="small text-muted">Grupo Sanguíneo</span>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" checked={hasSangre} onChange={e => setHasSangre(e.target.checked)} />
                  </div>
                </div>
                {hasSangre && (
                  <select className="form-select form-select-sm rounded-pill mt-1" style={selectStyle} value={tipoSangre} onChange={e => setTipoSangre(e.target.value)}>
                    <option value="">Selecciona grupo...</option>
                    <option value="A+">A+</option><option value="A-">A-</option>
                    <option value="B+">B+</option><option value="B-">B-</option>
                    <option value="O+">O+</option><option value="O-">O-</option>
                    <option value="AB+">AB+</option><option value="AB-">AB-</option>
                  </select>
                )}
              </div>
            </div>

            {/* APARTADO DE DESARROLLO (Seccion de hitos)*/}
            <div className="text-start mt-3 p-3 border rounded-4 bg-white shadow-sm">
              <p className="small fw-bold text-muted mb-2 text-center">Hitos de Desarrollo</p>
              
              <div className="d-flex justify-content-between align-items-center mb-2 px-1">
                <span className="small text-muted">¿Ya gatea?</span>
                <div className="form-check form-switch">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={gatea} 
                    onChange={e => setGatea(e.target.checked)} 
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center px-1">
                <span className="small text-muted">¿Va al baño solo/a?</span>
                <div className="form-check form-switch">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={vaAlBano} 
                    onChange={e => setVaAlBano(e.target.checked)} 
                  />
                </div>
              </div>
            </div>

            <textarea 
              className="form-control text-center mt-2 shadow-sm" 
              placeholder="Notas adicionales" 
              style={{ borderRadius: "15px", height: "80px" }} 
              value={info}
              onChange={e => setInfo(e.target.value)} 
            />
            
            <button 
              className="btn w-100 mt-3 text-white fw-bold shadow-sm" 
              onClick={handleSave} 
              style={{ backgroundColor: "var(--color-descanso)", borderRadius: "12px", padding: "12px" }}
            >
              AÑADIR HIJO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};