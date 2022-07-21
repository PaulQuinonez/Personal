const express = require('express'); //TRAEMOS EXPRESS
const cors = require('cors');
const conexionDB = require('./config/db'); // IMPORTAMOS LA CONFIGURACION DE LA BD
const bodyParser = require('body-parser');

//INICIALIZACION DE EXPRESS
const app = express();

//ROUTES
const reporte_routes = require('./routes/reporte');

//CONEXION A BD
conexionDB();

//UTILIZAMOS CORS PARA ACCEDER A LOS RECURSOS DEL SERVIDOR 
app.use(cors());

//CONFIG SERVER
app.use(bodyParser.json()); //ASI USAMOS ARCHIVOS JSON
app.use(bodyParser.urlencoded({ extended: true })); //NOS SERVIRA EN LOS FORMULARIO
app.use((req, res, next) => {
    res.header('Content-Type: application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
});

//USO DE RUTAS DEFINIENDO LA RUTA PADRE
app.use('/api/TecnoService/reporte', reporte_routes);

//INDICAMOS QUE PUERTO USAREMOS
const port = process.env.PORT || 3200;

//CONFIGURAMOS POR DONDE SE ESCUCHARA EL SERVIDOR
app.listen(port, function() {
    console.clear();
    console.log("\nServidor corriendo en el puerto: " + port);
    console.log("\nCONEXION CORRECTA");
    console.log("*******************************************");
});