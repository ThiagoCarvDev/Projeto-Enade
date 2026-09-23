'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { StartSimuladoButton } from '@/components/simulado/start-button';
import { listarSimulados, type UsuarioSimulado } from '@/lib/api';

export default function SimuladoDetalhe({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [registro, setRegistro] = useState<UsuarioSimulado | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        listarSimulados()
            .then((data) => setRegistro(data.find((item) => String(item.id) === id) ?? null))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p className="p-6 text-center text-gray-500">Carregando simulado...</p>;
    if (!registro) return <p className="p-6 text-center text-gray-500">Simulado não encontrado.</p>;

    const simulado = registro.simulado;
    return (
        <div className="mx-auto max-w-3xl p-6">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">{simulado.titulo}</h1>
                <p className="mt-1 text-gray-500">{simulado.curso?.nome ?? 'Simulado ENADE'}</p>
                <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-gray-50 p-4 text-center"><p className="text-sm text-gray-500">Questões</p><p className="text-xl font-semibold text-gray-900">{registro.quantidadeDeQuestoes}</p></div>
                    <div className="rounded-xl bg-gray-50 p-4 text-center"><p className="text-sm text-gray-500">Respondidas</p><p className="text-xl font-semibold text-gray-900">{registro.quantidadeDeRespostas}</p></div>
                </div>
                <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">Responda todas as questões para finalizar o simulado e receber sua nota.</div>
                {registro.dataConclusao ? (
                    <button onClick={() => router.push(`/simulados/${registro.id}/resultado?score=${registro.quantidadeAcertos ?? 0}&total=${registro.quantidadeDeQuestoes}&nota=${registro.nota ?? 0}`)} className="mt-6 w-full rounded-xl bg-gray-800 px-4 py-3 font-semibold text-white">Ver resultado</button>
                ) : <StartSimuladoButton simuladoId={registro.id} />}
            </div>
        </div>
    );
}
