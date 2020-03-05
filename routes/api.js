var express = require('express');
var router = express.Router();
var userController = require('./../controllers/user.js');
var classifyController = require('./../controllers/classify.js');
var articleController = require('./../controllers/article.js');
var authController = require('./../controllers/auth.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* 登录 */
router.post('/admin/login',authController.login);
// /* 退出登录 */
// router.get('/admin/exit',authController.exit);

/* 用户增删改 */
router.post('/user',userController.insert);
router.put('/user/:id',userController.update);
router.delete('/user/:id',userController.delete);

/* 分类增删改 */
router.post('/classify',classifyController.insert);
router.put('/classify/:id',classifyController.update);
router.delete('/classify/:id',classifyController.delete);

/* 文章增删改 */
router.post('/article',articleController.insert);
router.put('/article/edit/:id',articleController.update);
router.delete('/article/:id',articleController.delete);

module.exports = router;
