// import Pagination from '@/app/ui/invoices/pagination';
// import Search from '@/components/vagas/search';
import Table from '@/components/simulado/table';
// import { CreateJobs } from '@/components/vagas/buttons';
// import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
// import { fetchInvoicesPages } from '@/app/lib/data';

import { Metadata } from 'next';
import SideNav from '@/components/dashboard/sidenav';

export const metadata: Metadata = {
    title: 'Simulados',
};

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    // const totalPages = await fetchInvoicesPages(query);
    return (


        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <SideNav />
            </div>

            <div className="grow p-6 md:overflow-y-auto md:p-12">

                <div className="w-full">
                    <div className="flex w-full items-center justify-between">
                        <h1 className={` text-2xl`}>Simulados</h1>
                    </div>

                    <Suspense key={query + currentPage}>
                        <Table query={query} currentPage={currentPage} />
                    </Suspense>
                    {/* <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div> */}
                </div>
            </div>
        </div>


    );
}