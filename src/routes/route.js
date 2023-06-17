const homeRoute = require('./homeRoute');
const taskRoute = require('./taskRoute');

function route(app) {
    // path main
    app.use('/task', taskRoute);
    app.use('/', homeRoute);
}

module.exports = route;
