import express from "express";
import {obtenerTodosLosPaisesController, crearNuevoPaisController, actualizarPaisController, eliminarPaisPorIDController, obtenerPorIDController, cargarApiController, borrarDatosController, exportarListaDePaisesController} from "../controller/countrieController.mjs";
import {FormularioValidationRules} from "../validations/validationsRules.mjs";
import {handleValidationErrors} from "../validations/errorMiddleware.mjs";
import {TransformarCampos} from "../validations/transformacionDeDatos.mjs"

// Función con todas las rutas

const routes= express.Router();

// Defino la página principal index y otra página que es Acerca de, que no guardian lógica importante

routes.get('/', (req, res) => {res.render("index");});
routes.get('/pais/acercaDe', (req, res) => {res.render("nosotros");});

// Defino rutas las cuales se acceden manualmente en la URL. Sirve para cargar los datos de la API y borrar todos los datos de la base de datos

routes.get('/pais/cargarApi', cargarApiController);
routes.get('/pais/eliminarDatos', borrarDatosController);

// Rutas para la lista de paises y otra para exportar está misma lista

routes.get('/dashboard', obtenerTodosLosPaisesController);
routes.get('/dashboard/exportar', exportarListaDePaisesController);

// Rutas para enviar los datos al controller mediante POST y otra ruta para ingresar el formulario que contiene esos datos

routes.post('/pais/agregar', TransformarCampos, FormularioValidationRules(), handleValidationErrors, crearNuevoPaisController);
routes.get('/addCountry', (req, res) => {res.render("addCountry");});

// Ruta para una función de buscar cierto pais por ID (esté no se ingresa manualmente)

routes.get('/pais/:id', obtenerPorIDController);

// Rutas para obtener el formulario de editar pais ya precargado y otro para recibir los datos y guardarlos

routes.get('/pais/:id/editar', obtenerPorIDController);
routes.put('/pais/:id/editar', TransformarCampos, FormularioValidationRules(), handleValidationErrors, actualizarPaisController);

// Ruta para eliminar pais mediante un ID
routes.delete('/pais/:id', eliminarPaisPorIDController);

export default routes;   