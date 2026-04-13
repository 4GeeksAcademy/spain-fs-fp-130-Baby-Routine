import React, { useState } from "react";
import logoApp from "../assets/Logo Baby Zzync 1 - vers blanca.png";

const getCategoryIcon = (category) => {
    switch (category) {
        // 'fa-tint' es una gota de agua/leche, funciona en todas las versiones
        case 'milk': return <i className="fas fa-tint fa-lg text-primary"></i>;
        case 'sleep': return <i className="fas fa-moon fa-lg text-secondary"></i>;
        case 'diaper': return <i className="fas fa-baby fa-lg text-success"></i>; 
        default: return <i className="fas fa-star fa-lg text-warning"></i>;
    }
};

export const FamiliaRutina = () => {
    const [task, setTask] = useState("");
    const [time, setTime] = useState(""); 
    const [category, setCategory] = useState("milk"); 
    const [list, setList] = useState([]);

    
    const tareasTotales = list.length;
    const tareasHechas = list.filter(tarea => tarea.completed === true).length;
    
    let cuenta = 0;
    if (tareasTotales > 0) {
        cuenta = (tareasHechas / tareasTotales) * 100;
    }
    const progress = Math.round(cuenta);

    const handleAddTask = () => {
        if (task !== "" && time !== "") {
            const nuevaActividad = {
                id: Math.random(), 
                text: task,
                time: time,
                category: category,
                completed: false
            };
            setList([...list, nuevaActividad]);
            setTask("");
            setTime("");
        }
    };

    const toggleComplete = (indexId) => {
    
    let listaNueva = [];

    
    for (let i = 0; i < list.length; i++) {
        let elemento = list[i];
        if (elemento.id === indexId) {
            if (elemento.completed === true) {
                elemento.completed = false;
            } else {
                elemento.completed = true;
            }
        }
        
        
        listaNueva.push(elemento);
    }

    setList(listaNueva);
};

    

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card shadow border-0" style={{ maxWidth: "450px", width: "100%", borderRadius: "25px" }}>
                
                
                <div className="text-center bg-white" style={{ borderRadius: "25px 25px 0 0", overflow: "hidden" }}>
                    
                    
                    <div className="p-3 d-flex justify-content-between align-items-center text-white" 
                         style={{ backgroundColor: "var(--color-primario)" }}>
                        <div style={{ width: "24px" }}></div> 
                        <img
                            src={logoApp}
                            alt="Logo Baby Zzzync"
                            style={{ width: "120px", height: "auto" }}
                        />
                        <i className="fas fa-bars fa-lg text-white-50"></i>
                    </div>

                   
                    <div className="p-3">
                        <h5 className="fw-bold text-dark mt-2 mb-3 text-uppercase" style={{ letterSpacing: "1px" }}>Leo</h5>
                        <div className="d-flex justify-content-center align-items-center mb-2">
                            <div className="position-relative d-flex align-items-center justify-content-center" 
                                 style={{ 
                                    width: "80px", 
                                    height: "80px", 
                                    borderRadius: "50%", 
                                    border: "5px solid #f0f0f0", 
                                    borderTopColor: "var(--color-primario)"
                                 }}>
                                <span className="fw-bold text-dark" style={{ fontSize: "1.2rem" }}>{progress}%</span>
                            </div>
                        </div>
                        <p className="text-muted small mb-0 fw-bold">Daily progress</p>
                    </div>
                </div>
                <hr className="m-0 text-muted opacity-25" />

                <div className="card-body p-4">
                    
                    <div className="mb-4 bg-light p-3 rounded-4 shadow-sm border">
                        <input type="text" className="form-control mb-2 border-0 shadow-sm" placeholder="Actividad (ej: Biberón)" value={task} onChange={(e) => setTask(e.target.value)} />
                        <input type="text" className="form-control mb-2 border-0 shadow-sm" placeholder="Hora (ej: 12:00)" value={time} onChange={(e) => setTime(e.target.value)} />
                        <select className="form-select mb-3 border-0 shadow-sm" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="milk">Biberón / Leche</option>
                            <option value="sleep">Sueño / Siesta</option>
                            <option value="diaper">Cambio Pañal</option>
                        </select>
                        <button className="btn w-100 text-white fw-bold shadow-sm" style={{ backgroundColor: "var(--color-primario)", borderRadius: "10px" }} onClick={handleAddTask}>
                            Añadir Actividad
                        </button>
                    </div>

                    
                    <div className="list-container" style={{ maxHeight: "400px", overflowY: "auto" }}>
                        {list.map((item) => (
                            <div key={item.id} className="card mb-3 shadow-sm border-0 rounded-4 overflow-hidden">
                                <div className="row g-0 align-items-center">
                                    <div className="col-8 p-3 d-flex align-items-center">
                                        <div className="me-3 p-2 bg-light rounded-3 text-center" style={{ width: "45px" }}>
                                            {getCategoryIcon(item.category)}
                                        </div>
                                        <div>
                                            <h6 className="fw-bold text-dark m-0">{item.text}</h6>
                                            <p className="text-muted small m-0">{item.time}</p>
                                        </div>
                                    </div>
                                    <div className="col-4 h-100">
                                        <button 
                                            className={`btn w-100 h-100 text-white rounded-0 py-3 fw-bold border-0 ${item.completed ? 'btn-info' : ''}`} 
                                            style={!item.completed ? { backgroundColor: "#7F26E6" } : {}} 
                                            onClick={() => toggleComplete(item.id)}
                                        >
                                            {item.completed ? 'Hecho' : 'Completar'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};