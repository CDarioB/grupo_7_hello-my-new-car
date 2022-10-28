const EXPRESS = require ("express"); 
const PATH = require ("path"); 
const APP = EXPRESS();
const PUBLIC_PATH = PATH.join(__dirname, "./public");
APP.use(EXPRESS.static(PUBLIC_PATH));

APP.get("/", (req, res) => {
    res.sendFile(PATH.join(__dirname , "./src/views/home.html"))
});

APP.get("/register", (req, res) => {
    res.sendFile(PATH.join(__dirname , "./src/views/register.html"))
});

APP.get("/login", (req, res) => {
    res.sendFile(PATH.join(__dirname , "./src/views/login.html"))
});