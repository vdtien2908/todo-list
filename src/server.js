const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const path = require('path');
const port = 3321;
const route = require('./routes/route');
const optionView = {
    extname: '.hbs',
};

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static file
app.use(express.static(path.join(__dirname, 'public')));

// Temple View
app.engine('hbs', engine(optionView));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Init route
route(app);

app.listen(port, () => {
    console.log('listen on port ' + port);
});
