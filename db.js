const express = require("express");
const product = require("./Pages/products.js");
const wishList=require('./Pages/wishList.js');
const loggerFunc=require('./middlewares/loggerFunc.js');
const cors=require('cors');

const app = express();

app.use(loggerFunc);
app.use(cors());
app.use("/products", product);
app.use('/wishlist',wishList);

app.get("/", (req, res) => {
  res.json({ success: true, msg: "welcome to home page" });
});
app.use('*',(req,res)=>{
  res.json({msg:`wrong route`})
})
app.listen(3000, () => {
  console.log(`Server Started`);
});
const mongoose=require('mongoose');

const dataBase=()=>{
const mySecret = process.env['uri']
  mongoose.connect(mySecret)
  .then((data)=>console.log(`connected mongoose`))
}
module.exports=dataBase;

const credentials={name:'naveen',pass:123};

const auth=(req,res,next)=>{
  const {name,pass}=req.query;
  if(name==credentials.name && pass==credentials.pass){
    next();
  }else{
    res.status(404).json(`Wrong info`)
  }
};
module.exports=auth;
const mongoose=require('mongoose');  
  
const schema=mongoose.Schema({name:String,price:Number});
const productModel=mongoose.model('product',schema);

module.exports=productModel;
