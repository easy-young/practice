const sqls = 
`SELECT COUNT(CASE WHEN weekday(date)=6 AND hour(date)=0 THEN 1 END) AS 'sun',
COUNT(CASE WHEN weekday(date)=0 AND hour(date)=0 THEN 1 END) AS 'mon', 
COUNT(CASE WHEN weekday(date)=1 AND hour(date)=0 THEN 1 END) AS 'tue', 
COUNT(CASE WHEN weekday(date)=2 AND hour(date)=0 THEN 1 END) AS 'wed', 
COUNT(CASE WHEN weekday(date)=3 AND hour(date)=0 THEN 1 END) AS 'thu', 
COUNT(CASE WHEN weekday(date)=4 AND hour(date)=0 THEN 1 END) AS 'fri', 
COUNT(CASE WHEN weekday(date)=5 AND hour(date)=0 THEN 1 END) AS 'sat'
FROM board
UNION ALL
SELECT COUNT(CASE WHEN weekday(date)=6 AND hour(date)=1 THEN 1 END) AS 'sun',
COUNT(CASE WHEN weekday(date)=0 AND hour(date)=1 THEN 1 END) AS 'mon', 
COUNT(CASE WHEN weekday(date)=1 AND hour(date)=1 THEN 1 END) AS 'tue', 
COUNT(CASE WHEN weekday(date)=2 AND hour(date)=1 THEN 1 END) AS 'wed', 
COUNT(CASE WHEN weekday(date)=3 AND hour(date)=1 THEN 1 END) AS 'thu', 
COUNT(CASE WHEN weekday(date)=4 AND hour(date)=1 THEN 1 END) AS 'fri', 
COUNT(CASE WHEN weekday(date)=5 AND hour(date)=1 THEN 1 END) AS 'sat'
FROM board
UNION ALL
SELECT COUNT(CASE WHEN weekday(date)=6 AND hour(date)=2 THEN 1 END) AS 'sun',
COUNT(CASE WHEN weekday(date)=0 AND hour(date)=2 THEN 1 END) AS 'mon', 
COUNT(CASE WHEN weekday(date)=1 AND hour(date)=2 THEN 1 END) AS 'tue', 
COUNT(CASE WHEN weekday(date)=2 AND hour(date)=2 THEN 1 END) AS 'wed', 
COUNT(CASE WHEN weekday(date)=3 AND hour(date)=2 THEN 1 END) AS 'thu', 
COUNT(CASE WHEN weekday(date)=4 AND hour(date)=2 THEN 1 END) AS 'fri', 
COUNT(CASE WHEN weekday(date)=5 AND hour(date)=2 THEN 1 END) AS 'sat'
FROM board
UNION ALL
SELECT COUNT(CASE WHEN weekday(date)=6 AND hour(date)=3 THEN 1 END) AS 'sun',
COUNT(CASE WHEN weekday(date)=0 AND hour(date)=3 THEN 1 END) AS 'mon', 
COUNT(CASE WHEN weekday(date)=1 AND hour(date)=3 THEN 1 END) AS 'tue', 
COUNT(CASE WHEN weekday(date)=2 AND hour(date)=3 THEN 1 END) AS 'wed', 
COUNT(CASE WHEN weekday(date)=3 AND hour(date)=3 THEN 1 END) AS 'thu', 
COUNT(CASE WHEN weekday(date)=4 AND hour(date)=3 THEN 1 END) AS 'fri', 
COUNT(CASE WHEN weekday(date)=5 AND hour(date)=3 THEN 1 END) AS 'sat'
FROM board
UNION ALL
SELECT COUNT(CASE WHEN weekday(date)=6 AND hour(date)=4 THEN 1 END) AS 'sun',
COUNT(CASE WHEN weekday(date)=0 AND hour(date)=4 THEN 1 END) AS 'mon', 
COUNT(CASE WHEN weekday(date)=1 AND hour(date)=4 THEN 1 END) AS 'tue', 
COUNT(CASE WHEN weekday(date)=2 AND hour(date)=4 THEN 1 END) AS 'wed', 
COUNT(CASE WHEN weekday(date)=3 AND hour(date)=4 THEN 1 END) AS 'thu', 
COUNT(CASE WHEN weekday(date)=4 AND hour(date)=4 THEN 1 END) AS 'fri', 
COUNT(CASE WHEN weekday(date)=5 AND hour(date)=4 THEN 1 END) AS 'sat'
FROM board
UNION ALL
SELECT COUNT(CASE WHEN weekday(date)=6 AND hour(date)=5 THEN 1 END) AS 'sun',
COUNT(CASE WHEN weekday(date)=0 AND hour(date)=5 THEN 1 END) AS 'mon', 
COUNT(CASE WHEN weekday(date)=1 AND hour(date)=5 THEN 1 END) AS 'tue', 
COUNT(CASE WHEN weekday(date)=2 AND hour(date)=5 THEN 1 END) AS 'wed', 
COUNT(CASE WHEN weekday(date)=3 AND hour(date)=5 THEN 1 END) AS 'thu', 
COUNT(CASE WHEN weekday(date)=4 AND hour(date)=5 THEN 1 END) AS 'fri', 
COUNT(CASE WHEN weekday(date)=5 AND hour(date)=5 THEN 1 END) AS 'sat'
FROM board
UNION ALL
SELECT COUNT(CASE WHEN weekday(date)=6 AND hour(date)=6 THEN 1 END) AS 'sun',
COUNT(CASE WHEN weekday(date)=0 AND hour(date)=6 THEN 1 END) AS 'mon', 
COUNT(CASE WHEN weekday(date)=1 AND hour(date)=6 THEN 1 END) AS 'tue', 
COUNT(CASE WHEN weekday(date)=2 AND hour(date)=6 THEN 1 END) AS 'wed', 
COUNT(CASE WHEN weekday(date)=3 AND hour(date)=6 THEN 1 END) AS 'thu', 
COUNT(CASE WHEN weekday(date)=4 AND hour(date)=6 THEN 1 END) AS 'fri', 
COUNT(CASE WHEN weekday(date)=5 AND hour(date)=6 THEN 1 END) AS 'sat'
FROM board
UNION ALL
SELECT COUNT(CASE WHEN weekday(date)=6 AND hour(date)=7 THEN 1 END) AS 'sun',
COUNT(CASE WHEN weekday(date)=0 AND hour(date)=7 THEN 1 END) AS 'mon', 
COUNT(CASE WHEN weekday(date)=1 AND hour(date)=7 THEN 1 END) AS 'tue', 
COUNT(CASE WHEN weekday(date)=2 AND hour(date)=7 THEN 1 END) AS 'wed', 
COUNT(CASE WHEN weekday(date)=3 AND hour(date)=7 THEN 1 END) AS 'thu', 
COUNT(CASE WHEN weekday(date)=4 AND hour(date)=7 THEN 1 END) AS 'fri', 
COUNT(CASE WHEN weekday(date)=5 AND hour(date)=7 THEN 1 END) AS 'sat'
FROM board
UNION ALL
SELECT COUNT(CASE WHEN weekday(date)=6 AND hour(date)=8 THEN 1 END) AS 'sun',
COUNT(CASE WHEN weekday(date)=0 AND hour(date)=8 THEN 1 END) AS 'mon', 
COUNT(CASE WHEN weekday(date)=1 AND hour(date)=8 THEN 1 END) AS 'tue', 
COUNT(CASE WHEN weekday(date)=2 AND hour(date)=8 THEN 1 END) AS 'wed', 
COUNT(CASE WHEN weekday(date)=3 AND hour(date)=8 THEN 1 END) AS 'thu', 
COUNT(CASE WHEN weekday(date)=4 AND hour(date)=8 THEN 1 END) AS 'fri', 
COUNT(CASE WHEN weekday(date)=5 AND hour(date)=8 THEN 1 END) AS 'sat'
FROM board
UNION ALL
SELECT COUNT(CASE WHEN weekday(date)=6 AND hour(date)=9 THEN 1 END) AS 'sun',
COUNT(CASE WHEN weekday(date)=0 AND hour(date)=9 THEN 1 END) AS 'mon', 
COUNT(CASE WHEN weekday(date)=1 AND hour(date)=9 THEN 1 END) AS 'tue', 
COUNT(CASE WHEN weekday(date)=2 AND hour(date)=9 THEN 1 END) AS 'wed', 
COUNT(CASE WHEN weekday(date)=3 AND hour(date)=9 THEN 1 END) AS 'thu', 
COUNT(CASE WHEN weekday(date)=4 AND hour(date)=9 THEN 1 END) AS 'fri', 
COUNT(CASE WHEN weekday(date)=5 AND hour(date)=9 THEN 1 END) AS 'sat'
FROM board
UNION ALL
SELECT COUNT(CASE WHEN weekday(date)=6 AND hour(date)=10 THEN 1 END) AS 'sun',
COUNT(CASE WHEN weekday(date)=0 AND hour(date)=10 THEN 1 END) AS 'mon', 
COUNT(CASE WHEN weekday(date)=1 AND hour(date)=10 THEN 1 END) AS 'tue', 
COUNT(CASE WHEN weekday(date)=2 AND hour(date)=10 THEN 1 END) AS 'wed', 
COUNT(CASE WHEN weekday(date)=3 AND hour(date)=10 THEN 1 END) AS 'thu', 
COUNT(CASE WHEN weekday(date)=4 AND hour(date)=10 THEN 1 END) AS 'fri', 
COUNT(CASE WHEN weekday(date)=5 AND hour(date)=10 THEN 1 END) AS 'sat'
FROM board
UNION ALL
SELECT COUNT(CASE WHEN weekday(date)=6 AND hour(date)=11 THEN 1 END) AS 'sun',
COUNT(CASE WHEN weekday(date)=0 AND hour(date)=11 THEN 1 END) AS 'mon', 
COUNT(CASE WHEN weekday(date)=1 AND hour(date)=11 THEN 1 END) AS 'tue', 
COUNT(CASE WHEN weekday(date)=2 AND hour(date)=11 THEN 1 END) AS 'wed', 
COUNT(CASE WHEN weekday(date)=3 AND hour(date)=11 THEN 1 END) AS 'thu', 
COUNT(CASE WHEN weekday(date)=4 AND hour(date)=11 THEN 1 END) AS 'fri', 
COUNT(CASE WHEN weekday(date)=5 AND hour(date)=11 THEN 1 END) AS 'sat'
FROM board
UNION ALL
SELECT COUNT(CASE WHEN weekday(date)=6 AND hour(date)=12 THEN 1 END) AS 'sun',
COUNT(CASE WHEN weekday(date)=0 AND hour(date)=12 THEN 1 END) AS 'mon', 
COUNT(CASE WHEN weekday(date)=1 AND hour(date)=12 THEN 1 END) AS 'tue', 
COUNT(CASE WHEN weekday(date)=2 AND hour(date)=12 THEN 1 END) AS 'wed', 
COUNT(CASE WHEN weekday(date)=3 AND hour(date)=12 THEN 1 END) AS 'thu', 
COUNT(CASE WHEN weekday(date)=4 AND hour(date)=12 THEN 1 END) AS 'fri', 
COUNT(CASE WHEN weekday(date)=5 AND hour(date)=12 THEN 1 END) AS 'sat'
FROM board
UNION ALL
SELECT COUNT(CASE WHEN weekday(date)=6 AND hour(date)=13 THEN 1 END) AS 'sun',
COUNT(CASE WHEN weekday(date)=0 AND hour(date)=13 THEN 1 END) AS 'mon', 
COUNT(CASE WHEN weekday(date)=1 AND hour(date)=13 THEN 1 END) AS 'tue', 
COUNT(CASE WHEN weekday(date)=2 AND hour(date)=13 THEN 1 END) AS 'wed', 
COUNT(CASE WHEN weekday(date)=3 AND hour(date)=13 THEN 1 END) AS 'thu', 
COUNT(CASE WHEN weekday(date)=4 AND hour(date)=13 THEN 1 END) AS 'fri', 
COUNT(CASE WHEN weekday(date)=5 AND hour(date)=13 THEN 1 END) AS 'sat'
FROM board
UNION ALL
SELECT COUNT(CASE WHEN weekday(date)=6 AND hour(date)=14 THEN 1 END) AS 'sun',
COUNT(CASE WHEN weekday(date)=0 AND hour(date)=14 THEN 1 END) AS 'mon', 
COUNT(CASE WHEN weekday(date)=1 AND hour(date)=14 THEN 1 END) AS 'tue', 
COUNT(CASE WHEN weekday(date)=2 AND hour(date)=14 THEN 1 END) AS 'wed', 
COUNT(CASE WHEN weekday(date)=3 AND hour(date)=14 THEN 1 END) AS 'thu', 
COUNT(CASE WHEN weekday(date)=4 AND hour(date)=14 THEN 1 END) AS 'fri', 
COUNT(CASE WHEN weekday(date)=5 AND hour(date)=14 THEN 1 END) AS 'sat'
FROM board
UNION ALL
SELECT COUNT(CASE WHEN weekday(date)=6 AND hour(date)=15 THEN 1 END) AS 'sun',
COUNT(CASE WHEN weekday(date)=0 AND hour(date)=15 THEN 1 END) AS 'mon', 
COUNT(CASE WHEN weekday(date)=1 AND hour(date)=15 THEN 1 END) AS 'tue', 
COUNT(CASE WHEN weekday(date)=2 AND hour(date)=15 THEN 1 END) AS 'wed', 
COUNT(CASE WHEN weekday(date)=3 AND hour(date)=15 THEN 1 END) AS 'thu', 
COUNT(CASE WHEN weekday(date)=4 AND hour(date)=15 THEN 1 END) AS 'fri', 
COUNT(CASE WHEN weekday(date)=5 AND hour(date)=15 THEN 1 END) AS 'sat'
FROM board
UNION ALL
SELECT COUNT(CASE WHEN weekday(date)=6 AND hour(date)=16 THEN 1 END) AS 'sun',
COUNT(CASE WHEN weekday(date)=0 AND hour(date)=16 THEN 1 END) AS 'mon', 
COUNT(CASE WHEN weekday(date)=1 AND hour(date)=16 THEN 1 END) AS 'tue', 
COUNT(CASE WHEN weekday(date)=2 AND hour(date)=16 THEN 1 END) AS 'wed', 
COUNT(CASE WHEN weekday(date)=3 AND hour(date)=16 THEN 1 END) AS 'thu', 
COUNT(CASE WHEN weekday(date)=4 AND hour(date)=16 THEN 1 END) AS 'fri', 
COUNT(CASE WHEN weekday(date)=5 AND hour(date)=16 THEN 1 END) AS 'sat'
FROM board
UNION ALL
SELECT COUNT(CASE WHEN weekday(date)=6 AND hour(date)=17 THEN 1 END) AS 'sun',
COUNT(CASE WHEN weekday(date)=0 AND hour(date)=17 THEN 1 END) AS 'mon', 
COUNT(CASE WHEN weekday(date)=1 AND hour(date)=17 THEN 1 END) AS 'tue', 
COUNT(CASE WHEN weekday(date)=2 AND hour(date)=17 THEN 1 END) AS 'wed', 
COUNT(CASE WHEN weekday(date)=3 AND hour(date)=17 THEN 1 END) AS 'thu', 
COUNT(CASE WHEN weekday(date)=4 AND hour(date)=17 THEN 1 END) AS 'fri', 
COUNT(CASE WHEN weekday(date)=5 AND hour(date)=17 THEN 1 END) AS 'sat'
FROM board
UNION ALL
SELECT COUNT(CASE WHEN weekday(date)=6 AND hour(date)=18 THEN 1 END) AS 'sun',
COUNT(CASE WHEN weekday(date)=0 AND hour(date)=18 THEN 1 END) AS 'mon', 
COUNT(CASE WHEN weekday(date)=1 AND hour(date)=18 THEN 1 END) AS 'tue', 
COUNT(CASE WHEN weekday(date)=2 AND hour(date)=18 THEN 1 END) AS 'wed', 
COUNT(CASE WHEN weekday(date)=3 AND hour(date)=18 THEN 1 END) AS 'thu', 
COUNT(CASE WHEN weekday(date)=4 AND hour(date)=18 THEN 1 END) AS 'fri', 
COUNT(CASE WHEN weekday(date)=5 AND hour(date)=18 THEN 1 END) AS 'sat'
FROM board
UNION ALL
SELECT COUNT(CASE WHEN weekday(date)=6 AND hour(date)=19 THEN 1 END) AS 'sun',
COUNT(CASE WHEN weekday(date)=0 AND hour(date)=19 THEN 1 END) AS 'mon', 
COUNT(CASE WHEN weekday(date)=1 AND hour(date)=19 THEN 1 END) AS 'tue', 
COUNT(CASE WHEN weekday(date)=2 AND hour(date)=19 THEN 1 END) AS 'wed', 
COUNT(CASE WHEN weekday(date)=3 AND hour(date)=19 THEN 1 END) AS 'thu', 
COUNT(CASE WHEN weekday(date)=4 AND hour(date)=19 THEN 1 END) AS 'fri', 
COUNT(CASE WHEN weekday(date)=5 AND hour(date)=19 THEN 1 END) AS 'sat'
FROM board
UNION ALL
SELECT COUNT(CASE WHEN weekday(date)=6 AND hour(date)=20 THEN 1 END) AS 'sun',
COUNT(CASE WHEN weekday(date)=0 AND hour(date)=20 THEN 1 END) AS 'mon', 
COUNT(CASE WHEN weekday(date)=1 AND hour(date)=20 THEN 1 END) AS 'tue', 
COUNT(CASE WHEN weekday(date)=2 AND hour(date)=20 THEN 1 END) AS 'wed', 
COUNT(CASE WHEN weekday(date)=3 AND hour(date)=20 THEN 1 END) AS 'thu', 
COUNT(CASE WHEN weekday(date)=4 AND hour(date)=20 THEN 1 END) AS 'fri', 
COUNT(CASE WHEN weekday(date)=5 AND hour(date)=20 THEN 1 END) AS 'sat'
FROM board
UNION ALL
SELECT COUNT(CASE WHEN weekday(date)=6 AND hour(date)=21 THEN 1 END) AS 'sun',
COUNT(CASE WHEN weekday(date)=0 AND hour(date)=21 THEN 1 END) AS 'mon', 
COUNT(CASE WHEN weekday(date)=1 AND hour(date)=21 THEN 1 END) AS 'tue', 
COUNT(CASE WHEN weekday(date)=2 AND hour(date)=21 THEN 1 END) AS 'wed', 
COUNT(CASE WHEN weekday(date)=3 AND hour(date)=21 THEN 1 END) AS 'thu', 
COUNT(CASE WHEN weekday(date)=4 AND hour(date)=21 THEN 1 END) AS 'fri', 
COUNT(CASE WHEN weekday(date)=5 AND hour(date)=21 THEN 1 END) AS 'sat'
FROM board
UNION ALL
SELECT COUNT(CASE WHEN weekday(date)=6 AND hour(date)=22 THEN 1 END) AS 'sun',
COUNT(CASE WHEN weekday(date)=0 AND hour(date)=22 THEN 1 END) AS 'mon', 
COUNT(CASE WHEN weekday(date)=1 AND hour(date)=22 THEN 1 END) AS 'tue', 
COUNT(CASE WHEN weekday(date)=2 AND hour(date)=22 THEN 1 END) AS 'wed', 
COUNT(CASE WHEN weekday(date)=3 AND hour(date)=22 THEN 1 END) AS 'thu', 
COUNT(CASE WHEN weekday(date)=4 AND hour(date)=22 THEN 1 END) AS 'fri', 
COUNT(CASE WHEN weekday(date)=5 AND hour(date)=22 THEN 1 END) AS 'sat'
FROM board
UNION ALL
SELECT COUNT(CASE WHEN weekday(date)=6 AND hour(date)=23 THEN 1 END) AS 'sun',
COUNT(CASE WHEN weekday(date)=0 AND hour(date)=23 THEN 1 END) AS 'mon', 
COUNT(CASE WHEN weekday(date)=1 AND hour(date)=23 THEN 1 END) AS 'tue', 
COUNT(CASE WHEN weekday(date)=2 AND hour(date)=23 THEN 1 END) AS 'wed', 
COUNT(CASE WHEN weekday(date)=3 AND hour(date)=23 THEN 1 END) AS 'thu', 
COUNT(CASE WHEN weekday(date)=4 AND hour(date)=23 THEN 1 END) AS 'fri', 
COUNT(CASE WHEN weekday(date)=5 AND hour(date)=23 THEN 1 END) AS 'sat'
FROM board`;

module.exports = {sqls};