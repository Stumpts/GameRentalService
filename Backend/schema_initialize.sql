INSERT INTO Account (username, password, name, email, phoneNumber)
VALUES
    ('T1Faker', 'mid123', 'Faker', '51faker@sktmail.com', '1111111111'),
    ('DeftKing', 'adc456', 'Deft', 'deft@dragonmail.com', '2222222222'),
    ('ChovyGG', 'lane789', 'Chovy', 'chovy@genmail.com', '3333333333'),
    ('ShowMaker', 'mage321', 'ShowMaker', 'showmaker@dkmail.com', '4444444444'),
    ('CanyonJg', 'smite654', 'Canyon', 'canyon@junglemail.com', '5555555555'),
    ('KeriaSup', 'ward987', 'Keria', 'keria@supportmail.com', '6666666666'),
    ('RulerBot', 'carry147', 'Ruler', 'ruler@jdgmail.com', '7777777777'),
    ('CapsEU', 'g2mid258', 'Caps', 'caps@euwmail.com', '8888888888'),
    ('PerkzGOAT', 'goat369', 'Perkz', 'perkz@lolmail.com', '9999999999'),
    ('DoubleLift', 'na1234', 'Doublelift', 'doublelift@lcsmail.com', '1010101010'),
    ('Bjergsen', 'tsm5678', 'Bjergsen', 'bjergsen@midmail.com', '1212121212'),
    ('SneakyADC', 'cosplay90', 'Sneaky', 'sneaky@cloudmail.com', '1313131313'),
    ('MikyxSup', 'engage12', 'Mikyx', 'mikyx@lecmail.com', '1414141414'),
    ('ZeusTop', 'toplane34', 'Zeus', 'zeus@t1mail.com', '1515151515'),
    ('OnerJG', 'pathing56', 'Oner', 'oner@junglemail.com', '1616161616');

INSERT INTO Game (name, publisher, ageRating, price, releaseDate)
VALUES
    ('Baldurs Gate 3', 'Larian', 'M', 12.99, '2023-08-03'),
    ('Clair Obscur', 'Sandfall', 'T', 14.50, '2025-04-24'),
    ('Final Fantasy X', 'Square', 'T', 11.75, '2001-07-19'),
    ('Kingdom Hearts', 'Square', 'E10', 13.20, '2002-03-28'),
    ('Kingdom Hearts II', 'Square', 'E10', 10.99, '2005-12-22'),
    ('Kingdom Hearts III', 'Square', 'E10', 14.99, '2019-01-29'),
    ('Elden Ring', 'FromSoft', 'M', 12.45, '2022-02-25'),
    ('Persona 5 Royal', 'Atlus', 'M', 13.89, '2019-10-31'),
    ('The Witcher 3', 'CDPR', 'M', 10.50, '2015-05-19'),
    ('Minecraft', 'Mojang', 'E10', 11.99, '2011-11-18'),
    ('Hades', 'Supergiant', 'T', 14.10, '2020-09-17'),
    ('Cyberpunk 2077', 'CDPR', 'M', 12.30, '2020-12-10'),
    ('Stardew Valley', 'ConcernedApe', 'E10', 10.25, '2016-02-26'),
    ('Sekiro', 'FromSoft', 'M', 13.65, '2019-03-22'),
    ('Red Dead Redemption 2', 'Rockstar', 'M', 14.75, '2018-10-26');

INSERT INTO Review (gameID, accountID, StarRating, comment)
VALUES
    (1, 1, 5.0, 'Amazing RPG with incredible story and character freedom.'),
    (2, 2, 4.5, 'Beautiful visuals and unique combat system.'),
    (3, 3, 5.0, 'Classic JRPG with emotional story and memorable soundtrack.'),
    (4, 4, 4.5, 'Nostalgic and fun crossover adventure.'),
    (5, 5, 5.0, 'Best combat system in the series by far.'),
    (6, 6, 4.0, 'Fun gameplay though story pacing was a bit odd.'),
    (7, 7, 5.0, 'Difficult but rewarding open world experience.'),
    (8, 8, 5.0, 'Fantastic style, soundtrack, and turn-based gameplay.'),
    (9, 9, 5.0, 'One of the greatest RPGs ever made.'),
    (10, 10, 4.0, 'Simple but endlessly creative and replayable.'),
    (11, 11, 4.5, 'Addictive gameplay loop and excellent writing.'),
    (12, 12, 3.5, 'Launch was rough but much better now.'),
    (13, 13, 5.0, 'Relaxing farming sim with tons of content.'),
    (14, 14, 5.0, 'Very challenging combat with satisfying progression.'),
    (15, 15, 5.0, 'Incredible story, world, and attention to detail.'),
    (8, 1, 4.5, 'Persona 5 Royal has unmatched presentation.'),
    (7, 2, 5.0, 'Elden Ring deserved all the hype.'),
    (3, 4, 5.0, 'FFX is still my favorite Final Fantasy.'),
    (1, 5, 5.0, 'Spent over 100 hours already and still finding new things.'),
    (13, 6, 4.5, 'Perfect cozy game after a long day.');


INSERT INTO Rental (accountID, gameID, rentDate, returnDate)
VALUES
    (1, 8, '2026-04-20', '2026-04-27'),
    (2, 7, '2026-04-18', '2026-04-25'),
    (3, 3, '2026-04-15', '2026-04-22'),
    (4, 4, '2026-04-10', '2026-04-17'),
    (5, 1, '2026-04-22', '2026-04-29'),
    (6, 13, '2026-04-19', '2026-04-26'),
    (7, 15, '2026-04-12', '2026-04-19'),
    (8, 10, '2026-04-21', '2026-04-28'),
    (9, 9, '2026-04-14', '2026-04-21'),
    (10, 11, '2026-04-17', '2026-04-24'),
    (11, 14, '2026-04-11', '2026-04-18'),
    (12, 12, '2026-04-23', '2026-04-30'),
    (13, 5, '2026-04-16', '2026-04-23'),
    (14, 6, '2026-04-13', '2026-04-20'),
    (15, 2, '2026-04-24', '2026-05-01');