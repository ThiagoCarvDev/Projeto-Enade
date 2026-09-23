const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

export type Alternativa = {
    id: number;
    texto: string;
    isCorreta: boolean;
    opcaoAlternativa: string;
};

export type Questao = {
    id: number;
    titulo: string;
    enunciado: string;
    tipoQuestao: string;
    areaQuestao: string;
    possuiImagem: boolean;
    imgURL?: string | null;
    explicacao?: string | null;
    alternativas: Alternativa[];
};

export type Simulado = {
    id: number;
    titulo: string;
    dataCriacao: string;
    quantidadeDeQuestoes: number;
    curso?: { id: number; nome: string } | null;
    tipoSimulado: string;
    questoes: Questao[];
};

export type UsuarioSimulado = {
    id: number;
    nota: number | null;
    quantidadeAcertos: number | null;
    quantidadeDeQuestoes: number;
    quantidadeDeRespostas: number;
    dataConclusao: string | null;
    simulado: Simulado;
};

export type ResultadoSimulado = {
    id: number;
    quantidadeDeAcertos: number;
    quantidadeDeRespostas: number;
    quantidadeDeQuestoes: number;
    nota: number;
    dataConclusao: string;
};

export function getToken() {
    if (typeof window === 'undefined') return null;
    const token = window.localStorage.getItem('enade_token');
    return token?.trim() || null;
}

export async function apiFetch(path: string, init: RequestInit = {}) {
    const headers = new Headers(init.headers);
    if (init.body && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }

    const token = getToken();
    if (token) headers.set('Authorization', `Bearer ${token}`);

    const response = await fetch(`${API_URL}${path}`, { ...init, headers });
    if (response.status === 401 && typeof window !== 'undefined') {
        window.localStorage.removeItem('enade_token');
        if (window.location.pathname !== '/' && window.location.pathname !== '/signup') {
            window.location.assign('/');
        }
    }
    return response;
}

export async function readApiError(response: Response) {
    try {
        const body = await response.json();
        return body.message ?? body.error ?? 'Não foi possível concluir a operação.';
    } catch {
        return 'Não foi possível concluir a operação.';
    }
}

export async function listarSimulados() {
    const response = await apiFetch('/api/usuario/simulados', { cache: 'no-store' });
    if (!response.ok) throw new Error(await readApiError(response));
    return (await response.json()) as UsuarioSimulado[];
}

export async function criarSimulado(quantidade: number) {
    const response = await apiFetch(`/api/simulado?quantidadeDeQuestoes=${quantidade}`, {
        method: 'POST',
    });
    if (!response.ok) throw new Error(await readApiError(response));
    return (await response.json()) as UsuarioSimulado;
}

export async function enviarResposta(
    idUsuarioSimulado: number,
    idQuestao: number,
    idAlternativa: number,
    finalizar = false,
) {
    const endpoint = finalizar
        ? '/api/usuario/simulados/resposta/finalizar'
        : '/api/usuario/simulados/resposta';
    const response = await apiFetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({ idUsuarioSimulado, idQuestao, idAlternativa }),
    });
    if (!response.ok) throw new Error(await readApiError(response));
    return (await response.json()) as ResultadoSimulado | unknown;
}
