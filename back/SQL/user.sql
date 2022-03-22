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


INSERT INTO user (
    level, userid, userpw, userimage, name, nickname, birth,
    address, gender, tel, phone, email, intro, point, active, date
) VALUES (
    3, 'seungju', '1234', 'kek4mf', '승주', '경두싹빨', 930429, '천호동', 'M',
    '7621823', '01065681053', '5454', 'hhhh', 0, 0, 940202
    );
