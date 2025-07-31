-- ZnetDK, Starter Web Application for rapid & easy development
-- See official website http://www.znetdk.fr
-- Copyright (C) 2015 Pascal MARTINEZ (contact@znetdk.fr)
-- License GNU GPL http://www.gnu.org/licenses/gpl-3.0.html GNU GPL
-- --------------------------------------------------------------------
-- This program is free software: you can redistribute it and/or modify
-- it under the terms of the GNU General Public License as published by
-- the Free Software Foundation, either version 3 of the License, or
-- (at your option) any later version.
-- This program is distributed in the hope that it will be useful,
-- but WITHOUT ANY WARRANTY, without even the implied warranty of
-- MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
-- GNU General Public License for more details.
-- You should have received a copy of the GNU General Public License
-- along with this program.  If not, see <http://www.gnu.org/licenses/>.
-- --------------------------------------------------------------------
-- ZnetDK Core Security Tables
--
-- File version: 1.6
-- Last update: 09/01/2021
--
CREATE TABLE `zdk_profiles` (
  `profile_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Profile ID',
  `profile_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'Profile name',
  `profile_description` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Profile description',
  PRIMARY KEY (`profile_id`),
  UNIQUE KEY `profile_name` (`profile_name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Profiles' AUTO_INCREMENT=1 ;

CREATE TABLE `zdk_profile_menus` (
  `profile_menus_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Profile menus ID',
  `profile_id` int(11) NOT NULL COMMENT 'Profile ID attached to the menu item',
  `menu_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'Menu item ID',
  PRIMARY KEY (`profile_menus_id`),
  UNIQUE KEY `profile_menu_id` (`profile_id`,`menu_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Menus allowed for each profile' AUTO_INCREMENT=1 ;

CREATE TABLE `zdk_users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Internal User id',
  `login_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'Login',
  `login_password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'Password',
  `expiration_date` date NOT NULL COMMENT 'Expiration date of the password',
  `user_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'User name',
  `user_email` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Email',
  `user_phone` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Phone number',
  `notes` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Notes',
  `full_menu_access` tinyint(1) NOT NULL COMMENT 'Does user have access to the full menu?',
  `user_enabled` tinyint(1) NOT NULL COMMENT 'Is user enabled, disabled or archived?',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `login_name` (`login_name`),
  UNIQUE KEY `user_email` (`user_email`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Table of users' AUTO_INCREMENT=1 ;

CREATE TABLE `zdk_user_profiles` (
  `user_profile_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'User profile row ID',
  `user_id` int(11) NOT NULL COMMENT 'User id of the profile',
  `profile_id` int(11) NOT NULL COMMENT 'Profile ID attached to the user',
  PRIMARY KEY (`user_profile_id`),
  UNIQUE KEY `USER_PROFILES_UK` (`profile_id`,`user_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='User profiles' AUTO_INCREMENT=1 ;

CREATE TABLE `zdk_user_pwd_resets` (
   `email` VARCHAR(100) NOT NULL COMMENT 'Email address',
   `request_date_time` DATETIME NOT NULL COMMENT 'Request date time',
   `reset_key` VARCHAR(100) NOT NULL COMMENT 'Reset key',
   UNIQUE `email` (`email`)
  ) ENGINE = InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci COMMENT = 'Password reset';

CREATE TABLE `zdk_profile_rows` (
  `profile_rows_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Technical identifier of the table row',
  `profile_id` int(11) NOT NULL COMMENT 'Identifier of the profile associated to the table row',
  `table_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Table name of the row associated to a profile',
  `row_id` int(11) NOT NULL COMMENT 'Identifier of the row associated to the profile',
  PRIMARY KEY (`profile_rows_id`),
  UNIQUE KEY `PROFILE_ROWS_UK` (`profile_id`,`table_name`,`row_id`),
  KEY `PROFILE_ROWS_IDX` (`table_name`,`row_id`),
  KEY `profile_id` (`profile_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Table rows associated to a ZnetDK profile' AUTO_INCREMENT=1 ;

ALTER TABLE `zdk_profile_menus`
  ADD CONSTRAINT `zdk_profile_menus_ibfk_1` FOREIGN KEY (`profile_id`) REFERENCES `zdk_profiles` (`profile_id`);

ALTER TABLE `zdk_user_profiles`
  ADD CONSTRAINT `zdk_user_profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `zdk_users` (`user_id`),
  ADD CONSTRAINT `zdk_user_profiles_ibfk_2` FOREIGN KEY (`profile_id`) REFERENCES `zdk_profiles` (`profile_id`);

ALTER TABLE `zdk_profile_rows`
  ADD CONSTRAINT `zdk_profile_rows_ibfk_1` FOREIGN KEY (`profile_id`) REFERENCES `zdk_profiles` (`profile_id`);
