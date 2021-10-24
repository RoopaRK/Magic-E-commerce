const express = require('express')
const app=express()
const bodyParser = require('body-parser')
const jwt=require('jsonwebtoken');
const cors=require('cors')


app.use(cors());
app.use(bodyParser.json())

let AuthToken=(req,res,next)=>{
  let path=req.path;
  let token=req.headers.authorization;
  try{
    const decoded=jwt.verify(token,'secret');
    req.user={userId:decoded.userId};
    return next();
  }catch(error){
    return res.status(401).json({msg:'Please enter token correct',error})
  }
  console.log({path,decoded})
  next();
  }
}

app.get('/',(req,res)=>{
  res.json({success:'true',msg:'home page'})
});

app.get('/user',AuthToken,(req,res)=>{
  let token=req.token;
  res.json({name:'naveen',age:21,pincode:574105,token})
})

app.post('/login',(req,res)=>{ 
  const {username,password}=req.body;
  const token=jwt.sign({username,password},'secret')
  res.json({username,password,token})
})

app.listen(3000,()=>{
  console.log('server started')
})
