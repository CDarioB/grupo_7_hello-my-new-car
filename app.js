const EXPRESS = require ("express"); 
const PATH = require ("path"); 
const APP = EXPRESS();
const PUBLIC_PATH = PATH.join(__dirname, "./public");
const PORT = process.env.PORT || 3000;
APP.use(EXPRESS.static(PUBLIC_PATH));

APP.listen(PORT, () =>{console.log("Corriendo servidor en el puerto" + " " + PORT + " " + "http://localhost:" + PORT) } )

APP.get("/", (req, res) => {
    res.sendFile(PATH.join(__dirname , "./src/views/home.html"))
});

APP.get("/register", (req, res) => {
    res.sendFile(PATH.join(__dirname , "./src/views/register.html"))
});

APP.get("/login", (req, res) => {
    res.sendFile(PATH.join(__dirname , "./src/views/login.html"))
});

APP.get("/detalleDelProducto", (req, res) => {
    res.sendFile(PATH.join(__dirname , "./src/views/detalleDelProducto.html"))
});

APP.get("/detalle2", (req, res) => {
    res.sendFile(PATH.join(__dirname , "./src/views/detalle2.html"))
});

APP.get("/detalle3", (req, res) => {
    res.sendFile(PATH.join(__dirname , "./src/views/detalle3.html"))
});

APP.get("/detalle4", (req, res) => {
    res.sendFile(PATH.join(__dirname , "./src/views/detalle4.html"))
});
APP.get("/recuperar-cuenta", (req, res) => {
    res.sendFile(PATH.resolve(__dirname, "./src/views/account-recover.html"))
});

