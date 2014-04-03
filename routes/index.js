
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Leap Pong' });
};

exports.leaptest = function(req, res) {
    res.render('leaptest', { title: 'Leap Testing' });
};
