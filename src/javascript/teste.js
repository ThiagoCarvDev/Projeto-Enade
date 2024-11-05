let jsonteste = 
[
  {
      "id": 10,
      "text": "O que é uma chave estrangeira em um banco de dados relacional?",
      "optionA": "Uma tabela auxiliar",
      "optionB": "Uma restrição para valores únicos",
      "optionC": "Um campo que referencia uma chave primária de outra tabela",
      "optionD": "Uma tabela temporária",
      "optionE": "testando123",
      "correctAnswer": "C"
  },

  {
      "id": 7,
      "text": "O que é um banco de dados NoSQL?",
      "optionA": "Um banco de dados relacional",
      "optionB": "Uma banco de dados hierárquico",
      "optionC": "Um banco de dados que não usa SQL",
      "optionD": "Um banco de dados que armazena imagens",
      "correctAnswer": "C"
  }
];

let apiteste = 
{
  "username": "TesteAndoUndois",
  "email": "testando@gmail.com",
  "password": "testando123",
  "role": ["user"],
  "courseId": 24
}

let posteste = 
{
 "username": "posteste2",
  "email": "testevaipostman2@gmail.com",
  "password": "12345678",
  "role": ["user"],
  "courseId": 17
}

let loginteste =
{
  "username": "TesteAndoUndois",
  "password": "testando123"
}

export {jsonteste, apiteste, posteste, loginteste}