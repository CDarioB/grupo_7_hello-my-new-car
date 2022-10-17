
const EXPRESS = require ('express'); 
const PATH = require ('path'); 

const APP = EXPRESS();
const PUBLIC_PATH = PATH.resolve(__dirname,'./public');

const PORT = process.env.PORT || 3000;

APP.use(EXPRESS.static(PUBLIC_PATH));


APP.get('/', (req, res) => {
    res.sendFile(PATH.resolve(__dirname, './views/home.html'))
});

APP.get("/register", (req, res) => {
    res.sendFile(PATH.resolve(__dirname, "./views/register.html"))
});

APP.get("/login", (req, res) => {
    res.sendFile(PATH.resolve(__dirname, "./views/login.html"))
});

APP.get("/recuperar-cuenta", (req, res) => {
    res.sendFile(PATH.resolve(__dirname, "./views/account-recover.html"))
});

APP.listen(PORT, () =>{console.log("Corriendo servidor en el puerto" + " " + PORT + " " + "http://localhost:" + PORT) } )

// app.listen (PORT, () => console.log (`Server started: port ${PORT}`) ); 