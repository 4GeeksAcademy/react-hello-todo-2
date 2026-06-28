import React, { useEffect, useState } from "react";
import { apiService } from "./api.js";

const TodoList = () => {
    const [tarea, setTarea] = useState("");
    const [lista, setLista] = useState([]);
    const usuario = "emmanuel"; 

    const cargarTodo = async () => {
        try {
            const datos = await apiService.obtenerTareas(usuario);
            if (datos === null) {
                await apiService.crearUsuario(usuario);
                setLista([]);
            } else {
                setLista(datos.todos || []);
            }
        } catch (error) {
            console.error("error al cargar:", error);
        }
    };

    const handlechange = (event) => {
        setTarea(event.target.value);
    };

    const enviarLista = async (event) => {
        event.preventDefault();  
        if (tarea.trim() !== "") {
            try {
                const exito = await apiService.agregarTarea(usuario, tarea);
                if (exito) {
                    setTarea("");
                    await cargarTodo();
                }
            } catch (error) {
                console.error("error al agregar:", error);
            }
        }
    };

    const eliminarTarea = async (idObjeto) => {
        try {
            const exito = await apiService.eliminarTarea(idObjeto);
            if (exito) {
                await cargarTodo();
            }
        } catch (error) {
            console.error("error al eliminar:", error);
        }
    };

    const limpiarTodo = async () => {
        try {
            const exito = await apiService.borrarUsuario(usuario);
            if (exito) {
                setLista([]);
                await apiService.crearUsuario(usuario);
            }
        } catch (error) {
            console.error("error al limpiar todo:", error);
        }
    };

    useEffect(() => {
        cargarTodo();
    }, []); 

    return (
        <>
            <h1>Esta es mi lista </h1>
            
            <form onSubmit={enviarLista}> 
                <input 
                    type="text" 
                    placeholder="ingresa tu lista"
                    value={tarea}
                    onChange={handlechange}
                />
            </form>
            
            
                {lista.map((cadaTarea) => {
                    return (
                        <li key={cadaTarea.id}>
                            {cadaTarea.label}
                            <button onClick={() => eliminarTarea(cadaTarea.id)}>
                                X
                            </button>
                        </li>
                    );
                })}
            

            <button onClick={limpiarTodo} style={{ marginTop: "15px", padding: "5px 10px", color: "red" }}>
                Limpiar todo del servidor
            </button>
        </>
    );
};

export default TodoList;