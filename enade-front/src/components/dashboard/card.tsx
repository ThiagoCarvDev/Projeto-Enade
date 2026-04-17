import {
    ChartBarIcon,
    ClockIcon,
    ClipboardDocumentCheckIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';

const mockCardData = {
    simuladosRealizados: 5,
    simuladosPendentes: 2,
    mediaAcertos: 74.6,
    tempoMedio: 32, // minutos
};

const iconMap = {
    simulados: ClipboardDocumentCheckIcon,
    pendentes: XCircleIcon,
    performance: ChartBarIcon,
    tempo: ClockIcon,
};

export default function CardWrapper() {
    return (
        <>
            <Card
                title="Simulados Realizados"
                value={mockCardData.simuladosRealizados}
                type="simulados"
            />

            <Card
                title="Simulados Pendentes"
                value={mockCardData.simuladosPendentes}
                type="pendentes"
            />

            <Card
                title="Média de Acertos"
                value={`${mockCardData.mediaAcertos}%`}
                type="performance"
            />

            <Card
                title="Tempo Médio"
                value={`${mockCardData.tempoMedio} min`}
                type="tempo"
            />
        </>
    );
}

export function Card({
    title,
    value,
    type,
}: {
    title: string;
    value: number | string;
    type: 'simulados' | 'pendentes' | 'performance' | 'tempo';
}) {
    const Icon = iconMap[type];

    return (
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
            <div className="flex items-center p-4">
                {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
                <h3 className="ml-2 text-sm font-medium">{title}</h3>
            </div>

            <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl font-semibold">
                {value}
            </p>
        </div>
    );
}