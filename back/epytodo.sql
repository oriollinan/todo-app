DROP DATABASE IF EXISTS epytodo;

CREATE DATABASE IF NOT EXISTS epytodo;

USE epytodo;

CREATE TABLE IF NOT EXISTS user (
    id bigint UNSIGNED NOT NULL AUTO_INCREMENT,
    email text NOT NULL unique,
    password varchar(255) NOT NULL,
    created_at datetime NOT NULL DEFAULT NOW(),
    name varchar(255) NOT NULL,
    firstname varchar(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS todo (
    id bigint NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    created_at datetime NOT NULL DEFAULT NOW(),
    due_time datetime NOT NULL,
    status enum("not started", "todo", "in progress", "done") NOT NULL DEFAULT "not started",
    user_id bigint UNSIGNED NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);
