class ShopController {
    index(req, res, next) {
        res.render('shop', { pageTitle: 'Shop', path: '/', prods: 2 });
    }
}

module.exports = new ShopController();
