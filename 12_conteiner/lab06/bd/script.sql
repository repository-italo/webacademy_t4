CREATE TABLE IF NOT EXISTS livros (
    id VARCHAR(36) PRIMARY KEY,
    nome VARCHAR(180) NOT NULL,
    sinopse TEXT NOT NULL,
    isbn VARCHAR(13) NOT NULL UNIQUE,
    autores JSON NOT NULL,
    url_imagem TEXT
);

INSERT IGNORE INTO
    livros (
        id,
        nome,
        sinopse,
        isbn,
        autores,
        url_imagem
    )
VALUES (
        '1',
        'PostgreSQL: Banco de dados para aplicações web modernas',
        'Tecnologias de banco de dados dão suporte diário para operações e tomadas de decisões nos mais diversos níveis da empresa, da operação à gerência. Eles são vitais para as organizações modernas que querem se manter competitivas no mercado e no cenário atual de extrema concorrência. O PostgreSQL é um poderoso sistema gerenciador de banco de dados objeto-relacional de código aberto. Seu recente aumento de popularidade veio de usuários de outros bancos de dados em busca de um sistema com melhores garantias de confiabilidade, melhores recursos de consulta, mais operação previsível, ou simplesmente querendo algo mais fácil de aprender, entender e usar. Neste livro, Vinícius Carvalho explora as principais características do PostgreSQL, mostrando por que ele é seguro, poderoso, confiável e rápido. Através do desenvolvimento de um projeto, você vai aprender na prática as funções, consultas e administração de um banco de dados, podendo revisar seus conhecimentos nos exercícios elaborados pelo autor ao fim do livro.',
        '9788555192555',
        '["Vinícius Carvalho"]',
        'https://cdn.shopify.com/s/files/1/0155/7645/products/PostgreSQL_ebook_large.jpg?v=1631652465'
    );

INSERT IGNORE INTO
    livros (
        id,
        nome,
        sinopse,
        isbn,
        autores,
        url_imagem
    )
VALUES (
        '2',
        'Data Structures and Algorithms in Java',
        'Data Structures and Algorithms in Java, Second Edition is designed to be easy to read and understand although the topic itself is complicated. Algorithms are the procedures that software programs use to manipulate data structures. Besides clear and simple example programs, the author includes a workshop as a small demonstration program executable on a Web browser. The programs demonstrate in graphical form what data structures look like and how they operate. In the second edition, the program is rewritten to improve operation and clarify the algorithms, the example programs are revised to work with the latest version of the Java JDK, and questions and exercises will be added at the end of each chapter making the book even more useful.',
        '9780672324536',
        '["Robert Lafore"]',
        'https://m.media-amazon.com/images/I/41W+LyRF6NL._SX378_BO1,204,203,200_.jpg'
    );

INSERT IGNORE INTO
    livros (
        id,
        nome,
        sinopse,
        isbn,
        autores,
        url_imagem
    )
VALUES (
        '3',
        'Arquitetura de soluções IoT: Desenvolva com Internet das Coisas para o mundo real',
        'Tudo ao nosso redor está em processo de transformação tecnológica e não é à toa que o termo Internet das Coisas – a IoT – vem ganhando popularidade e atraindo mercado. Há cada vez mais dispositivos com conectividade a um sistema distribuído ou à nuvem, e as possibilidades dessa troca de dados são infinitas. Entretanto, a criação de sistemas profissionais de IoT é complexa e bastante abrangente. Uma solução IoT bem arquitetada exige domínio sobre diferentes áreas de conhecimento, desde hardwares, softwares, protocolos de comunicação, até segurança e sustentabilidade.',
        '9788555193217',
        '["Fernando Ferreira", "Renato Manzan", "Wellington Duraes"]',
        'https://cdn.shopify.com/s/files/1/0155/7645/products/p_885765c2-d786-43ae-a589-b37570237537_large.jpg?v=1665717063'
    );

INSERT IGNORE INTO
    livros (
        id,
        nome,
        sinopse,
        isbn,
        autores,
        url_imagem
    )
VALUES (
        '4',
        'O ladrão de raios: Capa nova: 1',
        'Primeiro volume da saga Percy Jackson e os olimpianos, O ladrão de raios esteve entre os primeiros lugares na lista das séries mais vendidas do The New York Times. O autor conjuga lendas da mitologia grega com aventuras no século XXI. Nelas, os deuses do Olimpo continuam vivos, ainda se apaixonam por mortais e geram filhos metade deuses, metade humanos, como os heróis da Grécia antiga. Marcados pelo destino, eles dificilmente passam da adolescência. Poucos conseguem descobrir sua identidade.',
        '9788580575392',
        '["Rick Riordan"]',
        'https://m.media-amazon.com/images/I/51yvcUb5tFL._SX323_BO1,204,203,200_.jpg'
    );

INSERT IGNORE INTO
    livros (
        id,
        nome,
        sinopse,
        isbn,
        autores,
        url_imagem
    )
VALUES (
        '5',
        'As crônicas de Nárnia - O leão, a feiticeira e o guarda-roupa',
        ' "Dizem que Aslam está a caminho. Talvez já tenha chegado", sussurrou o Castor. Edmundo experimentou uma misteriosa sensação de horror. Pedro sentiu-se valente e vigoroso. Para Susana, foi como se uma música deliciosa tivesse enchido o ar. E Lúcia teve aquele mesmo sentimento que nos desperta a chegada do verão. Assim, no coração da terra encantada de Nárnia, as crianças lançaram-se na mais excitante e mágica aventura que alguém já escreveu.',
        '9788578270889',
        '["C.S. Lewis"]',
        'https://m.media-amazon.com/images/I/51RpWTEgDvL._SX322_BO1,204,203,200_.jpg'
    );

INSERT IGNORE INTO
    livros (
        id,
        nome,
        sinopse,
        isbn,
        autores,
        url_imagem
    )
VALUES (
        '6',
        'The Hobbit: The Classic Bestselling Fantasy Novel',
        'This definitive paperback edition features nine illustrations and two maps drawn by J.R.R. Tolkien, and a preface by Christopher Tolkien.',
        '9780261103344',
        '["J.R.R. Tolkien"]',
        'https://m.media-amazon.com/images/I/7103GCFdGDL.jpg'
    );