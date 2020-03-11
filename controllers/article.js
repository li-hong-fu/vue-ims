const Article = require('./../models/article.js');
const { formatTime } = require('./../utils/date.js');

const articleControllers = {
  show:async function(req, res, next){
    try{
      const articles = await Article.all()
      .leftJoin('classify','classify.id','article.classify_id')
      .select('article.*',{'classify_name':'classify.name'})
      articles.forEach(data => {
        if(data.created_time){
          data.created_time = formatTime(data.created_time)
        }
      })
      console.log(articles)
      res.json({code:200,data:articles})
    }catch(e){
      res.json({code:0,data:e})
    }
  },
  index:async function(req, res, next){
    try{
      let id = req.params.id
      const articles = await Article.select({"article.id":id})
      .leftJoin('classify','classify.id','article.classify_id')
      .select('article.*',{'classify_name':'classify.name'})
      articles.forEach(data => {
        if(data.created_time){
          data.created_time = formatTime(data.created_time)
        }
      })
      res.json({code:200,data:articles})
    }catch(e){
      res.json({code:0,data:e})
    }
  },
  insert:async function(req, res, next){
    let title = req.body.title;
    let classify_id = req.body.classify;
    let content = req.body.content;
    let created_time = new Date();
    console.log(title,classify_id,content)
    if(!title || !classify_id || !content){
      res.json({code:0,data:'请输入正确参数!'})
      return
    }

    try{
      const articles = await Article.insert({title,classify_id,content,created_time})
      res.json({code:200,data:articles})
    }catch(e){
      res.json({code:0,data:e})
    }
  },
  update:async function(req, res, next){
    let title = req.body.title;
    let classify_id = req.body.classify;
    let content = req.body.content;
    let id = req.params.id;
    let created_time = new Date();

    if(!title || !classify_id || !content){
      res.json({code:0,data:'请输入正确参数!'})
      return
    }

    try{
      const articles = await Article.update(id,{title,classify_id,content,created_time})
      res.json({code:200,data:articles})
    }catch(e){
      res.json({code:0,data:e})
    }
  },
  delete:async function(req, res, next){
    let id = req.params.id
    try{
      const articles = await Article.delete(id)
      res.json({code:200,data:articles})
    }catch(e){
      res.json({code:0,data:e})
    }
  }
}

module.exports = articleControllers