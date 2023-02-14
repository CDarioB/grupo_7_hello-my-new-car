const express = require ("express"); 
const app = express();
const path = require ("path");
const PUBLIC_PATH = path.join(__dirname, "../public");
app.use(express.static(PUBLIC_PATH)); // Para los archivos estáticos en el folder /public
const cookies = require('cookie-parser');

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

// Para poder trabajar con archivos json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Para poder pisar el method="POST" en el formulario por PUT y DELETE
const methodOverride = require('method-override');
app.use(methodOverride('_method')); 

// Implementando session
const session = require('express-session');
app.use(session({secret : "CARSECRETO"}));
app.use(cookies());
app.use(userLoggedMiddleware);


// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Define la ubicación de la carpeta de las Vistas

// Creando rutas
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/usersRouter');
let productsRouter = require('./routes/productsRouter');

// Manejo de vistas con rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

//sprint 8 - APIS
let apiUsersRouter = require('./routes/apiUsersRouter');
let apiProductsRouter = require('./routes/apiProductsRouter');

app.use('/api/users', apiUsersRouter);
app.use('/api/products', apiProductsRouter);


// Levantando el servidor

process.env.PORT = process.env.PORT || 3030;


app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
});


module.exports = app;


