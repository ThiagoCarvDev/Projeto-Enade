-- Tabela de Cursos (courses)
CREATE TABLE courses
(
    id   BIGINT       NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

-- Tabela de Papeis (roles)
CREATE TABLE roles
(
    id   BIGINT NOT NULL AUTO_INCREMENT,
    name ENUM('ROLE_ADMIN', 'ROLE_MODERATOR', 'ROLE_USER') NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT UC_roles_name UNIQUE (name)
);

-- Tabela de Usuários (users)
CREATE TABLE users
(
    id            BIGINT       NOT NULL AUTO_INCREMENT,
    username      VARCHAR(20)  NOT NULL,
    email         VARCHAR(50)  NOT NULL,
    password      VARCHAR(120) NOT NULL,
    course_id     BIGINT,
    score         INT DEFAULT 0,
    quiz_attempts INT DEFAULT 0,
    PRIMARY KEY (id),
    CONSTRAINT UC_users_username UNIQUE (username),
    CONSTRAINT UC_users_email UNIQUE (email),
    CONSTRAINT FK_users_course FOREIGN KEY (course_id) REFERENCES courses (id)
);

-- Tabela de Tokens de Redefinição de Senha (password_reset_token)
CREATE TABLE password_reset_token
(
    id          BIGINT       NOT NULL AUTO_INCREMENT,
    token       VARCHAR(255) NOT NULL,
    user_id     BIGINT       NOT NULL,
    expiry_date DATETIME(6),
    PRIMARY KEY (id),
    CONSTRAINT UC_password_reset_token_user UNIQUE (user_id),
    CONSTRAINT FK_password_reset_token_user FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Tabela de Associação Usuários e Papéis (user_roles)
CREATE TABLE user_roles
(
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    CONSTRAINT FK_user_roles_user FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT FK_user_roles_role FOREIGN KEY (role_id) REFERENCES roles (id)
);

-- Tabela de Questões (questions)
CREATE TABLE questions
(
    id             BIGINT AUTO_INCREMENT PRIMARY KEY,
    text           TEXT         NOT NULL,
    option_a       VARCHAR(255) NOT NULL,
    option_b       VARCHAR(255) NOT NULL,
    option_c       VARCHAR(255) NOT NULL,
    option_d       VARCHAR(255) NOT NULL,
    correct_answer CHAR(1)      NOT NULL,
    course_id      BIGINT,
    CONSTRAINT fk_course FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE SET NULL
);