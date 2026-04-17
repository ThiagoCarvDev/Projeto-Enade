import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

type Simulado = {
    id: string;
    titulo: string;
    tema: string;
    quantidadeQuestoes: number;
    data: Date;
    status: 'concluido' | 'pendente';
};

export default function SimuladosTable({
    query,
}: {
    query: string;
}) {

    const simulados: Simulado[] = [
        {
            id: '1',
            titulo: 'Simulado ENADE ADS 2026',
            tema: 'Engenharia de Software',
            quantidadeQuestoes: 10,
            data: new Date('2026-04-10'),
            status: 'concluido',
        },
        {
            id: '2',
            titulo: 'Banco de Dados - Revisão',
            tema: 'Banco de Dados',
            quantidadeQuestoes: 8,
            data: new Date('2026-04-12'),
            status: 'pendente',
        },
        {
            id: '3',
            titulo: 'Redes de Computadores',
            tema: 'Redes',
            quantidadeQuestoes: 12,
            data: new Date('2026-04-15'),
            status: 'pendente',
        },
    ];

    const filtrados = simulados.filter((s) =>
        s.titulo.toLowerCase().includes(query.toLowerCase()) ||
        s.tema.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="mt-6 flow-root">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                {filtrados.map((simulado) => (
                    <Link
                        key={simulado.id}
                        href={`simulados/${simulado.id}`}
                        className="group rounded-2xl bg-white p-5 shadow-sm border hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                    >

                        {/* 🔥 STATUS */}
                        <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition">
                                {simulado.titulo}
                            </h3>

                            <span
                                className={`text-xs px-2 py-1 rounded-full font-medium
                                ${simulado.status === 'concluido'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                    }`}
                            >
                                {simulado.status === 'concluido'
                                    ? 'Concluído'
                                    : 'Pendente'}
                            </span>
                        </div>

                        {/* Tema */}
                        <p className="text-sm text-gray-500 mt-1">
                            {simulado.tema}
                        </p>

                        {/* Infos */}
                        <div className="mt-4 flex items-center justify-between text-sm">
                            <span className="bg-gray-100 px-3 py-1 rounded-full font-medium">
                                {simulado.quantidadeQuestoes} questões
                            </span>

                            <span className="text-xs text-gray-400">
                                {simulado.data.toLocaleDateString('pt-BR')}
                            </span>
                        </div>

                        {/* CTA dinâmico */}
                        <div className="mt-5 flex items-center justify-between">
                            <div
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition
                                ${simulado.status === 'concluido'
                                        ? 'bg-gray-200 text-gray-700'
                                        : 'bg-blue-600 text-white group-hover:bg-blue-700'
                                    }`}
                            >
                                {simulado.status === 'concluido'
                                    ? 'Revisar'
                                    : 'Iniciar'}

                                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition" />
                            </div>
                        </div>

                    </Link>
                ))}

            </div>
        </div>
    );
}