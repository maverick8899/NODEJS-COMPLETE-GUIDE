class ShopController {
    index(req, res, next) {
        res.render('shop', { pageTitle: 'Shop' });
    }
}

module.exports = new ShopController();
