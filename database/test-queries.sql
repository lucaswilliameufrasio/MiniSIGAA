
UPDATE person
SET email = 'lucaswilliameufrasio@gmail.com', password = '$argon2id$v=19$m=512,t=8,p=10$ayleXGskIi17aTh8KyZAWHxndkNQJGhDW0MlTldrYVZ2XXsv$QFb+Bd4B63qBnpRJqwmOJQ'
WHERE id = 1;


INSERT INTO
    offer (
        semester_id,
        teacher_id,
        discipline_id,
        course_id
    )
VALUES
    (1, 1, 4, 2);
    

INSERT INTO
    discipline (name, code)
VALUES
    (
    	'Tópicos Especiais em Computação Móvel',
     	'PC200907719'
    );


INSERT INTO
    student_has_offers (student_id, offer_id)
VALUES
    (5, 2);


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
        'Marcos',
        'marcos@gmail.com',
        '$argon2id$v=19$m=512,t=8,p=10$ayleXGskIi17aTh8KyZAWHxndkNQJGhDW0MlTldrYVZ2XXsv$ksCb0LOeNj9WgGk6AiiMmA',
        '898.999.999-99',
        'male',
        (
            'Santarém',
            'Pará',
            'Ali',
            '24'
        ),
        69
    ) RETURNING id;
    
    

INSERT INTO
    student (
        registration,
        ingress_year,
        status,
        course_id,
        person_id
    )
VALUES
    (20170987679, 2017, 'activated', 2, 31);