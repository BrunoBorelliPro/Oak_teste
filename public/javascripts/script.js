let products = [];
console.log("aslkdhaskldj");

const form = document.getElementById("myForm");

const productsList = document.getElementById("tableBody");
fetch("http://localhost:3000/api")
  .then((res) => {
    return res.json();
  })
  .then((products) => {
    console.log(products);
    products.forEach((product) => {
      const row = document.createElement("tr");
      row.id = product.id;
      row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.price.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}</td>
        <td>${product.description}</td>
        <td>${product.availability ? "✅" : "❌"}</td>
      `;
      productsList.appendChild(row);
    });
  });
