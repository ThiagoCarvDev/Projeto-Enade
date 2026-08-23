-- Tabela de Cursos (courses)
CREATE TABLE curso (
   id_curso INT PRIMARY KEY,
   nome     VARCHAR(100) NOT NULL
);

-- Tabela de Papeis (roles)
-- Postgres não tem ENUM inline em coluna; criamos um tipo ENUM separado
CREATE TYPE role_name AS ENUM ('ROLE_ADMIN', 'ROLE_MODERATOR', 'ROLE_USER');

CREATE TABLE roles
(
    id   BIGINT GENERATED ALWAYS AS IDENTITY,
    name role_name NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uc_roles_name UNIQUE (name)
);

-- Tabela de Usuário (usuario)
CREATE TABLE usuario (
     id_usuario INT PRIMARY KEY,
     nome       VARCHAR(150) NOT NULL,
     email      VARCHAR(150) NOT NULL,
     senha      VARCHAR(255) NOT NULL,
     id_curso   INT NOT NULL
);

-- Tabela de Tokens de Redefinição de Senha (password_reset_token)
CREATE TABLE password_reset_token
(
    id          BIGINT GENERATED ALWAYS AS IDENTITY,
    token       VARCHAR(255) NOT NULL,
    user_id     BIGINT       NOT NULL,
    expiry_date TIMESTAMP(6),
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
    id_questao    INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
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
    id_alternativa    INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
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
     tipo_simulado varchar(100) NOT NULL
);

-- Tabela de questões do simulado (SimuladoQuestao)
CREATE TABLE simulado_questao (
     id_simulado INT NOT NULL,
     id_questao INT NOT NULL,
     PRIMARY KEY (id_simulado, id_questao)
);

-- Tabela de simuladod o usuario (UsuarioSimulado)
CREATE TABLE usuario_simulado (
    id_usuario_simulado INT PRIMARY KEY,
    id_usuario          INT NOT NULL,
    id_simulado         INT NOT NULL,
    nota                INT,
    quantidade_acertos  INT,
    data_conclusao      TIMESTAMP
);

-- Tabela questoes do usuario (UsuarioQuestao)
CREATE TABLE usuario_questao (
     id_usuario_questao  INT PRIMARY KEY,
     id_usuario_simulado INT NOT NULL,
     id_questao          INT NOT NULL,
     is_acerto           BOOLEAN,
     data_resposta       TIMESTAMP,
     id_alternativa      INT NOT NULL
);