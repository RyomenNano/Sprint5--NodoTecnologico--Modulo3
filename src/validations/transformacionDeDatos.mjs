import { body, param } from 'express-validator';

// Función para transformar los datos que se ingresan desde el formulario

export function TransformarCampos(req, res, next) {

  
  if (typeof req.body.nombreCapital === "string") {
    req.body.nombreCapital = req.body.nombreCapital
      .split(",")
      .map(x => x.trim());
  }

  if (typeof req.body.bordes === "string") {
    req.body.bordes = req.body.bordes
      .toUpperCase()
      .split(",")
      .map(x => x.trim());
  }

  if (typeof req.body.gini === "number") {
    req.body.gini = parseFloat(req.body.gini);
  }

  if (typeof req.body.lenguajesHablados === "string") {
    req.body.lenguajesHablados = req.body.lenguajesHablados
      .split(",")
      .map(x => x.trim());
  }

    if (typeof req.body.bandera === "string") {
    req.body.bandera = req.body.bandera
      .split(",")
      .map(x => x.trim());
  }

    if (typeof req.body.zonasHorarias === "string") {
    req.body.zonasHorarias = req.body.zonasHorarias
      .split(",")
      .map(x => x.trim());
  }

  console.log("BODY TRANSFORMADO:", req.body);

  next();
}