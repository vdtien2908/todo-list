const express = require('express');
const app = express();
const port = 3321;
const route = require('routes/route');

app.get('/', (req, res) => {
    res.send('Hello');
});

// Init route
route(app);

app.listen(port, () => {
    console.log('listen on port ' + port);
});
