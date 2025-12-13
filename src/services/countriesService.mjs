import PaisRepository from "../repository/paisRepository.mjs";
import axios from "axios";

// Servicio para obtener todos los paises (usados para el dashboard y crear el CSV)
export async function obtenerTodosLosPaises(){
    // Llamamos al metodo del repositorio para obtener los paises
    return await PaisRepository.obtenerPaises();
}

// Servicio para crear nuevo pais (usado por crear nuevo pais)
export async function crearNuevoPais(data){
    // Creamos un array que acomoda todos los datos recibidos del formulario de addCountry
    const datos={
        "nombrePais": data.nombrePais || "",
        "nombreCapital": data.nombreCapital || [],
        "area": data.area || NaN,
        "poblacion": data.poblacion || NaN,
        "region": data.region || "",
        "bordes": data.border || [],
        "gini": data.gini || [],
        "lenguajesHablados": data.lenguajesHablados || [],
        "bandera": data.bandera || [],
        "zonasHorarias": data.zonasHorarias || [],
        "creador": data.creador
        // Si no éxiste datos, se los remplaza por un valor vacío válido para el tipo de dato
        }
    // Se llama al metodo crearPais del repositorio y se le envia los datos
    return await PaisRepository.crearPais(datos);
}

// Servicio para actualizar pais (Usado por actualizarPais)
export async function actualizarPais(data, id){
    // Se arma un array nuevo con todos los datos del formulario de editCountry tanto los originales como los modificados
    const datosActualizados={
        "nombrePais": data.nombrePais || "",
        "nombreCapital": data.nombreCapital || [],
        "area": data.area ? parseInt(data.area) : 0,
        "poblacion": data.poblacion ? parseInt(data.poblacion) : 0,
        "region": data.region || "",
        "bordes": data.bordes || [],
        "gini": data.gini ? parseFloat(data.gini) : 0,
        "lenguajesHablados": data.lenguajesHablados || [],
        "bandera": data.bandera || [],
        "zonasHorarias": data.zonasHorarias || [],
        "creador": data.creador || "Desconocido"
        }
    // Se llama al metodo de actualizar y se le envia los datos y el ID
    return await PaisRepository.actualizarPais(datosActualizados, id);
}

// Servicio para borrar pais usado por eliminarPais
export async function eliminarPaisPorID(id){
    // Se llama al metodo y se le envia el ID recibido por el controller
    return await PaisRepository.borrarPaisPorID(id);
} 

export async function obtenerPorID(ID){
    return await PaisRepository.obtenerPorID(ID);
}

export async function cargarApi(){

    const url = "https://restcountries.com/v3.1/region/america";
    const res = await axios.get(url);
    let paises = res.data;

    paises = paises.filter(p => p.languages?.spa);

    const paisesTransformados = paises.map(p => ({
        nombrePais: p.name?.common ?? "",
        nombreCapital: p.capital ?? "Sin capital",
        area: p.area ?? 0,
        poblacion: p.population ?? 0,
        region: p.region ?? "",
        bordes: p.borders ?? [],
        gini: p.gini ? p.gini[Math.max(...Object.keys(p.gini))] : [null],
        lenguajesHablados: p.languages ? Object.keys(p.languages).map(Codigo=> Codigo.toUpperCase()) : [],
        bandera: [p.flags?.png ?? p.flags?.svg ?? ""],
        zonasHorarias: p.timezones ?? [],
        creador: "Restcountries.com"
    }));

    await PaisRepository.cargarApi(paisesTransformados);

    return paisesTransformados;
}

export async function borrarDatos(){
    return await PaisRepository.borrarDatos()
}