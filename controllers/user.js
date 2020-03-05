const User = require('./../models/user.js');
const { formatTime } = require('./../utils/date.js');

const userControllers = {
  show: async function(req,res,next){
    try{
      const users = await User.all();
      users.forEach(data => {
        //判断是否有值
        if(data.created_time){
          data.created_time = formatTime(data.created_time);
        }
      })
      res.json({code:200,data:users})
    }catch(e){
      res.json({code:0,message:e})
    }
  },
  insert: async function(req,res,next){
    let name = req.body.name;
    let phone = req.body.phone;
    let password = req.body.password;
    let created_time = new Date();

    if(!name || !phone || !password){
      res.json({code:0,data:'请输入正确参数!'});
      return
    }

    try{
      const users = await User.insert({name,phone,password,created_time});
      res.json({code: 200,data:users})
    }catch(e){
      res.json({code: 0,data:e})
    }
  },
  update: async function(req,res,next){
    let name = req.body.name;
    let phone = req.body.phone;
    let password = req.body.password;
    let id = req.params.id;
    let created_time = new Date();

    if(!name || !phone || !password){
      res.json({code:0,data:'请输入正确参数!'});
      return
    }

    try{
      const users = await User.update(id,{name,phone,password,created_time});
      res.json({code: 200,data: users})
    }catch(e){
      res.json({code: 0,data:e})
    }
  },
  delete: async function(req,res,next){
    let id = req.params.id;

    try{
      await User.delete(id);
      res.json({code: 200, data:'删除成功!'})
    }catch(e){
      res.json({code: 0, data:e})
    }
  }
}

module.exports = userControllers;