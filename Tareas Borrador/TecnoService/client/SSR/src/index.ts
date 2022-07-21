import express from 'express';
import path from 'path';
import exphbs from 'express-handlebars';
import cookieParser from 'cookie-parser';
import handlebars from 'handlebars'

// IMPORTACION DE RUTAS
import IndexRoutes from './routes'

// INICIZLIZACIONES
const app = express();

// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
}) as any);
app.set('view engine', '.hbs');

//HANDLEBARS
handlebars.registerHelper('ife',  (lvalue, rvalue, options) => {
    if (lvalue === rvalue) {
        return options.fn(this) 
    }
    return options.inverse(this)
})

// MIDDLEWARES
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//ROUTES
app.use('/', IndexRoutes)

// ARCHIVOS STATICOS
app.use(express.static(path.join(__dirname, 'public')));

// ARRANQUE DE SERVIDOR
app.listen(app.get('port'), () => {
    console.clear();
    console.log(`Servidor corriendo en el puerto: `, app.get('port'));
});