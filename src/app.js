const express = require ("express"); 
const app = express();

const path = require ("path");
const PUBLIC_PATH = path.join(__dirname, "../public");
app.use(express.static(PUBLIC_PATH)); // Para los archivos estáticos en el folder /public

// Para poder trabajar con archivos json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Para poder pisar el method="POST" en el formulario por PUT y DELETE
const methodOverride = require('method-override');
app.use(methodOverride('_method')); 

// Implementando session
const session = require('express-session');
app.use(session({
    secret: "SECRETO",
    resave: false,
    saveUninitialized: false,
}))

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Define la ubicación de la carpeta de las Vistas

// Creando rutas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usersRouter');
var productsRouter = require('./routes/productsRouter');

// Manejo de vistas con rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);


// Levantando el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


module.exports = app;


