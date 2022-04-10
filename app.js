const express = require('express');
const path = require('path');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended : true}));
dotEnv.config({path : './config.env'});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

app.use(session({
    secret: 'nodejs',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use((req,res, next)=>{
    res.locals.success_msg = req.flash(('success_msg'));
    res.locals.error_msg = req.flash(('error_msg'));
    next();
});

mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const employeeRouter = require('./routes/employee');
app.use(employeeRouter);
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log('This app is started at port 3000');
});