const adminRoute = require('./admin');
const shopRoute = require('./shop');

function route(app) {
    app.use('/admin', adminRoute);
    app.use('/', shopRoute);

    //Case Url not found
    app.use((req, res, next) => {
        res.status(404).render('404', { pageTitle: 'Page Not Found' });
    });
}
module.exports = route;
