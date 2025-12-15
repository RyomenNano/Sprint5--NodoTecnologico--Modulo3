import PaisRepository from "../repository/paisRepository.mjs";
import axios from "axios";

// Servicio para obtener todos los paises (usados para el dashboard y crear el CSV)
export async function obtenerTodosLosPaises(){
    // Llamamos al metodo del repositorio para obtener los paises
    return await PaisRepository.obtenerPaises();
}

export function tPoblacion(lista){
    // Suma la cantidad de habitantes de cada país
    return lista.reduce((i, l) => i + (l.poblacion || 0), 0);
} 

export function tArea(lista){
    // Suma la cantidad de área que cubre cada país
    return lista.reduce((i, l) => i + (l.area || 0), 0);
}

export function pGini(lista){
    // Filtra los gini que sean null/NaN y les asigna valor 0
    const giniValores = lista.map(p => {
        const valor = Number(p.gini);
        return isNaN(valor) ? 0 : valor;
    });

    // Calcula el porcentaje promedio de todos los gini de cada país (contando los que no tienen datos)
    const promedioGini = giniValores.reduce((i, g) => i + g, 0) / giniValores.length;
    return promedioGini.toFixed(2);
}

// Lista filtrada segun cierto parámetro
export async function filtrarLista(atributo, valor){
    return await PaisRepository.filtrarPaises(atributo, valor);
}
 
// Servicio para obtener un archivo csv y descargarlo
export async function armarTablaCSV(){
    // Llamamos al método para obtener los paises
        const paises = await PaisRepository.obtenerPaises();

        // Armamos el encabezado para la tabla separados por ;
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

        // Construimos cada fila con los datos correspondientes, separados por ;
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

        // Creamos la tabla uniendo los encabezados y filas, y cada parte se separa por \n
        const csv = [encabezados, ...filas].join("\n");
        return csv
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
    return await PaisRepository.actualizarPais(datosActualizados, id);
}

// Servicio para borrar pais usado por eliminarPais
export async function eliminarPaisPorID(id){
    return await PaisRepository.borrarPaisPorID(id);
} 

// Servicio para obtener por ID, necesario para editar paises
export async function obtenerPorID(ID){
    return await PaisRepository.obtenerPorID(ID);
}

// Servicio para cargar la API en la base de datos
export async function cargarApi(){
    // Obtenemos la API y la guardamos 
    const url = "https://restcountries.com/v3.1/region/america";
    const res = await axios.get(url);
    let paises = res.data;

    // Filtramos unicamente los paises que su propiedad languages tenga "spa" entre ellos
    paises = paises.filter(p => p.languages?.spa);

    // Creamos el array y lo vinculamos con cada propiedad que necesitamos del array completo
    const paisesTransformados = paises.map(p => ({
        nombrePais: p.name?.common ?? "",
        nombreCapital: p.capital ?? "Sin capital",
        area: p.area ?? 0,
        poblacion: p.population ?? 0,
        region: p.region ?? "",
        bordes: p.borders ?? [],
        // Evaluamos el año más alto y tomamos su porcentaje gini
        gini: p.gini ? p.gini[Math.max(...Object.keys(p.gini))] : [null],
        // Tomamos solo el código de languagues y lo devolvemos formateados a mayusculas
        lenguajesHablados: p.languages ? Object.keys(p.languages).map(Codigo=> Codigo.toUpperCase()) : [],
        // Si éxiste la bandera en formato .png, tomamos ese valor, sino, consultamos el formato .svg
        bandera: [p.flags?.png ?? p.flags?.svg ?? ""],
        zonasHorarias: p.timezones ?? [],
        // A los objetos obtenidos se le adjudica el derecho de creación a Restcountries.com
        creador: "Restcountries.com"
        // En caso de que haga falta valor, se le asigna valor vacío válido
    }));

    await PaisRepository.cargarApi(paisesTransformados);
    return paisesTransformados;
}

// Servicio para borrar datos de la base de datos 
export async function borrarDatos(){
    return await PaisRepository.borrarDatos()
}