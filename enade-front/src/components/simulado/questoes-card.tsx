'use client';

type Props = {
    pergunta: string;
    alternativas: string[];
    selecionada?: number;
    onSelect: (index: number) => void;
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
                {alternativas.map((alt, index) => (
                    <button
                        key={index}
                        onClick={() => onSelect(index)}
                        className={`w-full text-left p-3 rounded-lg border transition
              ${selecionada === index
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-gray-50 hover:bg-gray-100'
                            }
            `}
                    >
                        {alt}
                    </button>
                ))}
            </div>
        </div>
    );
}