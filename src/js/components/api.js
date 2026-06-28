const urlBase = "https://playground.4geeks.com/todo";

export const apiService = {
    obtenerTareas: async (usuario) => {
        const respuesta = await fetch(`${urlBase}/users/${usuario}`);
        if (respuesta.status === 404) return null;
        return await respuesta.json();
    },

    crearUsuario: async (usuario) => {
        const respuesta = await fetch(`${urlBase}/users/${usuario}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });
        return respuesta.ok;
    },

    agregarTarea: async (usuario, etiqueta) => {
        const respuesta = await fetch(`${urlBase}/todos/${usuario}`, {
            method: "POST",
            body: JSON.stringify({ label: etiqueta, is_done: false }),
            headers: { "Content-Type": "application/json" }
        });
        return respuesta.ok;
    },

    eliminarTarea: async (id) => {
        const respuesta = await fetch(`${urlBase}/todos/${id}`, {
            method: "DELETE"
        });
        return respuesta.ok;
    },

    borrarUsuario: async (usuario) => {
        const respuesta = await fetch(`${urlBase}/users/${usuario}`, {
            method: "DELETE"
        });
        return respuesta.ok;
    }
};