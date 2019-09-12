CREATE TABLE generated (
    id SERIAL PRIMARY KEY,
    title text,
    category text,
    created timestamp without time zone DEFAULT now(),
    pre_title text
);

CREATE TABLE reported (
    id SERIAL PRIMARY KEY,
    title text,
    category text,
    created timestamp without time zone DEFAULT now(),
    pre_title text,
    initials text
);
