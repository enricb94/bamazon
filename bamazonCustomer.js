var mysql = require("mysql");
var inquirer = require ("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  console.log("----------------------------------");
  console.log("CUSTOMER VIEW");
  console.log("----------------------------------");
  readProducts();
});

// Function to Read and list the product 
function readProducts(){
    connection.query("SELECT * FROM bamazon.products", function(err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
        console.log("ID: "+res[i].id);
        console.log("Product Name: "+res[i].product_name);
        console.log("Department: "+ res[i].departement_name);
        console.log("Price: $"+ res[i].price)
        console.log("----------------------------------");
        }
        buyProduct();
    });
}

// Function to select and buy product
function buyProduct(){
    inquirer
      .prompt([
        {
          type: "input",
          message: "Input the ID of the Product:",
          name: "id"
        },
        {
          type: "input",
          message: "Number of Units:",
          name: "stock"
        },
        {type: "confirm",
        message: "Confirm the ID number:",
        name: "confirm",
        }
      ])
      .then(function(inquirerResponse) {
        if (inquirerResponse.confirm) {
          console.log("\nYou selected ID " + inquirerResponse.id);
          console.log("You will get " + inquirerResponse.stock + " product(s) from ID "+inquirerResponse.id +"\n");
          idSelected = parseInt(inquirerResponse.id);
          quantitySelected = parseInt(inquirerResponse.stock);
          confirmStock(idSelected, quantitySelected);
        }
        else {
          console.log("\nPlese make sure the item ID and quantity are correct\n");
        }
      });
}

// function to check the Quantity stock 
function confirmStock(idSelected,quantitySelected){
    console.log("Checking stock for your product...\n");
    connection.query("SELECT * FROM bamazon.products WHERE ? ",
    [
      {
        id: idSelected
      }
    ],
    function(err, res) {
        currentStock = res[0].Stock_quantity;
       if(currentStock >quantitySelected){
        console.log("Enough product in the store ("+currentStock+")\n");
        var priceSales = res[0].price *  quantitySelected;
        var newQuantity = (currentStock - quantitySelected);
        updateStock(newQuantity, idSelected);
        updateSales(priceSales, idSelected);
       }
       else {
        console.log("not enough product on stock you can buy maximum "+currentStock);
       }
    })
};

// Function to update the Stock
function updateStock(newQuantity, idSelected) {
    console.log("Updating Stock...\n");
    var query = connection.query("UPDATE products SET ? WHERE ?",
    [
      {
        Stock_quantity: newQuantity
      },
      {
        id: idSelected
      }
    ],
    function(err, res) {
        console.log("Stock updated!\n");
        console.log("The stock quantity is now "+ newQuantity);
    }
    );
}

// Function to update the product_sales
function updateSales(priceSales, idSelected) {
  var query = connection.query("UPDATE products SET ? WHERE ?",
  [
    {
      product_sales: priceSales
    },
    {
      id: idSelected
    }
  ],
  function(err, res) {
 
  }
  );
}