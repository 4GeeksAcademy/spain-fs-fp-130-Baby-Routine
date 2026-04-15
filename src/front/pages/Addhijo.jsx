import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Cloudinary from "../components/Cloudinary.jsx";
import logoApp from "../assets/Logo Baby Zzync 1 - vers blanca.png";

export const Addhijo = () => {  
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [edad, setEdad] = useState(0);
  const [info, setInfo] = useState("");
  const [foto, setFoto] = useState("");

  
  const handleSave = () => {
    if (!nombre || !foto) {
      alert("Por favor, introduce al menos el nombre y la foto.");
      return;
    }

    // Enviamos la acción al store global
    dispatch({
      type: "add_hijo",
      payload: {
        id: Date.now(), // ID temporal único
        nombre: nombre,
        apellidos: apellidos,
        edad: edad,
        info: info,
        fotoUrl: foto
      }
    });

    // Volvemos a la vista del padre
    navigate("/menupadre");
  };

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
          {/* Componente Cloudinary funcional */}
          <Cloudinary onImageUploaded={(url) => setFoto(url)} />
          
          <div className="mt-4 d-flex flex-column gap-2">
            <input 
              type="text" 
              className="form-control text-center rounded-pill shadow-sm" 
              placeholder="nombre" 
              onChange={e => setNombre(e.target.value)} 
            />
            <input 
              type="text" 
              className="form-control text-center rounded-pill shadow-sm" 
              placeholder="apellidos" 
              onChange={e => setApellidos(e.target.value)} 
            />
            
            {/* Selector de Edad */}
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

            <textarea 
              className="form-control text-center mt-2 shadow-sm" 
              placeholder="Información" 
              style={{ borderRadius: "15px", height: "80px" }} 
              onChange={e => setInfo(e.target.value)} 
            />
            
            {/* Botón */}
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

// Estilo
const inputStyle = { borderRadius: "20px", border: "1px solid #ced4da", fontSize: "0.95rem", padding: "10px", backgroundColor: "#f9f9f9" };
const photoContainerStyle = { width: "85px", height: "85px", borderRadius: "50%", backgroundColor: "#e4e4e4", flexDirection: "column", display: "flex", cursor: "pointer", border: "2px dashed #ccc" };
const btnSubmitStyle = { backgroundColor: "var(--color-descanso)", color: "white", borderRadius: "12px", fontWeight: "bold", padding: "12px 30px", border: "none" };