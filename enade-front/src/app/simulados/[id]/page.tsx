'use client';

import { useRouter } from 'next/navigation';

type Props = {
    params: { id: string };
};

type Simulado = {
    id: string;
    titulo: string;
    tema: string;
    quantidadeQuestoes: number;
    tempo: number; // em minutos
};

export default function SimuladoDetalhe({ params }: Props) {
    const router = useRouter();

    // 📚 Mock (depois vira banco)
    const simulados: Simulado[] = [
        {
            id: '1',
            titulo: 'Simulado ENADE ADS 2026',
            tema: 'Engenharia de Software',
            quantidadeQuestoes: 10,
            tempo: 20,
        },
        {
            id: '2',
            titulo: 'Banco de Dados - Revisão',
            tema: 'Banco de Dados',
            quantidadeQuestoes: 8,
            tempo: 15,
        },
        {
            id: '3',
            titulo: 'Redes de Computadores',
            tema: 'Redes',
            quantidadeQuestoes: 12,
            tempo: 25,
        },
    ];

    const simulado = simulados.find((s) => s.id === params.id);

    if (!simulado) {
        return <p className="p-6">Simulado não encontrado</p>;
    }

    function handleStart() {
        router.push(`/simulados/${simulado?.id}/prova`);
    }

    return (
        <div className="p-6 max-w-3xl mx-auto">

            {/* Card principal */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">

                {/* Título */}
                <h1 className="text-2xl font-bold text-gray-900">
                    {simulado.titulo}
                </h1>

                <p className="text-gray-500 mt-1">
                    {simulado.tema}
                </p>

                {/* Infos principais */}
                <div className="grid grid-cols-2 gap-4 mt-6">

                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <p className="text-sm text-gray-500">Questões</p>
                        <p className="text-xl font-semibold text-gray-900">
                            {simulado.quantidadeQuestoes}
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <p className="text-sm text-gray-500">Tempo</p>
                        <p className="text-xl font-semibold text-gray-900">
                            {simulado.tempo} min
                        </p>
                    </div>

                </div>

                {/* Regras */}
                <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-900">
                    <p className="font-medium mb-1">Instruções:</p>
                    <ul className="list-disc ml-4 space-y-1">
                        <li>Leia cada questão com atenção</li>
                        <li>Você pode revisar antes de finalizar</li>
                        <li>O tempo começa ao iniciar</li>
                    </ul>
                </div>

                {/* Botão */}
                <button
                    onClick={handleStart}
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
                >
                    Iniciar simulado
                </button>

            </div>

        </div>
    );
}