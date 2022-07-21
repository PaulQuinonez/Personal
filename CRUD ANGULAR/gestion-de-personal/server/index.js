const express = require('express'); //TRAEMOS EXPRESS
const conexionDB = require('./config/db') // IMPORTAMOS LA CONFIGURACION DE LA BD
const cors = require('cors');

//Inicializamos servidor
const app = express();

//CONEXION A BD
conexionDB();

//UTILIZAMOS CORS PARA ACCEDER A LOS RECURSOS DEL SERVIDOR 
app.use(cors());

//CONFIG SERVER
app.use(express.json()); //ASI USAMOS ARCHIVOS JSON
app.use(express.urlencoded({extended: true})); //NOS SERVIRA EN LOS FORMULARIO

//TRAEMOS LAS RUTAS PARA PODER UTILIZARLAS EN LA APLICACION
const tecnico_routes = require('./routes/tecnico');

//USO DE RUTAS DEFINIENDO LA RUTA PADRE
app.use('/api/tecnicos', tecnico_routes)

//INDICAMOS QUE PUERTO USAREMOS
const port = process.env.PORT || 3000;

//CONFIGURAMOS POR DONDE SE ESCUCHARA EL SERVIDOR
app.listen(port, function() {

    console.clear();

    console.log("Bienvenido Grupo 8\n");

    console.log("Servidor corriendo en el puerto: " + port);
    console.log("\nCONEXION CORRECTA");    
    console.log("*******************************************");
});
