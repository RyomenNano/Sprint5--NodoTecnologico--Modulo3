import {obtenerTodosLosPaises, obtenerPorID, crearNuevoPais, actualizarPais, eliminarPaisPorID, cargarApi} from '../services/countriesService.mjs';


export async function obtenerTodosLosPaisesController(req, res){ 
    try {
        const pais = await obtenerTodosLosPaises();
        res.render("dashboard", { pais });

    } catch(error){
        res.status(500).send({mensaje: 'Error al obtener los pais', error: error.message})
    } 
} 

export async function crearNuevoPaisController(req, res){
    try {

    } catch (error) {
        res.status(500).send({mensaje: 'Error al crear pais', error: error.message})
    }
}

export async function actualizarPaisController(req, res){
    try {

    } catch (error) {
        res.status(500).send({mensaje: 'Error al actualizar pais', error: error.message})
    }
}

export async function eliminarPaisPorIDController(req, res){
        try {

    } catch (error) {
        res.status(500).send({mensaje: 'Error al eliminar pais', error: error.message})
    }
}


export async function obtenerPorIDController(req,res){
    try {

    } catch (error) {
        res.status(500).send({mensaje: 'Error al encontrar el pais', error: error.message});
    }
}

export async function cargarApiController(req,res){

    try {
        await cargarApi();
        res.send("Paises cargados");
    } catch (error) {
        res.status(500).send({mensaje: 'Error al cargar los paises', error: error.message});
    }
}
