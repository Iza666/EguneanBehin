-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-01-2020 a las 08:50:43
-- Versión del servidor: 10.4.10-MariaDB
-- Versión de PHP: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `eguneanbehin`
--
CREATE DATABASE IF NOT EXISTS `eguneanbehin` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
USE `eguneanbehin`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `erabiltzaileak`
--

DROP TABLE IF EXISTS `erabiltzaileak`;
CREATE TABLE `erabiltzaileak` (
  `id` int(3) NOT NULL,
  `izena` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `mugikorra` int(9) NOT NULL,
  `argazkia` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `pasahitza` varchar(50) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `galderak`
--

DROP TABLE IF EXISTS `galderak`;
CREATE TABLE `galderak` (
  `id` int(3) NOT NULL,
  `galdera` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `opt1` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `opt2` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `opt3` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `erantzuna` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `argazkia` varchar(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sailkapena`
--

DROP TABLE IF EXISTS `sailkapena`;
CREATE TABLE `sailkapena` (
  `id_erabiltzailea` int(3) NOT NULL,
  `puntuak` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `erabiltzaileak`
--
ALTER TABLE `erabiltzaileak`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `galderak`
--
ALTER TABLE `galderak`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sailkapena`
--
ALTER TABLE `sailkapena`
  ADD PRIMARY KEY (`id_erabiltzailea`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `erabiltzaileak`
--
ALTER TABLE `erabiltzaileak`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `galderak`
--
ALTER TABLE `galderak`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sailkapena`
--
ALTER TABLE `sailkapena`
  MODIFY `id_erabiltzailea` int(3) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `sailkapena`
--
ALTER TABLE `sailkapena`
  ADD CONSTRAINT `id_erab_fk` FOREIGN KEY (`id_erabiltzailea`) REFERENCES `erabiltzaileak` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
