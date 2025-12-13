import pais from '../model/pais.mjs';
import IRepository from './IRepository.mjs';

class PaisRepository extends IRepository{
    async obtenerPaises(){
        return await pais.find({});
    }

    async crearPais(data){
        const hero = new pais(data);
        await hero.save();
        return hero;
    }

    async actualizarPais(datosActualizados, id){
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

            return await pais.findOne({_id: id});
    }

    async borrarPaisPorID(id){
        const result = await pais.findOneAndDelete({_id: id});
        return result;
    }

    async obtenerPorID(id){
        const result = await pais.findOne({_id: id});
        return result;
    }

    async cargarApi(paisesTransformados) {
        return await pais.upsert(paisesTransformados);
    }

    async borrarDatos(){
        return await pais.deleteMany({})
    }
}

export default new PaisRepository();