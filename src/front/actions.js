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

        // ELIMINAR HIJO (Permanente en BD)
        deleteHijo: async (hijoId) => {
            try {
                const resp = await fetch(`${backendUrl}/api/hijos/${hijoId}`, {
                    method: "DELETE"
                });
                
                if (resp.ok) {
                    // Si el borrado en el servidor fue exitoso, actualizamos el store
                    dispatch({ type: 'delete_hijo', payload: hijoId });
                    
                    // Opcional: Recargamos datos de autorizados por si se borraron en cascada
                    const user = JSON.parse(localStorage.getItem("user"));
                    if (user) {
                        const respData = await fetch(`${backendUrl}/api/parent-data/${user.id}`);
                        const data = await respData.json();
                        dispatch({ type: 'set_autorizados', payload: data.autorizados });
                    }
                    return true;
                }
                return false;
            } catch (error) {
                console.error("Error eliminando hijo:", error);
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
        }
    };
};