CREATE TABLE board(
    idx INT NOT NULL AUTO_INCREMENT,
    subject VARCHAR(40) NOT NULL,
    nickname VARCHAR(10) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    content TEXT NOT NULL,
    hit INT DEFAULT 0 NOT NULL,
    like INT DEFAULT 0 NOT NULL,
    PRIMARY KEY(idx)
);



-- INSERT INTO board(subject,nickname,content)
-- SELECT subject,nickname,content FROM board;