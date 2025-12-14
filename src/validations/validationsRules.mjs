import mongoose from "mongoose";
import { body, param } from 'express-validator';

// Regla para válidar los formularios
export const FormularioValidationRules = ()=>[
    // Válidamos que éxista, que no esté vacío, y que tenga una cantidad de caracteres entre 3 a 90
    body('nombrePais')
    .exists().withMessage("El campo nombre del pais es inexistente")
    .notEmpty().withMessage("El campo nombre del pais está vacio")
    .trim()
    .isLength({min: 3, max: 90}).withMessage("El campo nombre de pais debe tener entre 3 a 90 caracteres"),

    // Válidamos que éxista, que no esté vacío y que sea un array con mínimo 0 elementos (esto porque éxisten paises sin capital)
    body('nombreCapital')
    .exists().withMessage("El campo nombre capital es inexistente")
    .notEmpty().withMessage("El campo nombre capital está vacio")
    .isArray({ min: 0 }),

    // Cada elemento de nombreCapital debera tener una cantidad de caracteres entre 3 a 90
    body('nombreCapital.*')
    .isLength({min: 3, max:90}).withMessage("El nombre de cada capital debe tener entre 3 a 90 caracteres"),

    // Los paises fronterizos deben éxistir y ser un array con mínimo 0 elementos (porque hay paises que son islas, sin paises vecinos)
    body('bordes')
    .exists().withMessage("El campo bordes es inexistente")
    .isArray({ min: 0 }),

    // Cada elemento de los paises fronterizos deben tener caracteres del A a la Z y tener 3 caracteres (la forma estandar dek código ISO 3166-1 alpha-3 para referirse a paises)
    body('bordes.*')
    .matches(/^[A-Z]{3}$/).withMessage("El campo bordes solo admite 3 letras ")
    .optional({ checkFalsy: true }),

    // Cada área debe éxistir, no estar vacía, y se elimina los espacios, ademas, se válida que sea un numero entero con valor mínimo 1 (porque un país no puede cubir 0 metros o menos)
    body('area')
    .exists().withMessage("El campo area es inexistente")
    .notEmpty().withMessage("El campo area está vacio")
    .trim()
    .isInt({min: 1}).withMessage("El campo area no puede tener valor 0 o valor negativo"),

    body('poblacion')
    .exists().withMessage("El campo población es inexistente")
    .notEmpty().withMessage("El campo población está vacío")
    .trim()
    .isInt({min: 0}).withMessage("El campo población no puede tener valores negativos"),

    body('gini')
    .exists().withMessage("El campo gini es inexistente")
    .isFloat({min: 0, max: 100}).withMessage("El campo gini debe tener un porcentaje entre 0% al 100%"),
]
