'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import QuestionCard from '@/components/simulado/questoes-card';
import { enviarResposta, listarSimulados, type UsuarioSimulado } from '@/lib/api';

export default function ProvaPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [registro, setRegistro] = useState<UsuarioSimulado | null>(null);
    const [respostas, setRespostas] = useState<Record<number, number>>({});
    const [loading, setLoading] = useState(true);
    const [finalizando, setFinalizando] = useState(false);
    const [erro, setErro] = useState('');

    useEffect(() => {
        listarSimulados()
            .then((data) => setRegistro(data.find((item) => String(item.id) === id) ?? null))
            .catch((error) => setErro(error instanceof Error ? error.message : 'Não foi possível carregar a prova.'))
            .finally(() => setLoading(false));
    }, [id]);

    async function finalizar() {
        if (!registro) return;
        const questoes = registro.simulado.questoes;
        if (Object.keys(respostas).length !== questoes.length) {
            setErro('Responda todas as questões antes de finalizar.');
            return;
        }

        setFinalizando(true);
        setErro('');
        try {
            for (let index = 0; index < questoes.length; index += 1) {
                const questao = questoes[index];
                const resultado = await enviarResposta(registro.id, questao.id, respostas[questao.id], index === questoes.length - 1) as { quantidadeDeAcertos: number; quantidadeDeQuestoes: number; nota: number };
                if (index === questoes.length - 1) {
                    router.push(`/simulados/${registro.id}/resultado?score=${resultado.quantidadeDeAcertos}&total=${resultado.quantidadeDeQuestoes}&nota=${resultado.nota}`);
                }
            }
        } catch (error) {
            setErro(error instanceof Error ? error.message : 'Não foi possível finalizar o simulado.');
            setFinalizando(false);
        }
    }

    if (loading) return <p className="p-6 text-center text-gray-500">Carregando questões...</p>;
    if (!registro) return <p className="p-6 text-center text-gray-500">Simulado não encontrado.</p>;

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="sticky top-0 z-10 border-b bg-white shadow-sm">
                <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 p-4">
                    <strong className="text-gray-900">{registro.simulado.titulo}</strong>
                    <span className="text-sm font-medium text-gray-600">{Object.keys(respostas).length} / {registro.simulado.questoes.length} respondidas</span>
                    <button onClick={finalizar} disabled={finalizando} className="rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50">
                        {finalizando ? 'Enviando...' : 'Finalizar prova'}
                    </button>
                </div>
            </header>
            <main className="mx-auto max-w-3xl space-y-8 px-4 py-8">
                {erro && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{erro}</p>}
                {registro.simulado.questoes.map((questao, index) => (
                    <section key={questao.id}>
                        <p className="mb-2 text-sm text-gray-500">Questão {index + 1}</p>
                        <QuestionCard
                            pergunta={questao.enunciado || questao.titulo}
                            alternativas={questao.alternativas}
                            selecionada={respostas[questao.id]}
                            onSelect={(alternativaId) => setRespostas((current) => ({ ...current, [questao.id]: alternativaId }))}
                        />
                    </section>
                ))}
            </main>
        </div>
    );
}
