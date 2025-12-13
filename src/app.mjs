import express from "express";
import {connectDB} from './config/DBConfig.mjs';
import countriesRoutes from './routes/routes.mjs';
import methodOverride from 'method-override';
import expressLayouts from 'express-ejs-layouts'

// Defino el uso de express y preparo el puerto para ser usado o en render o localmente

const app=express();
const PORT= process.env.PORT || 3000;

// Uso la función importada desde config/DBConfig.mjs para conectarme a Mongo DB

connectDB();

// La visa se ejecutara con ejs y tomara los archivos de la ruta src/views

app.set('view engine', 'ejs');
app.set('views', './src/views');

// Aplico las APIs importantes y configuro la aplicación para recibir y visualizar los datos correctamente

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(expressLayouts)
app.use(express.static("zPublic"));

// La página principal sera "layout"

app.set('layout', 'layout')

// Las rutas de la app vendran de la función countriesRoutes importada desde routes/routes.mjs

app.use("", countriesRoutes);

// Si no hay ruta válida, tenemos una de error predefinida

app.use((req, res)=>{
    res.status(404).send({mensaje: "Ruta no encontrada"});
});

// Iniciamos el server

app.listen(PORT,'0.0.0.0',()=>{
    console.log(`Servidor levantado desde el puerto:${PORT}. En el servidor`)
}) 