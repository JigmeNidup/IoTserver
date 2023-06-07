CREATE TABLE IF NOT EXISTS main(
    id BIGSERIAL NOT NULL,
    topic varchar(20) NOT NULL,
    ddate date NOT NULL,
    ddatetext text NOT NULL,
    air_conditioner bigint,
    computer bigint,
    fan bigint,
    fridge bigint,
    laptop bigint,
    printer bigint,
    tv bigint
);

alter table main
alter column air_conditioner type numeric(5,2),
alter column computer type numeric(5,2),
alter column fan type numeric(5,2),
alter column fridge type numeric(5,2),
alter column laptop type numeric(5,2),
alter column printer type numeric(5,2),
alter column tv type numeric(5,2);

alter table main
add column dtime time;
/*
CREATE TABLE IF NOT EXISTS users
(
    id SERIAL NOT NULL,
    name name NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    salt character varying(10) NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS recipe
(
    id SERIAL NOT NULL,
    name name NOT NULL,
    email text NOT NULL,
    title character varying(255) NOT NULL,
    url character varying(255) NOT NULL,
    description text NOT NULL,
    cuisine text NOT NULL,
    mealtype text NOT NULL,
    dietrestricts text[] NOT NULL,
    ingredients text[] NOT NULL,
    steps text[] NOT NULL,
    date date NOT NULL,
    CONSTRAINT recipe_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS comments
(
    id SERIAL NOT NULL,
    name name NOT NULL,
    email text NOT NULL,
    title text NOT NULL,
    comment text NOT NULL,
    replyto text NOT NULL,
    date date NOT NULL,
    datetext text NOT NULL,
    CONSTRAINT comments_pkey PRIMARY KEY (id)
);
*/