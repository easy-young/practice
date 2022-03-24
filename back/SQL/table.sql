CREATE DATABASE jenny;
USE DATABASE jenny;

CREATE TABLE user(
    level INT DEFAULT 3 NOT NULL,
    userid VARCHAR(10) NOT NULL,
    userpw VARCHAR(10) NOT NULL,
    userimage TEXT NOT NULL,
    name VARCHAR(10) NOT NULL,
    nickname VARCHAR(10) NOT NULL,
    birth DATE,
    address TEXT NOT NULL,
    gender CHAR(1),
    tel VARCHAR(11),
    phone VARCHAR(11) NOT NULL,
    email TEXT NOT NULL,
    intro TEXT NOT NULL,
    point INT DEFAULT 0 NOT NULL,
    active INT NOT NULL DEfAULT 1,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(userid),
    UNIQUE KEY(nickname)
);

CREATE TABLE board(
    idx INT NOT NULL AUTO_INCREMENT,
    main VARCHAR(10) NOT NULL,
    sub VARCHAR(10) NOT NULL,
    subject VARCHAR(40) NOT NULL,
    nickname VARCHAR(10) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    content TEXT NOT NULL,
    hit INT DEFAULT 0 NOT NULL,
    good INT DEFAULT 0 NOT NULL,
    imageName TEXT NOT NULL,
    active INT NOT NULL DEFAULT 1,
    PRIMARY KEY(idx),
    FOREIGN KEY (main, sub) REFERENCES board (main, sub)
);

CREATE TABLE reply(
    idx INT NOT NULL AUTO_INCREMENT,
    content TEXT NOT NULL,
    FOREIGN KEY (idx) REFERENCES board (idx)
);

-- CREATE TABLE img(
--     idx INT NOT NULL AUTO_INCREMENT,
--     img1 TEXT NOT NULL,
--     img2 TEXT NOT NULL,
--     img3 TEXT NOT NULL,
--     img4 TEXT NOT NULL,
--     img5 TEXT NOT NULL,
--     FOREIGN KEY (idx) REFERENCES board (idx)
-- );

CREATE TABLE category(
    code INT NOT NULL AUTO_INCREMENT,
    main VARCHAR(10) NOT NULL,
    sub VARCHAR(10) NOT NULL,
    PRIMARY KEY (code),
    UNIQUE KEY(sub)
);

CREATE TABLE tag(
    idx INT NOT NULL AUTO_INCREMENT,
    tag1 VARCHAR(10) NOT NULL,
    tag2 VARCHAR(10) NOT NULL,
    tag3 VARCHAR(10) NOT NULL,
    tag4 VARCHAR(10) NOT NULL,
    tag5 VARCHAR(10) NOT NULL,
    FOREIGN KEY (idx) REFERENCES board (idx)
);