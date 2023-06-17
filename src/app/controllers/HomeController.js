class HomeController {
    // [GET] /
    index(req, res) {
        res.render('./pages/home', {
            title: 'Trang chủ',
        });
    }
}

module.exports = new HomeController();
