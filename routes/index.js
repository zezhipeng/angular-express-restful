var express = require('express');
var _ = require("lodash");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

var users=[];

router.get("/user",function(req,res){
  res.json(users)
});

router.get("/user/:name",function(req,res){
  //console.log(req.params);
  res.json({_id:req.params})
});

router.post("/user",function(req,res){
  console.log(req.body.name);
  if(!_.find(users,{name:req.body.name})){
    users.push(req.body);
    res.json(req.body)
  }
  else{
    res.json(null)
  }
});

router.put("/user",function(req,res){
  users= _.map(users,function(v){
    if(v.name==req.body.name){
      return v = req.body
    }
    return v
  });
  res.json(req.body)
});

router.delete("/user/:name",function(req,res){
   //console.log(req.params);
   users= _.filter(users,function(v){
     return v.name!=req.params.name
   });
  res.json(req.params)
});
module.exports = router;
