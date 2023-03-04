import { openDB } from "./db.js";

export const getProduct = (id) => {
  const db = openDB();
  const product = db.get("SELECT * FROM products WHERE id = ?", id);
  db.close();
  return product;
};

export const getProducts = (callback) => {
  const db = openDB();
  let products = [];
  db.each(
    "SELECT * FROM products ORDER BY price ASC",
    (err, row) => {
      if (err) {
        console.log(err);
        throw err;
      }
      products.push({
        id: row.id,
        name: row.name,
        description: row.description,
        price: row.price,
        availability: row.availability === 1 ? true : false,
      });
    },
    (err, count) => {
      if (err) {
        console.log(err);
        throw err;
      }
      callback(products);
      db.close();
    }
  );
};

export const createProduct = async (product) => {
  const db = await openDB();
  await db.run(
    "INSERT INTO products (name, description, price, availability) VALUES (?, ?, ?, ?)",
    product.name,
    product.description,
    product.price,
    product.availability ? 1 : 0
  );
  await db.close();
};
