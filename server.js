const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let products = [{ id: 1, name: 'Naveen', price: 3000 }, { id: 2, name: 'Kamath', price: 400 }]
  ;
app.get('/', (req, res) => {
  let homePage = `<h2>HomePage</h2>`;
  res.send(homePage);
});

app.route('/products')
  .get('/products', (req, res) => {
    res.json({ products })
  })
  .get('/products/:id', (req, res) => {
    const { id } = req.params;
    let product = products.find((product) => product.id == id)
    res.json({ product })
  })

app.post('/products',(req,res)=>{
  const {id,name,price}=req.body;
  products.push({id,name,price});
  res.json(products)
})

app.post('/products/:id',(req,res)=>{
  const {id}=req.params;
  let update=req.body;

  let prod=products.find((product)=>product.id==id)

  if(prod){
    Object.keys(update).find((key)=>{
      if(key in prod){
        prod[key]=update[key];
      }
    })

    return res.json({prod})
  }
  res.json({error:'error'})



})

app.listen(3000, () => {
  console.log("Server Started")
})
