import mongoose from "mongoose";
import { body, param } from 'express-validator';

export const FormularioValidationRules = ()=>[
    body('nombrePais')
    .exists().withMessage("El campo nombre del pais es inexistente")
    .notEmpty().withMessage("El campo nombre del pais está vacio")
    .trim()
    .isLength({min: 3, max: 90}).withMessage("El campo nombre de pais debe tener entre 3 a 90 caracteres"),

    body('nombreCapital')
    .exists().withMessage("El campo nombre capital es inexistente")
    .notEmpty().withMessage("El campo nombre capital está vacio")
    .isArray({ min: 0 }),

    body('nombreCapital.*')
    .isLength({min: 3, max:90}).withMessage("El nombre de cada capital debe tener entre 3 a 90 caracteres"),

    body('bordes')
    .exists().withMessage("El campo bordes es inexistente")
    .isArray({ min: 0 }),

    body('bordes.*')
    .matches(/^[A-Z]{3}$/).withMessage("El campo bordes solo admite 3 letras ")
    .optional({ checkFalsy: true }),

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
