import pais from '../model/pais.mjs';
import IRepository from './IRepository.mjs';

class PaisRepository extends IRepository{
    async obtenerPaises(){
        return await pais.find({});
    }

    async crearPais(data){

    }

    async actualizarPais(datosActualizados, id){
        
    }

    async borrarPaisPorID(id){
  
    }

    async obtenerPorID(id){

    }

    async guardarVariosPaises(paisesTransformados) {
    return await pais.insertMany(paisesTransformados);
}
}

export default new PaisRepository();