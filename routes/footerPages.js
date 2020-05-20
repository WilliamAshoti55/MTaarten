const fs = require('fs');

module.exports = {
    overOnsPage: (req, res) => {
        res.render('overOnsPage.ejs');
    },

    algemeenVoorwaardenPage: (req, res) => {
        res.render('algemeenVoorwaardenPage.ejs');
    },

    contactPage: (req, res) => {
        res.render('contactPage.ejs');
    }
}
