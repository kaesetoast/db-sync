-- phpMyAdmin SQL Dump
-- version 3.4.10.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Erstellungszeit: 10. Jun 2014 um 14:57
-- Server Version: 5.5.37
-- PHP-Version: 5.3.10-1ubuntu3.11

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `test`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `table_one`
--

DROP TABLE IF EXISTS `table_one`;

CREATE TABLE IF NOT EXISTS `table_one` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stringval` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Daten für Tabelle `table_one`
--

INSERT INTO `table_one` (`id`, `stringval`) VALUES
(1, 'bla'),
(2, 'fghdgf');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `table_two`
--

DROP TABLE IF EXISTS `table_two`;

CREATE TABLE IF NOT EXISTS `table_two` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `intval` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Daten für Tabelle `table_two`
--

INSERT INTO `table_two` (`id`, `intval`) VALUES
(1, 7),
(2, 686786);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
