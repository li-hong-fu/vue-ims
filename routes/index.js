var express = require('express');
var router = express.Router();
var userController = require('./../controllers/user.js');
var classifyController = require('./../controllers/classify.js');
var articleControllers = require('./../controllers/article.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* 用户显示 */
router.get('/user',userController.show);
/* 分类显示 */
router.get('/classify',classifyController.show);
/* 文章显示 */
router.get('/article',articleControllers.show);
router.get('/article/:id',articleControllers.index);
router.get('/admin/article',articleControllers.listShow);
router.get('/admin/article/:id',articleControllers.item);

module.exports = router;
