-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 20, 2020 at 11:20 PM
-- Server version: 5.6.47-cll-lve
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Toss`
--

-- --------------------------------------------------------

--
-- Table structure for table `browjob`
--

CREATE TABLE `browjob` (
  `id` int(10) NOT NULL,
  `first_name` varchar(60) NOT NULL,
  `last_name` varchar(60) NOT NULL,
  `e_mail` varchar(60) NOT NULL,
  `password` varchar(300) NOT NULL,
  `contact_no` bigint(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `employ_joblist`
--

CREATE TABLE `employ_joblist` (
  `id` int(11) NOT NULL,
  `company_name` varchar(50) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `contact` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `joblist`
--

CREATE TABLE `joblist` (
  `id` int(11) NOT NULL,
  `job_name` varchar(1000) NOT NULL,
  `category` varchar(1000) NOT NULL,
  `reciptant` varchar(1000) NOT NULL,
  `worker_requi` varchar(1000) NOT NULL,
  `venue` varchar(1000) NOT NULL,
  `address` varchar(1000) NOT NULL,
  `pin` int(7) NOT NULL,
  `start_time` varchar(1000) NOT NULL,
  `estimate_job_time` varchar(30) NOT NULL,
  `pay_per_persion` varchar(1000) NOT NULL,
  `total_pay` int(100) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `posjob`
--

CREATE TABLE `posjob` (
  `id` int(10) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `e_mail` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `company_name` varchar(60) NOT NULL,
  `verification_paper` varchar(60) NOT NULL,
  `any_mwssage` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `posjob`
--

INSERT INTO `posjob` (`id`, `first_name`, `last_name`, `e_mail`, `password`, `company_name`, `verification_paper`, `any_mwssage`) VALUES
(1, 'Deepak', 'Mishra', 'm.deepak1824@gnail.com', 'Deepak1824', 'Student', 'No', '');

-- --------------------------------------------------------

--
-- Table structure for table `Power ranger`
--

CREATE TABLE `Power ranger` (
  `id` int(11) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `contact` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Tcs`
--

CREATE TABLE `Tcs` (
  `id` int(11) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `contact` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Wipro`
--

CREATE TABLE `Wipro` (
  `id` int(11) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `contact` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `browjob`
--
ALTER TABLE `browjob`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employ_joblist`
--
ALTER TABLE `employ_joblist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `joblist`
--
ALTER TABLE `joblist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posjob`
--
ALTER TABLE `posjob`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Power ranger`
--
ALTER TABLE `Power ranger`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Tcs`
--
ALTER TABLE `Tcs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Wipro`
--
ALTER TABLE `Wipro`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `browjob`
--
ALTER TABLE `browjob`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employ_joblist`
--
ALTER TABLE `employ_joblist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `joblist`
--
ALTER TABLE `joblist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posjob`
--
ALTER TABLE `posjob`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Power ranger`
--
ALTER TABLE `Power ranger`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Tcs`
--
ALTER TABLE `Tcs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Wipro`
--
ALTER TABLE `Wipro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
