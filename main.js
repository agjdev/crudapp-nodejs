//imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const routes = require('./routes/routes');

const app = express();
const PORT = process.env.PORT || 4000 ;

mongoose.connect(process.env.DB_URI,{  useUnifiedTopology:true });
const db = mongoose.connection;
mongoose.set('strictQuery', true);


app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(session({
    secret:"my secret kery",
    saveUninitialized:true,
    resave:false
}));

app.use((req,res,next)=>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

app.set('view engine','ejs');

app.use(express.static('uploads'));

db.on("error", (error)=> console.log(error));
db.once("open", ()=> console.log("connected to datebase "));


app.use('/',routes);




app.listen(PORT,()=>{
    console.log(`server started at http://localhost:${PORT}`);
});


