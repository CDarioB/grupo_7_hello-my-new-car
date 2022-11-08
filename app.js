const express = require ("express"); 
const path = require ("path"); 
const app = express();
const PUBLIC_PATH = path.join(__dirname, "./public");
const PORT = process.env.PORT || 3000;
app.use(express.static(PUBLIC_PATH));

// Levantando el servidor
app.listen(PORT, () =>{console.log("Corriendo servidor en el puerto" + " " + PORT + " " + "http://localhost:" + PORT) } )

// EJS
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');


// Creando rutas
var indexRouter = require('./src/routes/index');
var usuariosRouter = require('./src/routes/usuarios');
var productosRouter = require('./src/routes/productos');

// Manejo de vistas con rutas
app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/productos', productosRouter);

module.exports = app;