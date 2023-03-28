class AdminController {
    index(req, res, next) {
        res.render('add-product', { pageTitle: 'Add product' });
    }
}

module.exports = new AdminController();
