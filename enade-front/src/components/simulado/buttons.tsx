import { PaperAirplaneIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
// import { deleteInvoice } from '@/app/lib/actions';

export function CreateJobs() {
    return (
        <Link
            href="/dashboard/vagas/create"
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
            <span className="hidden md:block">Criar Vaga</span>{' '}
            <PlusIcon className="h-5 md:ml-4" />
        </Link>
    );
}

export function UpdateInvoice({ id }: { id: string }) {
    return (
        <Link
            href={`/dashboard/vagas/${id}/aply`}
            className="rounded-md border p-2 hover:bg-gray-100"
        >
            <PaperAirplaneIcon className="w-5" />
        </Link>
    );
}


