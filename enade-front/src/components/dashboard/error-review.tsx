import clsx from "clsx";

const questoesErradas = [
    {
        id: "1",
        disciplina: "Banco de Dados",
        enunciado:
            "Em um banco de dados relacional, qual é a principal função de uma chave estrangeira (foreign key)?",
        respostaAluno: "Garantir que os valores sejam únicos",
        respostaCorreta:
            "Estabelecer relacionamento entre tabelas garantindo integridade referencial",
        data: "2026-04-10",
    },
    {
        id: "2",
        disciplina: "Algoritmos",
        enunciado:
            "Qual é a complexidade de tempo do algoritmo de busca binária em um vetor ordenado?",
        respostaAluno: "O(n)",
        respostaCorreta: "O(log n)",
        data: "2026-04-12",
    },
    {
        id: "3",
        disciplina: "Engenharia de Software",
        enunciado:
            "Qual prática do Scrum é responsável por revisar o trabalho realizado ao final de uma sprint?",
        respostaAluno: "Daily Scrum",
        respostaCorreta: "Sprint Review",
        data: "2026-04-13",
    },
];

export default function RevisaoErros() {
    return (
        <div className="w-full bg-gray-100 p-4 rounded-2xl lg:col-span-5 md:col-span-4">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-semibold text-gray-800">
                    Revisão de Respostas Erradas
                </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y">
                {questoesErradas.map((questao) => (
                    <div
                        key={questao.id}
                        className="p-5 hover:bg-gray-50 transition-colors"
                    >

                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                                {questao.disciplina}
                            </span>
                            <span className="text-xs text-gray-400">
                                {questao.data}
                            </span>
                        </div>


                        <p className="font-medium text-gray-800 mb-3">
                            {questao.enunciado}
                        </p>


                        <div className="space-y-1 text-sm">
                            <p className="text-red-500">
                                <span className="font-medium">Sua resposta:</span>{" "}
                                {questao.respostaAluno}
                            </p>

                            <p className="text-green-600">
                                <span className="font-medium">Correta:</span>{" "}
                                {questao.respostaCorreta}
                            </p>
                        </div>

                        <button className="mt-4 text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 px-3 py-1.5 rounded-md transition-colors">
                            Revisar questão →
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}