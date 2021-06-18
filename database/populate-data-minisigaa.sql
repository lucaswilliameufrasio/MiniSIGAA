INSERT INTO
    person
VALUES
    (
        1,
        'Lucas',
        'lucaswilliameufrasio@gmail.com',
        'lucas',
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
        2,
        'Vânia',
        'vania@gmail.com',
        'vania',
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
        3,
        'Tadeu',
        'tadeu@gmail.com',
        'tadeu',
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
        4,
        'Luciano',
        'luciano@gmail.com',
        'luciano',
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
    course
VALUES
    (1, 'Sistemas de Informaçao', 'BSI'),
    (2, 'Ciência da Computação', 'BCC'),
    (3, 'Engenharia de Software', 'BES');

INSERT INTO
    student
VALUES
    (1, 20170987777, 2017, 'activated', 1, 1),
    (2, 20170987778, 2017, 'activated', 1, 3),
    (3, 20170987779, 2017, 'activated', 1, 4);

INSERT INTO
    teacher
VALUES
    (1, 20090887779, 2);

INSERT INTO
    advisor
VALUES
    (1, 19570017779, 1);

INSERT INTO
    discipline
VALUES
    (
        1,
        'Arquitetura e Desempenho de Banco de Dados',
        'PC20091010'
    );

INSERT INTO
    course_has_discipline
VALUES
    (1, 1, 1);

INSERT INTO
    offer
VALUES
    (1, '2021.1', 1, 1, 1);

INSERT INTO
    student_has_offers
VALUES
    (1, 1, 1),
    (2, 2, 1),
    (3, 3, 1);

INSERT INTO
    grade
VALUES
    (1, 9.00, 10.00, 8.00, NULL, 1, 1),
    (2, 10.00, 8.00, 9.00, NULL, 2, 1),
    (3, 8.00, 10.00, 9.00, NULL, 3, 1);