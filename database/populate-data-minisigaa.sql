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
        '$argon2id$v=19$m=512,t=8,p=8$Yk5adUZuck03Uk5OVVc5ZDhhQVZUYlhXaDRlREJ6YTB1NEJFcWpzeg$PKXQHbx4UuCTLYPQkv9OEg',
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