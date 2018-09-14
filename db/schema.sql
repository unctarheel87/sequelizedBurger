CREATE DATABASE burger_db;

USE burger_db;

CREATE TABLE burgers (
  id int NOT NULL AUTO_INCREMENT,
  burger_name VARCHAR(30) NOT NULL,
  devoured BOOLEAN DEFAULT false,
  PRIMARY KEY (id)
);

DROP TABLE toppings; 

CREATE TABLE toppings (
  id INT NOT NULL AUTO_INCREMENT,
  topping_name VARCHAR(30) NOT NULL,
  burger_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (burger_id) REFERENCES burgers(id)
);

