-- Tabela de Cursos (courses)
CREATE TABLE curso
(
    id   BIGINT AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

-- Tabela de Papeis (roles)
-- MySQL não tem CREATE TYPE; o ENUM é declarado direto na coluna
CREATE TABLE roles
(
    id   BIGINT AUTO_INCREMENT,
    name ENUM('ROLE_ADMIN', 'ROLE_MODERATOR', 'ROLE_USER') NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uc_roles_name UNIQUE (name)
);

-- Tabela de Usuários (usuarios)
CREATE TABLE usuarios
(
    id            BIGINT AUTO_INCREMENT,
    username      VARCHAR(20)  NOT NULL,
    email         VARCHAR(50)  NOT NULL,
    password      VARCHAR(120) NOT NULL,
    course_id     BIGINT,
    score         INT DEFAULT 0,
    quiz_attempts INT DEFAULT 0,
    PRIMARY KEY (id),
    CONSTRAINT uc_users_username UNIQUE (username),
    CONSTRAINT uc_users_email UNIQUE (email),
    CONSTRAINT fk_users_course FOREIGN KEY (course_id) REFERENCES curso (id)
);

-- Tabela de Tokens de Redefinição de Senha (password_reset_token)
CREATE TABLE password_reset_token
(
    id          BIGINT AUTO_INCREMENT,
    token       VARCHAR(255) NOT NULL,
    user_id     BIGINT       NOT NULL,
    expiry_date DATETIME(6),
    PRIMARY KEY (id),
    CONSTRAINT uc_password_reset_token_user UNIQUE (user_id),
    CONSTRAINT fk_password_reset_token_user FOREIGN KEY (user_id) REFERENCES usuarios (id)
);

-- Tabela de Associação Usuários e Papéis (user_roles)
CREATE TABLE user_roles
(
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    CONSTRAINT fk_user_roles_user FOREIGN KEY (user_id) REFERENCES usuarios (id),
    CONSTRAINT fk_user_roles_role FOREIGN KEY (role_id) REFERENCES roles (id)
);

-- Tabela de Questões (questao)
CREATE TABLE questao
(
    id_questao    INT AUTO_INCREMENT PRIMARY KEY,
    titulo        VARCHAR(150)  NOT NULL,
    enunciado     VARCHAR(1000) NOT NULL,
    tipo_questao  VARCHAR(100)  NOT NULL,
    area_questao  VARCHAR(100)  NOT NULL,
    possui_imagem BOOLEAN       NOT NULL,
    explicacao    VARCHAR(250),
    img_url       VARCHAR(255)
);

-- Tabela de Alternativas (alternativa)
CREATE TABLE alternativa
(
    id_alternativa    INT AUTO_INCREMENT PRIMARY KEY,
    texto             VARCHAR(500) NOT NULL,
    is_correta        BOOLEAN,
    opcao_alternativa VARCHAR(10),
    id_questao        INT NOT NULL,
    CONSTRAINT fk_alternativa_questao FOREIGN KEY (id_questao) REFERENCES questao (id_questao)
);

-- Tabela de Simulados (simulado)
CREATE TABLE simulado (
    id_simulado   INT PRIMARY KEY,
    titulo        VARCHAR(150) NOT NULL,
    ano           DATE NOT NULL,
    id_curso      INT NOT NULL,
    tipo_simulado VARCHAR(100) NOT NULL
);

-- Tabela de questões do simulado (SimuladoQuestao)
CREATE TABLE simulado_questao (
     id_simulado INT NOT NULL,
     id_questao INT NOT NULL,
     PRIMARY KEY (id_simulado, id_questao)
);

-- Tabela de simulados do usuario (UsuarioSimulado)
CREATE TABLE usuario_simulado (
    id_usuario_simulado INT PRIMARY KEY,
    id_usuario          INT NOT NULL,
    id_simulado         INT NOT NULL,
    nota                INT,
    quantidade_acertos  INT,
    data_conclusao      TIMESTAMP
);

-- Tabela questões do usuario (UsuarioQuestao)
CREATE TABLE usuario_questao (
    id_usuario_questao  INT PRIMARY KEY,
    id_usuario_simulado INT NOT NULL,
    id_questao          INT NOT NULL,
    is_acerto           BOOLEAN,
    data_resposta       TIMESTAMP,
    id_alternativa      INT NOT NULL
);