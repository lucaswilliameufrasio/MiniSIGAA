DROP DATABASE mini;

CREATE DATABASE mini;

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

CREATE DOMAIN domain_point_average NUMERIC(4, 2) NOT NULL CHECK (
    VALUE >= 0.00
    AND VALUE <= 10.00
);

CREATE DOMAIN domain_final_exam_points NUMERIC(4, 2) NULL CHECK (
    VALUE >= 0.00
    AND VALUE <= 10.00
);

CREATE TYPE enum_student_status AS ENUM ('activated', 'banned', 'locked', 'deactivated');

CREATE SEQUENCE person_id_sequence;

CREATE TABLE person (
    id INTEGER NOT NULL DEFAULT nextval('person_id_sequence'),
    name domain_name,
    email domain_email,
    password domain_password,
    cpf domain_cpf,
    sex domain_sex,
    address full_address,
    age domain_age,
    PRIMARY KEY (id)
);

ALTER SEQUENCE person_id_sequence OWNED BY person.id;

CREATE SEQUENCE course_id_sequence;

CREATE TABLE course (
    id INTEGER NOT NULL DEFAULT nextval('course_id_sequence'),
    name domain_course_name,
    code VARCHAR(20) UNIQUE,
    PRIMARY KEY (id)
);

ALTER SEQUENCE course_id_sequence OWNED BY course.id;

CREATE SEQUENCE student_id_sequence;

CREATE TABLE student (
    id INTEGER NOT NULL DEFAULT nextval('student_id_sequence'),
    registration BIGINT NOT NULL UNIQUE,
    ingress_year domain_ingress_year,
    status enum_student_status,
    course_id INTEGER NOT NULL,
    person_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (course_id) REFERENCES course(id),
    FOREIGN KEY (person_id) REFERENCES person(id)
);

ALTER SEQUENCE student_id_sequence OWNED BY student.id;

CREATE SEQUENCE teacher_id_sequence;

CREATE TABLE teacher (
    id INTEGER NOT NULL DEFAULT nextval('teacher_id_sequence'),
    registration BIGINT NOT NULL UNIQUE,
    person_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (person_id) REFERENCES person(id)
);

ALTER SEQUENCE teacher_id_sequence OWNED BY student.id;

CREATE SEQUENCE advisor_id_sequence;

CREATE TABLE advisor (
    id INTEGER NOT NULL DEFAULT nextval('advisor_id_sequence'),
    registration BIGINT NOT NULL UNIQUE,
    person_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (person_id) REFERENCES person(id)
);

ALTER SEQUENCE advisor_id_sequence OWNED BY advisor.id;

CREATE SEQUENCE discipline_id_sequence;

CREATE TABLE discipline (
    id INTEGER NOT NULL DEFAULT nextval('discipline_id_sequence'),
    name domain_discipline_name,
    code VARCHAR(20) UNIQUE,
    PRIMARY KEY (id)
);

ALTER SEQUENCE discipline_id_sequence OWNED BY discipline.id;

CREATE SEQUENCE course_has_discipline_id_sequence;

CREATE TABLE course_has_discipline (
    id INTEGER NOT NULL DEFAULT nextval('course_has_discipline_id_sequence'),
    course_id INTEGER NOT NULL,
    discipline_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (course_id) REFERENCES course(id),
    FOREIGN KEY (discipline_id) REFERENCES discipline(id)
);

ALTER SEQUENCE course_has_discipline_id_sequence OWNED BY course_has_discipline.id;

CREATE SEQUENCE semester_id_sequence;

CREATE TABLE semester (
    id INTEGER NOT NULL DEFAULT nextval('semester_id_sequence'),
    semester_code varchar(40) NOT NULL UNIQUE,
    enrollment_start_at date NOT NULL,
    enrollment_finish_at date NOT NULL,
    PRIMARY KEY (id)
);

ALTER SEQUENCE semester_id_sequence OWNED BY semester.id;

CREATE SEQUENCE offer_id_sequence;

CREATE TABLE offer (
    id INTEGER NOT NULL DEFAULT nextval('offer_id_sequence'),
    semester_id INTEGER NOT NULL,
    teacher_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    discipline_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (semester_id) REFERENCES semester(id),
    FOREIGN KEY (teacher_id) REFERENCES teacher(id),
    FOREIGN KEY (course_id) REFERENCES course(id),
    FOREIGN KEY (discipline_id) REFERENCES discipline(id)
);

ALTER SEQUENCE offer_id_sequence OWNED BY offer.id;

CREATE SEQUENCE student_has_offers_id_sequence;

CREATE TABLE student_has_offers (
    id INTEGER NOT NULL DEFAULT nextval('student_has_offers_id_sequence'),
    student_id INTEGER NOT NULL,
    offer_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (student_id) REFERENCES student(id),
    FOREIGN KEY (offer_id) REFERENCES offer(id)
);

ALTER SEQUENCE student_has_offers_id_sequence OWNED BY student_has_offers.id;

CREATE SEQUENCE grade_id_sequence;

CREATE TABLE grade (
    id INTEGER NOT NULL DEFAULT nextval('grade_id_sequence'),
    first_exam domain_exam_points,
    second_exam domain_exam_points,
    third_exam domain_exam_points,
    final_exam domain_final_exam_points,
    point_average domain_point_average,
    student_id INTEGER NOT NULL,
    offer_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (student_id) REFERENCES student(id),
    FOREIGN KEY (offer_id) REFERENCES offer(id)
);

ALTER SEQUENCE grade_id_sequence OWNED BY grade.id;

CREATE SEQUENCE logs_id_sequence;

CREATE TABLE logs (
    id INTEGER NOT NULL DEFAULT nextval('logs_id_sequence'),
    action varchar(200),
    executed_at_date date,
    executed_at_time time,
    PRIMARY KEY (id)
);

ALTER SEQUENCE logs_id_sequence OWNED BY logs.id;