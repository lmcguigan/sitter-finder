CREATE DATABASE customer_db;
USE customer_db;

CREATE TABLE customers
(
	id int NOT NULL AUTO_INCREMENT,
	customer_name varchar(300) NOT NULL,
   	customer_email varchar(300) NOT NULL,
    phone int NOT NULL,
    zip_code int NOT NULL,
    time_frame varchar(100) NOT NULL,
    
	ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  	dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  	PRIMARY KEY(id)
);
 
 CREATE TABLE jobs

 (
     id int NOT NULL AUTO_INCREMENT,
     employee_name varchar (230) NOT NULL,
     employee_ph int NOT NULL,
     employee_email varchar (250),
     employee_zip int NOT NULL,

 )
