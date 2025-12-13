import PaisRepository from "../repository/paisRepository.mjs";
import axios from "axios";

export async function obtenerTodosLosPaises(){
    return await PaisRepository.obtenerPaises();
}

export async function crearNuevoPais(data){
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
        }

    return await PaisRepository.crearPais(datos)
}

export async function actualizarPais(data, id){
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

    return await PaisRepository.actualizarPais(datosActualizados, id);
}

export async function eliminarPaisPorID(id){
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