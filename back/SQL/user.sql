CREATE TABLE user(
    level INT DEFAULT 3 NOT NULL,
    userid VARCHAR(10) NOT NULL ,
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

INSERT INTO user(userid,userpw, name, nickname, birth, gender, phone, mobile, userlevel)
            Values('IU','1234', '이지은','IU','19930516', 'F', '-', '01065681053',3);
