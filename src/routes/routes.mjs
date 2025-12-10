import express from "express";
import {obtenerTodosLosPaisesController, crearNuevoPaisController, actualizarPaisController, eliminarPaisPorIDController, obtenerPorIDController, cargarApiController} from "../controller/countrieController.mjs"


const routes= express.Router();

routes.get('/pais/cargarapi', cargarApiController);

export default routes;   