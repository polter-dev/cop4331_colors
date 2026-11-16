-- Test database for the CI integration tests.
-- Columns match what api/*.php query.
CREATE DATABASE IF NOT EXISTS COP4331;
USE COP4331;

CREATE TABLE Users (
  ID INT NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(50) NOT NULL DEFAULT '',
  lastName VARCHAR(50) NOT NULL DEFAULT '',
  Login VARCHAR(50) NOT NULL DEFAULT '',
  Password VARCHAR(50) NOT NULL DEFAULT '',
  PRIMARY KEY (ID)
);

CREATE TABLE Colors (
  ID INT NOT NULL AUTO_INCREMENT,
  Name VARCHAR(50) NOT NULL DEFAULT '',
  UserID INT NOT NULL DEFAULT 0,
  PRIMARY KEY (ID)
);

INSERT INTO Users (firstName, lastName, Login, Password)
VALUES ('Test', 'User', 'testuser', 'testpass');
