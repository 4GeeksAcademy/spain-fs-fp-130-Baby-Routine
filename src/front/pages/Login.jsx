import React from "react";
import logoApp from "../assets/Logo Baby Zzync 1 - vers blanca.png";

export const Login = () => {
  return (
    <div className="bg-registro">

      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card shadow-sm border-0 overflow-hidden" style={{ maxWidth: "400px", width: "100%", borderRadius: "20px" }}>

          {/* Banner con Color Primario y Logo */}
          <div className="p-4 text-center text-white" style={{ backgroundColor: "var(--color-primario)" }}>
            <img
              src={logoApp}
              alt="Logo Baby Zzzync"
              style={{ width: "190px", height: "auto", marginBottom: "1px" }}
            />

          </div>

          <div className="card-body p-4">
            <form>
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted mb-1">Correo Electrónico:</label>
                <input type="email" className="form-control rounded-3" placeholder="tu email aquí" />
              </div>

              <div className="mb-1">
                <label className="form-label small fw-bold text-muted mb-1">Contraseña:</label>
                <input type="password" className="form-control rounded-3" placeholder="contraseña secreta" />
              </div>

              <div className="mb-4 text-start">
                <a href="#" className="small text-decoration-none fw-bold" style={{ color: "var(--color-descanso)" }}>
                  ¿No estás registrado?
                </a>
              </div>

              <p className="small text-muted mb-2">Continuar con:</p>
              <div className="d-flex gap-2 mb-4">
                <button type="button" className="btn btn-outline-primary flex-grow-1">
                  <i className="fab fa-facebook-f me-2"></i>Facebook
                </button>
                <button type="button" className="btn btn-outline-dark px-4">
                  <i className="fab fa-apple"></i>
                </button>
              </div>

              {/* Botón Login con color primario */}
              <button
                type="submit"
                className="btn w-100 py-2 mt-2"
                style={{
                  backgroundColor: "var(--color-descanso)",
                  color: "white",
                  borderRadius: "50px",
                  border: "none"
                }}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
};