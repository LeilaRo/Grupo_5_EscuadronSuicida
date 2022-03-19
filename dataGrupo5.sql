CREATE TABLE `products` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(30) NOT NULL,
   `description` VARCHAR(100) NOT NULL,
   `price` DECIMAL NOT NULL,
   `categoryId` INT NOT NULL,
   `productImages` INT NOT NULL,
   `colours` VARCHAR(25) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(30) NOT NULL,
   `lastName` VARCHAR(30) NOT NULL,
   `email` VARCHAR(50) NOT NULL,
   `password` VARCHAR(255) NOT NULL,
   `address` VARCHAR(255) NOT NULL,
   `city` VARCHAR(50) NOT NULL,
   `province` VARCHAR(50) NOT NULL,
   `phone` INT NOT NULL,
   `birthDate` DATETIME NOT NULL,
   `country)` VARCHAR(50) NOT NULL,
   `role` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `categories` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(20) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `images` (
   `id`  INT NOT NULL AUTO_INCREMENT,
   `url` VARCHAR(255) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `roles` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(25) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `productCart` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `idProduct` INT NOT NULL,
   `idUser` INT NOT NULL,
   `amount` INT NOT NULL,
   `discount` DECIMAL NOT NULL,
   `totalPrice` INT NOT NULL,
   `date` DATETIME,
   PRIMARY KEY (`id`)
);


ALTER TABLE `products` ADD CONSTRAINT `FK_496613ce-79d9-4ff5-8904-7d1b50603a36` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`)  ;

ALTER TABLE `products` ADD CONSTRAINT `FK_54a364dc-dbf3-4d88-ba0b-2ec2369aa894` FOREIGN KEY (`productImages`) REFERENCES `images`(`id`)  ;

ALTER TABLE `users` ADD CONSTRAINT `FK_104332aa-e7b8-4c58-814a-2429cfe45c80` FOREIGN KEY (`role`) REFERENCES `roles`(`id`)  ;

ALTER TABLE `productCart` ADD CONSTRAINT `FK_a482c645-7b51-4a78-bf1d-f276fe801e71` FOREIGN KEY (`idProduct`) REFERENCES `products`(`id`)  ;

ALTER TABLE `productCart` ADD CONSTRAINT `FK_bad6044d-854c-40f3-a653-92d89f88da65` FOREIGN KEY (`amount`) REFERENCES `users`(`id`)  ;
