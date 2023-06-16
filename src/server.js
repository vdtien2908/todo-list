const express = require('express');
const app = express();
const port = 3321;

app.get('/', (req, res) => {
    res.send('Hello');
});

app.listen(port, () => {
    console.log('listen on port ' + port);
});
