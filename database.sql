CREATE TABLE "Post" (
    id SERIAL PRIMARY KEY NOT NULL,
    userid integer NOT NULL,
    title character varying(50) NOT NULL,
    text character varying NOT NULL,
    created_date timestamp without time zone NOT NULL
);

CREATE TABLE "User" (
    id SERIAL PRIMARY KEY NOT NULL,
    first character varying(15) NOT NULL,
    last character varying(15) NOT NULL,
    username character varying(15) NOT NULL,
    password character varying NOT NULL,
    email character varying(30) NOT NULL
);