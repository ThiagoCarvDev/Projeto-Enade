'use client';

import { useState, useEffect } from 'react';
import QuestionCard from '@/components/simulado/questoes-card';
import { useRouter } from 'next/navigation';

export default function ProvaPage({ params }: { params: { id: string } }) {
    const router = useRouter();

    const questoes = [
        {
            id: 'q1',
            simuladoId: '1',
            pergunta: 'O que é Scrum?',
            alternativas: [
                'Uma linguagem',
                'Framework ágil',
                'Banco de dados',
                'Sistema operacional',
            ],
            correta: 1,
        },
        {
            id: 'q2',
            simuladoId: '1',
            pergunta: 'O que é chave primária?',
            alternativas: [
                'Senha',
                'Campo duplicado',
                'Identificador único',
                'Índice opcional',
            ],
            correta: 2,
        },
    ];

    const simuladoQuestoes = questoes.filter(
        (q) => q.simuladoId === params.id
    );

    const [respostas, setRespostas] = useState<{ [key: string]: number }>({});
    const [tempo, setTempo] = useState(600);

    // ⏱ Timer
    useEffect(() => {
        const interval = setInterval(() => {
            setTempo((t) => (t > 0 ? t - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    function formatTime(segundos: number) {
        const min = Math.floor(segundos / 60);
        const sec = segundos % 60;
        return `${min}:${sec.toString().padStart(2, '0')}`;
    }

    function responder(id: string, index: number) {
        setRespostas((prev) => ({
            ...prev,
            [id]: index,
        }));
    }

    function finalizar() {
        const acertos = simuladoQuestoes.filter(
            (q) => respostas[q.id] === q.correta
        ).length;

        router.push(
            `/simulados/${params.id}/resultado?score=${acertos}&total=${simuladoQuestoes.length}`
        );
    }

    const respondidas = Object.keys(respostas).length;
    const total = simuladoQuestoes.length;

    return (
        <div className="min-h-screen bg-gray-100">

            {/* 🔥 HEADER FIXO */}
            <div className="fixed top-0 left-0 w-full bg-white border-b shadow-sm z-50">
                <div className="max-w-4xl mx-auto flex items-center justify-between p-4">

                    {/* ⏱ Tempo */}
                    <div className="flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-lg font-semibold">
                        ⏱ {formatTime(tempo)}
                    </div>

                    {/* 📊 Progresso */}
                    <div className="text-sm font-medium text-gray-600">
                        {respondidas} / {total} respondidas
                    </div>

                    {/* ✅ Finalizar */}
                    <button
                        onClick={finalizar}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold shadow-sm transition"
                    >
                        Finalizar prova
                    </button>
                </div>
            </div>

            {/* 📄 CONTEÚDO */}
            <div className="pt-24 pb-10 px-4">
                <div className="max-w-3xl mx-auto space-y-8">

                    {simuladoQuestoes.map((q, index) => (
                        <div key={q.id}>
                            <p className="text-sm text-gray-500 mb-2">
                                Questão {index + 1}
                            </p>

                            <QuestionCard
                                pergunta={q.pergunta}
                                alternativas={q.alternativas}
                                selecionada={respostas[q.id]}
                                onSelect={(i) => responder(q.id, i)}
                            />
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}