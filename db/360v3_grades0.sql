CREATE DATABASE  IF NOT EXISTS `360v3` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `360v3`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: db360.ctnkzp1grgfv.sa-east-1.rds.amazonaws.com    Database: 360v3
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `grades`
--

DROP TABLE IF EXISTS `grades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grades` (
  `idGrades` int NOT NULL AUTO_INCREMENT,
  `questionId` int NOT NULL,
  `evaluatorId` int NOT NULL,
  `evaluatedId` int NOT NULL,
  `grade` varchar(600) NOT NULL,
  `visible` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`idGrades`),
  UNIQUE KEY `id_UNIQUE` (`idGrades`),
  KEY `evaluatorId_idx` (`evaluatorId`),
  KEY `evaluatedId_idx` (`evaluatedId`),
  KEY `questionId_idx` (`questionId`),
  CONSTRAINT `evaluatedId` FOREIGN KEY (`evaluatedId`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `evaluatorId` FOREIGN KEY (`evaluatorId`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `questionId` FOREIGN KEY (`questionId`) REFERENCES `questions` (`idquestion`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=331 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grades`
--

LOCK TABLES `grades` WRITE;
/*!40000 ALTER TABLE `grades` DISABLE KEYS */;
INSERT INTO `grades` VALUES (298,1,1,83,'5',0),(299,2,1,83,'5',0),(300,3,1,83,'5',0),(301,4,1,83,'5',0),(302,5,1,83,'5',0),(303,6,1,83,'5',0),(304,7,1,83,'5',0),(305,17,1,83,'5',0),(306,18,1,83,'5',0),(307,19,1,83,'5',0),(308,20,1,83,'5',0),(309,21,1,83,'5',0),(310,22,1,83,'5',0),(311,23,1,83,'5',0),(312,24,1,83,'a',0),(313,25,1,83,'a',0),(314,1,1,1,'2',0),(315,2,1,1,'2',0),(316,3,1,1,'2',0),(317,4,1,1,'2',0),(318,5,1,1,'2',0),(319,6,1,1,'2',0),(320,7,1,1,'2',0),(321,17,1,1,'2',0),(322,18,1,1,'2',0),(323,19,1,1,'2',0),(324,20,1,1,'2',0),(325,21,1,1,'2',0),(326,22,1,1,'2',0),(327,23,1,1,'2',0),(328,24,1,1,'a',0),(329,25,1,1,'a',0),(330,26,1,1,'2',0);
/*!40000 ALTER TABLE `grades` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-23 10:53:00
