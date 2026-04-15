import React, { createContext, useState } from "react";

export const HijosContext = createContext();

export const HijosProvider = ({ children }) => {
    const [hijos, setHijos] = useState([]);

    const agregarHijo = (nuevoHijo) => {
        setHijos(prevHijos => [...prevHijos, nuevoHijo]);
    };

    // Función para eliminar
    const eliminarHijo = (id) => {
        setHijos(prevHijos => prevHijos.filter(hijo => hijo.id !== id));
    };

    return (
        <HijosContext.Provider value={{ hijos, agregarHijo, eliminarHijo }}>
            {children}
        </HijosContext.Provider>
    );
};