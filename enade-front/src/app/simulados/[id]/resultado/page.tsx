'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function ResultadoPage() {
    const params = useSearchParams();
    const router = useRouter();
    const score = Number(params.get('score') ?? 0);
    const total = Number(params.get('total') ?? 0);
    const nota = Number(params.get('nota') ?? 0);

    return (
        <div className="mx-auto max-w-xl p-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Resultado do Simulado</h1>
            <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
                <p className="text-lg text-gray-600">Você acertou</p>
                <p className="mt-2 text-4xl font-bold text-blue-600">{score} / {total}</p>
                <p className="mt-2 text-xl text-gray-700">Nota: {nota.toFixed(2)}</p>
            </div>
            <button onClick={() => router.push('/simulados')} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">Voltar para simulados</button>
        </div>
    );
}
