import sqlite3 from "sqlite3";
export const createDatabase = () => {
  const db = new sqlite3.Database("./db.db", (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to SQlite database.");
  });

  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10,5) NOT NULL,
        availability INTEGER NOT NULL
    )`,
      (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log("Created table products.");
      }
    );
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Closed the database connection.");
  });
};
export function openDB() {
  const db = new sqlite3.Database("./db.db", (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to SQlite database.");
  });
  return db;
}
