import React, { useState } from "react";
import logoApp from "../assets/Logo Baby Zzync 1 - vers blanca.png";

const getCategoryIcon = (category) => {
    switch (category) {
        case 'milk': return <i className="fas fa-baby-carriage fa-lg text-primary"></i>; 
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

    // Cálculo de progreso seguro (evita NaN)
    const progress = list.length > 0 
        ? Math.round((list.filter(t => t.completed).length / list.length) * 100) 
        : 0;

    const handleAddTask = () => {
        if (task.trim() !== "" && time.trim() !== "") {
            const newTask = {
                id: Date.now(),
                text: task,
                time: time,
                category: category,
                completed: false
            };
            setList([...list, newTask]);
            setTask("");
            setTime("");
        }
    };

    const toggleComplete = (id) => {
        setList(list.map(item => 
            item.id === id ? { ...item, completed: !item.completed } : item
        ));
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card shadow border-0" style={{ maxWidth: "450px", width: "100%", borderRadius: "25px" }}>
                
                {/* Banner con Logo (Copiado de tu estilo Login) */}
                <div className="p-4 text-center text-white" style={{ backgroundColor: "var(--color-primario)", borderRadius: "25px 25px 0 0" }}>
                    <img
                        src={logoApp}
                        alt="Logo Baby Zzzync"
                        style={{ width: "160px", height: "auto", marginBottom: "10px" }}
                    />
                    <div className="d-flex justify-content-center align-items-center mt-2">
                        <div className="position-relative" style={{ width: "60px", height: "60px" }}>
                            {/* Círculo de progreso simple */}
                            <div className="d-flex align-items-center justify-content-center w-100 h-100 rounded-circle border border-2 border-white">
                                <small className="fw-bold">{progress}%</small>
                            </div>
                        </div>
                    </div>
                    <h5 className="fw-bold mt-2 mb-0 text-uppercase">Leo</h5>
                </div>

                <div className="card-body p-4">
                    {/* Formulario para añadir */}
                    <div className="mb-4 bg-light p-3 rounded-4 shadow-sm">
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

                    {/* Lista de tareas */}
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
                                        {item.completed ? (
                                            <button className="btn btn-info w-100 h-100 text-white rounded-0 py-3 fw-bold" onClick={() => toggleComplete(item.id)}>
                                                Hecho <i className="fas fa-check-circle ms-1"></i>
                                            </button>
                                        ) : (
                                            <button className="btn w-100 h-100 text-white rounded-0 py-3 fw-bold" style={{ backgroundColor: "#7F26E6" }} onClick={() => toggleComplete(item.id)}>
                                                Completar
                                            </button>
                                        )}
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