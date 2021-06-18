CREATE DOMAIN domain_sex VARCHAR(7) NOT NULL DEFAULT ('n/a') CHECK (VALUE IN ('male', 'female', 'n/a'));

CREATE DOMAIN domain_age INTEGER NOT NULL CHECK (VALUE >= 1);

CREATE DOMAIN domain_email VARCHAR(120) NOT NULL CHECK (
    VALUE ~ '^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
);

CREATE DOMAIN domain_cpf VARCHAR(20) NOT NULL CHECK (
    VALUE ~ '^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$'
);

CREATE DOMAIN domain_ingress_year INTEGER NOT NULL DEFAULT (
    EXTRACT(
        YEAR
        FROM
            CURRENT_TIMESTAMP
    )
) CHECK (VALUE >= 1957);

CREATE DOMAIN domain_name VARCHAR(120) NOT NULL;

CREATE DOMAIN domain_course_name VARCHAR(80) NOT NULL;

CREATE DOMAIN domain_discipline_name VARCHAR(100) NOT NULL;

CREATE DOMAIN domain_password VARCHAR(120) NOT NULL CHECK (VALUE !~ '\s');

CREATE TYPE full_address AS (
    city VARCHAR(70),
    country_state VARCHAR(70),
    street VARCHAR(100),
    house_number INTEGER
);

CREATE DOMAIN domain_exam_points NUMERIC(4, 2) NOT NULL CHECK (
    VALUE >= 0.00
    AND VALUE <= 10.00
);

CREATE DOMAIN domain_final_exam_points NUMERIC(4, 2) NULL CHECK (
    VALUE >= 0.00
    AND VALUE <= 10.00
);

CREATE TYPE enum_student_status AS ENUM ('activated', 'banned', 'locked', 'deactivated');

CREATE TABLE person (
    id INTEGER NOT NULL,
    name domain_name,
    email domain_email,
    password domain_password,
    cpf domain_cpf,
    sex domain_sex,
    address full_address,
    age domain_age,
    PRIMARY KEY (id)
);

CREATE TABLE course (
    id INTEGER NOT NULL,
    name domain_course_name,
    code VARCHAR(20) UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE student (
    id INTEGER NOT NULL,
    registration BIGINT NOT NULL UNIQUE,
    ingress_year domain_ingress_year,
    status enum_student_status,
    course_id INTEGER NOT NULL,
    person_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (course_id) REFERENCES course(id),
    FOREIGN KEY (person_id) REFERENCES person(id)
);

CREATE TABLE teacher (
    id INTEGER NOT NULL,
    registration BIGINT NOT NULL UNIQUE,
    person_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (person_id) REFERENCES person(id)
);

CREATE TABLE advisor (
    id INTEGER NOT NULL,
    registration BIGINT NOT NULL UNIQUE,
    person_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (person_id) REFERENCES person(id)
);

CREATE TABLE discipline (
    id INTEGER NOT NULL,
    name domain_discipline_name,
    code VARCHAR(20) UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE course_has_discipline (
    id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    discipline_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (course_id) REFERENCES course(id),
    FOREIGN KEY (discipline_id) REFERENCES discipline(id)
);

CREATE TABLE offer (
    id INTEGER NOT NULL,
    semester_code VARCHAR(30),
    teacher_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    discipline_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (teacher_id) REFERENCES teacher(id),
    FOREIGN KEY (course_id) REFERENCES course(id),
    FOREIGN KEY (discipline_id) REFERENCES discipline(id)
);

CREATE TABLE student_has_offers (
    id INTEGER NOT NULL,
    student_id INTEGER NOT NULL,
    offer_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (student_id) REFERENCES student(id),
    FOREIGN KEY (offer_id) REFERENCES offer(id)
);

CREATE TABLE grade (
    id INTEGER NOT NULL,
    first_exam domain_exam_points,
    second_exam domain_exam_points,
    third_exam domain_exam_points,
    final_exam domain_final_exam_points,
    student_id INTEGER NOT NULL,
    offer_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (student_id) REFERENCES student(id),
    FOREIGN KEY (offer_id) REFERENCES offer(id)
);

DROP FUNCTION get_student(id integer);

CREATE OR REPLACE FUNCTION get_student(student_id integer) 
    RETURNS SETOF student AS $$
SELECT
  *
FROM
  student
WHERE
  student.id = student_id 
$$ LANGUAGE SQL;
  
CREATE OR REPLACE FUNCTION get_students_id_of_an_offer(offer_id integer) RETURNS SETOF integer AS $$
SELECT
  student.id
FROM
  student
  INNER JOIN student_has_offers ON student_has_offers.student_id = student.id
  INNER JOIN offer ON offer.id = student_has_offers.offer_id 
$$ LANGUAGE SQL;
  
CREATE OR REPLACE FUNCTION get_teacher_id_of_an_offer(offer_id integer) 
 RETURNS SETOF integer AS $$
SELECT
  teacher.id
FROM
  teacher
  INNER JOIN offer ON offer.teacher_id = teacher.id 
$$ LANGUAGE SQL;
  
CREATE OR REPLACE FUNCTION get_teacher_name_of_an_offer(offer_id integer) 
  RETURNS SETOF text AS $$
SELECT
  person.name
FROM
  person
  INNER JOIN teacher ON teacher.person_id = person.id
  INNER JOIN offer ON offer.teacher_id = teacher.id
$$ LANGUAGE SQL;

SELECT
  get_teacher_id_of_an_offer(1);