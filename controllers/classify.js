const Classify = require('./../models/classify.js');
const { formatTime } = require('./../utils/date.js');

const classifyControllers = {
  show: async function(req, res, next){
    try{
      const classifys = await Classify.all();
      classifys.forEach(data => {
        if(data.created_time){
          data.created_time = formatTime(data.created_time)
        }
      })
      res.json({code:200,data:classifys})
    }catch(e){
      res.json({code:0,message:e})
    }
  },
  insert: async function(req, res, next){
    let name = req.body.name;
    let created_time = new Date();
    
    if(!name){
      res.json({code:0,data:'请输入正确参数!'})
      return
    }

    try{
      const classifys = await Classify.insert({name,created_time})
      res.json({code:200,data:classifys})
    }catch(e){
      res.json({code:0,data:e})
    }
  },
  update: async function(req, res, next){
    let id = req.params.id;
    let name = req.body.name;
    let created_time = new Date();
    if(!name){
      res.json({code:0,data:'缺少正确参数!'});
      return
    }
    try{
      const classifys = await Classify.update(id,{name,created_time})
      res.json({code:200,data:classifys})
    }catch(e){
      res.json({code:0,data:e})
    }
  },
  delete: async function(req, res, next){
    let id = req.params.id;
    try{
      const classifys = await Classify.delete(id)
      res.json({code:200,data:classifys})
    }catch(e){
      res.json({code:0,data:e})
    }
  }
}

module.exports = classifyControllers