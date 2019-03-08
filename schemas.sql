CREATE DATABASE bamazon
USE bamazon

CREATE TABLE products(
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(40) NOT NULL,
    departement_name VARCHAR(40) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    Stock_quantity INT(4),
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, departement_name, price, Stock_quantity)
VALUES ("Yamaha Keyboard", "Music", 1000,20);

INSERT INTO products (product_name, departement_name, price, Stock_quantity)
VALUES ("Fender Guitar", "Music", 1800,50);

INSERT INTO products (product_name, departement_name, price, Stock_quantity)
VALUES ("Gibson Guitar", "Music", 3000,20);

INSERT INTO products (product_name, departement_name, price, Stock_quantity)
VALUES ("Amazon Echo", "Electronics", 80,100);

INSERT INTO products (product_name, departement_name, price, Stock_quantity)
VALUES ("Amazon Fire TV 4K", "Electronics", 50,150);

INSERT INTO products (product_name, departement_name, price, Stock_quantity)
VALUES ("Samsung Q6F QLED TV 55inch", "Electronics", 800,30);

INSERT INTO products (product_name, departement_name, price, Stock_quantity)
VALUES ("LG OLED TV 65inch", "Electronics", 1600,40);

INSERT INTO products (product_name, departement_name, price, Stock_quantity)
VALUES ("reMarkable Writing Pad", "Electronics", 700, 10);

INSERT INTO products (product_name, departement_name, price, Stock_quantity)
VALUES ("Wine Mini Fridge", "Appliances", 300,80);

INSERT INTO products (product_name, departement_name, price, Stock_quantity)
VALUES ("STIGA Ping Pong Table", "Sports", 500,100);


-- Create Table Department 

USE bamazon;

CREATE TABLE departments(
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(40) NOT NULL,
    overhead_costs DECIMAL (10,2) NOT NULL,
    PRIMARY KEY (department_id)
);

USE bamazon;

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Music", 50000);

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Electronics", 100000);

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Appliances", 15000);

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Sports", 30000);

-- Put new column to product 

USE bamazon;

ALTER TABLE products
ADD COLUMN product_sales DECIMAL (10,2) NOT NULL AFTER stock_quantity;

-- Join two table

