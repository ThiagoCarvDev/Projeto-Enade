import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

const latestSimulados = [
    {
        id: '1',
        disciplina: 'Matemática',
        nota: 78,
        tempo: 35,
        data: '2026-04-10',
    },
    {
        id: '2',
        disciplina: 'Português',
        nota: 85,
        tempo: 40,
        data: '2026-04-08',
    },
    {
        id: '3',
        disciplina: 'Direito',
        nota: 62,
        tempo: 50,
        data: '2026-04-05',
    },
    {
        id: '4',
        disciplina: 'Conhecimentos Gerais',
        nota: 91,
        tempo: 30,
        data: '2026-04-02',
    },
];

export default function LatestSimuladosAluno() {
    return (
        <div className="w-full lg:col-span-3 md:col-span-4">

            <h2 className="mb-4 text-xl md:text-2xl">
                Últimos Simulados
            </h2>

            <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">

                <div className="bg-white px-6">

                    {latestSimulados.map((simulado, i) => {
                        return (
                            <div
                                key={simulado.id}
                                className={clsx(
                                    'flex flex-row items-center justify-between py-4',
                                    { 'border-t': i !== 0 }
                                )}
                            >

                                <div>
                                    <p className="text-sm font-semibold md:text-base">
                                        {simulado.disciplina}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {simulado.data}
                                    </p>
                                </div>


                                <div className="text-right">
                                    <p
                                        className={clsx("text-sm font-medium md:text-base", {
                                            "text-green-600": simulado.nota >= 70,
                                            "text-yellow-500": simulado.nota >= 50 && simulado.nota < 70,
                                            "text-red-500": simulado.nota < 50,
                                        })}
                                    >
                                        {simulado.nota}%
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        {simulado.tempo} min
                                    </p>

                                </div>

                            </div>
                        );
                    })}
                </div>


                <div className="flex items-center pb-2 pt-6">
                    <ArrowPathIcon className="h-5 w-5 text-gray-500" />
                    <h3 className="ml-2 text-sm text-gray-500">
                        Atualizar
                    </h3>
                </div>

            </div>
        </div>
    );
}