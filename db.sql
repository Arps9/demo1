create table user (
    id varchar(20) primary key,
    username varchar(30) unique,
    email varchar(30) unique not null,
    password varchar(50) not null
);