const User = require('./../models/user.js');
const authCodeFunc = require('./../utils/authCode.js');

const authController = {
  login:async function(req, res, next){
    let phone = req.body.phone;
    let password = req.body.password;

    if(!phone || !password){
      res.json({code:0,message:'缺少参数!'})
      return
    }

    try{
      const users = await User.select({phone,password});
      const user = users[0];
      
      if(user){
        let auth_Code = phone + '\t' + password + '\t' + user.id + '\t' + user.role;
        auth_Code = authCodeFunc(auth_Code,'ENCODE');
        res.json({code:200,message:'登陆成功!',token:auth_Code})
      }else{
        res.json({code:0,data:{msg:'登陆失败，没有此用户!'}})
      }
    }catch(e){
      res.json({code:0,data:e})
    }
  },
  // exit:async function(req, res, next){
  //   res.cookie('ac','',{maxAge:0,httpOnly:false});
  //   res.json({code:200,message:'退出成功!'})
  // }
}

module.exports = authController