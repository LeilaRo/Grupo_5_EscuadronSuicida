CREATE TABLE `products` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(50) NOT NULL,
   `description` VARCHAR(255) NOT NULL,
   `price` DECIMAL NOT NULL,
   `categoryId` INT NOT NULL,
   `productImages` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `firstName` VARCHAR(50) NOT NULL,
   `lastName` VARCHAR(50) NOT NULL,
   `email` VARCHAR(50) NOT NULL,
   `password` VARCHAR(255) NOT NULL,
   `address` VARCHAR(255),
   `city` VARCHAR(50),
   `province` VARCHAR(50),
   `phone` INT,
   `birthDate` DATETIME,
   `country` VARCHAR(50),
   `role` INT NOT NULL,
   `userImage` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `categories` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(50) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `productImages` (
   `id`  NOT NULL,
   `url` VARCHAR(255) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `roles` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(50) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `productCart` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `prodCartId` INT NOT NULL,
   `userCartId` INT NOT NULL,
   `amount` INT NOT NULL,
   `discount` DECIMAL NOT NULL,
   `totalPrice` INT NOT NULL,
   `date` DATETIME,
   PRIMARY KEY (`id`)
);

CREATE TABLE `prodCart` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `productId` INT NOT NULL AUTO_INCREMENT,
   `productCartId` INT NOT NULL AUTO_INCREMENT,
   PRIMARY KEY (`id`)
);

CREATE TABLE `userCart` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `userId` INT NOT NULL AUTO_INCREMENT,
   `productCartId` INT NOT NULL AUTO_INCREMENT,
   PRIMARY KEY (`id`)
);

CREATE TABLE `userImages` (
   `id`  INT NOT NULL AUTO_INCREMENT,
   `url` VARCHAR(255) NOT NULL,
   PRIMARY KEY (`id`)
);


ALTER TABLE `products` ADD CONSTRAINT `FK_496613ce-79d9-4ff5-8904-7d1b50603a36` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`)  ;

ALTER TABLE `products` ADD CONSTRAINT `FK_54a364dc-dbf3-4d88-ba0b-2ec2369aa894` FOREIGN KEY (`productImages`) REFERENCES `productImages`(`id`)  ;

ALTER TABLE `users` ADD CONSTRAINT `FK_104332aa-e7b8-4c58-814a-2429cfe45c80` FOREIGN KEY (`role`) REFERENCES `roles`(`id`)  ;

ALTER TABLE `users` ADD CONSTRAINT `FK_30b90bff-8d95-48b4-8a37-8d1580987117` FOREIGN KEY (`userImage`) REFERENCES `userImages`(`id`)  ;

ALTER TABLE `productCart` ADD CONSTRAINT `FK_c4a16f80-2aef-4b84-a99c-947d23259b3b` FOREIGN KEY (`prodCartId`) REFERENCES `prodCart`(`id`)  ;

ALTER TABLE `productCart` ADD CONSTRAINT `FK_0680d15e-16d8-4340-83c7-c364f6c56978` FOREIGN KEY (`userCartId`) REFERENCES `userCart`(`id`)  ;

ALTER TABLE `prodCart` ADD CONSTRAINT `FK_7c05a1b4-6449-49c6-9833-f2f314b9e272` FOREIGN KEY (`productCartId`) REFERENCES `productCart`(`id`)  ;

ALTER TABLE `prodCart` ADD CONSTRAINT `FK_b39eedf2-4609-4714-881b-8ced3b30ec96` FOREIGN KEY (`productId`) REFERENCES `products`(`id`)  ;

ALTER TABLE `userCart` ADD CONSTRAINT `FK_db75bbd9-7dbb-49f9-b3c3-7374be7e0709` FOREIGN KEY (`userId`) REFERENCES `users`(`id`)  ;

ALTER TABLE `userCart` ADD CONSTRAINT `FK_5f9bccfd-bc6e-4197-bd5a-08df5a9d856f` FOREIGN KEY (`productCartId`) REFERENCES `productCart`(`id`)  ;
