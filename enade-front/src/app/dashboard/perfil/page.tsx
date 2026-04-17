import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { ButtonSignOut } from "@/app/dashboard/_components/button-signout";
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default async function Perfil() {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect("/")
    }

    const user = await prisma.user.findUnique({
        where: { id: session.user.id }
    });

    const areaAtual = 'ADS';

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

            <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6">

                {/* Header */}
                <h1 className="text-2xl font-semibold mb-6 text-gray-800">
                    Perfil
                </h1>

                {/* Info do usuário */}
                <div className="space-y-4 mb-6">

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Nome</p>
                        <p className="text-lg font-medium text-gray-900">
                            {session.user.name}
                        </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-lg font-medium text-gray-900">
                            {session.user.email}
                        </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">ID</p>
                        <p className="text-sm text-gray-700 break-all">
                            {session.user.id}
                        </p>
                    </div>

                </div>

                {/* Área */}
                <form
                    action={async (formData: FormData) => {
                        "use server";
                        const area = formData.get('area') as string;
                        const salaryExpectation = formData.get('salaryExpectation') as string;
                        await prisma.user.update({
                            where: { id: session.user.id },
                            data: {
                                area,
                                salaryExpectation,
                            },
                        });
                        console.log('Perfil atualizado:', { area, salaryExpectation });
                    }}
                    className="space-y-4"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Área
                        </label>

                        <select
                            name="area"
                            defaultValue={areaAtual}
                            className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="ADS">ADS</option>
                            <option value="Direito">Direito</option>
                            <option value="Nutrição">Nutrição</option>
                            <option value="Enfermagem">Enfermagem</option>
                        </select>
                    </div>
                    {/* <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Pretensão salarial
                        </label>
                        <input
                            name="salaryExpectation"
                            defaultValue={salaryExpectation}
                            placeholder="Ex: 10000"
                            className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div> */}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                    >
                        Salvar alterações
                    </button>
                </form>

                {/* Logout */}
                <div className="mt-6 flex justify-end">
                    <ButtonSignOut />
                </div>

            </div>
        </div>
    );
}