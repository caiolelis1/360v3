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
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `idquestion` int NOT NULL,
  `question` varchar(200) NOT NULL,
  `criteriaId` int NOT NULL,
  `text` int DEFAULT NULL,
  PRIMARY KEY (`idquestion`),
  KEY `criteriaId_idx` (`criteriaId`),
  CONSTRAINT `questionsCriteriaId` FOREIGN KEY (`criteriaId`) REFERENCES `criterias` (`idCriteria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,'O membro costuma chegar nos horários marcados?',1,NULL),(2,'O membro se expressa claramente?',4,NULL),(3,'O membro apresenta iniciativa?',5,NULL),(4,'O membro mantém uma boa interação com os colegas?',6,NULL),(5,'O membro consegue trabalhar em grupo sem causar conflitos?',7,NULL),(6,'O membro é entusiasmado em relação a equipe?',8,NULL),(7,'O membro consegue manter o foco e tomar medidas necessárias em situações estressantes?',9,NULL),(8,'O membro está presente no CPH?',2,NULL),(9,'O membro participa das reuniões?',2,NULL),(10,'O membro colabora com ideias criativas?',10,NULL),(11,'O membro está disposto a colaborar nos projetos/reuniões?',10,NULL),(12,'O membro cumpre os prazos estabelecidos nos projetos?',11,NULL),(13,'O membro se propõe a realizar todas as tarefas de maneira eficaz, produtiva e com qualidade?',11,NULL),(14,'O membro apresenta responsabilidade em relação a equipe?',12,NULL),(15,'O membro consegue definir prioridades?',13,NULL),(16,'O membro ajuda a manter as salinhas organizadas/limpas?',13,NULL),(17,'O diretor consegue delegar as tarefas entre os membros?',14,NULL),(18,'O diretor estimula a participação de todos?',14,NULL),(19,'O diretor contribui com um ambiente confortável para se expressarem?',15,NULL),(20,'O diretor é imparcial?',15,NULL),(21,'O diretor incentiva e apoia a ideia dos outros?',16,NULL),(22,'O diretor se disponibiliza a tirar dúvidas?',3,NULL),(23,'O diretor se mantém próximo da equipe?',3,NULL),(24,'No que você acha que seu colega mandou bem nos últimos três meses?',17,1),(25,'No que você acha que seu colega pode melhorar/desenvolver?',18,1),(26,'Com que frequência você usa a Suati?',19,NULL),(27,'Com que frequência esse membro preenche a Suati?',19,NULL);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
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

-- Dump completed on 2023-03-23 10:52:54
