import pais from '../model/pais.mjs';
import IRepository from './IRepository.mjs';

class PaisRepository extends IRepository{
    // Método para encontrar todos los paises y devolverlos con sus propiedades
    async obtenerPaises(){
        return await pais.find({});
    }

    async filtrarPaises(atributo,valor){
        const filtro = { [atributo]: {$regex: valor, $options: 'i'} };  
        return await pais.find(filtro);
    }

    // Método donde recibimos el array acomodado y lo insertamos dentro de la base de datos
    async crearPais(data){
        const hero = new pais(data);
        await hero.save();
        return hero;
    }

    // Recibimos el ID y los datos modificados del país
    async actualizarPais(datosActualizados, id){
        // Buscamos el país en específico mediante el ID y lo sobeescribimos con los datos obtenidos
        const result = await pais.findByIdAndUpdate(
                id,
                {nombrePais: datosActualizados.nombrePais,
                nombreCapital: datosActualizados.nombreCapital,
                area: datosActualizados.area,
                poblacion: datosActualizados.poblacion,
                region: datosActualizados.region,
                bordes: datosActualizados.bordes,
                gini: datosActualizados.gini,
                lenguajesHablados: datosActualizados.lenguajesHablados || [],
                bandera: datosActualizados.bandera || [],
                zonasHorarias: datosActualizados.zonasHorarias || [],
                creador: datosActualizados.creador}, { new: true });
        // Buscamos y devolvemos el mismo país despues de actualizarse
        return await pais.findOne({_id: id});
    }

    // Método para buscar un país por su ID y eliminarlo de la base de datos
    async borrarPaisPorID(id){
        const result = await pais.findOneAndDelete({_id: id});
        return result;
    }

    // Método para buscar un país por su ID y devolverlo, necesario para actualizar país
    async obtenerPorID(id){
        const result = await pais.findOne({_id: id});
        return result;
    }

    // Método para subir todos los datos de la API en la base de datos
    async cargarApi(paisesTransformados) {
        return await pais.insertMany(paisesTransformados);
    }

    // Método para borrar todos los datos dentro de la base de datos
    async borrarDatos(){
        return await pais.deleteMany({})
    }
}

export default new PaisRepository();