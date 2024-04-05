const express = require("express");
const path = require("path");
const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 1000, stock: 5 },
  { id: 2, name: "Phone", category: "Electronics", price: 500, stock: 10 },
];
const productRouter = express.Router();

const app = express();
const port = 3000;

function checkSubmitValue(name, category, price, stock ) {
  // ตรวจสอบว่าทุกฟิลด์มีการกรอกค่า
  if (!name || !category || !price || !stock) {
    throw new Error('กรุณาระบุค่าทุกฟิลด์ที่จำเป็น')
  }
  // ตรวจสอบประเภททของ input
  const invalidFields = [];
  if (typeof name !== 'string') invalidFields.push('name');
  if (typeof category !== 'string') invalidFields.push('category');
  if (typeof price !== 'number') invalidFields.push('price');
  if (typeof stock !== 'number') invalidFields.push('stock');

  if (invalidFields.length > 0) {
    throw new Error(`ประเภทของค่าไม่ถูกต้องสำหรับฟิลด์: ${invalidFields.join(', ')}`)
  }
  // ตรวจสอบค่า price และ stock ต้องมีค่ามากกว่า 0
  if (price <= 0 || stock <= 0) {
    throw new Error ('ราคาและจำนวนสินค้าคงคลังต้องมากกว่า 0');
  }

  // ตรวจสอบค่า stock ต้องไม่เป็นทศนิยม
  if (stock.toString().search(/[\.,e]/i) != -1) {
    throw new Error('stock ต้องเป็นจำนวนเต็ม')
  }
}

function checkUnique(newProduct, products) {
  var arr = [];
  var props1 = Object.values(newProduct).slice(1,-1); // ตัดสมาชิกของ array ตัวแรกและตัวสุดท้าย ซึ่งเป็นค่า id และ stock ออก ไม่นำไปใช้เปรียบเทียบ
  products.forEach((product) => {
    var props2 = Object.values(product).slice(1,-1);
    var _isEqul = JSON.stringify(props1) === JSON.stringify(props2)
    arr.push(_isEqul);
  });
  //ถ้ามี 1 ตัวใน arr เป็น true แสดงว่า new product อยู่ใน products อยู่แล้ว
  if (arr.includes(true)){
    _index = arr.findIndex((ele)=>ele == true); // หา index ที่มีค่าเป็น true
    duplicateID = products[_index].id; //ค่า id ของ product ที่อยู่ใน indext ที่เป็น true
    throw new Error(`สินค้าชนิดนี้ซ้ำกับสินค้า id: ${duplicateID}`)
  }
}
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});
app.use(express.json());

productRouter.route("/").get((req, res) => {
  res.json({products});
});
productRouter.route("/:id").get((req, res) => {
  const id = req.params.id;
  try{
    const product = products[id - 1];
    res.json({product});
  }
  catch(err){
    res.send("don't have request product!!");
  }
  
});

productRouter.route("/").post((req, res) => {
  lastID = products[products.length-1].id;
  id= lastID+1;
  const { name, category, price, stock } = req.body;
  try{
    checkSubmitValue( name, category, price, stock);
    const newProduct = {id,name,category,price,stock};
    checkUnique(newProduct, products);
    products.push(newProduct);
    res.status(201).json(newProduct);
  }
  catch(err){
    res.status(400).json({message:err.message});
  }
});

productRouter.route("/:id").put((req, res) => {
  id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);
  if (!product) return res.status(404).json({message: "ไม่พบสินค้าที่ต้องการ"});
  const { name, category, price, stock } = req.body;
  try{
    checkSubmitValue( name, category, price, stock);
    const editProduct = {id,name,category,price,stock};
    products.splice(id - 1, 1, editProduct);
    res.status(200).json(editProduct);
  }
  catch(err){
    res.status(400).json({message:err.message});
  }
 
});
productRouter.route("/:id").delete((req, res) => {
  const id = req.params.id;
  try{
    const product = products[id - 1];
    products.splice(id - 1, 1);
    res.status(200).json({message:"Delete product "+id});
  }
  catch(err){
    res.status(400).json({message:"don't have request product!!"});
  }
  
});
app.use("/products", productRouter);

app.listen(port, () => {
  console.log("Listening on port %d", port);
});
