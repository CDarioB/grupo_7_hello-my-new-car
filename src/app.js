const express = require ("express"); 
const path = require ("path"); 
const app = express();
const PUBLIC_PATH = path.join(__dirname, "../public");
const PORT = process.env.PORT || 3000;
app.use(express.static(PUBLIC_PATH));

// Levantando el servidor
app.listen(PORT, () =>{console.log("Corriendo servidor en el puerto:" + " " + PORT + " - url: " + "http://localhost:" + PORT) } )

// EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Creando rutas
var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');
var productosRouter = require('./routes/productos');

// Manejo de vistas con rutas
app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/productos', productosRouter);

module.exports = app;