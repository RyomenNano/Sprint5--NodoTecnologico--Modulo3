import {obtenerTodosLosPaises, obtenerPorID, crearNuevoPais, actualizarPais, eliminarPaisPorID, cargarApi, borrarDatos, armarTablaCSV, filtrarLista, tPoblacion, tArea, pGini} from '../services/countriesService.mjs';

// Controller para obtener todos los paises y cargarlos en el dashboards
export async function obtenerTodosLosPaisesController(req, res){ 
    try {
        // Llama al servicio para obtener la lista
        const paises = await obtenerTodosLosPaises();

        // Obtenemos cada resultado de 3 servicios dedicados a cada constante
        const totalPoblacion = tPoblacion(paises);
        const totalArea = tArea(paises);
        const promedioGini = pGini(paises)

        // Renderizamos el dashboard llevandole todos los datos y redondeando el resultado de gini a 2 decimales
        res.render("dashboard", { paises, totalPoblacion, totalArea, promedioGini });

    } catch(error){
        res.status(500).send({mensaje: 'Error al obtener los pais', error: error.message})
    } 
} 

// Controller para crear un archivo csv y descargarlo
export async function exportarListaDePaisesController(req, res){

    try {
        // Llamamos al servicio para armar la tabla
        csv = armarTablaCSV();
        
        // Definimos que al cargar el archivo, se descargue con el nombre paises.csv y en enviamos la respuesta al cliente
        res.setHeader("Content-Disposition", "attachment; filename=paises.csv");
        res.setHeader("Content-Type", "text/csv");
        res.send(csv);
    } catch (error) {
        res.status(500).send("Error al exportar CSV");
    }
}

// Controller para obtener lista filtrada de paises
export async function filtrarListaController(req, res){
    try{
        const {atributo, valor} = req.body;
        const paises = await filtrarLista(atributo, valor);

        // Obtenemos cada resultado de 3 servicios dedicados a cada constante
        const totalPoblacion = tPoblacion(paises);
        const totalArea = tArea(paises);
        const promedioGini = pGini(paises)

        // Renderizamos el dashboard llevandole todos los datos
        res.render("dashboard", { paises, totalPoblacion, totalArea, promedioGini });
    }
    catch(error){
        res.status(500).send({mensaje: 'Error al encontrar los paises', error: error.message});
    }
}

// Controller para crear un nuevo pais
export async function crearNuevoPaisController(req, res){
    try {
        // Recibimos todos los datos del formulario y los guardamos en data
        const data = req.body;

        // Llamamos al servicio de crear enviandole "data" y esperamos a que se guarden, una vez hecho, volvemos a dashboard
        const pais= await crearNuevoPais(data);
        if(pais){
            res.status(200).redirect("/dashboard");
        }
    } catch (error) {
        res.status(500).send({mensaje: 'Error al crear pais', error: error.message})
    }
}

// Controller para modificar los datos de un pais ya existente
export async function actualizarPaisController(req, res){
    try {
        // Guardamos los datos del formulario y el ID que nos da la URL
        const data= req.body;
        const {id}= req.params;
        
        // Llamamos al servicio de actualizar pais enviando los datos necesarios, si nos devuelve un array vació, decimos que el pais no fue encontrado, si todo es correcto, directamente volvemos al Dashboard
        const pais =  await actualizarPais(data, id);
        if (!pais) return res.status(404).send({ mensaje: "Pais no encontrado" });  
        return res.redirect("/dashboard");
    } catch (error) {
        res.status(500).send({mensaje: 'Error al actualizar pais', error: error.message})
    }
}

// Controller para recibir un ID y llamar al servicio para eliminar un pais
export async function eliminarPaisPorIDController(req, res){
        try {
            //Obtenemos el ID de la URl, llamamos al servicio, al eleiminar, se espera un resultado, si éxiste entonces se redirige al dashboard
            const {id}= req.params;
            const paisEliminado = await eliminarPaisPorID(id);
            if (paisEliminado){
                res.redirect('/dashboard');
            }
    } catch (error) {
        res.status(500).send({mensaje: 'Error al eliminar pais', error: error.message})
    }
}

// Controller para obtener pais por su ID, función necesaria para editar paises
export async function obtenerPorIDController(req,res){
    try {
        // Se obtiene el ID y se llama al servicio obtenerPorID enviandole el id obtenido
        const pais = await obtenerPorID(id);
        if (pais){
            // Si éxiste resultado, redirige al formulario para editar paises, enviandole los datos del pais solicitado
            res.render("editCountry", { pais });
        }
    } catch (error) {
        res.status(500).send({mensaje: 'Error al encontrar el pais', error: error.message});
    }
}

// Controller para cargar la API entera en la base de datos
export async function cargarApiController(req,res){
    try {
        // Llamamos al servicio para cargar la API y redirige al dashboard
        await cargarApi();
        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).send({mensaje: 'Error al cargar los paises', error: error.message});
    }
}

// Controller para borrar todos los datos de la base de daots (Incluyendo tanto los datos de la API como las creadas por el usuario)
export async function borrarDatosController(req,res){
    try {
        // Llamamos al servicio de borrar y redirigimos al dashboard
        await borrarDatos();
        res.redirect('/dashboard');
    } catch (error) {
        
    }
}