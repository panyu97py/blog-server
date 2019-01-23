/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80013
 Source Host           : localhost:3306
 Source Schema         : blog

 Target Server Type    : MySQL
 Target Server Version : 80013
 File Encoding         : 65001

 Date: 23/01/2019 11:37:00
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for blog_article
-- ----------------------------
DROP TABLE IF EXISTS `blog_article`;
CREATE TABLE `blog_article`  (
  `article_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章id',
  `article_title` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章标题',
  `user_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '作者id',
  `article_content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '博文内容',
  `article_views` bigint(255) NOT NULL DEFAULT 0 COMMENT '浏览量',
  `article_comment_count` bigint(255) NOT NULL DEFAULT 0 COMMENT '评论总数',
  `article_date` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '发表日期',
  `arricle_like_count` bigint(255) NOT NULL DEFAULT 0 COMMENT '点赞数',
  PRIMARY KEY (`article_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '博文表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for blog_captcha
-- ----------------------------
DROP TABLE IF EXISTS `blog_captcha`;
CREATE TABLE `blog_captcha`  (
  `captcha_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '验证码id',
  `captcha_text` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '验证码text',
  `captcha_date` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '验证码生成时间',
  PRIMARY KEY (`captcha_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '验证码缓存表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for blog_comment
-- ----------------------------
DROP TABLE IF EXISTS `blog_comment`;
CREATE TABLE `blog_comment`  (
  `comment_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '评论id',
  `user_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '发表用户id',
  `article_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '被评论博文id',
  `commit_like_count` bigint(255) NOT NULL DEFAULT 0 COMMENT '点赞数',
  `commit_date` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '评论日期',
  `commit_content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '评论内容',
  `parent_comment_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '父评论id',
  PRIMARY KEY (`comment_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '文章评论表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for blog_label
-- ----------------------------
DROP TABLE IF EXISTS `blog_label`;
CREATE TABLE `blog_label`  (
  `label_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '标签id',
  `label_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '标签名称',
  `label_alias` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '标签别名',
  `label_desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标签描述',
  PRIMARY KEY (`label_id`) USING BTREE,
  UNIQUE INDEX `label_name`(`label_name`) USING BTREE COMMENT '标签名唯一'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '标签表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for blog_log
-- ----------------------------
DROP TABLE IF EXISTS `blog_log`;
CREATE TABLE `blog_log`  (
  `log_request_date` datetime(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '日志生成时间',
  `log_request_user_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户id',
  `log_request_method` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '请求方式',
  `log_request_host` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'ip地址',
  `log_respone_status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '状态码',
  `log_respone_time` int(11) NULL DEFAULT NULL COMMENT '响应时长',
  `log_respone_params` json NULL COMMENT '服务器返回的参数',
  `log_requset_params` json NULL COMMENT '请求服务器的参数',
  `log_request_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '请求地址',
  PRIMARY KEY (`log_request_date`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '日志表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for blog_set_label
-- ----------------------------
DROP TABLE IF EXISTS `blog_set_label`;
CREATE TABLE `blog_set_label`  (
  `article_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章id',
  `label_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '标签id',
  PRIMARY KEY (`article_id`, `label_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '博文设置标签表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for blog_set_sort
-- ----------------------------
DROP TABLE IF EXISTS `blog_set_sort`;
CREATE TABLE `blog_set_sort`  (
  `article_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章id',
  `sort_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '分类id',
  PRIMARY KEY (`article_id`, `sort_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '文章设置分类表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for blog_sort
-- ----------------------------
DROP TABLE IF EXISTS `blog_sort`;
CREATE TABLE `blog_sort`  (
  `sort_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '分类id',
  `sort_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '分类名称',
  `sort_alias` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '分类别名',
  `sort_desc` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '分类描述',
  `parent_sort_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'root' COMMENT '父分类id',
  PRIMARY KEY (`sort_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '分类表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for bolg_user
-- ----------------------------
DROP TABLE IF EXISTS `bolg_user`;
CREATE TABLE `bolg_user`  (
  `user_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户id',
  `user_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `user_password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户密码',
  `user_nickname` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户昵称',
  `user_email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户邮箱',
  `user_authority` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'ordinary' COMMENT '用户权限',
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE INDEX `user_name`(`user_name`) USING BTREE COMMENT '用户名唯一',
  UNIQUE INDEX `user_id`(`user_id`) USING BTREE COMMENT '用户id唯一'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- View structure for label_link_article
-- ----------------------------
DROP VIEW IF EXISTS `label_link_article`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `label_link_article` AS select `blog_set_label`.`label_id` AS `label_id`,`blog_label`.`label_name` AS `label_name`,`blog_set_label`.`article_id` AS `article_id` from ((`blog_label` join `blog_article`) join `blog_set_label`) where ((`blog_set_label`.`article_id` = `blog_article`.`article_id`) and (`blog_set_label`.`label_id` = `blog_label`.`label_id`));

-- ----------------------------
-- View structure for sort_link_article
-- ----------------------------
DROP VIEW IF EXISTS `sort_link_article`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `sort_link_article` AS select `blog_set_sort`.`sort_id` AS `sort_id`,`blog_sort`.`sort_name` AS `sort_name`,`blog_set_sort`.`article_id` AS `article_id` from ((`blog_sort` join `blog_set_sort`) join `blog_article`) where ((`blog_article`.`article_id` = `blog_set_sort`.`article_id`) and (`blog_sort`.`sort_id` = `blog_set_sort`.`sort_id`));

-- ----------------------------
-- View structure for user_link_articles
-- ----------------------------
DROP VIEW IF EXISTS `user_link_articles`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `user_link_articles` AS select `blog_article`.`user_id` AS `user_id`,`bolg_user`.`user_name` AS `user_name`,`blog_article`.`article_id` AS `article_id` from (`blog_article` join `bolg_user`) where (`blog_article`.`user_id` = `bolg_user`.`user_id`);

-- ----------------------------
-- Event structure for 清空验证码缓存表
-- ----------------------------
DROP EVENT IF EXISTS `清空验证码缓存表`;
delimiter ;;
CREATE EVENT `清空验证码缓存表`
ON SCHEDULE
EVERY '1' HOUR STARTS '2018-12-28 19:36:14'
COMMENT '清空验证码数据缓存'
DO DELETE  FROM blog_captcha WHERE captcha_date < CURRENT_TIMESTAMP
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
