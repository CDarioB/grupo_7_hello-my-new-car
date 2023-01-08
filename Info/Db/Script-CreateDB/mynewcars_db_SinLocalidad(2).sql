/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP DATABASE IF EXISTS mynewcars_db;
CREATE DATABASE mynewcars_db;
USE mynewcars_db;

--
-- Table structure for table `rol`
--
DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rol` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'ADMIN'),(2,'USER');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `rol_id` int(10) unsigned NOT NULL,
  `first_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `tel` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `pass`  varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_rol_id_foreign` (`rol_id`),
  CONSTRAINT `users_rol_id_foreign` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,NULL,NULL,1,'Dario','Barbara','1234567890','cdb@gmail.com','admin#85'),
						   (2,NULL,NULL,2,'Pepe','Pepe','1234567890','pepe@gmail.com','pepe#86'),
						   (3,NULL,NULL,2,'Marcos','Marcos','1234567890','marcos@gmail.com','marcos#87'),
						   (4,NULL,NULL,2,'Marisa','Marisa','1234567890','marisa@gmail.com','marisa#88'),
						   (5,NULL,NULL,2,'Sofia','Sofia','1234567890','sofia@gmail.com','sofia#89'),
						   (6,NULL,NULL,2,'Martin','Martin','1234567890','martin@gmail.com','martin#90');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `category`
--
DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'AUTOMOVIL'),(2,'CAMIONETA'),(3,'DEPORTIVO');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--
DROP TABLE IF EXISTS `provinces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `provinces` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `province` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


--
-- Dumping data for table `provinces`
--
LOCK TABLES `provinces` WRITE;
/*!40000 ALTER TABLE `provinces` DISABLE KEYS */;
INSERT INTO `provinces` VALUES
(1, 'Buenos Aires'),(2, 'Buenos Aires-GBA'),(3, 'Capital Federal'),
(4, 'Catamarca'),(5, 'Chaco'),(6, 'Chubut'),(7, 'Córdoba'),(8, 'Corrientes'),
(9, 'Entre Ríos'),(10, 'Formosa'),(11, 'Jujuy'),(12, 'La Pampa'),(13, 'La Rioja'),
(14, 'Mendoza'),(15, 'Misiones'),(16, 'Neuquén'),(17, 'Río Negro'),(18, 'Salta'),
(19, 'San Juan'),(20, 'San Luis'),(21, 'Santa Cruz'),(22, 'Santa Fe'),
(23, 'Santiago del Estero'),(24, 'Tierra del Fuego'),(25, 'Tucumán');
/*!40000 ALTER TABLE `provinces` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `references` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `brand` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `model` int(10) unsigned NOT NULL,
  `mileage` numeric unsigned NOT NULL,
  `price` numeric unsigned NOT NULL, -- `price` decimal(15,3) unsigned NOT NULL,
  `discount_percentage` numeric unsigned DEFAULT NULL,
  `discount_price` numeric unsigned DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `category_id` int(10) unsigned NOT NULL,
  `province_id` int(11) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `products_category_id_foreign` (`category_id`),
  KEY `products_province_id_foreign` (`province_id`),
  KEY `products_user_id_foreign` (`user_id`),
  CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `products_province_id_foreign` FOREIGN KEY (`province_id`) REFERENCES `provinces` (`id`),
  CONSTRAINT `products_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'2022-12-16 00:00:00','2022-12-16 00:00:00','Mini Cooper S 1.6 Jcw Coupe 211cv','BMW',2006,70000,37500,15,31875,'MINI-1.jpg,MINI-2.jpg,MINI-3.jpg,MINI-4.jpg,MINI-5.jpg',1,1,2),
							  (2,'2022-12-16 00:00:00','2022-12-16 00:00:00','Ford Mustang 5.0 GT 421cv','Ford',2007,14000,95000,10,85500,'MUSTANG-1.jpg,MUSTANG-2.jpg,MUSTANG-3.jpg,MUSTANG-4.jpg,MUSTANG-5.jpg',3,22,3),
							  (3,'2022-12-16 00:00:00','2022-12-16 00:00:00','Toyota Etios 1.5 X','Toyota',2017,67526,10000,5,9500,'ETIOS-1.jpg,ETIOS-2.jpg,ETIOS-3.jpg,ETIOS-4.jpg,ETIOS-5.jpg,ETIOS-6.jpg',1,3,4),
							  (4,'2022-12-16 00:00:00','2022-12-16 00:00:00','Ford Ranger Limited 3.2 4x4','Ford',2018,55000,25000,7,23250,'RANGER-1.jpg,RANGER-2.jpg,RANGER-3.jpg,RANGER-4.jpg,RANGER-5.jpg',3,7,5),
							  (5,'2022-12-16 00:00:00','2022-12-16 00:00:00','Peugeot 306','Peugeot',2007,10000,100000,0,100000,'1668410286724_photo.jpg,1668410286732_photo.jpg',1,7,6);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;





/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;


