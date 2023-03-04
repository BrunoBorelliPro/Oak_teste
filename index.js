import express from "express";
import path from "path";
import { createDatabase } from "./db/db.js";
import { createProduct, getProducts } from "./db/product.js";

createDatabase();
const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/styles", express.static(__dirname + "/public/stylesheets"));
app.use("/scripts", express.static(__dirname + "/public/javascripts"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.post("/", async (req, res) => {
  console.log("cadastrarProduto");
  const { name, description, price, availability } = req.body;
  let product = {
    name,
    description,
    price,
    availability,
  };
  try {
    await createProduct(product);
    res.sendFile(path.join(__dirname, "public", "index.html"));
  } catch (error) {
    console.log(error);

    res.status(500).send("Erro ao cadastrar produto!");
  }
});

app.get("/api", (req, res) => {
  try {
    getProducts((_products) => res.status(200).json(_products));
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao buscar produtos!");
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
