import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoApp from "../assets/Logo Baby Zzync 1 - vers blanca.png";
import Cloudinary from "../components/Cloudinary.jsx"; 

export const Addhijo = () => {
  const [edad, setEdad] = useState("");
  const [urlFoto, setUrlFoto] = useState(""); 

  
  const handleImageUpload = (url) => {
    setUrlFoto(url); 
    console.log("Imagen lista para guardar en la DB:", url);
  };

  const sumarEdad = () => setEdad(prev => (prev === "" ? 1 : parseInt(prev) + 1));
  const restarEdad = () => setEdad(prev => (prev > 0 ? parseInt(prev) - 1 : 0));

  return (
    <div className="bg-registro">
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card shadow-sm border-0" style={{ maxWidth: "450px", width: "100%", borderRadius: "20px", overflow: "hidden" }}>
          
          <div className="d-flex align-items-center justify-content-center p-3 position-relative"
            style={{ backgroundColor: "var(--color-primario)", minHeight: "80px" }}>
            <Link to="/menupadre" className="position-absolute" style={{ left: "20px", color: "white" }}>
               <i className="fas fa-arrow-left fa-lg"></i>
            </Link>
            <img src={logoApp} alt="Logo" style={{ width: "150px", height: "auto" }} />
          </div>

          <div className="card-body p-4 text-center">
            
            {/* Cloudinary */}
            <div className="mb-4 d-flex justify-content-center">
                <Cloudinary onImageUploaded={handleImageUpload} />
            </div>

          {/* inputs */} 
            <div className="d-flex flex-column gap-2 mb-4">
              <input type="text" className="form-control text-center shadow-sm" placeholder="nombre" style={inputStyle} />
              <input type="text" className="form-control text-center shadow-sm" placeholder="apellidos" style={inputStyle} />
              
          {/* Edad */}     
              <div className="input-group shadow-sm" style={{ borderRadius: "20px", overflow: "hidden", border: "1px solid #ced4da" }}>
                <button className="btn btn-light border-0" type="button" onClick={restarEdad} style={{ width: "50px" }}>
                  <i className="fas fa-minus text-muted"></i>
                </button>
                <input 
                  type="number" 
                  className="form-control text-center border-0 no-spinners" 
                  placeholder="EDAD" 
                  value={edad}
                  onChange={(e) => setEdad(e.target.value)}
                  style={{ fontSize: "0.95rem", backgroundColor: "#f9f9f9" }} 
                />
                <button className="btn btn-light border-0" type="button" onClick={sumarEdad} style={{ width: "50px" }}>
                  <i className="fas fa-plus text-muted"></i>
                </button>
              </div>
              
              {/* input informacion */} 
              <textarea className="form-control text-center shadow-sm mt-2" placeholder="Informacion" style={{ ...inputStyle, borderRadius: "15px", height: "100px" }} />
            </div>

            <button className="btn shadow-sm" style={btnSubmitStyle}>
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