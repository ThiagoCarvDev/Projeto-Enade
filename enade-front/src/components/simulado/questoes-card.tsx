'use client';

type Props = {
    pergunta: string;
    alternativas: { id: number; texto: string; opcaoAlternativa: string }[];
    selecionada?: number;
    onSelect: (id: number) => void;
};

export default function QuestionCard({
    pergunta,
    alternativas,
    selecionada,
    onSelect,
}: Props) {
    return (
        <div className="bg-white p-5 rounded-2xl shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900">
                {pergunta}
            </h2>

            <div className="mt-4 space-y-2">
                {alternativas.map((alt) => (
                    <button
                        key={alt.id}
                        onClick={() => onSelect(alt.id)}
                        className={`w-full text-left p-3 rounded-lg border transition
              ${selecionada === alt.id
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-gray-50 hover:bg-gray-100'
                            }
            `}
                    >
                        <span className="mr-2 font-semibold">{alt.opcaoAlternativa}</span>
                        {alt.texto}
                    </button>
                ))}
            </div>
        </div>
    );
}