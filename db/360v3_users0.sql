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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `profilePic` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `id_UNIQUE` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Caio Lelis','caiolelis1','caiolelis337@hotmail.com','$2a$10$K2TtJ/Os//MJPXG.U2N10OYI7b5.1vaF9xmvzwKUCusQXOC5CNcza',NULL),(4,'David Rohrs','dvdii','david@gmail.com','$2a$10$FSd4/AdXLfa/q4oWPrsp5ODMmnLG5sUKTlgZmivIIN/GW3zknlLMK',NULL),(13,'Marília Fagundes','marilia','marilia@gmail.com','$2a$10$XXjBw8ZR4mey.nppSkZa7.gQzkbez6FvdKkwHUZ8pha/hkn4U6nXS',NULL),(14,'Luisa Vilela','luisavg','luisavilela@gmail.com','$2a$10$gq6wysTE414mpSej7pt.nOD7METMcGFac9iDchaBEq4k1Jm72ykL.',NULL),(15,'Júlia Viegas','juliaviegas','julia@gmail.com','$2a$10$yTwODghhES3f.sZyut8pbu3JbBqhFyJ5PIylzbqzZ3YR/MnuYeJsC',NULL),(16,'Lucas Telles','lucasgtelles','lucastelles@gmail.com','$2a$10$2/Aehs0L.o2GfcWNR6Pz1eeM5RbiRYhEj5TqB6SL94jvG/Mh8D3.i',NULL),(17,'João Pedro Nunes','jaypi','jp@gmail.com','$2a$10$LaGANmwfmDrjzPi8lJuN1.HjQ18r0eCMkbB8CKCssXoF9fA16irDK',NULL),(18,'Tarcísio Carvalho','tarcisio','tarcisio@gmail.com','$2a$10$Ly2vwuMgVbKRpExLqXcFmOf2yXKAyvq.oHZxYJDD6kxfvSslSTehK',NULL),(19,'Samuel Faria','Samel','samuel@gmail.com','$2a$10$mOZGRXSbnh2CUMWfn0HCh.Dnvls3S3SqjVpjYI1stE.98m29ua6Ei',NULL),(20,'Caius Souza','caiocsouza','caius@gmail.com','$2a$10$q/f09n8OotNh6zq8N.yygucuWuU0/JcfcRbUn84cZiUEQdnUS441i',NULL),(21,'Victória Machado','Vic','victoria@gmail.com','$2a$10$6deKHZee9uGPR1eYvcwKRuTVy1Sti5Dmw7X1BsttuEcCVJYld27WC',NULL),(42,'Raphael Alves','rapha497','raphael@gmail.com','$2a$10$y/nDKF4SLdWr25S0IwjkdeloKPxoc97u46CNjb/4/45CPmZtgKwtO',NULL),(43,'Alan Silva','Alanzin','alansilva@gmail.com','$2a$10$cK80OCXqbLVTrs8y8PsjoOYtfaJb76U2ClwPA.dvN1V0xB4YNI6ia',NULL),(44,'Ana Beatriz Strube','biastrube','bia@gmail.com','$2a$10$QQopyuPwu6Azw.ZqeUbhjeEsILu7Tx40KeWEWp5uEQyE8uiUfyOHK',NULL),(45,'Gabriel Rocha','Gabriel Rocha ','gabrielrocha@gmail.com','$2a$10$yCQ1Q7XW.ZOKi2h/m5FiSegojaHlWLeoe7LSesR44HisFjpNagvGy',NULL),(46,'João Roque','João Roque','joaoroque@gmail.com','$2a$10$OvRNZggmUc6efpIgt3/7IuDuEI5QzXe9I5cKglkpGKlrFJQ8DUkxS',NULL),(47,'Hannah Andrade','Hannah','hannah@gmail.com','$2a$10$Eg4gal7rGBLnMOI6eNt5Eus04PzG3BD7iX5qZFY0.8KYxaGwSpK5O',NULL),(48,'Ana Luiza Pereira','Ana Luiza ','analuiza@gmail.com','$2a$10$Xqolsp35DBLJKeeCYNi7IOSDPXsTLXDK1cfqZoJ47SkFSpNLmRYGi',NULL),(49,'Rodrigo Reis','rodrigolr','rodrigo@gmail.com','$2a$10$u9jtN64ZY0OK.Xk9nyo1XuhSR1xQL9zwrtkYpvGYxpUVO9/HQKPt6',NULL),(50,'Anna Júlia Maciel','Anna Júlia','annajulia@gmail.com','$2a$10$S2UAaMMtjykPy6gDeTDSiuEFwoA9OyT210qvgX0jVJ7bs4.icACX2',NULL),(51,'Luiza Gonçalves','Luiza Gonçalves','luizag@gmail.com','$2a$10$v6KujIgqaIhow5ENEF2S6erl4btkZjLXgsygriXglbdYdKBIqR262',NULL),(52,'Arthur Lira','ArthurLF','lira@gmail.com','$2a$10$2jhYP/hXHB6pPZHw17hPSOeXzQ4ElbR9FEGvCEJQg1FDlUUVVsd.S',NULL),(53,'Lucas de Araújo','LucasAuto','lucasaraujo@gmail.com','$2a$10$0LteXSRbXsBZwUaNl13DluCQBf1jnNxxsv.V32rhiTiu910L/XGeO',NULL),(54,'Gabriel Amaro','gabrielamaron','gabrielamaro@gmail.com','$2a$10$xZ1KHle6engrZbetZ7vbYOh1LeQ.wjYV99OpgNPj1RRJ58/W42Qlm',NULL),(55,'Arthur Librelon','Arthurl','arthurlibrelon@gmail.com','$2a$10$IBkDDsG1267HpDXgmOAtq.EIPDSbzerKaiAWITRq6NmPYH7UNTBpm',NULL),(56,'Lucca Andrade','luccandrade ','lucca@gmail.com','$2a$10$tdmdvTByEdzSBuM4SiLnvuPJkqC104fszAcFxiviff7pddDlkzuRG',NULL),(57,'Guilherme Barbosa','Guilherme','gui@gmail.com','$2a$10$94TUKWZU5nP9/9F8bJbqqe9LC57iAGzWyRSxlFAogaL.kDwxEfbAu',NULL),(58,'Lucas Emídio','lucas emidio','lucaemidio@gmail.com','$2a$10$Ak25wcks7QmV9eCzPH2yAOvHFR1J0xOsb1JaU7RjOeWJ8wBTy/ctu',NULL),(59,'David Protil','David Protil','protil@gmail.com','$2a$10$sJ3uGEnn2sosBiqnNDZbNepvvfdP025FaoGrMBDhgttUerZaYa8oK',NULL),(60,'Gabriel Almeida','Bielluiz_13','biel@gmail.com','$2a$10$6KPqGVC2yTGY1kXgZjmoGOZB4kkhX6OVcHSeXBGzsJKa2bUJh0K0C',NULL),(61,'Leonardo Fernandes','Leonardo','leo@gmail.com','$2a$10$qbGNOe5GakDGDkYwKQ9fTu1vEXfEqnBjG6zO38MV3BY4jCNXGQJxW',NULL),(62,'Tiago Morais','Tiagomorais','tiago@gmail.com','$2a$10$4BMW6gWtaGjun0uJNE5kCutJ.CrbupMmbbVUdGkcV9mJd9FIqffES',NULL),(63,'Haroldo Antunes','Haroldo','haroldo@gmail.com','$2a$10$yKAqdUXdmFGrRRwAGDJ9i.UJDXFhMpFaqgHg1qm20j9WT6wxDHjHG',NULL),(64,'Alan Franklin','alancfr','alanfranklin@gmail.com','$2a$10$EN8pu5UkouKEthQLKg48pO5y80Y12tT4e.H1yn1.wcxAOI5bKXfHC',NULL),(65,'Maria Luísa','Maria Luísa ','malu@gmail.com','$2a$10$2iGKGObzo6YFEerSocaEGOYZSdqNMhf/IXfRk0Le8YWJDSvYUPiBG',NULL),(66,'Arthur Vaz','Arthur Faria Vaz ','arthurvaz@gmail.com','$2a$10$GXrDwwFC6N6KbmETH3i5I.JQH3P1izwHfkNgZ6zDCtqagQpc7JEri',NULL),(67,'Clara Temponi','claratemponi','claratemponi@gmail.com','$2a$10$/bZZO5C/pIRS.TrvBBzFdedPyftYScjCdUf/DzDhiuVHnvZOaS93K',NULL),(68,'Glaucia Figueiredo','Glaucia Marques ','glauciafigueiredo@gmail.com','$2a$10$UXLeuGgPDrjy7u6b/yVHxOxpfdohTjRqVaf3.SnK2wrXhw9F.7RaG',NULL),(77,'Augusto Campos','aunocampos','augusto@gmail.com','$2a$10$y14merN7UkGyM1tRNvs3OeoEBqXwlBH17TYOiI3HmlQXCyqoerohS',NULL),(80,'Roger Lafetá','rogerlafeta','rogerlafeta@gmail.com','$2a$10$kCyx0uhCzub7joNtWMIS5.BN6sp57qFhKAmr6ETkFWVn/5FlNYDh6',NULL),(81,'Nathanielle Lopes','Nahl','nath@gmail.com','$2a$10$9d4b0Ffy50T9ZgddtqAA/.IXpvorcb1dKA0qTpeRopHYreqFt0IKO',NULL),(82,'Lucas Silveira','lucas-silveira','silveira@gmail.com','$2a$10$7DgOJrEHkX2d9UH6XvsIj.Ka3a8btx.fvJ6c0U7v8CclFfJxW3fDu',NULL),(83,'Eduardo Fujii','Dudu12','dudu@gmail.com','$2a$10$brFSMHBM3KdpPzLjUeMRk.r3h1f4S.23Nc5ausBGPeuvCD9CDhw1S',NULL),(84,'Renato Nicolato','Renato Nicolato ','renato@gmail.com','$2a$10$Hyp2e8oHRkJUbnDrtHedTejm1CPEHALzu5Q34dQmXM43xucTvlkvW',NULL),(85,'Matheo Mares','Matheo','matheo@gmail.com','$2a$10$76IKX1Sw4RPHbogfPVxlc.V3k0TqD8sF2JPxsmDY.vKGJWym5Y.ga',NULL),(86,'Vítor Lobão','VitorLobão','vitorlobao@gmail.com','$2a$10$E30mvAbPNCFr2HSXXMrkPu69UwY24LkKsPTCgYgyHOrGO8sglHhPC',NULL),(87,'Antônio Temponi','antoniotmi','antonio@gmail.com','$2a$10$D5cdBqLHr5g0t0w1osv1SOsIYBTmMAt9OCN9Rf6xJEFunVil3oCp2',NULL),(88,'Davi Clark','daviclark','davi@gmail.com','$2a$10$BNWa.Ems.YqJYw1xBZfn5OxdlQdV/GYC1vVwa9w/sw57lAjDv4Y4e',NULL),(89,'Guilherme Camargo','Camargo','camargo@gmail.com','$2a$10$cKJJlAn.d1Owm7S1ugdPc.NxekkmZ861TX0d8rHXz57N/nO1Lc9m2',NULL),(90,'Lucas Vasconcelos','Vasco','vasco@gmail.com','$2a$10$JFjn1GG40jI5U12YlO3ArumBy26Xvxw9tzz9AcUvjOEVQ0HMveQBO',NULL),(91,'Ronaldo Araújo','Ronaldo','ronaldo@gmail.com','$2a$10$Od6.vl/EkAy7s0XRk7x.nue.BDqRzv2eS/M1QBNAB02h1zGo8/CZK',NULL),(92,'Arthur Roquete','arthurarr','roquete@gmail.com','$2a$10$nmU8.1RTtzTBO/H0ioW/ZuNrN3bhv8y7CSEyyhlWBRijND2hrdPVa',NULL),(93,'Gabriel Cruzati','GCruzati','cruzati@gmail.com','$2a$10$Sx2fbcj6zwkgHpR2wwwQbOolnTwAWmkKWev67cRziUHum5b.CDJ4W',NULL),(95,'Lavínia','Laviniads','lavinia.ds18@gmail.com','$2a$10$ITXASu0Ld4zx4gmbMuZZqOVfPjfiC0RuCfEkkGUkFdC44d2B4bqk.',NULL),(96,'Lyandra','Lya','lyandraalmeidasouto@gmail.com','$2a$10$RgJB44mW9txqn8FGIQSC1.l8sTBnmjd/NFfO2awiVf9MwjbZ.3dDq',NULL),(97,'Petra Luz Ribeiro ','Petra ','petraluzr@gmail.com','$2a$10$rJfks0uXsl1zDfMTKEUGf.XUuaqZ5WN3QRaYGQdnQdo2/5CQSYLki',NULL),(98,'Fernando','fernandu','jflopes@ufmg.br','$2a$10$YzESam1qmN1etbZJlVe7xO.BYOZsWb.2vbsCt9.1uyR2bnMiJId26',NULL),(99,'Luiza Viana ','luiza13','luiza13lv@gmail.com','$2a$10$.yU65lnyupAEdPKqP8sPve6EyNQQ/zBmFRVbvxw2pt9y5B1MjSdbW',NULL),(100,'Luiza','Luiza Gabriela Moreira Bernardo','luizagmb2000@hotmail.com','$2a$10$QkKxH3BZaUNikzwm0wjJguNl8ddjVB1tIX3lQUBEK5OS0cpTPN/qm',NULL),(101,'Marcos Lott','lottmarcos','lott.marcos@gmail.com','$2a$10$K6jSRW.4CMRgY8biLsjhzew3sRhIlgHo66BW8HBUP3B1FpjxdPXF.',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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

-- Dump completed on 2023-03-23 10:52:55
