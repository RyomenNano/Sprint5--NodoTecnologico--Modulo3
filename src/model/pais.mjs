import mongoose from 'mongoose';

const paisSchema= new mongoose.Schema({
    nombrePais:{type: String, required: true},
    nombreCapital:[String],
    area:{type: Number, min:0},
    poblacion:{type:Number, min:0},
    region:{type: String},
    bordes:[String],
    gini:[String],
    lenguajesHablados:[String],
    bandera:[String],
    zonasHorarias:[String],
    creador: String,
    createdAt:{type: Date, default: Date.now}
});

const pais= mongoose.model('pais', paisSchema, 'Grupo-05');
export default pais;