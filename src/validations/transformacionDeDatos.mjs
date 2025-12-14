import { body, param } from 'express-validator';

// Función para transformar los datos que se ingresan desde el formulario

export function TransformarCampos(req, res, next) {

  // Si hay más de 1 nombre, se los separa
  if (typeof req.body.nombreCapital === "string") {
    req.body.nombreCapital = req.body.nombreCapital
      .split(",")
      .map(x => x.trim());
  }

  // Si hay más de un pais fronterizo, se lo separan como distintos elementos 
  if (typeof req.body.bordes === "string") {
    req.body.bordes = req.body.bordes
      .toUpperCase()
      .split(",")
      .map(x => x.trim());
  }

  // Los datos recibidos de gini se transforman en flotantes 
  if (typeof req.body.gini === "number") {
    req.body.gini = parseFloat(req.body.gini);
  }

  // Si nos llegan más de un idioma, se separan como distintos elementos
  if (typeof req.body.lenguajesHablados === "string") {
    req.body.lenguajesHablados = req.body.lenguajesHablados
      .split(",")
      .map(x => x.trim());
  }

  // Si hay más de una zona horaria, se separan como distintos elementos
    if (typeof req.body.zonasHorarias === "string") {
    req.body.zonasHorarias = req.body.zonasHorarias
      .split(",")
      .map(x => x.trim());
  }

  next();
}