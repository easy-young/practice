/*
MySQL Backup
Source Server Version: 8.0.28
Source Database: home
Date: 2022-03-22 17:09:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
--  Table structure for `board`
-- ----------------------------
DROP TABLE IF EXISTS `board`;
CREATE TABLE `board` (
  `idx` int NOT NULL AUTO_INCREMENT,
  `subject` varchar(40) NOT NULL,
  `nickname` varchar(10) NOT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `content` text NOT NULL,
  `hit` int NOT NULL DEFAULT '0',
  `good` int NOT NULL DEFAULT '0',
  `imageName` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `clickUsers` json DEFAULT NULL,
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `level` int NOT NULL DEFAULT '3',
  `userid` varchar(10) NOT NULL,
  `userpw` varchar(10) NOT NULL,
  `userimage` text NOT NULL,
  `name` varchar(10) NOT NULL,
  `nickname` varchar(10) NOT NULL,
  `birth` date DEFAULT NULL,
  `address` text NOT NULL,
  `gender` char(1) DEFAULT NULL,
  `tel` varchar(11) DEFAULT NULL,
  `phone` varchar(11) NOT NULL,
  `email` text NOT NULL,
  `intro` text NOT NULL,
  `point` int NOT NULL DEFAULT '0',
  `active` int NOT NULL DEFAULT '1',
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `nickname` (`nickname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records 
-- ----------------------------
INSERT INTO `board` VALUES ('15','sdsd','ss','2022-03-22 14:33:03','dd','49','0','63d0386a0f2650c8c7fb1becad440d8e_1565262998_5292_1647927183866.jpg',NULL), ('16','ee','ss','2022-03-22 14:33:49','dd','3','0','63d0386a0f2650c8c7fb1becad440d8e_1565262998_5292_1647927229543.jpg',NULL), ('17','sdsd','임현우','2022-03-22 14:34:41','ddd','3','0','63d0386a0f2650c8c7fb1becad440d8e_1565262998_5292_1647927281552.jpg',NULL), ('18','ee','임현우','2022-03-22 14:37:26','dd','5','0','img_1647927446050.gif',NULL), ('19','수정로고','임현우','2022-03-22 15:57:21','수정로고','1','0','SUJUNG_1647932241782.png',NULL), ('20','ㄹㅇㄴㅁㄹ','임현우','2022-03-22 15:59:28','ㄱㄷ','1','0','slaves22111_1647932368347.png',NULL), ('21','고양이','임현우','2022-03-22 16:04:58','고양이입니다','1','0','14474423ccd1acb63fab43dc936ab01302c64b547577e2e_1647932698638.png',NULL);
INSERT INTO `user` VALUES ('3','admin','admin','asdf','임현우','임현우','1997-01-08','rdfsa','M','01033976671','01033976671','gusdn6671@naver.com','sadf','0','1','2022-03-22 10:48:36');
