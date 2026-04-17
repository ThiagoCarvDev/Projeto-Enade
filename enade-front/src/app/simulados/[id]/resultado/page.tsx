'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export default function ResultadoPage() {
    const params = useSearchParams();
    const router = useRouter();

    const score = Number(params.get('score'));
    const total = Number(params.get('total'));

    const porcentagem = Math.round((score / total) * 100);

    return (
        <div className="p-6 max-w-xl mx-auto text-center">

            <h1 className="text-2xl font-bold text-gray-900">
                Resultado do Simulado
            </h1>

            <div className="mt-6 bg-white p-6 rounded-2xl shadow-sm border">

                <p className="text-lg text-gray-600">
                    Você acertou
                </p>

                <p className="text-4xl font-bold text-blue-600 mt-2">
                    {score} / {total}
                </p>

                <p className="text-xl mt-2 text-gray-700">
                    {porcentagem}%
                </p>

            </div>

            <button
                onClick={() => router.push('/simulados')}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
                Voltar para simulados
            </button>

        </div>
    );
}