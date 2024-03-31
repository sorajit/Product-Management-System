const express = require("express");
const path = require("path");
// const products = require("./data/products.json");
const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 1000, stock: 5 },
  { id: 2, name: "Phone", category: "Electronics", price: 500, stock: 10 },
];
const productRouter = express.Router();

const app = express();
const port = 3000;
function checkSubmitValue(product) {
  console.log(product);
  if (product.name == "") {
    throw new Error("please add name");
    // return false;
  }
  if (product.category == "") {
    throw new Error("please add category");
  }
  if (product.year == "") {
    throw new Error("please add year");
  }
  if (product.price == "") {
    throw new Error("please add price");
  }
  if (product.stock == "") {
    throw new Error("please add stock");
  }

  if (product.stock.toString().search(/[\.,e]/i) != -1) {
    throw new Error("stock should be integer");
  }
  return true;
}
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public/")));
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});
app.use(express.json());

productRouter.route("/").get((req, res) => {
  res.json({products});
  // res.render("products", { products });
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
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock,
  };
  try{
    checkSubmitValue(newProduct)
    products.push(newProduct);
    res.json(newProduct);
  }
  catch(err){
    res.send(err);
  }
});

productRouter.route("/:id").put((req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send("Product not found");
  editID = parseInt(req.params.id);
  const editProduct = {
    id: editID,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock,
  };
  try{
    checkSubmitValue(editProduct)
    products.splice(editID - 1, 1, editProduct);
    res.json(editProduct);
  }
  catch(err){
    res.send(err);
  }
 
});
productRouter.route("/:id").delete((req, res) => {
  const id = req.params.id;
  try{
    const product = products[id - 1];
    products.splice(id - 1, 1);
    res.send("Delect product "+id);
  }
  catch(err){
    res.send("don't have request product!!");
  }
  
});
app.use("/products", productRouter);

app.listen(port, () => {
  console.log("Listening on port %d", port);
});
