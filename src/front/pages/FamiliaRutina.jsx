import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logoApp from "../assets/Logo Baby Zzync 1 - vers blanca.png";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { Dialog, DialogContent, DialogActions, DialogTitle, Button, Typography, TextField, MenuItem, Snackbar, Alert } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

const getCategoryIcon = (category) => {
    switch (category) {
        case 'milk': return <i className="fas fa-tint fa-lg" style={{ color: 'var(--color-alimentacion)' }}></i>;
        case 'sleep': return <i className="fas fa-moon fa-lg" style={{ color: 'var(--color-descanso)' }}></i>;
        case 'diaper': return <i className="fas fa-baby fa-lg" style={{ color: 'var(--color-cambio-pañal)' }}></i>;
        case 'medicine': return <i className="fas fa-capsules fa-lg" style={{ color: 'var(--color-medicacion)' }}></i>;
        case 'exercise': return <i className="fas fa-running fa-lg" style={{ color: 'var(--color-tiempo-de-ejercicio)' }}></i>;
        default: return <i className="fas fa-star fa-lg text-warning"></i>;
    }
};

const getCategoryColor = (category) => {
    switch (category) {
        case 'milk': return 'var(--color-alimentacion)';
        case 'sleep': return 'var(--color-descanso)';
        case 'diaper': return 'var(--color-cambio-pañal)';
        case 'medicine': return 'var(--color-medicacion)';
        case 'exercise': return 'var(--color-tiempo-de-ejercicio)';
        default: return 'var(--color-primario)';
    }
};

export const FamiliaRutina = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [task, setTask] = useState("");
    const [time, setTime] = useState(dayjs());
    const [category, setCategory] = useState("");
    
    const storageKey = `tasks_routine_${id}`;

    const [list, setList] = useState(() => {
        const savedList = localStorage.getItem(storageKey);
        return savedList ? JSON.parse(savedList) : [];
    });

    useEffect(() => {
        if (id) {
            localStorage.setItem(storageKey, JSON.stringify(list));
        }
    }, [list, storageKey, id]);

    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const showMessage = (msg, sev = "success") => setSnackbar({ open: true, message: msg, severity: sev });
    const [openTimeModal, setOpenTimeModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [errors, setErrors] = useState({ task: false, category: false });

    const counts = list.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
    }, {});

    const handleAddTask = () => {
        const newTaskError = task.trim() === "";
        const newCategoryError = category === "";
        setErrors({ task: newTaskError, category: newCategoryError });

        if (!newTaskError && !newCategoryError) {
            const nuevaActividad = {
                id: Date.now(),
                text: task,
                time: time.format("HH:mm"),
                category: category,
            };
            const nuevaLista = [...list, nuevaActividad].sort((a, b) => a.time.localeCompare(b.time));
            setList(nuevaLista);
            setTask("");
            setCategory("");
            showMessage("Actividad añadida correctamente");
        }
    };

    const handleOpenEdit = (item) => {
        setEditingItem({ ...item, time: dayjs(`2024-01-01 ${item.time}`) });
        setOpenEditModal(true);
    };

    const handleUpdateTask = () => {
        if (editingItem.text.trim() === "") return;
        const listaActualizada = list.map(item => {
            if (item.id === editingItem.id) {
                return { ...editingItem, time: editingItem.time.format("HH:mm") };
            }
            return item;
        }).sort((a, b) => a.time.localeCompare(b.time));
        setList(listaActualizada);
        setOpenEditModal(false);
        showMessage("Actividad actualizada");
    };

    const handleDeleteFromEdit = () => {
        setList(list.filter(item => item.id !== editingItem.id));
        setOpenEditModal(false);
        showMessage("Actividad eliminada", "info");
    };

    return (
        <div className="bg-registro">
            <div className="mobile-container d-flex flex-column">
                
                <div className="text-center bg-white" style={{ borderRadius: "25px 25px 0 0", overflow: "hidden" }}>
                    <div className="d-flex align-items-center justify-content-between p-3" style={{ backgroundColor: "var(--color-primario)", minHeight: "80px" }}>
                        <div style={{ width: "24px", cursor: "pointer" }} onClick={() => navigate(-1)}>
                            <i className="fas fa-arrow-left fa-lg text-white"></i>
                        </div>
                        <img src={logoApp} alt="Logo Baby Zzzync" style={{ width: "150px", height: "auto" }} />
                        <i className="fas fa-bars fa-lg text-white"></i>
                    </div>
                </div>

                <hr className="m-0 text-muted opacity-25" />

                <div className="card-body p-4" style={{ overflowY: "auto" }}>
                    
                    <div className="mb-4 bg-light p-3 rounded-4 shadow-sm border">
                        <input type="text" className={`form-control mb-1 border-0 shadow-sm ${errors.task ? 'is-invalid' : ''}`} placeholder="Actividad (ej: Biberón)" value={task} onChange={(e) => setTask(e.target.value)} />
                        {errors.task && <small className="text-danger ms-2 mb-2 d-block">Escribe una actividad</small>}

                        <button type="button" className="btn w-100 mb-3 mt-2 border-0 shadow-sm d-flex justify-content-between align-items-center px-3 bg-white" onClick={() => setOpenTimeModal(true)}>
                            <span className="fw-bold" style={{ color: "var(--color-primario)" }}>Hora: {time.format("HH:mm")}</span>
                            <i className="far fa-clock"></i>
                        </button>

                        <select className={`form-select mb-1 border-0 shadow-sm ${errors.category ? 'is-invalid' : ''}`} value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="" disabled>SELECCIONAR CATEGORÍA</option>
                            <option value="milk">ALIMENTACIÓN</option>
                            <option value="sleep">DESCANSO</option>
                            <option value="diaper">CAMBIO DE ROPA</option>
                            <option value="medicine">MEDICACIÓN</option>
                            <option value="exercise">TIEMPO DE EJERCICIO</option>
                        </select>
                        {errors.category && <small className="text-danger ms-2 mb-2 d-block">Selecciona una categoría</small>}

                        <button className="btn w-100 text-white fw-bold shadow-sm mt-2" style={{ backgroundColor: "var(--color-primario)", borderRadius: "10px" }} onClick={handleAddTask}>
                            Añadir Actividad
                        </button>
                    </div>

                    {list.length > 0 && (
                        <div className="d-flex justify-content-between mb-4 p-2 bg-white rounded-4 shadow-sm border overflow-auto" style={{ gap: "10px" }}>
                            {['milk', 'sleep', 'diaper', 'medicine', 'exercise'].map(cat => (
                                counts[cat] > 0 && (
                                    <div key={cat} className="text-center px-2">
                                        <div style={{ fontSize: '1.2rem' }}>{getCategoryIcon(cat)}</div>
                                        <span className="fw-bold small">{counts[cat]}</span>
                                    </div>
                                )
                            ))}
                        </div>
                    )}

                    <div className="list-container">
                        {list.length === 0 ? (
                            <div className="text-center py-5 opacity-50">
                                <i className="fas fa-calendar-day fa-4x mb-3" style={{ color: "var(--color-primario)" }}></i>
                                <Typography className="fw-bold">¡Día despejado!</Typography>
                            </div>
                        ) : (
                            list.map((item) => (
                                <div key={item.id} className="card mb-3 shadow-sm border-0 rounded-4 overflow-hidden bg-white" style={{ borderLeft: `6px solid ${getCategoryColor(item.category)}` }}>
                                    <div className="row g-0 align-items-stretch">
                                        <div className="col-8 p-3 d-flex align-items-center">
                                            <div className="me-3 p-2 bg-light rounded-3 text-center" style={{ width: "45px" }}>{getCategoryIcon(item.category)}</div>
                                            <div className="text-truncate">
                                                <h6 className="fw-bold m-0 text-dark">{item.text}</h6>
                                                <p className="small m-0 text-muted">{item.time}</p>
                                            </div>
                                        </div>
                                        <div className="col-4 d-flex">
                                            <button className="btn w-100 border-0 rounded-0 text-white fw-bold" style={{ backgroundColor: getCategoryColor(item.category), fontSize: "0.75rem" }} onClick={() => handleOpenEdit(item)}>
                                                EDITAR
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)} fullWidth maxWidth="xs" slotProps={{ paper: { style: { borderRadius: 25, padding: "10px" } } }}>
                <DialogTitle className="fw-bold text-center">Editar Actividad</DialogTitle>
                <DialogContent>
                    <TextField label="Actividad" fullWidth variant="outlined" margin="dense" value={editingItem?.text || ""} onChange={(e) => setEditingItem({ ...editingItem, text: e.target.value })} sx={{ mb: 2, mt: 1 }} />
                    <TextField select label="Categoría" fullWidth value={editingItem?.category || ""} onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })} sx={{ mb: 2 }}>
                        <MenuItem value="milk">ALIMENTACIÓN</MenuItem>
                        <MenuItem value="sleep">DESCANSO</MenuItem>
                        <MenuItem value="diaper">CAMBIO DE ROPA</MenuItem>
                        <MenuItem value="medicine">MEDICACIÓN</MenuItem>
                        <MenuItem value="exercise">TIEMPO DE EJERCICIO</MenuItem>
                    </TextField>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                        <StaticTimePicker displayStaticWrapperAs="mobile" value={editingItem?.time || dayjs()} onChange={(newValue) => setEditingItem({ ...editingItem, time: newValue })} slotProps={{ actionBar: { actions: [] } }} />
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions className="flex-column gap-2 p-4">
                    <Button fullWidth onClick={handleUpdateTask} variant="contained" style={{ backgroundColor: "var(--color-primario)", borderRadius: "12px", fontWeight: "bold", padding: "10px" }}>ACTUALIZAR CAMBIOS</Button>
                    <div className="d-flex w-100 gap-2">
                        <Button fullWidth onClick={() => setOpenEditModal(false)} variant="outlined" style={{ borderRadius: "10px", color: "#6c757d", borderColor: "#6c757d" }}>Cerrar</Button>
                        <Button fullWidth onClick={handleDeleteFromEdit} style={{ color: "#dc3545", fontWeight: "bold" }}><i className="fas fa-trash-alt me-2"></i> ELIMINAR</Button>
                    </div>
                </DialogActions>
            </Dialog>

            <Dialog open={openTimeModal} onClose={() => setOpenTimeModal(false)} slotProps={{ paper: { style: { borderRadius: 20 } } }}>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                        <StaticTimePicker displayStaticWrapperAs="mobile" value={time} onChange={(newValue) => setTime(newValue)} slotProps={{ actionBar: { actions: [] } }} />
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions className="justify-content-center pb-4">
                    <Button onClick={() => setOpenTimeModal(false)} variant="contained" className="w-75" style={{ backgroundColor: "var(--color-primario)", borderRadius: "12px", fontWeight: "bold" }}>CONFIRMAR HORA</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%', borderRadius: '15px' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
};