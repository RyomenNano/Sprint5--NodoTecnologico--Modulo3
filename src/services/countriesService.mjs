import paisRepository from "../repository/paisRepository.mjs";
import axios from "axios";

export async function obtenerTodosLosPaises(){
    return await SuperHeroRepository.obtenerSuperheroes();
}

export async function crearNuevoPais(data){

}

export async function actualizarPais(data, id){
    const datosActualizados={

        }
    return await paisRepository.actualizarPais(datosActualizados, id);
}

export async function eliminarPaisPorID(id){
    return await paisRepository.borrarPaisPorID(id);
} 

export async function obtenerPorID(ID){
    return await paisRepository.obtenerPorID(ID);
}

export async function cargarApi(){

    const url = "https://restcountries.com/v3.1/region/america";
    const res = await axios.get(url);
    let paises = res.data;

    // Solo países que hablen español
    paises = paises.filter(p => p.languages?.spa);

    const paisesTransformados = paises.map(p => ({
        nombrePais: p.name?.common ?? "",
        nombreCapital: p.capital?.[0] ?? "Sin capital",
        poblacion: p.population ?? 0,
        continente: p.region ?? "",
        lenguajesHabaldos: p.languages ? Object.values(p.languages) : [],
        bandera: [p.flags?.png ?? p.flags?.svg ?? ""],
        zonasHorarias: p.timezones ?? [],
        creador: "Restcountries.com"
    }));

    // Guardar en BD
    await paisRepository.guardarVariosPaises(paisesTransformados);

    return paisesTransformados;
}