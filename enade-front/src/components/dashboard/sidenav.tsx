import Link from 'next/link';
import NavLinks from '@/components/dashboard/navlinks';
import UninassauLogo from '../../../public/uninassau-logo.png';
import { ButtonSignOut } from './button-signout';
import Image from 'next/image';

export default function SideNav() {
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link
                className="mb-2 flex h-20 items-end justify-start rounded-md bg-white-600 p-4 md:h-40"
                href="/"
            >
                <div className="w-32 md:w-40">
                    <Image
                        src={UninassauLogo}
                        alt="Logo Uninassau"
                        className="object-contain"
                    />
                </div>
            </Link>

            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">

                <NavLinks />

                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>

                <ButtonSignOut />

            </div>

        </div>
    );
}
