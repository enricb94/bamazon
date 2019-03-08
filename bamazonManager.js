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
    console.log("-------------------------------------");
    console.log("MANAGER VIEW");
    console.log("-------------------------------------");
   menu();
  });


function menu() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "Menu Options",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product",
          "EXIT"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View Products for Sale":
          ViewProduct();
          break;
  
        case "View Low Inventory":
          ViewInventory();
          break;
  
        case "Add to Inventory":
          addInventory();
          break;
  
        case "Add New Product":
          addProduct();
          break;
            
        case "exit":
          connection.end();
          break;
        }
      });
}
// function to view all product
function ViewProduct(){
    var query = "SELECT * FROM bamazon.products WHERE Stock_quantity >= 1"
    connection.query(query,function(err, res) {
        console.log("Searching list of item available...\n");
        for (let i = 0; i < res.length; i++) {
            console.log("ID: "+res[i].id);
            console.log("Product Name: "+res[i].product_name);
            console.log("Price: $"+ res[i].price);
            console.log("Quantity: "+ res[i].Stock_quantity);
            console.log("-------------------------------------");
        }
        menu();
    })
}

//function to View inventory
function ViewInventory(){
    var query = "SELECT * FROM bamazon.products WHERE Stock_quantity <= 5"
    connection.query(query,function(err, res) {
        console.log("Searching list of item available...\n");
        for (let i = 0; i < res.length; i++) {
            console.log("ID: "+res[i].id);
            console.log("Product Name: "+res[i].product_name);
            console.log("Price: $"+ res[i].price);
            console.log("Quantity: "+ res[i].Stock_quantity);
            console.log("-------------------------------------");
        }
        menu();
    })
}
// Function to add more quantity of item
function addInventory(){
    inquirer
      .prompt([
        {
          type: "input",
          message: "Product ID:",
          name: "id"
        },
        {
          type: "input",
          message: "Number of Units:",
          name: "stock"
        },
        {type: "confirm",
        message: "Please confirm your selection:",
        name: "confirm",
        }
      ])
      .then(function(inquirerResponse) {
        if (inquirerResponse.confirm) {
          console.log("\nYou chose the item with ID " + inquirerResponse.id);
          console.log("You will add " + inquirerResponse.stock + " product(s) from ID "+inquirerResponse.id +"\n");
          idSelect = parseInt(inquirerResponse.id);
          quantitySelect = parseInt(inquirerResponse.stock);
          checkStock(idSelect, quantitySelect);
        }
        else {
          console.log("\nPlese make sure the item ID and quantity are correct\n");
        }
      });
}

// function to check the Quantity stock 
function checkStock(idSelect,quantitySelect){
    connection.query("SELECT * FROM bamazon.products WHERE ? ",
    [
      {
        id: idSelect
      }
    ],
    function(err, res) {
        currentStock = res[0].Stock_quantity;
        console.log("You have "+currentStock+" units of this item\n");
        var newQuantity = (currentStock + quantitySelect);
        updateStock(newQuantity, idSelect);
    })
};

// Function to update the Stock
function updateStock(newQuantity, idSelect) {
    console.log("Updating Stock...\n");
    var query = connection.query("UPDATE products SET ? WHERE ?",
    [
      {
        Stock_quantity: newQuantity
      },
      {
        id: idSelect
      }
    ],
    function(err, res) {
        console.log("Stock updated!\n");
        console.log("The stock quantity is now "+ newQuantity);
        menu();
    }
    );
}

// Function to add Product in the store
function addProduct(){
    inquirer
      .prompt([
        {
          type: "input",
          message: "Name your item",
          name: "name"
        },
        {
          type: "input",
          message: "What is the department of your item?",
          name: "department"
        },
        {
          type: "input",
          message: "What is the price  of this item?",
          name: "price"
        },
        {
          type: "input",
          message: "How many units of the product?",
          name: "stock"
        },
        {
          type: "confirm",
          message: "Plese make sure the item ID and quantity are correct",
          name: "confirm",
        }
      ])
      .then(function(inquirerResponse) {
        if (inquirerResponse.confirm) {
            console.log("Product Name: "+inquirerResponse.name);
            console.log("Departement Name: "+ inquirerResponse.department);
            console.log("Price: $"+ inquirerResponse.price);
            console.log("Stock: "+ inquirerResponse.stock);
            console.log("__________________________________"); 
            var name = inquirerResponse.name;
            var department = inquirerResponse.department;
            var price = inquirerResponse.price;
            var quantity = inquirerResponse.stock;
            NewProduct(name,department,price,quantity);
        }
        else {
          console.log("\nPlese make sure the item ID, department, price and quantity are correct\n");
        }
      });
}
// function to insert product to Database 
function NewProduct(name,department,price,quantity){
    connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: name,
          departement_name: department,
          price: price,
          Stock_quantity: quantity
        },
        function(err, res) {
          console.log(name + " product inserted!\n");
          menu();
        }
      );
}
  



