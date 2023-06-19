class HomeController {
    // [GET] /
    index(req, res) {
        res.render('./pages/home', {
            title: 'Todo',
        });
    }
}

module.exports = new HomeController();
