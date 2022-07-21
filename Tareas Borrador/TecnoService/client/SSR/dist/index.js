"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
// IMPORTACION DE RUTAS
const login_1 = __importDefault(require("./routes/login"));
// INICIZLIZACIONES
const app = (0, express_1.default)();
// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path_1.default.join(__dirname, 'views'));
app.engine('.hbs', (0, express_handlebars_1.default)({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path_1.default.join(app.get('views'), 'layouts'),
    partialsDir: path_1.default.join(app.get('views'), 'partials'),
}));
app.set('view engine', '.hbs');
//ROUTES
app.use('/TecnoService', login_1.default);
// ARCHIVOS STATICOS
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// ARRANQUE DE SERVIDOR
app.listen(app.get('port'), () => {
    console.clear();
    console.log(`Servidor corriendo en el puerto: `, app.get('port'));
});
