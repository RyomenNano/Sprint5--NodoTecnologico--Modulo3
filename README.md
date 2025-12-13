# Sprint5--NodoTecnologico--Modulo3

1) El objetivo principal de este proyecto es construir una aplicación web utilizando Node.js, Express y MongoDB que permita:

Consumir datos de una API externa (https://restcountries.com/v3.1/region/america).

Filtrar únicamente los países que tengan español como idioma (languages.spa).

Limpiar los datos omitiendo propiedades innecesarias, almacenando solo las necesarias y agregando una propiedad nueva: "creador" con el nombre del desarrollador de dicho array.

Guardar los datos procesados en MongoDB.

Mostrar un dashboard web con tabla de países, totales de población y área, promedio de Gini y operaciones CRUD (Agregar, Editar, Eliminar).

Incorporar vistas con Layout, Navbar, Footer y landing page.
Aplicar validaciones robustas en backend y mensajes claros en el frontend.


2) Las tecnologías utilizadas para esté proyecto fueron

Backend: Node.js, Express

Base de datos: MongoDB (Atlas)

Motor de plantillas: EJS

Librerías principales:

-axios               - consumo de API externa
-express             - configuración de rutas y conexión a servidor
-mongoose            - modelado y validación de datos
-express-validator   - validaciones en rutas
-method-override     - soportar PUT y DELETE en formularios HTML
-express-ejs-layouts - manejo de layouts
-tailwindcss         - estilos de interfaz


3) Para los datos iniciales se cargo la API de Restcountries, precisamente la región de America

Endpoint: https://restcountries.com/v3.1/region/america

Se procesa en la función del servicio, countriesService:

Se obtiene la lista completa de países de América.

Se filtra para mantener solo los países con idioma español (spa).

Se agregan propiedades importantes dentro de un array nuevo:

creador → "Rest Countries"

nombrePais, nombreCapital, area, poblacion, region, bordes, gini, lenguajesHablados, bandera, zonasHorarias.

Para Gini, se toma el último año disponible y se normaliza a número (0 si no existe).


4) El modelo es el siguiente

const paisSchema = new mongoose.Schema({
  nombrePais: { type: String, required: true },
  nombreCapital: [String],
  area: { type: Number, min: 0 },
  poblacion: { type: Number, min: 0 },
  region: { type: String },
  bordes: [String],
  gini: [String],
  lenguajesHablados: [String],
  bandera: [String],
  zonasHorarias: [String],
  creador: String,
  createdAt: { type: Date, default: Date.now }
});


5) Rutas principales y sus funciones

GET     "/"	Landing page        Página principal que aparece apenas entramos

GET	    "/pais/acercaDe"	    Información del proyecto

GET     "/dashboard"	        Mostrar todos los países en tabla

GET	    "/pais/cargarApi"	    Cargar países desde API
GET	    "/pais/eliminarDatos"	Borrar todos los registros

GET	    "/addCountry"	        Formulario para agregar país
POST	"/pais/agregar"	        Crear nuevo país con validaciones

GET	    "/pais/:id/editar"	    Obtener país para editar
PUT	    "/pais/:id/editar"	    Actualizar país con validaciones

DELETE 	"/pais/:id"	            Eliminar país

GET	    "/dashboard/exportar"	Exportar CSV de todos los países


6) Para la vista uso layout.ejs usando TailwindCSS para estilos.

Incluye navbar y footer como partials.

Navbar (partials/navbar.ejs): Enlaces a Dashboard, Agregar País, Acerca de

Dashboard (dashboard.ejs): Tabla con columnas: nombre, capital, población, área, region, bordes, Gini, lenguajes, bandera, zonas horarias, creador.
Fila de totales: suma de población, suma de área, promedio de Gini.
Botones Editar y Eliminar con confirmación.
Botón Exportar CSV

Formularios (addCountry.ejs, editCountry.ejs): Todos los campos con validaciones. Se conservan valores al producir errores.
Mensajes claros de errores visibles en UI.


7) para las Validaciones y Manejo de Errores

uso las Validaciones en Mongoose (a nivel modelo).
mi Middleware para validaciones es express-validator (nivel rutas).
Se evita guardar datos inválidos en la base.

Validaciones importantes:

    nombrePais: 3-90 caracteres
    nombreCapital: cada elemento 3-90 caracteres
    borders: 3 letras mayúsculas por código
    area y poblacion: números positivos
    gini: 0-100

8) Flujo de Datos

    a. Servicio cargarApiController → filtro por idioma → limpieza → agregar creador → guardar datos en MongoDB. (esto se realiza una vez y se almacenan los datos dentro de la base de datos del servidor, se pueden eliminar y volver a cargar manualmente usando las siguientes rutas: "/pais/cargarApi", "/pais/eliminarDatos")

    b. Renderizado Dashboard: obtenerTodosLosPaisesController → cálculos totales → render de dashboard.ejs. (El usuario carga la página y accede a la lista completa)

    c. Operaciones CRUD: Formularios → validaciones → controller → service → paisRepository → redirección a dashboard. (Los formularios para crear y editar envian los datos que son transformados, válidados, y se llama al controlador para que ejecute la solicitud realizada, dentro de servicio se guarda toda la lógica de preparar los datos o llamar a la funcion del repositorio antes de la actualización/creación/eliminación de datos en la DB )

    Caso particular: la función actualizar se divide en 2 rutas, la primera, GET, primero se obtiene el id del pais solicitado para modificar, se hace una solicitud al servicio para obtener el pais mediante obtenerPorID(ID), una vez que el controlador recibe esos datos, carga los datos en el formulario.
    Posteriormente al enviarse el formulario, se lo hace mediante un PUT, que llama a otra función del servicio dedicada a sobreescribir el pais modificado con los datos ya existentes y nuevos

    9) !--- PASOS PARA EJECUTAR ---!

    a. Clonar el repositorio mediante: "git clone https://github.com/RyomenNano/Sprint5--NodoTecnologico--Modulo3.git"

    b. Instalar dependencias mediante: "npm install"

    c. El servidor se puede ejecutar con los siguientes comandos

        - node src/app.mjs
        - npm run start
        - npm run dev (inicia el servidor con nodemon que lo actualizara cada cambio realizado)


