import mongoose from "mongoose"

// Defino la función que me conectara con la base de datos de Mongo, en caso de fallar, se cancela el intento de conexión

export async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://Grupo-05:grupo05@cursadanodejs.ls9ii.mongodb.net/Node-js');
        console.log('Conexión exitosa a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB: ', error);
        process.exit(1);
    }
}