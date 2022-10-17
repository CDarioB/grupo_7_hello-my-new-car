
const EXPRESS = require ("express"); 
const PATH = require ("path"); 
const APP = EXPRESS();
const PUBLIC_PATH = PATH.join(__dirname, "./public");
const PORT = process.env.PORT || 3000;
APP.use(EXPRESS.static(PUBLIC_PATH));

APP.listen(PORT, () =>{console.log("Corriendo servidor en el puerto" + " " + PORT + " " + "http://localhost:" + PORT) } )

APP.get("/", (req, res) => {
    res.sendFile(PATH.join(__dirname , "./views/home.html"))
});

APP.get("/register", (req, res) => {
    res.sendFile(PATH.join(__dirname , "./views/register.html"))
});

APP.get("/login", (req, res) => {
    res.sendFile(PATH.join(__dirname , "./views/login.html"))
});

APP.get("/detalleDelProducto", (req, res) => {
    res.sendFile(PATH.join(__dirname , "./views/detalleDelProducto.html"))
});

<<<<<<< HEAD
APP.get("/detalle2", (req, res) => {
    res.sendFile(PATH.join(__dirname , "./views/detalle2.html"))
});

APP.get("/detalle3", (req, res) => {
    res.sendFile(PATH.join(__dirname , "./views/detalle3.html"))
});

APP.get("/detalle4", (req, res) => {
    res.sendFile(PATH.join(__dirname , "./views/detalle4.html"))
});
=======
APP.get("/recuperar-cuenta", (req, res) => {
    res.sendFile(PATH.resolve(__dirname, "./views/account-recover.html"))
});

>>>>>>> c3656410cfdc297e0671d0e9a28b4d41c381825e
