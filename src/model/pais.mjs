import mongoose from 'mongoose';

const paisSchema= new mongoose.Schema({
    nombrePais:{type: String, required: true},
    nombreCapital:{type: String, required: true},
    poblacion:{type:Number, min:0},
    continente:{type: String},
    lenguajesHabaldos:[String],
    bandera:[String],
    zonasHorarias:[String],
    creador: String,
    createdAt:{type: Date, default: Date.now}
});

const pais= mongoose.model('pais', paisSchema, 'Grupo-05');
export default pais;