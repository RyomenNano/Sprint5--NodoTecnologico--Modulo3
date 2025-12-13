class IRepository{

    obtenerPaises(){
        throw new Error("Método 'obtenerPais()' no implementado");
    }

    crearPais(){
        throw new Error("Método 'crearPais()' no implementado");
    }

    actualizarPais(){
        throw new Error("Método 'actualizarPais()' no implementado");
    }

    borrarPais(id){
        throw new Error("Método 'borrarPais()' no implementado");
    }

    obtenerPorID(id){
        throw new Error("Método 'obtenerPorID()' no implementado");
    }

    cargarApi(){
        throw new Error("Método 'cargarApi()' no implementado");
    }

    borrarDatos(){
        throw new Error("Método 'borrarDatos()' no implementado")
    }
}

export default IRepository;
