import express from "express";
import {connectDB} from './config/DBConfig.mjs';
import countriesRoutes from './routes/routes.mjs';
import methodOverride from 'method-override';
import expressLayouts from 'express-ejs-layouts'

const app=express();
const PORT= process.env.PORT || 3000;

connectDB();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(expressLayouts)
app.use(express.static("zPublic"));

app.set('layout', 'layout')

app.use("", countriesRoutes);

app.use((req, res)=>{
    res.status(404).send({mensaje: "Ruta no encontrada"});
});

app.listen(PORT,'0.0.0.0',()=>{
    console.log(`Servidor levantado desde el puerto:${PORT}. En el servidor`)
}) 