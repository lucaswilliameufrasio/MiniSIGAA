drop function calculate_point_average(id_of_the_student integer);

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
    
    
CREATE OR REPLACE FUNCTION check_person_insert()
RETURNS trigger AS $$
DECLARE
    verify_email_in_use text;
BEGIN
	SELECT person.email INTO verify_email_in_use FROM person WHERE person.email = NEW.email;
    
    IF (NEW.email = verify_email_in_use) THEN
    RAISE EXCEPTION 'Email already in use. %', verify_email_in_use;
    END IF;
    
    IF (NEW.password IS NULL OR NEW.password = '') THEN
    RAISE EXCEPTION 'Password field can not be empty';
    END IF;
    
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_check_insertion
BEFORE
INSERT
    ON person FOR EACH ROW EXECUTE PROCEDURE check_person_insert();
    

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
    