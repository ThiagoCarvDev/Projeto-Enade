'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const publicRoutes = ['/', '/signup'];

export default function RouteGuard({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const token = window.localStorage.getItem('enade_token');
        const isPublic = publicRoutes.includes(pathname);

        if (!token && !isPublic) {
            router.replace('/');
            return;
        }

        setReady(true);
    }, [pathname, router]);

    if (!ready) return null;
    return children;
}