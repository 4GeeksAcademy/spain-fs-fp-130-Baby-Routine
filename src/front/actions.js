const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const actions = (store, dispatch) => {
    return {
        // Carga inicial de datos (Hijos y Autorizados)
        loadParentData: async (userId) => {
            try {
                const resp = await fetch(`${backendUrl}/api/parent-data/${userId}`);
                if (!resp.ok) throw new Error("Error cargando datos");
                const data = await resp.json();
                
                dispatch({ type: 'set_hijos', payload: data.hijos });
                dispatch({ type: 'set_autorizados', payload: data.autorizados });
            } catch (error) {
                console.error("Error en loadParentData:", error);
            }
        },

        // Añadir un nuevo hijo
        addHijo: async (hijoData) => {
            try {
                const resp = await fetch(`${backendUrl}/api/hijos`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(hijoData)
                });
                if (resp.ok) {
                    const data = await resp.json();
                    dispatch({ type: 'add_hijo', payload: data.hijo });
                    return true;
                }
                return false;
            } catch (error) {
                console.error("Error al añadir hijo:", error);
                return false;
            }
        },

        // Eliminar hijo 
        deleteHijo: async (hijoId) => {
            const token = localStorage.getItem("token");
            try {
                const resp = await fetch(`${backendUrl}/api/hijos/${hijoId}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                
                if (resp.ok) {                    
                    dispatch({ type: 'delete_hijo', payload: hijoId });
                    
                    const user = JSON.parse(localStorage.getItem("user"));
                    if (user) {
                        const respData = await fetch(`${backendUrl}/api/parent-data/${user.id}`);
                        if (respData.ok) {
                            const data = await respData.json();
                            dispatch({ type: 'set_autorizados', payload: data.autorizados });
                        }
                    }
                    return true;
                }
                
                const errorData = await resp.json();
                console.error("Respuesta del servidor:", errorData.msg);
                return false;
            } catch (error) {
                console.error("Error de red eliminando hijo:", error);
                return false;
            }
        },

        // Añadir un nuevo autorizado
        addAutorizado: async (authData) => {
            try {
                const resp = await fetch(`${backendUrl}/api/autorizados`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(authData)
                });
                if (resp.ok) {
                    const data = await resp.json();
                    dispatch({ type: 'add_autorizado', payload: data.autorizado });
                    return true;
                }
                return false;
            } catch (error) {
                console.error("Error al añadir autorizado:", error);
                return false;
            }
        },

        // Eliminar autorizado
        deleteAutorizado: async (authId) => {
            try {
                const resp = await fetch(`${backendUrl}/api/autorizados/${authId}`, {
                    method: "DELETE"
                });
                
                if (resp.ok) {                    
                    dispatch({ type: 'delete_autorizado', payload: authId });
                    return true;
                }
                return false;
            } catch (error) {
                console.error("Error eliminando autorizado:", error);
                return false;
            }
        },

        // Eliminar rutina compartida dese la Vista del Cuidador
        deleteRutinaCompartida: async (asignacionId) => {
            const token = localStorage.getItem("token");
            try {
                const resp = await fetch(`${backendUrl}/api/cuidador/rutinas/${asignacionId}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                
                if (resp.ok) {
                    
                    return true;
                }
                
                const errorData = await resp.json();
                console.error("Error del servidor:", errorData.msg);
                return false;
            } catch (error) {
                console.error("Error de red eliminando rutina compartida:", error);
                return false;
            }
        }
    };
};