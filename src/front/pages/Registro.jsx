import React, { useState } from "react";
import logoApp from "../assets/Logo Baby Zzync 1.png";
import { Link, useNavigate } from "react-router-dom";
import Cloudinary from "../components/Cloudinary";

export const Registro = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "", password: "", confirmPassword: "", nombre: "", apellidos: "",
    edad: "", direccionHogar: "", direccionTrabajo: "", prefijo: "+34",
    telefono: "", fotoPerfil: ""
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleImageUploaded = (url) => setFormData({ ...formData, fotoPerfil: url });

  const passwordsMatch = formData.password === formData.confirmPassword;
  const showMatchError = formData.confirmPassword.length > 0 && !passwordsMatch;

  return (
    <div className="bg-registro">
      <div className="mobile-container p-4">
        <div className="text-center mb-3">
          <img src={logoApp} alt="Logo" style={{ width: "180px" }} />
        </div>
        <div className="mb-4 text-center">
          <Cloudinary onImageUploaded={handleImageUploaded} />
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="d-flex align-items-center mb-3">
            <i className="fas fa-envelope me-3 text-muted" style={{ width: "20px" }}></i>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control input-line" placeholder="CORREO ELECTRÓNICO" />
          </div>
          <div className="d-flex align-items-center mb-3">
            <i className="fas fa-lock me-3 text-muted" style={{ width: "20px" }}></i>
            <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} className="form-control input-line" placeholder="CONTRASEÑA" />
            <i className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'} ms-2`} onClick={() => setShowPassword(!showPassword)} style={{cursor:"pointer", color:"var(--color-descanso)"}}></i>
          </div>
          <div className="mb-3">
            <div className="d-flex align-items-center">
              <i className="fas fa-lock me-3 text-muted" style={{ width: "20px" }}></i>
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                className="form-control input-line" 
                placeholder="CONFIRMAR CONTRASEÑA" 
                style={{ borderBottom: showMatchError ? "1px solid red" : "1px solid #ccc" }}
              />
              <i className={`fas ${showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'} ms-2`} onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{cursor:"pointer", color:"var(--color-descanso)"}}></i>
            </div>
            {showMatchError && <small className="text-danger d-block mt-1" style={{ marginLeft: "38px" }}>Las contraseñas no coinciden</small>}
          </div>
          {/* Conservamos todos los campos */}
          <div className="d-flex align-items-center mb-3">
            <i className="fas fa-id-card me-3 text-muted" style={{ width: "20px" }}></i>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="form-control input-line" placeholder="NOMBRE" />
          </div>
          <div className="d-flex align-items-center mb-3">
            <i className="fas fa-users me-3 text-muted" style={{ width: "20px" }}></i>
            <input type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} className="form-control input-line" placeholder="APELLIDOS" />
          </div>
          <div className="d-flex align-items-center mb-3">
            <i className="fas fa-calendar me-3 text-muted" style={{ width: "20px" }}></i>
            <input type="number" name="edad" value={formData.edad} onChange={handleChange} className="form-control input-line" placeholder="EDAD" />
          </div>
          <div className="d-flex align-items-center mb-3">
            <i className="fas fa-home me-3 text-muted" style={{ width: "20px" }}></i>
            <input type="text" name="direccionHogar" value={formData.direccionHogar} onChange={handleChange} className="form-control input-line" placeholder="DIRECCIÓN DEL HOGAR" />
          </div>
          <div className="d-flex align-items-center mb-3">
            <i className="fas fa-building me-3 text-muted" style={{ width: "20px" }}></i>
            <input type="text" name="direccionTrabajo" value={formData.direccionTrabajo} onChange={handleChange} className="form-control input-line" placeholder="DIRECCIÓN DEL TRABAJO" />
          </div>
          <div className="d-flex align-items-center mb-4">
            <i className="fas fa-phone me-3 text-muted" style={{ width: "20px" }}></i>
            <select name="prefijo" value={formData.prefijo} onChange={handleChange} className="form-control input-line me-2" style={{ maxWidth: "85px" }}>
              <option value="+34">🇪🇸 +34</option>
              <option value="+52">🇲🇽 +52</option>
              <option value="+1">🇺🇸 +1</option>
            </select>
            <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className="form-control input-line w-100" placeholder="TELÉFONO" />
          </div>
          <div className="mb-3 text-center">
            <Link to="/" className="small text-decoration-none fw-bold" style={{ color: "var(--color-descanso)" }}>¿Ya tienes una cuenta?</Link>
          </div>
          <button type="submit" className="btn w-100 py-2 mt-2 mb-4" style={{ backgroundColor: "var(--color-primario)", color: "white", borderRadius: "50px", border: "none" }}>Crear Cuenta</button>
        </form>
      </div>
    </div>
  );
};