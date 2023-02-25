DROP TABLE Person;

CREATE TABLE Person(
   ID INT PRIMARY KEY     NOT NULL,
   NAME           TEXT    NOT NULL,
   AGE            INT     NOT NULL
);

INSERT INTO Person VALUES(1, 'Test Name', 21);
insert into person values(2, 'Test2', 30);