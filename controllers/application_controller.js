exports.index = function(req, res) {
    console.log("inside application controllers");
    res.render('index', { user: req.user });
};