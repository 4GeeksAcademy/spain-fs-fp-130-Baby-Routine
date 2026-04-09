import React from "react";
import logoApp from "../assets/Logo Baby Zzync 1.png";

export const Registro = () => {
  return (
    /* Contenedor principal */
    <div className="bg-registro">

      <div className="container d-flex justify-content-center align-items-center min-vh-100 py-4">

        {/* Tarjeta de Registro blanca */}
        <div className="card p-4 shadow-sm border-0" style={{ maxWidth: "400px", width: "100%", borderRadius: "20px" }}>

          {/* Logo y Encabezado */}
          <div className="text-center mb-3">
            <img
              src={logoApp}
              alt="Logo Baby Zzzync"
              style={{ width: "190px", height: "auto", marginBottom: "1px" }}
            />
          </div>

          {/* Foto de Perfil */}
          <div className="profile-circle mb-4">
            <i className="fas fa-plus mb-1"></i>
            <span className="small fw-bold">FOTO</span>
          </div>

          {/* Formulario de Registro */}
          <form>
            <div className="d-flex align-items-center mb-3">
              <i className="fas fa-envelope me-3 text-muted" style={{ width: "20px" }}></i>
              <input type="email" className="form-control input-line" placeholder="CORREO ELECTRÓNICO" />
            </div>

            <div className="d-flex align-items-center mb-3">
              <i className="fas fa-lock me-3 text-muted" style={{ width: "20px" }}></i>
              <input type="password" className="form-control input-line" placeholder="CONTRASEÑA" />
              <i className="fas fa-eye ms-2" style={{ cursor: "pointer", color: "var(--color-descanso)" }}></i>
            </div>

            <div className="d-flex align-items-center mb-3">
              <i className="fas fa-lock me-3 text-muted" style={{ width: "20px" }}></i>
              <input type="password" className="form-control input-line" placeholder="CONFIRMAR CONTRASEÑA" />
              <i className="fas fa-eye ms-2" style={{ cursor: "pointer", color: "var(--color-descanso)" }}></i>
            </div>

            <div className="d-flex align-items-center mb-3">
              <i className="fas fa-id-card me-3 text-muted" style={{ width: "20px" }}></i>
              <input type="text" className="form-control input-line" placeholder="NOMBRE" />
            </div>

            <div className="d-flex align-items-center mb-3">
              <i className="fas fa-users me-3 text-muted" style={{ width: "20px" }}></i>
              <input type="text" className="form-control input-line" placeholder="APELLIDOS" />
            </div>

            <div className="d-flex align-items-center mb-3">
              <i className="fas fa-calendar me-3 text-muted" style={{ width: "20px" }}></i>
              <input type="number" className="form-control input-line" placeholder="EDAD" />
            </div>

            {/* Botón de Acción */}
            <button
              type="submit"
              className="btn w-100 py-2 mt-2"
              style={{
                backgroundColor: "var(--color-primario)",
                color: "white",
                borderRadius: "50px",
                border: "none"
              }}
            >
              Crear Cuenta
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};