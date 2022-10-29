const EXPRESS = require ("express"); 
const PATH = require ("path"); 
const APP = EXPRESS();
const PUBLIC_PATH = PATH.join(__dirname, "./public");
const PORT = process.env.PORT || 3000;
APP.use(EXPRESS.static(PUBLIC_PATH));

// Levantando el servidor
APP.listen(PORT, () =>{console.log("Corriendo servidor en el puerto" + " " + PORT + " " + "http://localhost:" + PORT) } )

// EJS
APP.set('views', PATH.join(__dirname, 'src/views'));
APP.set('view engine', 'ejs');
console.log(__dirname)

// Creando rutas
var indexRouter = require('./src/routes/index');
var usuariosRouter = require('./src/routes/usuarios');
var productosRouter = require('./src/routes/productos');

// Manejo de vistas con rutas
APP.use('/', indexRouter);
APP.use('/usuarios', usuariosRouter);
APP.use('/productos', productosRouter);

module.exports = APP;