export const initialStore = () => {
  return {
    message: null,
    hijos: [], 
    autorizados: [], 
    todos: [
      { id: 1, title: "Make the bed", background: null },
      { id: 2, title: "Do my homework", background: null }
    ]
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'add_hijo':
      return {
        ...store,
        hijos: [...store.hijos, action.payload]
      };

    // CASO PARA ELIMINAR HIJO
    case 'delete_hijo':
      return {
        ...store,
        hijos: store.hijos.filter((hijo) => hijo.id !== action.payload)
      };

    // CASOS PARA AUTORIZADOS
    case 'add_autorizado':
      return {
        ...store,
        autorizados: [...store.autorizados, action.payload]
      };

    case 'delete_autorizado':
      return {
        ...store,
        autorizados: store.autorizados.filter((auth) => auth.id !== action.payload)
      };
    

    case 'set_hello':
      return { ...store, message: action.payload };

    case 'add_task':
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    default:      
      throw Error('Unknown action.');
  }
}
