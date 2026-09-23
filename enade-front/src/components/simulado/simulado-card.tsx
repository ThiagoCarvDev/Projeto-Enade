import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import type { UsuarioSimulado } from '@/lib/api';

export default function SimuladoCard({ simulado }: { simulado: UsuarioSimulado }) {
    const concluido = simulado.dataConclusao !== null;

    return (
        <Link href={`/simulados/${simulado.id}`} className="group rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">{simulado.simulado.titulo}</h3>
                    <p className="mt-1 text-sm text-gray-500">{simulado.simulado.curso?.nome ?? 'Simulado ENADE'}</p>
                </div>
                <span className={`rounded-full px-2 py-1 text-xs font-semibold ${concluido ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {concluido ? 'Concluído' : 'Pendente'}
                </span>
            </div>
            <div className="mt-5 flex items-center justify-between gap-3 text-sm text-gray-500">
                <span className="rounded-full bg-gray-100 px-3 py-1 font-medium">{simulado.quantidadeDeQuestoes} questões</span>
                <span>{new Date(simulado.simulado.dataCriacao).toLocaleDateString('pt-BR')}</span>
            </div>
            {simulado.nota !== null && <p className="mt-4 text-sm font-medium text-gray-700">Nota obtida: {simulado.nota}</p>}
            <div className="mt-5 flex items-center justify-between text-sm font-medium">
                <span className={`rounded-lg px-3 py-1 ${concluido ? 'bg-gray-200 text-gray-700' : 'bg-blue-600 text-white'}`}>{concluido ? 'Revisar' : 'Iniciar'}</span>
                <ArrowRightIcon className="h-4 w-4 text-blue-600" />
            </div>
        </Link>
    );
}
