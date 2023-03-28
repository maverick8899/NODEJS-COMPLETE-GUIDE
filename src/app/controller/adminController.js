class AdminController {
    index(req, res, next) {
        res.render('add-product', { pageTitle: 'Add product', path: '/admin/add-product' });
    }
}

module.exports = new AdminController();
