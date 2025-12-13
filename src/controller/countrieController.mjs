import {obtenerTodosLosPaises, obtenerPorID, crearNuevoPais, actualizarPais, eliminarPaisPorID, cargarApi, borrarDatos} from '../services/countriesService.mjs';

// Función para obtener todos los paises y cargarlos en el dashboard

export async function obtenerTodosLosPaisesController(req, res){ 
    try {
        // Llama al servicio para obtener la lista
        const paises = await obtenerTodosLosPaises();

        // Suma la cantidad de habitantes de cada país
        const totalPoblacion = paises.reduce((i, p) => i + (p.poblacion || 0), 0);
        // Suma la cantidad de área que cubre cada país
        const totalArea = paises.reduce((i, p) => i + (p.area || 0), 0);
        // Filtra los gini que sean null/NaN y les asigna valor 0
        const giniValores = paises.map(p => {
            const valor = Number(p.gini);
            return isNaN(valor) ? 0 : valor;
        });
        // Calcula el porcentaje promedio de todos los gini de cada país (contando los que no tienen datos)
        const promedioGini = giniValores.reduce((i, g) => i + g, 0) / giniValores.length;

        // Renderizamos el dashboard llevandole todos los datos y redondeando el resultado de gini a 2 decimales

        res.render("dashboard", { paises, totalPoblacion, totalArea, promedioGini: promedioGini.toFixed(2) });

    } catch(error){
        res.status(500).send({mensaje: 'Error al obtener los pais', error: error.message})
    } 
} 

export async function exportarListaDePaisesController(req, res){

    try {
        const paises = await obtenerTodosLosPaises();

    const encabezados = [
            "NombrePais",
            "Capital",
            "Poblacion",
            "Area",
            "Region",
            "Bordes",
            "Gini",
            "LenguajesHablados",
            "Bandera",
            "ZonasHorarias",
            "Creador"
        ].join(";");

    const filas = paises.map(p => [
            p.nombrePais,
            p.nombreCapital,
            p.poblacion,
            p.area,
            p.region,
            p.bordes,
            p.gini,
            p.lenguajesHablados,
            p.bandera,
            p.zonasHorarias,
            p.creador
        ].join(";") );

    const csv = [encabezados, ...filas].join("\n");

    res.setHeader("Content-Disposition", "attachment; filename=paises.csv");
    res.setHeader("Content-Type", "text/csv");
    res.send(csv);
    } catch (error) {
        res.status(500).send("Error al exportar CSV");
    }
}

export async function crearNuevoPaisController(req, res){
    try {
        const data = req.body;

        const pais= await crearNuevoPais(data);
        if(pais){
            res.status(200).redirect("/dashboard");
        }
    } catch (error) {
        res.status(500).send({mensaje: 'Error al crear pais', error: error.message})
    }
}

export async function actualizarPaisController(req, res){
    console.log("BODY AL ACTUALIZAR:", req.body); 
    try {
        const data= req.body;
        const {id}= req.params;
        
        const pais =  await actualizarPais(data, id);
        if (!pais) return res.status(404).send({ mensaje: "Pais no encontrado" });  
        return res.redirect("/dashboard");
    } catch (error) {
        res.status(500).send({mensaje: 'Error al actualizar pais', error: error.message})
    }
}

export async function eliminarPaisPorIDController(req, res){
        try {
        const {id}= req.params;
        console.log(id);
        const paisEliminado = await eliminarPaisPorID(id);
        if (paisEliminado){
            const paises = await obtenerTodosLosPaises();
            res.redirect('/dashboard');
        }
    } catch (error) {
        res.status(500).send({mensaje: 'Error al eliminar pais', error: error.message})
    }
}


export async function obtenerPorIDController(req,res){
    try {
        const {id} = req.params;
        const pais = await obtenerPorID(id);
        if (pais){
            res.render("editCountry", { pais });
        }
    } catch (error) {
        res.status(500).send({mensaje: 'Error al encontrar el pais', error: error.message});
    }
}

export async function cargarApiController(req,res){
    try {
        await cargarApi();
        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).send({mensaje: 'Error al cargar los paises', error: error.message});
    }
}

export async function borrarDatosController(req,res){
    try {
        await borrarDatos();
        res.redirect('/dashboard');
    } catch (error) {
        
    }
}