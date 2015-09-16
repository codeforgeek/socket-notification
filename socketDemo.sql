-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 16, 2015 at 01:41 PM
-- Server version: 5.6.26
-- PHP Version: 5.5.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `socketDemo`
--

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE IF NOT EXISTS `User` (
  `UserId` int(11) NOT NULL,
  `UserName` varchar(25) NOT NULL,
  `Password` varchar(25) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`UserId`, `UserName`, `Password`) VALUES
(1, 'shahid', 'shahid');

-- --------------------------------------------------------

--
-- Table structure for table `UserComment`
--

CREATE TABLE IF NOT EXISTS `UserComment` (
  `UserId` int(11) NOT NULL,
  `UserName` varchar(11) NOT NULL,
  `Comment` text NOT NULL,
  `PostId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `UserComment`
--

INSERT INTO `UserComment` (`UserId`, `UserName`, `Comment`, `PostId`) VALUES
(1, 'shahid', '\n			\n			\n			\n			\n		', 0),
(1, 'shahid', '\n			\n			\n			\n			\n		', 0),
(1, 'shahid', '\n			\n			\n			\n			\n		', 0),
(1, 'shahid', '\n			\n			\n			\n			\n		', 0),
(1, 'shahid', '\n			\n			\n			\n			\n		', 0),
(1, 'shahid', '\n			\n			\n			\n			\n		', 0);

-- --------------------------------------------------------

--
-- Table structure for table `UserPost`
--

CREATE TABLE IF NOT EXISTS `UserPost` (
  `UserPostId` int(11) NOT NULL,
  `UserPostContent` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `UserPost`
--

INSERT INTO `UserPost` (`UserPostId`, `UserPostContent`) VALUES
(1, 'This is test comment.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`UserName`),
  ADD KEY `UserIdIndex` (`UserId`);

--
-- Indexes for table `UserComment`
--
ALTER TABLE `UserComment`
  ADD KEY `UserIdIndexComment` (`UserId`),
  ADD KEY `PostIdIndex` (`PostId`);

--
-- Indexes for table `UserPost`
--
ALTER TABLE `UserPost`
  ADD PRIMARY KEY (`UserPostId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `UserId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `UserPost`
--
ALTER TABLE `UserPost`
  MODIFY `UserPostId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
