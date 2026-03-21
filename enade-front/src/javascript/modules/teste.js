let jsonteste = 
[
  {
    "id": 1,
    "text": "Uma empresa de e-commerce deseja melhorar a performance de seu sistema de busca de produtos. Atualmente, cada busca realiza uma consulta direta ao banco de dados relacional, que contém 10 milhões de registros. O time de desenvolvimento propõe a adoção de uma camada de cache distribuído. Considerando esse cenário, qual das alternativas representa a melhor estratégia para garantir consistência dos dados em cache quando um produto tem seu preço atualizado?",
    "optionA": "Invalidar todo o cache a cada atualização de qualquer produto.",
    "optionB": "Adotar a estratégia write-through, atualizando o cache e o banco simultaneamente a cada escrita.",
    "optionC": "Manter o cache sem expiração e atualizar manualmente quando necessário.",
    "optionD": "Utilizar apenas cache local em cada servidor de aplicação, sem sincronização.",
    "correctAnswer": "B"
  },
  {
    "id": 2,
    "text": "Durante o desenvolvimento de um sistema bancário, a equipe identificou que duas transações concorrentes estavam causando um problema: a Transação A lê o saldo, a Transação B lê o saldo, ambas somam um depósito e salvam o resultado, fazendo com que apenas um dos depósitos seja efetivado. Esse problema é conhecido como:",
    "optionA": "Deadlock, pois as transações ficam aguardando uma à outra indefinidamente.",
    "optionB": "Dirty read, pois uma transação lê dados não confirmados de outra.",
    "optionC": "Lost update, pois a atualização de uma transação sobrescreve a da outra sem considerar sua modificação.",
    "optionD": "Phantom read, pois novas linhas inseridas por uma transação afetam a outra.",
    "correctAnswer": "C"
  },
  {
    "id": 3,
    "text": "Um sistema de monitoramento hospitalar precisa processar leituras de sensores de pacientes em tempo real e emitir alertas quando os sinais vitais saem do padrão. O volume de dados é de aproximadamente 50.000 leituras por segundo. Qual arquitetura é mais adequada para este cenário?",
    "optionA": "Arquitetura monolítica com banco de dados relacional centralizado e processamento em batch diário.",
    "optionB": "Arquitetura orientada a eventos com processamento de stream, utilizando filas de mensagens e consumidores em tempo real.",
    "optionC": "Arquitetura cliente-servidor tradicional com polling a cada 5 minutos.",
    "optionD": "Arquitetura peer-to-peer onde cada sensor se comunica diretamente com o sistema de alertas.",
    "correctAnswer": "B"
  },
  {
    "id": 4,
    "text": "Analise o seguinte trecho de código em Java: List<Integer> numeros = Arrays.asList(1,2,3,4,5,6,7,8,9,10); int resultado = numeros.stream().filter(n -> n % 2 == 0).mapToInt(Integer::intValue).sum(); Qual é o valor de resultado e qual paradigma de programação está sendo aplicado?",
    "optionA": "Resultado 25, paradigma imperativo, pois itera sobre a lista com operações sequenciais.",
    "optionB": "Resultado 30, paradigma funcional, pois utiliza funções de alta ordem como filter e map sem modificar a lista original.",
    "optionC": "Resultado 30, paradigma orientado a objetos, pois utiliza métodos de instância da classe List.",
    "optionD": "Resultado 55, paradigma funcional, pois a Stream soma todos os elementos da lista.",
    "correctAnswer": "B"
  },
  {
    "id": 5,
    "text": "No contexto de segurança da informação, uma aplicação web armazena senhas dos usuários utilizando MD5 sem salt. Um atacante obtém acesso ao banco de dados. Qual das afirmativas descreve corretamente o risco e a mitigação adequada?",
    "optionA": "O MD5 é suficientemente seguro para armazenamento de senhas; o risco está apenas na transmissão.",
    "optionB": "O uso de MD5 sem salt permite ataques de rainbow table; a mitigação é usar algoritmos como bcrypt com salt aleatório por usuário.",
    "optionC": "O risco pode ser mitigado apenas com criptografia simétrica AES-256 aplicada sobre o hash MD5.",
    "optionD": "A adição de salt ao MD5 torna-o equivalente ao bcrypt em termos de segurança.",
    "correctAnswer": "B"
  },
  {
    "id": 6,
    "text": "Uma equipe adota Scrum para desenvolver um sistema de gestão escolar. Ao final da terceira Sprint, o Product Owner percebe que os requisitos de um módulo importante mudaram significativamente por conta de nova legislação. Qual é a atitude correta dentro do framework Scrum?",
    "optionA": "Cancelar o projeto e reiniciar o planejamento do zero, pois mudanças de requisitos invalidam o desenvolvimento anterior.",
    "optionB": "Ignorar as mudanças até o final do projeto para não comprometer o cronograma acordado.",
    "optionC": "O Product Owner atualiza o Product Backlog com os novos requisitos, reprioriza os itens e as mudanças entram no planejamento da próxima Sprint.",
    "optionD": "O Scrum Master decide sozinho como incorporar as mudanças sem consultar o Product Owner.",
    "correctAnswer": "C"
  },
  {
    "id": 7,
    "text": "Considere um grafo não direcionado com 6 vértices e as arestas: (A-B), (A-C), (B-D), (C-D), (D-E), (E-F). Aplicando o algoritmo de busca em largura (BFS) a partir do vértice A, qual é a ordem de visitação dos vértices?",
    "optionA": "A, B, D, E, F, C",
    "optionB": "A, B, C, D, E, F",
    "optionC": "A, C, B, D, E, F",
    "optionD": "A, B, C, D, F, E",
    "correctAnswer": "B"
  },
  {
    "id": 8,
    "text": "Uma aplicação mobile precisa sincronizar dados com o servidor mesmo quando o usuário está offline, aplicando as mudanças assim que a conexão for restabelecida. Durante a sincronização, podem ocorrer conflitos entre alterações feitas offline e alterações feitas por outros usuários no servidor. Qual estratégia é mais adequada para resolver esses conflitos?",
    "optionA": "Last write wins: sempre sobrescrever com a versão mais recente pelo timestamp, sem análise de conflito.",
    "optionB": "Utilizar controle de versão otimista com timestamps e notificar o usuário para resolver conflitos manualmente quando detectados.",
    "optionC": "Bloquear o registro no servidor assim que o usuário ficar offline, impedindo alterações de outros usuários.",
    "optionD": "Descartar todas as alterações offline e exigir que o usuário refaça as operações quando voltar online.",
    "correctAnswer": "B"
  },
  {
    "id": 9,
    "text": "No modelo OSI, uma aplicação envia uma mensagem que precisa ser fragmentada em múltiplos pacotes para traversar a rede. Em qual camada ocorre essa fragmentação e remontagem, e qual protocolo da suíte TCP/IP atua nessa camada?",
    "optionA": "Camada de Enlace, protocolo Ethernet, pois controla o acesso ao meio físico.",
    "optionB": "Camada de Transporte, protocolo TCP, pois divide os dados em segmentos e garante a remontagem ordenada.",
    "optionC": "Camada de Sessão, protocolo TLS, pois gerencia as sessões de comunicação entre aplicações.",
    "optionD": "Camada de Aplicação, protocolo HTTP, pois define o formato das mensagens trocadas.",
    "correctAnswer": "B"
  },
  {
    "id": 10,
    "text": "Uma startup desenvolve uma plataforma SaaS multitenancy onde múltiplos clientes compartilham a mesma infraestrutura. Para garantir isolamento de dados entre os tenants, três abordagens são consideradas: (1) banco de dados separado por tenant, (2) schema separado por tenant no mesmo banco, (3) tabela compartilhada com coluna tenant_id. Considerando custo operacional, escalabilidade e isolamento de segurança, qual afirmativa é correta?",
    "optionA": "A abordagem 3 é a mais segra pois concentra todos os dados em um único local, facilitando auditorias.",
    "optionB": "A abordagem 1 oferece maior isolamento e segurança, porém tem maior custo operacional; a abordagem 3 tem menor custo mas exige controles rígidos na camada de aplicação para garantir isolamento.",
    "optionC": "A abordagem 2 é sempre superior às demais pois combina isolamento total com baixo custo operacional.",
    "optionD": "As três abordagens são equivalentes em termos de segurança, diferindo apenas na organização física dos dados.",
    "correctAnswer": "B"
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

let rankteste =
[
  {
    username: "JVQN",
    score: 9999
  },

  {
    username: "BRProMaster",
    score: 8000
  },

  {
    username: "Pi²",
    score: 2048
  },

  {
    username: "Loi Neandertal",
    score: 1997
  },

  {
    username: "Boina",
    score: 300
  },

  {
    username: "Jogador sem nome",
    score: 0
  },
]

let cursos = 
[
  "Escolha seu curso",
  "Administração",
  "Análise e Desenvolvimento de Sistemas",
  "Arquitetura e Urbanismo",
  "Biomedicina",
  "Ciências Aeronáuticas",
  "Ciências Biológicas - Licenciatura",
  "Ciências Contábeis",
  "Ciências Econômicas",
  "Coding",
  "Computação em Nuvem (Cloud Computing)",
  "Data Science",
  "Design de Interiores",
  "Digital Security",
  "Direito",
  "E-Commerce",
  "Educação Especial - Licenciatura",
  "Educação Física - Bacharelado",
  "Educação Física - Licenciatura",
  "Empreendedorismo Digital",
  "Enfermagem",
  "Engenharia Civil",
  "Engenharia de Produção",
  "Engenharia Elétrica",
  "Engenharia Mecânica",
  "Estética e Cosmética",
  "Farmácia",
  "Filmmaker",
  "Fisioterapia",
  "Fonoaudiologia",
  "Game Design",
  "Gastronomia",
  "Geografia",
  "Gestão Ambiental",
  "Gestão Comercial",
  "Gestão da Qualidade",
  "Gestão da Tecnologia da Informação",
  "Gestão de Recursos Humanos",
  "Gestão de Serviços Jurídicos e Notariais",
  "Gestão de Trânsito",
  "Gestão Financeira",
  "Gestão Hospitalar",
  "Gestão Pública",
  "História",
  "Inteligência Artificial",
  "Internet das Coisas",
  "Letras - Espanhol",
  "Letras - Inglês",
  "Letras - Português",
  "Logística",
  "Marketing",
  "Matemática",
  "Medicina",
  "Medicina Veterinária",
  "Negócios Imobiliários",
  "Nutrição",
  "Odontologia",
  "Pedagogia",
  "Podologia",
  "Processos Gerenciais",
  "Psicologia",
  "Segunda Licenciatura em Letras - Espanhol",
  "Segunda Licenciatura em Letras - Inglês",
  "Segunda Licenciatura em Letras - Português",
  "Segurança Pública",
  "Serviço Social",
  "Teologia",
  "Terapia Ocupacional"
];

export {jsonteste, apiteste, posteste, loginteste, rankteste, cursos}