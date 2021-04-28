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


INSERT INTO
    person (
        name,
        email,
        password,
        cpf,
        sex,
        address,
        age
    )
VALUES
    (
        'Lucas',
        'lucaswilliameufrasio@gmail.com',
        '$argon2id$v=19$m=512,t=8,p=10$ayleXGskIi17aTh8KyZAWHxndkNQJGhDW0MlTldrYVZ2XXsv$QFb+Bd4B63qBnpRJqwmOJQ',
        '999.999.999-99',
        'male',
        (
            'Altamira',
            'Pará',
            'Rua 7',
            '9'
        ),
        21
    ),
    (
        'Vânia',
        'vania@gmail.com',
        '$argon2id$v=19$m=512,t=8,p=10$ayleXGskIi17aTh8KyZAWHxndkNQJGhDW0MlTldrYVZ2XXsv$QFb+Bd4B63qBnpRJqwmOJQ',
        '123.456.789-10',
        'male',
        (
            'Santarém',
            'Pará',
            'Avenida Almirante Barroso',
            '10'
        ),
        40
    ),
    (
        'Tadeu',
        'tadeu@gmail.com',
        '$argon2id$v=19$m=512,t=8,p=10$ayleXGskIi17aTh8KyZAWHxndkNQJGhDW0MlTldrYVZ2XXsv$Rv7nOB2p24YF/n+vjC986Q',
        '242.424.242-42',
        'male',
        (
            'Santarém',
            'Pará',
            'Avenida Borges Leal',
            '11'
        ),
        120
    ),
    (
        'Luciano',
        'luciano@gmail.com',
        '$argon2id$v=19$m=512,t=8,p=10$ayleXGskIi17aTh8KyZAWHxndkNQJGhDW0MlTldrYVZ2XXsv$ksCb0LOeNj9WgGk6AiiMmA',
        '899.999.999-99',
        'male',
        (
            'Santarém',
            'Pará',
            'Travessa Nova Repúlica',
            '12'
        ),
        21
    );

INSERT INTO
    course (name, code)
VALUES
    ('Sistemas de Informaçao', 'BSI'),
    ('Ciência da Computação', 'BCC'),
    ('Engenharia de Software', 'BES');

INSERT INTO
    student (
        registration,
        ingress_year,
        status,
        course_id,
        person_id
    )
VALUES
    (20170987777, 2017, 'activated', 1, 1),
    (20170987778, 2017, 'activated', 1, 3),
    (20170987779, 2017, 'activated', 1, 4);

INSERT INTO
    teacher (registration, person_id)
VALUES
    (20090887779, 2);

INSERT INTO
    advisor (registration, person_id)
VALUES
    (19570017779, 1);

INSERT INTO
    discipline (name, code)
VALUES
    (
        'Arquitetura e Desempenho de Banco de Dados',
        'PC20091010'
    ),
    (
        'Compiladores',
        'PC2011779890'
    ), 
    (
    	'Arquitetura de Computadores',
     	'PC20091019'
    );

INSERT INTO
    course_has_discipline (course_id, discipline_id)
VALUES
    (1, 1);

INSERT INTO
    semester
VALUES
    (
        1,
        '2021.1',
        '07/12/2021 00:00',
        '12/12/2021 23:59'
    );

INSERT INTO
    offer (
        semester_id,
        teacher_id,
        discipline_id,
        course_id
    )
VALUES
    (1, 1, 1, 1),
    (1, 1, 1, 2);

INSERT INTO
    student_has_offers (student_id, offer_id)
VALUES
    (1, 1),
    (2, 1),
    (3, 1);

INSERT INTO
    grade (
        first_exam,
        second_exam,
        third_exam,
        final_exam,
        point_average,
        student_Id,
        offer_id
    )
VALUES
    (9.00, 10.00, 8.00, NULL, 8.00, 1, 1),
    (10.00, 8.00, 9.00, NULL, 8.00, 2, 1),
    (8.00, 10.00, 9.00, NULL, 8.00, 3, 1);

-- 3 functions using PLPGSQL
CREATE OR REPLACE FUNCTION calculate_point_average(id_of_the_student integer) 
RETURNS numeric AS $$
DECLARE
	result_of_calculation numeric;
    first_exam numeric;
    second_exam numeric;
    third_exam numeric;
    final_exam numeric;
BEGIN
	SELECT grade.first_exam, 
    	   grade.second_exam, 
           grade.third_exam, 
           grade.final_exam INTO first_exam, second_exam, third_exam, final_exam FROM grade where grade.student_id = id_of_the_student;
          
    IF (final_exam IS NULL) THEN
    	result_of_calculation := first_exam + second_exam + third_exam;
        result_of_calculation := result_of_calculation / 3.00;
    	RETURN result_of_calculation;
    END IF;
    
    IF (first_exam < second_exam AND first_exam < third_exam) THEN
    	result_of_calculation := final_exam + second_exam + third_exam;
        result_of_calculation := result_of_calculation / 3.00;
    	RETURN result_of_calculation;
    END IF;
    
    IF (second_exam < first_exam AND second_exam < third_exam) THEN
    	result_of_calculation := first_exam + final_exam + third_exam;
        result_of_calculation := result_of_calculation / 3.00;
    	RETURN result_of_calculation;
    END IF;
    
    IF (third_exam < second_exam AND third_exam < first_exam) THEN
    	result_of_calculation := first_exam + second_exam + final_exam;
        result_of_calculation := result_of_calculation / 3.00;
    	RETURN result_of_calculation;
    END IF;
    
    IF (first_exam = third_exam) THEN
    	result_of_calculation := first_exam + second_exam + final_exam;
        result_of_calculation := result_of_calculation / 3.00;
    	RETURN result_of_calculation;
    END IF;
    
    IF (first_exam = second_exam) THEN
    	result_of_calculation := first_exam + final_exam + third_exam;
        result_of_calculation := result_of_calculation / 3.00;
    	RETURN result_of_calculation;
    END IF;
    
    IF (second_exam = third_exam) THEN
    	result_of_calculation := first_exam + second_exam + final_exam;
        result_of_calculation := result_of_calculation / 3.00;
    	RETURN result_of_calculation;
    END IF;
    
   	RAISE EXCEPTION 'There is missing some records to calculate the average point';
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_total_of_active_students() 
RETURNS integer AS $$
DECLARE
	number_of_students integer;
BEGIN
	SELECT COUNT(*)
    FROM student
    WHERE student.status = 'activated'
    INTO number_of_students;
	
    IF (number_of_students IS NULL) THEN
    	RETURN 0;
    END IF;
    
    RETURN number_of_students;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_current_semester() 
RETURNS text AS $$
DECLARE
	current_moth integer;
	current_year integer;
BEGIN
	current_moth = EXTRACT(
        MONTH
        FROM
            CURRENT_TIMESTAMP
    );
    
	current_year = EXTRACT(
        YEAR
        FROM
            CURRENT_TIMESTAMP
    );
	
    IF (current_moth < 7) THEN
    	RETURN current_year || '.1';
    END IF;
    
    RETURN current_year || '.2';
END;
$$ LANGUAGE plpgsql;

SELECT get_current_semester();

-- 5 complex selects
SELECT
    grade.first_exam,
    grade.second_exam,
    grade.third_exam,
    grade.final_exam,
    grade.point_average,
    person.name AS student_name,
    discipline.name AS discipline_name
FROM
    student
    INNER JOIN grade ON grade.student_id = student.id
    INNER JOIN person ON person.id = student.person_id
    INNER JOIN offer ON offer.id = grade.offer_id
    INNER JOIN discipline ON discipline.id = offer.discipline_id
WHERE
    student.id = 1;
    
SELECT
    person.name AS student_name,
    discipline.name AS discipline_name
FROM
    discipline
    INNER JOIN offer ON offer.discipline_id = discipline.id
    INNER JOIN student_has_offers ON student_has_offers.offer_id = offer.id
    INNER JOIN student ON student.id = student_has_offers.student_id
    INNER JOIN person ON person.id = student.person_id
WHERE
    discipline.id = 1 AND offer.course_id = 1;
    
SELECT
    course.id AS course_id,
    course.name AS course_name,
    person.name AS student_name
FROM
    course
    INNER JOIN student ON student.course_id = course.id
    INNER JOIN person ON person.id = student.person_id
WHERE
    course.id = 1;

SELECT DISTINCT
    course.id AS course_id,
    course.name AS course_name,
    person.name AS teacher_name
FROM
    course
    INNER JOIN offer ON offer.course_id = course.id
    INNER JOIN teacher ON teacher.id = offer.teacher_id
    INNER JOIN person ON person.id = teacher.person_id
WHERE
    course.id = 1;

-- Get all offered disciplines that a student has available to pick up
SELECT
	discipline.id as discipline_id,
    discipline.name as discipline_name
FROM 
	student
INNER JOIN student_has_offers ON student_has_offers.student_id = 1
RIGHT JOIN offer
	ON (offer.id = student_has_offers.offer_id)
JOIN discipline ON offer.discipline_id = discipline.id
    WHERE student_has_offers.offer_id IS NULL 
    	AND 
       	offer.course_id = (SELECT student.course_id FROM student WHERE student.id = 1);

     
-- 3 TRIGGERS
CREATE OR REPLACE FUNCTION register_log_of_operation_on_person()
RETURNS trigger AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
	INSERT INTO
    	logs (action, executed_at_date, executed_at_time)
	VALUES
    (
        'INSERT operation at person table. The person with id ' || NEW.id || ' was inserted.',
        CURRENT_DATE,
        CURRENT_TIME
    );
    
	RETURN NEW;
    ELSIF (TG_OP = 'UPDATE') THEN
	INSERT INTO
    	logs (action, executed_at_date, executed_at_time)
	VALUES
    (
        'UPDATE operation at person table. The person with id ' || OLD.id || ' was updated.',
        CURRENT_DATE,
        CURRENT_TIME
    );
	
    RETURN NEW;
	END IF;
    
	RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_log_operation_on_person
AFTER
INSERT
    OR
UPDATE
    ON person FOR EACH ROW EXECUTE PROCEDURE register_log_of_operation_on_person();

CREATE OR REPLACE FUNCTION register_log_of_operation_on_grade()
RETURNS trigger AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
	INSERT INTO
    	logs (action, executed_at_date, executed_at_time)
	VALUES
    (
        'INSERT operation at table grade. The grade with id ' || NEW.id || ' was inserted.',
        CURRENT_DATE,
        CURRENT_TIME
    );
    
	RETURN NEW;
    ELSIF (TG_OP = 'UPDATE') THEN
	INSERT INTO
    	logs (action, executed_at_date, executed_at_time)
	VALUES
    (
        'UPDATE operation at table grade. The grade with id ' || OLD.id || ' was updated.',
        CURRENT_DATE,
        CURRENT_TIME
    );
    
    RETURN NEW;
	END IF;
    
	RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_log_operation_on_grade
AFTER
INSERT
    OR
UPDATE
    ON grade FOR EACH ROW EXECUTE PROCEDURE register_log_of_operation_on_grade();
    
CREATE OR REPLACE FUNCTION register_log_of_operation_on_discipline()
RETURNS trigger AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
	INSERT INTO
    	logs (action, executed_at_date, executed_at_time)
	VALUES
    (
        'INSERT operation at table discipline table. The discipline with id ' || NEW.id || ' was inserted.',
        CURRENT_DATE,
        CURRENT_TIME
    );    
    
    RETURN NEW;
    ELSIF (TG_OP = 'UPDATE') THEN
	INSERT INTO
    	logs (action, executed_at_date, executed_at_time)
	VALUES
    (
        'UPDATE operation at table discipline. The discipline with id ' || OLD.id || ' was updated.',
        CURRENT_DATE,
        CURRENT_TIME
    );
    
    RETURN NEW;
	END IF;
    
	RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_log_operation_on_discipline
AFTER
INSERT
    OR
UPDATE
    ON discipline FOR EACH ROW EXECUTE PROCEDURE register_log_of_operation_on_discipline();
    
    
CREATE OR REPLACE FUNCTION check_person_update()
RETURNS trigger AS $$
DECLARE
	person_id integer;
    verify_email_in_use text;
BEGIN
	SELECT person.id, person.email INTO person_id, verify_email_in_use FROM person WHERE person.email = NEW.email;
    
    IF (NEW.email = verify_email_in_use AND NEW.id <> person_id) THEN
    RAISE EXCEPTION 'Email already in use. %', verify_email_in_use;
    END IF;
    
    IF (NEW.password IS NULL OR NEW.password = '') THEN
    RAISE EXCEPTION 'Password field can not be empty';
    END IF;
    
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_check_update
BEFORE
UPDATE
    ON person FOR EACH ROW EXECUTE PROCEDURE check_person_update();
    

CREATE OR REPLACE FUNCTION check_duplicated_student_offer_pick()
RETURNS trigger AS $$
DECLARE
	found_stundent_id integer;
    found_offer_id text;
BEGIN
	SELECT
    	student_has_offers.student_id,
    	student_has_offers.offer_id INTO found_stundent_id,
    	found_offer_id
	FROM
    	student_has_offers
	WHERE
    	student_has_offers.student_id = NEW.student_id
    AND student_has_offers.offer_id = NEW.offer_id;
    
    IF (found_stundent_id IS NOT NULL AND found_offer_id IS NOT NULL) THEN
    RAISE EXCEPTION 'This offer was already choosed.';
    END IF;
    
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_check_duplicated_entry
BEFORE
INSERT OR
UPDATE
    ON student_has_offers FOR EACH ROW EXECUTE PROCEDURE check_duplicated_student_offer_pick();

CREATE OR REPLACE FUNCTION check_duplicated_student_grade()
RETURNS trigger AS $$
DECLARE
	found_stundent_id integer;
    found_offer_id text;
BEGIN
	SELECT
    	grade.student_id,
    	grade.offer_id INTO found_stundent_id,
    	found_offer_id
	FROM
    	grade
	WHERE
    	grade.student_id = NEW.student_id
    AND grade.offer_id = NEW.offer_id;
    
    IF (found_stundent_id IS NOT NULL AND found_offer_id IS NOT NULL) THEN
    RAISE EXCEPTION 'This student already has a grade registered on this offer.';
    END IF;
    
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_check_duplicated_entry
BEFORE
INSERT OR
UPDATE
    ON grade FOR EACH ROW EXECUTE PROCEDURE check_duplicated_student_grade();
    