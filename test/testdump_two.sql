DROP TABLE IF EXISTS table_two ;

CREATE TABLE `table_two` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `intval` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 ;

INSERT INTO `table_two` (`id`, `intval`) VALUES
('1', '7'),
('2', '686786');

